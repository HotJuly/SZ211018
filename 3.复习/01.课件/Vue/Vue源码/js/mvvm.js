function MVVM(options) {
    /*
        看源码需要注意的内容:
            1.接收到的数据是什么
            2.this是谁

        options={
            el: "#app",
            data: {
                msg: "hello mvvm",
                person:{
                    name:"xiaoming",
                    msg:"123"
                },
            }
        }

        this->当前实例对象vm
    */
   

    this.$options = options;

    var data = this._data = this.$options.data;
    // var data = (this._data = this.$options.data);
    // 此处的this._data,其实就是Vue2.0中的this.$data

    var me = this; 

    /*
        第一部分:数据代理
        代理:在获取数据的过程中,存在一个代理商,这个人身上没有数据,但是它可以找别人获取数据
        目的:数据代理的目的其实就是为了方便开发,可以在获取/设置数据的时候,少写一个.$data
            数据代理其实并不是响应式原理必不可少的一部分
        次数:2次(数据代理的次数只跟data对象的直系属性有关)
        流程:
            1.使用Object.keys方法获取到data对象中所有的直系属性名
            2.遍历得到的属性名数组,对每个属性进行_proxy操作
            3.在_proxy中,会使用Object.defineProperty方法给vm实例对象身上新增对应属性
                将新增的对应属性设置为访问描述符
                    如果开发者读取该代理属性的值,就会通过get方法获取到this._data中对应的属性值
                    如果开发者设置该代理属性的值,就会通过set方法设置this._data中对应的属性值
    */
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });

    // Object.keys只能获取一个对象直系的属性名组成的数组
    // ["msg","person"].forEach(function(key) {
    //     vm._proxy("msg");
    // });

    /*
        第二部分:数据劫持
        劫持:限制了某个人的人身自由,做什么不能自己控制了,被强迫做某些事
        目的:就是为了监视开发者对所有属性值的修改,从而可以通知视图进行更新
        次数:4次(数据劫持的次数是根据data中具有多少个属性决定的)
        流程:
            1.在observe函数中,会判断data是否有值,以及该值是否为对象,如果满足条件就执行流程2
            2.observe函数会构造调用Observe函数,获取到实例对象
            3.在构造调用的过程中,Observe函数会获取到data的所有直系属性名,并进行遍历,执行defineReactive
            4.在defineReactive方法中
                -创建对应的dep对象
                    每个响应式属性都会有一个对应的dep对象
                -会将当前执行数据劫持的该属性的属性值传入observe,进行深度数据劫持
                    对data对象中所有的属性都进行数据劫持,此处具有隐式递归
                    如果属性值是对象的话,就会递归回到流程1
                -使用Object.defineProperty重写_data身上所有的属性名
                    将所有的属性名都变成具有get/set方法的访问描述符
                -同时使用闭包缓存每个属性的属性值,实现一个属性同时具有get/set以及value三个东西
                -当用户读取该属性的值时,会执行get方法,自动返回闭包value中的数据
                -当用户修改该属性的值时,会执行set方法
                    注意点:
                        1.如果新更新的值等于旧值,就不会发生页面的重新渲染
                        2.如果属性值是一个对象,那么就会对该属性值进行深度数据劫持
                            将内部的属性都变成响应式属性
                        3.使用dep.notify方法,通知视图进行更新
                

        需求:当某个属性值发生变化的时候,需要页面渲染出最新结果
        拆解:
            1.当某个属性值发生变化的时候
                需要监视属性值的变化
                Object.defineProperty可以设置set/get方法分别监视一个属性的修改/读取

            2.页面渲染出最新结果
                找到对应的真实DOM节点,将他的文本内容进行替换
    
    */
    observe(data, this);
    // observe(data, vm);
    
    /*
        第三部分:模版解析
        目的:
            1.解析模版中的指令和插值语法,将其解析为对应的内容,并在页面上进行展示
            2.为了后续响应式的实现进行准备工作
        流程:
            1.调用Compile函数,用于创建解析器实例对象,同时将配置对象中的el元素传入进去
                在此处会判断el是不是元素节点,如果不是就去找到该节点
            2.将el元素中所有的直系子节点全部移入文档碎片中,方便后续进行解析
            3.调用init方法,开始解析文档碎片模版
            4.获取到文档碎片中所有的子节点,并进行遍历判断
                如果是元素节点,使用compilerElement方法,解析该节点
                    此处主要目的是为了解析该元素节点的标签属性(也就是为了解析Vue指令)
                如果是文本节点,使用compilerText方法,解析该节点
                    获取到插值语法中的表达式内容,交给bind函数
            5.bind函数会将对应的节点以及数据,都交给指定的更新器进行对应更新
                每次调用bind都会创建一个watcher对象
                    每个插值语法对应着一个watcher对象
                注意点:Vue1只会针对于某些需要更新的组件,进行更新,不会出现大面积更新
    */
    this.$compile = new Compile(options.el || document.body, this)
    // vm.$compile = new Compile("#app", vm)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
        // key=>"msg",this->vm
        var me = this;

        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
        // var obj = {
        //     name:123
        // }
        // obj.age=28;

        // 一个属性要么具有value值,要么具有set/get方法
        // 拥有set/get方法的属性,我们成为访问描述符
        // 如果读取某个访问描述符的值,就会触发对应的get方法
        // 如果设置/修改某个访问描述符的值,就会触发对应的set方法

        // 此处是在vm身上新增一个msg属性
        // Object.defineProperty(vm, "msg", {
        //     configurable: false, //不能重复定义
        //     enumerable: true, //可以遍历
        //     get: function proxyGetter() {
        //         return vm._data["msg"];
        //     },
        //     set: function proxySetter(newVal) {
        //         vm._data["msg"] = newVal;
        //     }
        // });

    }
};