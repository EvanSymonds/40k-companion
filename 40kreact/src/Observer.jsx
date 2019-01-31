class Observer {
  constructor(method) {
    this.subscribers = [];
  
    this.method = method;
  
  }
  
  
  //Adds an object to subscribers
  subscribe(subscriber) {
    if (subscriber === undefined) {
  
      return false;
  
    }
    if (this.subscribers.indexOf(subscriber) !== -1) {
  
      return subscriber;
  
    }
    this.subscribers.push(subscriber);
    return true;
  
  }
  
  
  //Removes an object from subscribers
  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(e => e !== subscriber);
  
    return true
  
  }
  
  
  //Notifies subscribers
  notify(data) {
    let self = this;
  
    this.subscribers.forEach(function(subscriber) {
      try {
  
        subscriber[self.method](data);
      } catch (err) {
  
        console.log('Observer notify error!');
        console.log(`subscriber was:`, subscriber);
  
        console.log(`method was ${self.method}`);
  
        console.log('observer object was', data);
  
        console.log(err.stack);
      }
    });
  }
  
  
  //Empties subscriber list.
  clear() {
    this.subscribers = [];
  
    return true;
  
  }
}
  
  
export default Observer
  