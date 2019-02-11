import React from 'react';
import Button from './button';
import ModelProfileStats from './modelProfileStats';

class ModelProfile extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      mode: 'display'
    }
    this.actionObserver = props.observer;
    this.infoLibrary = {
      default: [
        'name',
        'quantity',
        'points'
      ]
    }
    console.log(this.props);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'editModelProfile') {
      if (observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.toggleEditButton();
        console.log(observerObject.tag);
      }
    }
  }

  toggleEditButton(){
    if (this.state.mode === 'display'){
      this.setState({mode: 'edit'});
    } else{
      this.setState({mode: 'display'});
    }
  }

  submitButton(){
    this.toggleEditButton();
  }

  getButtonLabel(){
    if (this.state.mode === 'display'){
      return <Button observer = {this.actionObserver} function={'editModelProfile'} label={'Edit'} tag={this.props.id} key={`edit ${this.props.id}`}/>
    } else{
      return <Button observer = {this.actionObserver} function={'editModelProfile'} label={'Save'} tag={this.props.id} key={`delete ${this.props.id}`}/>
    }
  }
  
  infoDefinition(){
    return this.infoLibrary[this.props.content];
  }

  profileStatConstructor(){
    let stats = this.infoDefinition().map((stat) => {
      return <ModelProfileStats observer = {this.actionObserver} key = {stat} stat={stat}
      group={this.props.id}/>;
    });
    return stats;
  }

  render(){
    return(
      <React.Fragment>
        {this.profileStatConstructor()}
        {this.getButtonLabel()}
        <Button observer = {this.actionObserver} key = {this.props.id} tag={this.props.id}  label = {'Delete'} function = {'deleteUnit'}/>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ModelProfile;