function Watcher(obj,key,update) {
  //每new一个新Watcher 都把这个watcher push到obj里这个key的dep里
  Dependency.watcher = this;
  obj[key];//触发key的get方法
  Dependency.watcher = null;

  this.update = () => {
    //每当obj的key值改变时会由dep广播过来    
    //run something，例如更新dom
    update(obj[key])

  }
}