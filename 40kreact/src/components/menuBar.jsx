import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonUI from '@material-ui/core/Button';

class MenuBar extends React.Component {
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

  actionCallback(observerObject) {

  }

  renderViewStates(){
    if (this.props.loggedIn === true){
      console.log(this.props.user);
      return (
        <React.Fragment>
          <AppBar position="static" style={{backgroundColor:"#b71c1c"}}>
            <Toolbar>
              <ButtonUI color="inherit" onClick={() => {
                this.actionObserver.notify({
                  action: 'navigation',
                  id: 'Menu',
                  tag: this.props.id
                })}}>
              Menu</ButtonUI>
              <ButtonUI style={{marginLeft:1710}}color="inherit">{this.props.user}</ButtonUI>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      )
    }else {
      return (
        <AppBar position="static" style={{backgroundColor:"#b71c1c"}}>
          <Toolbar>
            <ButtonUI color="inherit" onClick={() => {
              this.actionObserver.notify({
                action: 'navigation',
                id: 'Menu',
                tag: this.props.id
              })}}>
            Menu</ButtonUI>
            <ButtonUI color="inherit" style={{marginLeft: 1736}} onClick={() => {
              this.actionObserver.notify({
                action: 'navigation',
                id: 'Login',
                tag: this.props.id
              })}}>
            Login</ButtonUI>
          </Toolbar>
        </AppBar>
      )
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderViewStates()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default MenuBar;