function MVVM(options) {

    /*
        看源码一定要分清楚,this是谁,当前接收的参数是什么
        this->Vue组件实例对象this->vm
        options->
                {
                    el: "#app",
                    data: {
                        msg: "hello mvvm",
                        person:{
                            name:"xiaoming",
                            msg:"123"
                        },
                    }
                }
    
    */

    this.$options = options;

    // 此处就是beforeCreate的执行时机

    // var data = (this._data = this.$options.data);
    // var data = this.$options.data;
    // 此处的_data其实就是Vue2中的$data
    var data = this._data = this.$options.data;

    var me = this; 

    
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });

    /*
        MVVM源码第一部分:数据代理
        语法:this.msg->this._data.msg
        代理:就是自身身上并没有真实的数据,但是可以找源对象获取执行数据结果,并进行返回
        目的:为了方便开发者读取data对象身上的数据,减少._data的书写
            有些类似于axios响应拦截器中的return response.data;
        代理次数:2次(次数与data对象具有多少个直系属性有关,不会代理后代属性)

        其实数据代理在我个人认为,他不能算是响应式原理的一部分,他并不是不可或缺的一部分
    
    */

    // Object.keys是用于获取直系属性组成的数组
    // ["msg","person"].forEach(function(key) {
    //     vm._proxy("msg");
    // });

    /*
        响应式的含义
            当一个属性被修改之后,页面会自动展示出最新的结果

            只会发生在更新阶段

        需求:当一个属性被修改之后,页面会自动展示出最新的结果
        拆解:
            1.如何知道一个属性是否被修改了
                通过Object.defineProperty可以将一个属性变成get和set方法,当有人修改该属性就会触发该属性的set方法

            2.如何控制页面渲染出最新的结果
                肯定涉及到了DOM的CRUD操作

        准备工作:
            dep和watcher对象之间建立映射关系
            流程:
                1.在解析模版的bind方法中,会创建一个watcher实例对象
                2.在创建实例对象的过程中,会先修改Dep.target的值为当前watcher对象
                3.然后触发当前插值语法所需要使用到的响应式属性的get方法
                4.执行get方法,此时Dep.target有值,所以触发dep.depend方法
                5.在depend方法中,watcher对象会将与自身相关的dep对象的id作为属性名,
                    dep对象地址值作为属性值,存储于自身携带的depIds对象中
                6.dep也会将与自己相关的watcher对象收集到自身的subs数组中,实现映射关系的建立

        更新流程:
            代码:vm.msg = "atguigu666"
            1.会触发msg属性的数据代理中的set方法=>vm._data.msg="atguigu666"
            2.会触发_data对象的msg属性的数据劫持的set方法
            3.将新值存入闭包val中,同时检测新值是否为对象,如果是则进行深度数据劫持,如果不是则继续执行后续代码
            4.触发对应dep对象的notify方法来通知准备更新视图
            5.遍历dep对象的subs数组,得到所有相关的watcher对象,并执行他们的update方法
            6.update方法中,除了获取最新的数据,同时还会调用watcher身上的cb函数
            7.最终,在cb函数中,会根据最新数据来更新对应的text节点,展示最新数据

        Vue1与Vue2的区别点:
            问题1:Vue1中页面更新的最小单位是什么?(标签,组件,整个项目)
            答案:标签

            问题2:Vue2中页面更新的最小单位是什么?(标签,组件,整个项目)
            答案:组件

            对比:Vue1的页面更新范围更加精准,Vue2的更新范围更大,很可能出现误杀的情况
                但是,反过来说,Vue1花费的监视代价远大于Vue2

                其实Vue2也没有想象中的那么差,因为Vue2具有diff算法,他会减少误杀的情况
    
    */

    /*
        MVVM源码第二部分:数据劫持
        劫持:将某个人强行带走,限制这个人的人身自由,并且胁迫他做一些原本不想做的事情
        次数:4次(数据劫持的次数与data对象中属性的个数有关)
        目的:就是重写data中的所有属性,将所有属性变为get/set模式,从而监视所有属性的修改
        流程:
            1.执行observe函数,判断当前data属性中是否有值,而且是否是个对象
            2.如果是个对象,就开始进行数据劫持
            3.使用Object.keys获取到data对象所有的直系属性,并执行defineReactive
            4.在执行defineReactive的时候,会生成一个对应的dep对象
                同时对当前属性的属性值进行深度劫持
                如果被劫持的属性值也是一个对象,会继续劫持该对象的所有属性
            5.在defineReactive中会重写data对象身上所有的属性,将其从value值模式修改为get/set模式
                如果有人修改当前属性,就会触发get方法,从而得知该属性被修改了
                注意点:
                    1.属性的value值会被闭包进行缓存,防止原先数据的丢失
                    2.如果更新的新值等于旧值,那么后续代码将不会执行,也就是说页面不会产生任何的变化
                    3.如果更新的新值是一个对象,那么会对该对象中所有的属性进行数据劫持,将其变为响应式属性

        重点:data中每具有一个响应式属性,就会生成一个dep对象
    
    */
    observe(data, this);
    // observe(data, vm);

    // 此处是created的执行时机


    /*
        MVVM源码第三部分:模版解析
        目的:解析模版中遇到的Vue指令和插值语法,实现首次的页面渲染,同时创建watcher对象实现后续更新视图效果
        流程:
            1.首先判断el属性是否为元素节点,如果不是就找到对应的元素节点,否则就是body元素
            2.将el对象内部所有的直系子节点全部转移到文档碎片中
            3.调用init方法,开始解析模版
            4.获取到文档碎片中所有的子节点组成的数组,并进行遍历
                判断每个子节点的节点类型
                    如果是元素节点,就会首先解析他的标签属性,如果标签属性中有v-开头的属性,就按照指令对其进行解析
                    如果是文本节点,就尝试判断是否具有插值语法
                        如果具有插值语法,就解析该插值语法,找到对应的文本节点,并且从data对象中获取到对应的显示数据
                        最终,将文本节点中的插值语法进行替换,替换为需要显示的数据,并同时生成对应的watcher对象
            5.最终将解析完的所有模版内容直接插入到页面的el元素中,进行展示

        重点:每个插值语法就会生成一个对应的watcher对象
    */
    // this.$compile = new Compile("#app" || document.body, vm)
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
        //     vm._proxy("msg");
        // this->vm , key=>"msg"
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

        // vm身上并没有msg属性,也就是说此处在新增一个属性
        // 属性分为两种,一种具有value值,一种只有get和set方法
        // 具有value值的属性才是真材实料,而具有get,set方法的属性是不存有数据的
        // 如果有人读取一个属性,如果该属性只有get和set方法,那么会触发get,如果修改该属性,就会触发set方法
        // obj.name=123
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