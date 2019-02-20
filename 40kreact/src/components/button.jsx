import React from 'react';

class Button extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
    }
    this.actionObserver = props.observer;
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  render(){
    return(
      <React.Fragment>
        <button onClick={() =>{
          this.actionObserver.notify({
            action: this.props.function,
            id: this.props.label,
            tag: this.props.tag,
            data: this.props.data,
            key: this.props.key
          })
        }}>
         { this.props.label } </button>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Button;