import React from 'react';
import ButtonUI from '@material-ui/core/Button';

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
        <ButtonUI style={{margin:5}} variant="contained" onClick={() =>{
          this.actionObserver.notify({
            action: this.props.function,
            id: this.props.label,
            tag: this.props.tag,
            data: this.props.data,
            key: this.props.key
          })
        }}>
         { this.props.label } </ButtonUI>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Button;