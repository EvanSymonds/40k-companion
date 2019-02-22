import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonUI from '@material-ui/core/Button';
import LoginForm from './loginForm.jsx';

class Login extends React.Component {
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
    if (observerObject.action === 'login') {
      console.log(observerObject.user, observerObject.pass);
    }
  }

  render(){
    return(
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
          </Toolbar>
        </AppBar>

        <LoginForm observer = {this.actionObserver} user="" pass=""></LoginForm>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Login;