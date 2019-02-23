import React from 'react';
import MenuBar from './menuBar.jsx';

class CampaignManager extends React.Component {
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
        <MenuBar observer ={this.actionObserver} loggedIn={this.props.loggedIn} user={this.props.user}/>
        <h1>Feature in development</h1>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default CampaignManager;