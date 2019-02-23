import React from 'react';
import Menu from './menu';
import ObserverList from '../ObserverList';
import ArmyBuilder from './armyBuilder.jsx';
import CampaignManager from './campaignManager.jsx';
import Login from './login.jsx';
import SignUp from './signUp';

class MainApp extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      loggedIn: false,
      page: 'Menu',
      username: ''
    }
    this.observerList = new ObserverList();
    this.actionObserver = this.observerList.addObserver('actionObserver', 'actionCallback');
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'navigation') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.setState({page:observerObject.id});
    }
    if (observerObject.action === 'changeViewState') {
      console.log(`Recieved from button: ${observerObject.id}`);
      console.log(observerObject.data);
      this.setState({loggedIn: observerObject.tag, page: 'Menu', username: observerObject.data});
    }
  }

  currentlyDisplayed(page){
    console.log(this.state.loggedIn);
    switch(page){
      case 'Menu':
        return <Menu content = {'default'} user={this.state.username} loggedIn={this.state.loggedIn} observer ={this.actionObserver}/>;
      case 'Army builder':
        return <ArmyBuilder loggedIn={this.state.loggedIn} user={this.state.username} observer ={this.actionObserver}/>;
      case 'Campaign manager':
        return <CampaignManager loggedIn={this.state.loggedIn} user={this.state.username} observer ={this.actionObserver}/>;
      case  'Login':
        return <Login observer ={this.actionObserver}/>;
      case 'Sign up':
        return <SignUp observer ={this.actionObserver}/>;
    }
  }

  //Renders page
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
