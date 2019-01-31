import Observer from './Observer';

class ObserverList {

  constructor() {
    this.list = {};

  }


  addObserver(name, method) {

    if (name === undefined || method === undefined) {

      return false;

    }
    let o = this.list[name];

    if (o !== undefined) {

      return o;

    }
    o = new Observer(method);

    this.list[name] = o;

    return o;

  }


  deleteObserver(name) {
    delete this.list[name];

    return true;

  }


  //Returns all observers with subscriptions by the object. If the object is a string 'all', all observers are returned.
  subscriptionsBy(object) {
    let resultSubscriptions = [];

    for (var observerName in this.list) {

      let observer = this.list[observerName];

      if (observer.subscribers.includes(object) || object === 'all') {

        resultSubscriptions.push(observer);
      }
    }
    return resultSubscriptions;

  }


  //Unsubscribes an object from all current subscribed observers
  unsubscribe(subscriber) {
    this.subscriptionsBy(subscriber).forEach(observer => {

      observer.unsubscribe(subscriber);
    });
  }


}


export default ObserverList
