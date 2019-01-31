import React from 'react';
import Button from './button';

class PlayerStats extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {

    }
    this.actionObserver = props.observer;
    console.log(this.props);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  render(){
    return(
      <React.Fragment>
        <Button observer = {this.actionObserver} key = {'menu'} label = {'menu'} function = {'navigation'}/>
        <h1>Player Stats</h1>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default PlayerStats;