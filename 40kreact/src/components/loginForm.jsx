import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
        user: this.props.user,
        pass: this.props.pass
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
    axios
      .get('http://localhost:3000/login/user')
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  render(){
    return(
      <React.Fragment>
        <form>
          <input name="user" value={this.state.user} onChange={this.handleChange}></input>
          <input name="pass" value={this.state.pass} onChange={this.handleChange}>
          </input>
          <button onClick={this.handleSubmit}>Login</button>
        </form>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default LoginForm;