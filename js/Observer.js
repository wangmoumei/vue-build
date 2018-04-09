
function Observer(data) {
  let log = console.log;
  let _this = this;

  //data本身有一个Dependency
  this.dep = new Dependency();

  Object.defineProperty(data, "__ob__", {
    enumerable: false,//设置Object.keys遍历不到
    value: this
  })

  if (Array.isArray(data)) {

    //监听数组的所有会改变自身的方法
    const arrayMethods = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
    ]
    let arrayProto = Object.create(Array.prototype);
    arrayMethods.map(function(method){
      arrayProto[method] = function(...args){
        Array.prototype[method].apply(this,args);

        let newItems = null;
        if(method == "push" || method == "unshift"){
          newItems = args;
        }else if(method == "splice"){
          newItems = args.slice(2)
        }
        // console.log(newItems)
        //有新的元素的时候，为它们创建observe
        if(newItems){
          observeArray(newItems)
        }
        
        _this.dep.notify();
      }
    })
    data.__proto__ = arrayProto
    observeArray(data)

  } else {

    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i])
    }

  }


  function observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
    }
  }
  function defineReactive(obj, key, val = null) {

    val = val || obj[key]

    // console.log(obj.__ob__ && obj.__ob__ instanceof Observer)
    //递归obj里所有的属性
    observe(val);

    //每个属性都有一个订阅表watchers
    //订阅表被单独定义为对象Dependency，内置方法若干，实际上只是个watcher列表
    let dep = new Dependency();

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        //向订阅表里添加订阅者的动作放在get里
        //因为放这里最合适，只要get一下obj的这个key的值val就可以,像这样：obj[key]
        if (Dependency.watcher)
          dep.addWatcher(Dependency.watcher);


        return val;
      },
      set: function (newVal) {
        val = newVal;

        //向所有watchers广播
        dep.notify();

        log('属性' + key + '已经被监听了，现在值为：', newVal);
      }
    });

  }

  function observe(obj) {
    if (typeof obj != "object")
      return;
    //判断是否已经定义过Observer
    if (obj.__ob__ && obj.__ob__ instanceof Observer) {
      return obj.__ob__;
    } else {
      return new Observer(obj)
    }
  }
}