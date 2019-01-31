import React from 'react';
import Button from './button';

class Detachment extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      mode: 'display',
      name: 'Name',
      types: [
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
    }
    this.state.type = 'Unbound';
    this.actionObserver = props.observer;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'editDetachment') {
      if (observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.toggleEditButton();
      }
    }
    if (observerObject.action === 'nextDetachType') {
      if (observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.nextType();
      }
    }
    if (observerObject.action === 'prevDetachType') {
      if (observerObject.tag === this.props.id){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.prevType();
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
      return <Button observer = {this.actionObserver} function={'editDetachment'} label={'Edit'} tag={this.props.id}/>
    } else{
      return <Button observer = {this.actionObserver} function={'editDetachment'} label={'Save'} tag={this.props.id}/>
    }
  }

  handleSubmit(e){
    this.setState({name: e.target.value});
  }

  nextType(){
    let current = this.state.type
    let next = this.state.types.findIndex((index) => index === current) + 1;
    if (next === this.state.types.length){
      next = 0;
    }
    next = this.state.types[next];
    this.setState({type: next});
  }

  prevType(){
    let current = this.state.type
    let prev = this.state.types.findIndex((index) => index === current) - 1;
    if (prev === -1){
      prev = this.state.types.length - 1;
    }
    prev = this.state.types[prev];
    this.setState({type: prev});
  }

  renderData(){
    if (this.state.mode === 'display'){
      return <h1>{this.state.name}</h1>
    }else {
      return <input className='detachInput' value={this.state.name} onChange={this.handleSubmit}></input>
    }
  }

  render(){
    return(
      <React.Fragment>
        <h1>{this.renderData()}</h1>
        <h2>{this.state.type}</h2>
        <Button observer = {this.actionObserver} tag = {this.props.id} label = {'prev'} function = {'prevDetachType'}/>
        <Button observer = {this.actionObserver} tag = {this.props.id} label = {'next'} function = {'nextDetachType'}/>
        {this.getButtonLabel()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Detachment;