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
        console.log(observerObject.key);
        this.deleteUnit(observerObject.key);
      }
    }
    if (observerObject.action === 'saveModelProfile'){
      if (observerObject.detachId === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);

        console.log('update');

        let id = observerObject.id.substring(4);
        let name = observerObject.data.name;
        let quantity = observerObject.data.quantity;
        let points = observerObject.data.points;

        this.updateProfile(id, name, quantity, points);
      }
    }

  }

  getModelProfiles(){
    let profileArr = this.state.modelProfiles;
    axios
      .get('http://localhost:3000/armybuilder/unit',
      {params: {detachId: this.props.id}})
      .then((res) => {
        res.data.map((units) => {
          profileArr.push({
            id: units._id,
            name: units.name,
            quantity: units.quantity,
            points: units.points,
            detachId: units.detachId
          });
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

    console.log(unit.id);

    axios.delete("http://localhost:3000/armybuilder/unit",{data: {id: unit.id, detachId: unit.detachId}})
      .then((res) => {
        console.log(res);
      })
      
  }

  updateProfile(id, name, quantity, points){
    let profilesArr = this.state.modelProfiles;
    console.log(id);
    let unit = this.state.modelProfiles.find((unit) => {
      if (unit.id === id){
        console.log(unit.id);
        return unit;
      }
    });

    let index = profilesArr.indexOf(unit);
    console.log(index);
    profilesArr[index] = {
      id: id,
      name: name,
      quantity: quantity,
      points: points,
      detachId: this.props.id
    }

    let data = {
      name: name,
      quantity: quantity,
      points: points
    }
    console.log(data, id);
    axios
      .put('http://localhost:3000/armybuilder/unit', 
      {params: {data: data, id: id}})
      .then(r => console.log(r.status))

    console.log(profilesArr);

    this.setState({modelProfiles: profilesArr});
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
      return <button key="edit" onClick={this.toggleMode}>Edit</button>
    } else{
      return <button key="save" onClick={this.sendData}>Save</button>
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
    console.log(this.state.modelProfiles);
    let profiles = this.state.modelProfiles.map((id) => {
      console.log(id);
      return <ModelProfile observer = {this.actionObserver} key = {id.id} id ={id.id} name={id.name} quantity={id.quantity} points={id.points} detachId={id.detachId} content={'default'}/>;
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
        <Button observer = {this.actionObserver} key = {`newprofile${this.props.id}`} label = {'New profile'} function = {'newProfile'} tag={this.props.id}/>
        <Button observer = {this.actionObserver} key = {`delete${this.props.id}`} tag={this.props.id}  label = {'Delete'} function = {'deleteDetach'}/>
        {this.renderProfiles()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Detachment;