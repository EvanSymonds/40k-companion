import React from 'react';
import Menu from './menu';
import ObserverList from '../ObserverList';
import ArmyBuilder from './armyBuilder';
import CampaignManager from './campaignManager';

class MainApp extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {

    }
    this.observerList = new ObserverList();
    this.actionObserver = this.observerList.addObserver('actionObserver', 'actionCallback');
    this.state = {page:'menu'};
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'navigation') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.setState({page:observerObject.id});
    }
  }

  currentlyDisplayed(page){
    switch(page){
      case 'menu':
        return <Menu content = {'default'} observer ={this.actionObserver}/>;
      case 'Army builder':
        return <ArmyBuilder observer ={this.actionObserver}/>;
      case 'Campaign manager':
        return <CampaignManager observer ={this.actionObserver}/>;
      default:
        return <Menu content = {'default'} observer ={this.actionObserver}/>;
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.currentlyDisplayed(this.state.page)}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default MainApp;
