import React from 'react';
import Button from './button';
import ModelProfile from './modelProfile';
import Detachment from './detachment';

class ArmyBuilder extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      modelProfiles:[],
      detachments: []
    }
    this.actionObserver = props.observer;
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newProfile') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewProfile();
    }
    if (observerObject.action === 'newDetachment') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewDetachment();
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

  addNewDetachment(){
    let detachments = this.state.detachments;
    console.log(detachments);
    if (detachments.length < 10){
      detachments.push({
        name: 'Name',
        type: 'Unbound',
        id: detachments.length
      })
      
      this.setState({
        detachments: detachments
      });

    }
  }

  renderProfiles(){
    let profiles = this.state.modelProfiles.map(({id}) => {
      console.log(id);
      return <ModelProfile observer = {this.actionObserver} key = {id} id ={id} content={'default'}/>;
    });
    return profiles;
  }

  renderDetachments(){
    let detachments = this.state.detachments.map(({id}) => {
      console.log(id);
      return <Detachment observer = {this.actionObserver} key = {id} id ={id}/>;
    });
    return detachments;
  }

  render(){
    return(
      <React.Fragment>
        <Button observer = {this.actionObserver} key = {'menu'} label = {'menu'} function = {'navigation'}/>
        <Button observer = {this.actionObserver} key = {'New profile'} label = {'New profile'} function = {'newProfile'}/>
        <Button observer = {this.actionObserver} key = {'New detachment'} label = {'New detachment'} function = {'newDetachment'}/>
        {this.renderDetachments()}
        {this.renderProfiles()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ArmyBuilder;