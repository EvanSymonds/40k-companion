import React from 'react';

class ModelProfileStats extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      mode: 'display',
      data: this.props.stat
    }
    this.actionObserver = props.observer;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState({data: this.props.stat});
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'editModelProfile') {
      if (observerObject.tag === this.props.group){
        console.log(`Recieved from button: ${observerObject.id}`);
        this.toggleEditButton();
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

  handleSubmit(e){
    this.setState({data: e.target.value});
  }

  renderStat(){
    if (this.state.mode === 'display'){
      return <h1>{this.state.data}</h1>
    }else {
      return <input className='profileInput' value={this.state.data} onChange={this.handleSubmit}></input>
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderStat()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ModelProfileStats;