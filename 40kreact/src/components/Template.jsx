import React from 'react';

class Name extends React.Component {
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
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Name;