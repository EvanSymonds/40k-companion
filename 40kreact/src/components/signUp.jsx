import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonUI from '@material-ui/core/Button';
import SignUpForm from './signUpForm.jsx';

class SignUp extends React.Component {
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
            <ButtonUI color="inherit" style={{marginLeft: 1736}} onClick={() => {
              this.actionObserver.notify({
                action: 'navigation',
                id: 'Login',
                tag: this.props.id
              })}}>
            Login</ButtonUI>
          </Toolbar>
        </AppBar>

        <SignUpForm observer = {this.actionObserver} user="" pass=""></SignUpForm>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default SignUp;