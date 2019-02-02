import React from 'react';
import Button from './button';
import Detachment from './detachment';
import axios from 'axios';

class ArmyBuilder extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      detachments: []
    }
    this.actionObserver = props.observer;
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

  addNewDetachment(){
    let detachments = this.state.detachments;
    if (detachments.length < 10){
      let data = {
        name: 'Name',
        type: 'Unbound',
        id: detachments.length
      }
      detachments.push({
        data
      })
      
      this.setState({
        detachments: detachments
      });
    

      axios
        .put(
          "http://localhost:3000/armybuilder",
          {headers: data}
        )
        .then(r => console.log(r.status))
        .catch(e => console.log(e));

    }
  }

  renderDetachments(){
    let detachments = this.state.detachments.map(({id}) => {
      return <Detachment observer = {this.actionObserver} key = {id} id ={id}/>;
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