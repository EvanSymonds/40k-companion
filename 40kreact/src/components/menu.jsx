import React from 'react';
import Button from './button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ButtonUI from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

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
    this.handleArmyClick = this.handleArmyClick.bind(this);
    this.handleCampaignClick = this.handleCampaignClick.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  buttonConstructor(){
    let buttons = this.menuLibrary[this.props.content].map((button) => {
      return <Button observer = {this.actionObserver} key = {button} label = {button} function = {'navigation'}/>;
    });
    return buttons;
  }

  handleArmyClick(e){
    this.actionObserver.notify({
      action: 'navigation',
      id: 'Army builder',
      tag: this.props.id
    })
  }

  handleCampaignClick(e){
    this.actionObserver.notify({
      action: 'navigation',
      id: 'Campaign manager',
      tag: this.props.id
    })
  }

  render(){
    return(
      <React.Fragment>
        
        <AppBar position="static" style={{backgroundColor:"#b71c1c"}}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
            </IconButton>
            <ButtonUI color="inherit" style={{marginLeft: 1800}}>Login</ButtonUI>
          </Toolbar>
        </AppBar>
        {this.buttonConstructor()}
        <Card style={{width:325}}>
          <CardActionArea onClick={this.handleArmyClick}>
              <CardMedia
              image={require("../images/lowpolysword.jpg")}
              style={{height:305}}
              />
              <CardContent style={{marginLeft: 'auto'}}>
                <Typography gutterBottom variant="h4" component="h2"align='center'>
                  Army Builder
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
        <Card style={{width:325}}>
          <CardActionArea onClick={this.handleCampaignClick}>
              <CardMedia
              image={require("../images/lowpolyfort.jpg")}
              style={{height:305}}
              />
              <CardContent style={{marginLeft: 'auto'}}>
                <Typography gutterBottom variant="h4" component="h2"align='center'>
                  Campaign Manager
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Menu;
