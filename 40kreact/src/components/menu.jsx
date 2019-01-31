import React from 'react';
import Button from './button';


class Menu extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
    }
    this.menuLibrary = {
      default: [
        'Campaign manager',
        'Army builder',
      ],
      default2: [
        'test',
        'test2',
      ]

    }
    this.actionObserver = props.observer;
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  menuDefinition(){
    return this.menuLibrary[this.props.content];
  }

  buttonConstructor(){
    let buttons = this.menuDefinition().map((button) => {
      return <Button observer = {this.actionObserver} key = {button} label = {button} function = {'navigation'}/>;
    });
    return buttons;
  }

  render(){
    return(
      <React.Fragment>
        {this.buttonConstructor()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Menu;
