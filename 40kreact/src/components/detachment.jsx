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
    this.getModelProfiles();
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newProfile') {
      if(observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.addNewProfile();
      }
    }
    if (observerObject.action === 'deleteUnit'){
      if (observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        console.log(observerObject.tag);
        this.deleteUnit(observerObject.tag);
      }
    }
    if (observerObject.action === 'saveUnitData'){
      console.log(`Recieved from button: ${observerObject.id}`);
      
      let id = observerObject.id;
      let name = observerObject.name;
      let quantity = observerObject.quantity;
      let points = observerObject.points;

      this.updateUnit(id, name, quantity, points);
    }
  }

  getModelProfiles(){
    let profileArr = this.state.modelProfiles;
    axios
      .get('http://localhost:3000/armybuilder/unit',
      {params: {detachId: this.props.id}})
      .then((res) => {
        res.data.map((units) => {
          profileArr.push(units);
          this.setState({modelProfiles: profileArr});
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  addNewProfile(){
    axios
      .post(
        "http://localhost:3000/armybuilder/unit",
        {name: 'Name',
        quantity: 1,
        points: 0,
        detachId: this.props.id}
      )
      .then(res => {
        console.log(res.data._id);
        let profileArr = this.state.modelProfiles;
        profileArr.push({
          id: res.data._id,
          name: 'Name',
          quantity: 1,
          points: 0,
          detachId: this.props.id,
        });
        this.setState({modelProfiles: profileArr});
      });
  }

  deleteUnit(id){
    let unit = this.state.modelProfiles.find((unit) => {
      if (unit._id === id){
        console.log(unit._id);
        return unit;
      }
    });

    let unitArr = this.state.modelProfiles;
    let index = this.state.modelProfiles.indexOf(unit);
    unitArr.splice(index, 1);

    this.setState({modelProfiles: unitArr});
    console.log(this.state.modelProfiles);

    axios.delete("http://localhost:3000/armybuilder/unit",{data: {id: id, detachId: this.props.id}})
      .then((res) => {
        console.log(res);
      })
      
  }

  updateProfile(id, name, quantity, points){
    let data = {
      name: name,
      quantity: quantity,
      points: points
    }
    axios
      .put('http://localhost:3000/armybuilder/unit', 
      {params: {data: data, id: id}})
      .then(r => console.log(r.status))
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
    let profiles = this.state.modelProfiles.map((id) => {
      console.log(id._id);
      return <ModelProfile observer = {this.actionObserver} key = {id._id} id ={id._id} name={id.name} quantity={id.quantity} points={id.points} detachId={id.detachId} content={'default'}/>;
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
        <Button observer = {this.actionObserver} key = {`newprofile ${this.props.id}`} label = {'New profile'} function = {'newProfile'} tag={this.props.id}/>
        <Button observer = {this.actionObserver} key = {this.props.id} tag={this.props.id}  label = {'Delete'} function = {'deleteDetach'}/>
        {this.renderProfiles()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Detachment;