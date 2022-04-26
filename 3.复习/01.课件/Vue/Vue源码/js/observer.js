function Observer(data) {
    // this->ob对象,data->this._data
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
        
    },
    convert: function(key, val) { 
        // this->ob对象
        //ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
        // ob.defineReactive(this._data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // ob.defineReactive(this._data, "msg", "hello mvvm"); 
        // this->ob对象

        //小总结:
        //      每次调用defineReactive就会生成一个对应的dep对象
        //      data中每具有一个属性,就会生成一个dep对象
        var dep = new Dep();  

        // 将当前属性的属性值传入observe函数进行递归,如果属性值是一个对象,就进行属性的深度劫持
        // 此处在实现深度劫持
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

        // 此处不是在新增属性,而是在重写属性,因为_data身上本来就有该属性
        // 将原先data对象上的属性从value值改为get/set方法
        // 由于属性变成get/set模式,所以value值会丢失,但是此时Vue使用闭包的形式将原先的value值存储在闭包中
        // Object.defineProperty(this._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //          如果新值等于旧值,那么后续代码将不会执行,也就是说页面不会产生任何的变化
        //         if (newVal === val) {
        //             return;
        //         }
        //         val = newVal;

        //          如果新值是一个对象,那么会对该对象中所有的属性进行数据劫持,将其变为响应式属性
        //         childObj = observe(newVal);
                
        //          dep在通知视图进行更新
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
    // observe(data, vm);

    // 此处在判断value是否有值,其次判断value是否为一个对象
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
        // 在此处,dep使用自己的subs数组收集与自己相关的watcher对象
        // dep.subs.push(watcher);

    },

    depend: function() {
        // this->dep
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