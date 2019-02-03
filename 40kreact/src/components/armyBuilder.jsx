import React from 'react';
import Button from './button';
import Detachment from './detachment';
import axios from 'axios';

class ArmyBuilder extends React.Component {
  constructor(props,context){
    super(props,context);
    this.props = props;
    this.state = {
      detachments: [],
      detachments2: []
    }
    this.actionObserver = props.observer;

    this.getDetachs();
    console.log(this.state.detachments2);

  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  actionCallback(observerObject) {
    if (observerObject.action === 'newDetachment') {
      console.log(`Recieved from button: ${observerObject.id}`);
      this.addNewDetachment();
    }
  }

  getDetachs(){
    let detachArr = this.state.detachments;
    axios
      .get('http://localhost:3000/armybuilder')
      .then((res) => {
        res.data.data.map((detachs) => {
          
          detachArr.push(detachs);
          this.setState({detachments: detachArr});
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  addNewDetachment(){
    let detachments = this.state.detachments;
    if (detachments.length < 10){
      let data = {
        name: 'Name',
        type: 'Unbound',
        id: detachments.length
      }
      detachments.push({
        data
      })
      
      this.setState({
        detachments: detachments
      });
    
      axios
        .post(
          "http://localhost:3000/armybuilder/",
          {name: 'Test',
          type: 'Unbound'}
        )
        .then(r => console.log(r.status))
        .catch(e => console.log(e));

    }
  }

  renderDetachments(){
    let detachments = this.state.detachments.map(({id}) => {
      return <Detachment observer = {this.actionObserver} key = {id} id ={id}/>;
    });
    return detachments;
  }

  render(){
    return(
      <React.Fragment>
        <Button observer = {this.actionObserver} key = {'menu'} label = {'menu'} function = {'navigation'}/>
        <Button observer = {this.actionObserver} key = {'New detachment'} label = {'New detachment'} function = {'newDetachment'}/>
        {this.renderDetachments()}
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default ArmyBuilder;