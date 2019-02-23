import React from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ButtonUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class SignUpForm extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
        user: this.props.user,
        pass: this.props.pass,
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
      user: this.state.user,
      pass: this.state.pass
    });
    this.actionObserver.notify({
      action: 'changeViewState',
      tag: true,
      data: this.state.username
    });

    axios
      .post(
        "http://localhost:3000/login/signup",
        {username: this.state.user, password: this.state.pass})
      .then((res) => {
        if (typeof res.data != 'object'){
          this.setState({error: res.data}, console.log(this.state.error));
        } else {
          this.setState({error: false});
        }
      })
  }

  renderError(){
    if(this.state.error === false){
      return <h3></h3>
    } else {
      return <h3>{this.state.error}</h3>
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
            <ButtonUI onClick={this.handleSubmit}>
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

export default SignUpForm;