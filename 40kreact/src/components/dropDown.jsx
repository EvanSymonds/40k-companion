import React from 'react';

class DropDown extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      type: this.props.type
    }
    this.actionObserver = props.observer;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  renderOptions(e){
    let options = this.props.types.map((option) => {
      return <option value={option} key={option}>{option}</option>;
    });
    return options;
  }

  handleChange(e){
    console.log(e.target.value);
    let val = e.target.value;
    this.props.updateTypeHandler(val);
    this.setState({type: val});
  }

  render(){
    return(
      <React.Fragment>
        <select onChange={this.handleChange} value={this.state.type}>
          {this.renderOptions()}
        </select>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default DropDown;