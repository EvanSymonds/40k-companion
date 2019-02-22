import React from 'react';
import axios from 'axios';

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
          if(typeof res != Object){
            this.setState({error: res.data});
          } else {
            this.setState({error: false});
          }
        })
  }

  renderError(){
    if (this.state.error === false){
      return <h1></h1>
    }else {
      return <h1>{this.state.error}</h1>
    }
  }

  render(){
    return(
      <React.Fragment>
        <form>
          <input name="username" value={this.state.username} onChange={this.handleChange}></input>
          <input name="password" value={this.state.password} onChange={this.handleChange}>
          </input>
          <button onClick={this.handleSubmit}>Login</button>
        </form>
        {this.renderError()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default LoginForm;