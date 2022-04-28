function Observer(data) {
    // data->vm._data , this->ob对象
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this.walk(vm._data); this->ob对象
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
        
    },
    convert: function(key, val) { 
        // ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 

        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
        // this->ob对象

        // 每次调用defineReactive都会创建一个全新的dep对象
        // 小总结:data中每具有一个属性名,就会创建一个对应的dep对象
        var dep = new Dep();  

        // 此处具有一个隐式递归操作
        // 如果属性值是一个对象,那么会继续递归该对象
        // 将所有的属性都实现数据劫持
        var childObj = observe(val);
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 此处不是在新建属性,而是在给_data中的属性进行重写
        // 将一个普通属性msg变成了一个访问描述符,使其具有get/set方法
        // 按道理来说,一个属性具有get/set方法之后,就无法使用value属性存储数据
        // 但是Vue巧妙的使用了闭包的形式,缓存了当前属性的原数据
        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //          Vue会对响应式属性的更新值进行校验,如果新值与旧值相同,就不会更新页面
        //         if (newVal === val) {
        //             return;
        //         }
        //         val = newVal;

        /*
            响应式属性的创建时机:
                1.在组件初始化的时候,Vue会将data对象变为响应式对象
                2.在响应式属性的值更新的一瞬间,Vue也会对属性值进行深度数据劫持
        
            例子1:此情况name不是响应式的
                this.msg={};
                this.msg.name=123;
                注意:以上代码name属性很有可能会渲染在页面上,但是后续单独使用name属性,
                    就无法显示最新结果

            例子2:此情况name是响应式的
                this.msg={name:123}
        */
        //  childObj = observe(newVal);
                
        //  dep.notify会通知视图更新
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
    // observe(data, vm); this->window||undefined
    // 判断data是否有值,而且data是不是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);
        this.subs.push(sub);
        // this.subs.push(watcher);

    },

    depend: function() {
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });

        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
    }
};

Dep.target = null;