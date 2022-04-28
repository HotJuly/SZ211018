function Compile(el, vm) {
    // vm.$compile = new Compile("#app", vm)
    // this->com对象
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->vm.$el,this->com对象
        var fragment = document.createDocumentFragment(),
            child;

        // 文档碎片把el元素抄家了
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->this.$fragment
        // 第二次进入 el->p元素

        // 获取到所有子节点组成的伪数组
        // childNodes = [p节点]
        // 第二次进入 childNodes = [text节点]
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

        // 第一次:[p节点].forEach(function(node) {
        // 第二次:[text节点].forEach(function(node) {
        //     var text = node.textContent;
        //      text=>"{{msg}}"
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(node, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });
    },

    compile: function(node) {
        // node->p元素
        // 用于获取当前标签身上所有的标签属性对象组成的数组
        // 每个标签属性,其实都是一个属性节点
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

        // [{name:"v-on:click",value:"clickHandler"}].forEach(function(attr) {
        //     var attrName = attr.name;
        //     if (com.isDirective(attrName)) {
        //         var exp = attr.value;
        //         var dir = attrName.substring(2);

        //         if (me.isEventDirective(dir)) {
        //             compileUtil.eventHandler(node, me.$vm, exp, dir);
        //         } else {
        //             compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        //         }

        //         node.removeAttribute(attrName);
        //     }
        // });
    },

    compileText: function(node, exp) {
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

        // 获取到对应的更新器函数textUpdater
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm, "msg", function(value, oldValue) {
        //     updaterFn && updaterFn(node, value, oldValue);
        // });
        
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // node->p元素,vm->vm,exp->"clickHandler",dir=>"on:click"
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")
        var val = vm._data;

        exp = exp.split('.');
        // exp->["msg"]
        // exp->["person","name"]

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        //     第一次:val = _data["person"];
        //     第二次:val = person["name"];
        // });
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