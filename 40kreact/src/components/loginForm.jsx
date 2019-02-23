import React from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ButtonUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class LoginForm extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
        username: this.props.user,
        password: this.props.pass,
        error: false
    }
    this.actionObserver = props.observer;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  } 

  actionCallback(observerObject) {

  }

  handleChange(e){
    let name = e.target.name;
    this.setState({[name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.actionObserver.notify({
      action: 'login',
      username: this.state.username,
      password: this.state.password
    });
    axios
        .post(
          "http://localhost:3000/login",
          {username: this.state.username,
          password: this.state.password}
        )
        .then(res => {
          console.log(typeof res.data);
          if(typeof res.data != 'object'){
            this.setState({error: res.data});
          } else {
            this.setState({error: false});
            this.actionObserver.notify({
              action: 'changeViewState',
              tag: true,
              data: this.state.username
            })
          }
        })
  }

  renderError(){
    console.log(this.state.error);
    if (this.state.error === false){
      return <h1></h1>
    }else {
      return <h1>{this.state.error}</h1>
    }
  }

  render(){
    return(
      <React.Fragment>
        <Paper style={{
          width: 400,
          margin:'auto',
          marginTop: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'}}>
          <form>
            <FormControl style={{ width: '100%'}}>
              <InputLabel style={{ marginTop: 22}}>Username</InputLabel>
              <Input name="username" value={this.state.username} onChange={this.handleChange} style={{ marginTop: 30}}/>
            </FormControl>
            <FormControl style={{ width: '100%'}}>
              <InputLabel style={{ marginTop: 42}}>Password</InputLabel>
              <Input name="password" value={this.state.password} onChange={this.handleChange} style={{ marginTop: 50}}/>
            </FormControl>
            <ButtonUI onClick={this.handleSubmit}>Login</ButtonUI>
            <ButtonUI onClick={() => {
                this.actionObserver.notify({
                  action: 'navigation',
                  id: 'Sign up',
                  tag: this.props.id
                })}}>
              Sign up</ButtonUI>
            {this.renderError()}
          </form>
        </Paper>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default LoginForm;