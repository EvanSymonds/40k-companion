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
      name: 'Name',
      type: 'Unbound',
      modelProfiles:[]
    }
    this.state.name = this.props.name;
    this.state.type = this.props.type;
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
    this.updateType = (type) => {
      this.setState({type});
    }
    this.actionObserver = props.observer;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newProfile') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewProfile();
    }
    if (observerObject.action === 'editDetachment') {
      if (observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.toggleEditButton();
      }
    }
  }

  updateDetach(){
    let id = this.props.id;
    let data = {
      name: this.state.name,
      type: this.state.type
    }
    axios
      .put('http://localhost:3000/armybuilder', 
      {params: {data: data, id: id}})
      .then(r => console.log(r.status))
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

  toggleEditButton(){
    if (this.state.mode === 'display'){
      this.setState({mode: 'edit'});
    } else{
      this.setState({mode: 'display'});
      this.updateDetach();
    }
  }

  getButtonLabel(){
    if (this.state.mode === 'display'){
      return <Button observer = {this.actionObserver} function={'editDetachment'} label={'Edit'} tag={this.props.id}/>
    } else{
      return <Button observer = {this.actionObserver} function={'editDetachment'} label={'Save'} tag={this.props.id}/>
    }
  }

  handleSubmit(e){
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
        <h1>{this.state.name}</h1>
        <h2>{this.state.type}</h2>
      </React.Fragment>
      )
    }else {
      return (
      <React.Fragment>
        <input className='detachInput' value={this.state.name} onChange={this.handleSubmit}></input>
        <DropDown observer = {this.actionObserver} types = {this.types} id={this.props.id} updateTypeHandler = {this.updateType}/>
      </React.Fragment>
      )
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderData()}
        {this.getButtonLabel()}
        <Button observer = {this.actionObserver} key = {'New profile'} label = {'New profile'} function = {'newProfile'}/>
        {this.renderProfiles()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Detachment;