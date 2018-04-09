function Dependency() {
  this.watchers = [];//订阅表

  this.addWatcher = (watcher) => {
    this.watchers.push(watcher)
  }

  this.notify = () => {
    this.watchers.map(function(watcher){
      watcher.update();
    })
  }
}
Dependency.watcher = null;//当前未加到订阅表里的订阅者
