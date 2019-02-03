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
    this.getDetachs();
    console.log(this.state.detachments);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newDetachment') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewDetachment();
    }
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
            type: 'Unbound'
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
        {this.renderDetachments()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ArmyBuilder;