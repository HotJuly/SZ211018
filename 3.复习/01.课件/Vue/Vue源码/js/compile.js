function Compile(el, vm) {
    // this.$compile = new Compile("#app" || document.body, vm)
    // this->com实例对象,el->"#app"
    this.$vm = vm;

    //$el中存放的是真实DOM
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);

        // 此时是beforeMount的执行时机

        this.init();

        this.$el.appendChild(this.$fragment);
        
        //此处是mounted的执行时机
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;


        // 此处fragment将app元素中所有的直系子节点全部移到了文档碎片中(相当于被抄家了)
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->this.$fragment,this->com对象
        // 从文档碎片中获取到所有的直系子节点

        // 第二次进入:
        //         com.compileElement(p元素节点);
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // 第一次:[text节点,p元素节点,text节点].forEach(function(node) {
        // 第二次:[text节点].forEach(function(node) {
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         com.compileText(text节点, "msg");
        //     }

        //     if (p元素节点.childNodes && node.childNodes.length) {
        //         com.compileElement(p元素节点);
        //     }
        // });
    },

    compile: function(node) {
        // com.compile(p元素节点);
        // this->com,node->p元素节点

        // 在获取到p元素节点所有的标签属性组成的伪数组
        // 每个标签属性都是一个属性节点,也就是属性对象(属性DOM)
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

        // 以下代码的目的,其实就是为了解析指令
        // [属性对象].forEach(function(attr) {
        //          attrName=>"v-on:click"
        //     var attrName = attr.name;
        //     if (me.isDirective(attrName)) {
            // 能进入此处说明当前属性是一个Vue指令
            //          exp->"handleClick"
        //         var exp = attr.value;
        //              dir=>"on:click"
        //         var dir = attrName.substring(2);

        //         if (me.isEventDirective(dir)) {
            //          能进入当前位置说明该指令是一个事件指令
        //             compileUtil.eventHandler(p元素节点, vm, "handleClick", "on:click");
        //         } else {
        //             compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        //         }

        //         node.removeAttribute(attrName);
        //     }
        // });
    },

    compileText: function(node, exp) {
        //         com.compileText(text节点, "msg");
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(text节点, vm, "msg");
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(text节点, vm, "msg", 'text');
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        // 小总结:
        //      1.watcher对于首次渲染没有任何作用,它适用于更新视图的
        //      2.每次调用bind都会生成一个对应的watcher对象
        //          模版中每具有一个插值语法就会生成一个对应的watcher对象
        // new Watcher(vm, "msg", function(value, oldValue) {
        //     textUpdater && textUpdater(text节点, value, oldValue);
        // });
        new Watcher(vm, exp, function(value, oldValue) {
            debugger
            updaterFn && updaterFn(node, value, oldValue);
            debugger
        });
        
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
    //compileUtil.eventHandler(p元素节点, vm, "handleClick", "on:click");
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")
        var val = vm._data;

        // exp->["msg"]
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
            // val = vm._data["msg"];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // updaterFn(text节点, "hello mvvm");
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};