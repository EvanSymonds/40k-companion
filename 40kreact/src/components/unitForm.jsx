import React from 'react';

class UnitForm extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      name: this.props.name,
      quantity: this.props.quantity,
      points: this.props.points
    }
    this.actionObserver = props.observer;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    console.log(this.props.id);
    if (observerObject.action === 'editModelProfile'){
      console.log('submit');
      if (observerObject.tag === this.props.id){
        if (observerObject.id === 'Save'){
          this.submit();
        }
      }
    }
  }

  handleChange(e){
    switch(e.target.name){
      case 'name':
        this.setState({name: e.target.value});
        break;
      case 'quantity':
        this.setState({quantity: e.target.value});
        break;
      case 'points':
        this.setState({points: e.target.value});
        break;
    }
  }

  submit(){
    console.log(this.props.detachId);
    this.actionObserver.notify({
      action: 'saveModelProfile',
      id: this.props.id,
      detachId: this.props.detachId,
      data: {
        name: this.state.name,
        quantity: this.state.quantity,
        points: this.state.points
      }
    })
  }

  render(){
    return(
      <React.Fragment>
        <input type='text' name='name' value={this.state.name} onChange={this.handleChange}></input>
        <input type='text' name='quantity' value={this.state.quantity}
        onChange={this.handleChange}></input>
        <input type='text' name='points' value={this.state.points}
        onChange={this.handleChange}></input>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default UnitForm;