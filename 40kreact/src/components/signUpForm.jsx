import React from 'react';
import axios from 'axios';

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
      return <h1></h1>
    } else {
      return <h1>{this.state.error}</h1>
    }
  }

  render(){
    return(
      <React.Fragment>
        <form>
          <input name="user" value={this.state.user} onChange={this.handleChange}></input>
          <input name="pass" value={this.state.pass} onChange={this.handleChange}>
          </input>
          <button onClick={this.handleSubmit}>Sign up</button>
        </form>
        {this.renderError()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default SignUpForm;