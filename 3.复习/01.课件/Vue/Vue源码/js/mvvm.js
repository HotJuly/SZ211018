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

    // 此处应该是beforeCreate的执行时机

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

        响应式更新视图:
        准备工作:建立dep和watcher对象的映射关系
            1.在解析插值语法或者指令的时候,会创建watcher对象
            2.在new Watcher的过程中,首先会将Dep.target修改为当前的watcher对象
            3.watcher对象身上会使用depIds对象收集与之相关的所有的dep对象
                所有的插值语法都能与之相关的响应式属性
                watcher调用addDep方法进行收集
            4.dep对象身上具有subs数组,用于收集与之相关的watcher对象
                所有的响应式属性都能够找到使用了他的插值语法
                dep调用addSub方法进行收集
        流程:
            1.当开发使用vm.msg="hello world"更新数据的时候,首先经过数据代理
            2.经过数据代理的效果,此时会变成vm._data.msg="hello world",会经过数据劫持
            3.由于当前某个响应式属性的值发生了修改,会触发对应的set方法
            4.同步更新闭包中的数据,改为当前最新数据,并且调用dep.notify方法通知watcher更新
            5.watcher调用update方法,期间会获取到最新的结果
            6.将最新结果交给对应的cb回调函数,从而触发对应的更新器函数,对指定的节点进行更新


        问题:Vue更新数据是同步还是异步?
        答案:Vue1和Vu2都是同步更新数据

        问题2:Vue更新数据是同步还是异步?
        答案:Vue1会同步更新页面,但是由于浏览器的渲染机制,会延迟渲染
            Vue2会异步更新页面,因为其使用到了nextTick方法,所以更新页面是在微任务中进行更新

        问题3:请问Vue1重新渲染的最小单位是什么?(整个应用,整个组件,标签)
        答案:
            Vue1.0中,watcher对象会找到指定的节点进行更新,不会影响到其他的节点
            Vue2.0中,watcher对象会找到指定的组件实例对象调用_update方法进行组件更新

            从字面上感觉Vue1.0的更新范围比Vue2.0更小,更新精度更高
            实际上,Vue1只所以能够做到如此精准的更新,是花费了非常大资源代价去换取的(以空间换时间)
                    Vue2其实具有diff算法,可以解决掉误杀节点的情况,花费较少的资源去换取内存的使用(以时间换空间)


        问题4:请问Vue1能否对数组进行数据劫持?
        答案:可以

        Vue2.0是如何实现对数组7种方法的重写的?
            Vue2.0会将存在于data中的数组的隐式原型属性修改成一个全新的对象,该对象中具有7个新的操作方法
                也就是说对数组的7种方法进行了重写
            这么做的好处就在于,不会影响到其他普通数组的操作

            Vue2.0中没有对数组的下标进行数据劫持,但是会对数组内部的对象进行深度数据劫持
                也就是说跳过了对数组的下标劫持
    
    */
    observe(data, this);
    // observe(data, vm);

    // 此处是created的执行时机
    
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