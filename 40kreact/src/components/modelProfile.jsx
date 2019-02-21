import React from 'react';
import Button from './button';
import UnitForm from './unitForm';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class ModelProfile extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      mode: 'display'
    }
    this.actionObserver = props.observer;
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'editModelProfile') {
      if (observerObject.tag === `form${this.props.id}`){
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
      return <Button observer = {this.actionObserver} function={'editModelProfile'} key="edit" label={'Edit'} tag={`form${this.props.id}`}/>
    } else{
      return <Button observer = {this.actionObserver} function={'editModelProfile'} key="save" label={'Save'} tag={`form${this.props.id}`}/>
    }
  }

  profileStatConstructor(){
    if (this.state.mode === 'display'){
      return <React.Fragment>
          <h1 key="name">{this.props.name}</h1>
          <h1 key="quantity">{this.props.quantity}</h1>
          <h1 key="points">{this.props.points}</h1>
        </React.Fragment>
    } else {
      return <UnitForm observer = {this.actionObserver} name={this.props.name} quantity={this.props.quantity} points={this.props.points} id={`form${this.props.id}`} detachId={this.props.detachId}/>
    }
  }

  render(){
    return(
      <Card style={{width: 311, marginTop: 20}}>
        <CardContent>
          {this.profileStatConstructor()}
        </CardContent>
        <CardActions>
          {this.getButtonLabel()}
          <Button observer = {this.actionObserver} tag={this.props.id} data={this.props.detachId} label = {'Delete'} function = {'deleteUnit'}/>
        </CardActions>
      </Card>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ModelProfile;