import React from 'react';
import Button from './button';

class EventCalendar extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {

    }
    this.actionObserver = props.observer;
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  render(){
    return(
      <React.Fragment>
        <Button observer = {this.actionObserver} key = {'menu'} label = {'menu'} function = {'navigation'}/>
        <h1>Event calendar</h1>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default EventCalendar;