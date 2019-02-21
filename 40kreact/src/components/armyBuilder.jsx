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
      points: 0
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
    if (observerObject.action === 'deleteDetach') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.setState({points: this.state.points - observerObject.points});
      this.deleteDetach(observerObject.tag);
    }
    if (observerObject.action === 'saveDetachmentData') {
      console.log(`Recieved from button: ${observerObject.id}`);
      let id = observerObject.id;
      let name = observerObject.name;
      let type = observerObject.type;

      this.replaceDetach(id, name, type);
      this.updateDetach(id, name, type);
    }
    if (observerObject.action === 'updatePoints') {
      console.log(`Recieved from button: ${observerObject.id}`);
      console.log(observerObject.points);
      this.setState({points: this.state.points - observerObject.points});
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

  updateDetach(id, name, type){
    let data = {
      name: name,
      type: type
    }
    axios
      .put('http://localhost:3000/armybuilder/detach', 
      {params: {data: data, id: id}})
      .then(r => console.log(r.status))
  }

  deleteDetach(id){
    let detach = this.state.detachments.find((detach) => {
      if (detach._id === id){
        return detach;
      }
    });

    let detachArr = this.state.detachments;
    let index = this.state.detachments.indexOf(detach);
    detachArr.splice(index, 1);

    this.setState({detachments: detachArr});

    axios.delete("http://localhost:3000/armybuilder/detach",
      {data: {id: id}})
      .then((res) => {
        console.log(res);
      })
  }

  getDetachs(){
    let detachArr = this.state.detachments;
    axios
      .get('http://localhost:3000/armybuilder/detach')
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
          "http://localhost:3000/armybuilder/detach",
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
          });

          this.setState({detachments: detachArr});
        })
        .catch(e => console.log(e));
    }
  }

  renderDetachments(){
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
        <h1>{`Total points:${this.state.points}`}</h1>
        {this.renderDetachments()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ArmyBuilder;