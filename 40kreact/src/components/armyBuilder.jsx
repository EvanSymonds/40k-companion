import React from 'react';
import Button from './button';
import Detachment from './detachment';
import axios from 'axios';

class ArmyBuilder extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      detachments: [],
    }
    this.actionObserver = props.observer;
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
    this.getDetachs();
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newDetachment') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewDetachment();
    }
    if (observerObject.action === 'delete') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.deleteDetach(observerObject.key);
    }
    if (observerObject.action === 'saveDetachmentData') {
      console.log(`Recieved from button: ${observerObject.id}`);
      let id = observerObject.id;
      let name = observerObject.name;
      let type = observerObject.type;


      this.replaceDetach(id, name, type);
      this.updateDetach(id, name, type);
    }
  }

  replaceDetach(id, name, type){
    let detach = this.state.detachments.find((detach) => {
      if (detach._id === id){
        return detach;
      }
    })
    let index = this.state.detachments.indexOf(detach);
    console.log(index);
    let detachmentsCopy = this.state.detachments;
    detachmentsCopy[index] = {
      _id: id,
      name: name,
      type: type,
      armyId: 1
    }
    console.log(detachmentsCopy);

    this.setState({detachments: detachmentsCopy});
  }

  updateDetach(name, type, id){
    let data = {
      name: name,
      type: type
    }
    axios
      .put('http://localhost:3000/armybuilder', 
      {params: {data: data, id: id}})
      .then(r => console.log(r.status))
  }

  deleteDetach(id){
    let detach = this.state.detachments.find((detach) => {
      if (detach._id === id){
        return detach;
      }
    });
  }

  getDetachs(){
    let detachArr = this.state.detachments;
    axios
      .get('http://localhost:3000/armybuilder')
      .then((res) => {
        res.data.data.map((detachs) => {
          
          detachArr.push(detachs);
          this.setState({detachments: detachArr});
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  addNewDetachment(){
    let detachments = this.state.detachments;
    if (detachments.length < 10){
      axios
        .post(
          "http://localhost:3000/armybuilder/",
          {name: 'Name',
          type: 'Unbound'}
        )
        .then(res => {
          let detachArr = this.state.detachments;
          detachArr.push({
            _id: res.data,
            name: 'Name',
            type: 'Unbound',
            armyId: 1,
            _v: 0
          });

          this.setState({detachments: detachArr});
        })
        .catch(e => console.log(e));
    }
  }

  renderDetachments(){
    if (this.state.detachments.length === 0) return "Loading";
    let detachments = this.state.detachments.map((id) => {
      return <Detachment observer = {this.actionObserver} key = {id._id} id ={id._id} name={id.name} type={id.type}/>;
    });
    return detachments;
  }

  render(){
    return(
      <React.Fragment>
        <Button observer = {this.actionObserver} key = {'menu'} label = {'menu'} function = {'navigation'}/>
        <Button observer = {this.actionObserver} key = {'New detachment'} label = {'New detachment'} function = {'newDetachment'}/>
        {this.renderDetachments()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ArmyBuilder;