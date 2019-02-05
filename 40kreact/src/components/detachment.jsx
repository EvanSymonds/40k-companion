import React from 'react';
import Button from './button';
import ModelProfile from './modelProfile';
import DropDown from './dropDown';
import axios from 'axios';

class Detachment extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      mode: 'display',
      name: this.props.name,
      type: this.props.type,
      modelProfiles:[]
    }
    this.types = [
      'Unbound',
      'Patrol',
      'Battalion',
      'Brigade',
      'Vanguard',
      'Spearhead',
      'Outrider',
      'Supreme command',
      'Super heavy',
      'Air wing',
      'Super heavy aux',
      'Fortification',
      'Aux support'
    ]
    this.name = this.props.name;
    this.updateType = (type) => {
      this.setState({type});
    }
    this.actionObserver = props.observer;
    this.handleChange = this.handleChange.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newProfile') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewProfile();
    }
  }

  addNewProfile(){
    let profiles = this.state.modelProfiles;
    console.log(profiles);
    if (profiles.length < 10){
      profiles.push({
        name: 'Name',
        points: 0,
        quantity: 1,
        id: profiles.length
      })
      this.setState({
        modelProfiles: profiles
      });
    }
  }

  toggleMode(){
    if (this.state.mode === 'display'){
      this.setState({mode: 'edit'});
    } else{
      this.setState({mode: 'display'});
    }
  }

  getButtons(){
    if (this.state.mode === 'display'){
      return <button onClick={this.toggleMode}>Edit</button>
    } else{
      return <button onClick={this.sendData}>Save</button>
    }
  }

  sendData(){
    this.actionObserver.notify({
      action: "saveDetachmentData",
      name: this.state.name,
      type: this.state.type,
      id: this.props.id
    });
    this.toggleMode();
  }

  handleChange(e){
    this.setState({name: e.target.value});
  }

  renderProfiles(){
    let profiles = this.state.modelProfiles.map(({id}) => {
      return <ModelProfile observer = {this.actionObserver} key = {id} id ={id} content={'default'}/>;
    });
    return profiles;
  }

  renderData(){
    if (this.state.mode === 'display'){
      return (
      <React.Fragment>
        <h1>{this.props.name}</h1>
        <h2>{this.props.type}</h2>
      </React.Fragment>
      )
    }else {
      return (
      <React.Fragment>
        <input className='detachInput' value={this.state.name} onChange={this.handleChange}></input>
        <DropDown observer = {this.actionObserver} types = {this.types} id={this.props.id} updateTypeHandler = {this.updateType}/>
      </React.Fragment>
      )
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderData()}
        {this.getButtons()}
        <Button observer = {this.actionObserver} key = {`newprofile ${this.props.id}`} label = {'New profile'} function = {'newProfile'}/>
        <Button observer = {this.actionObserver} key = {this.props.id} label = {'Delete'} function = {'delete'}/>
        {this.renderProfiles()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Detachment;