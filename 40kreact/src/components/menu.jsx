import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ButtonUI from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
        'Login'
      ],

    }
    this.actionObserver = props.observer;
    this.handleArmyClick = this.handleArmyClick.bind(this);
    this.handleCampaignClick = this.handleCampaignClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentDidMount(){
    this.actionObserver.subscribe(this);
  }

  handleArmyClick(e){
    this.actionObserver.notify({
      action: 'navigation',
      id: 'Army builder',
      tag: this.props.id
    });
  }

  handleCampaignClick(e){
    this.actionObserver.notify({
      action: 'navigation',
      id: 'Campaign manager',
      tag: this.props.id
    });
  }

  handleLoginClick(){
    this.actionObserver.notify({
      action: 'navigation',
      id: 'Login',
      tag: this.props.id
    });
  }

  render(){
    return(
      <React.Fragment>
        
        <AppBar position="static" style={{backgroundColor:"#b71c1c"}}>
          <Toolbar>
            <ButtonUI color="inherit" style={{marginLeft: 1800}} onClick={() => {
              this.actionObserver.notify({
                action: 'navigation',
                id: 'Login',
                tag: this.props.id
              })}}>
            Login</ButtonUI>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0} direction="row"
          alignContent="center" 
          justify="center">
          <Grid item xs={3} style={{marginTop: 200}}>
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
          </Grid>
          <Grid item xs={2} style={{marginTop: 200}}>
            <Card style={{width:325}}>
              <CardActionArea onClick={this.handleCampaignClick}>
                  <CardMedia
                  image={require("../images/lowpolyfort.jpg")}
                  style={{height:305}}
                  />
                  <CardContent style={{marginLeft: 'auto'}}>
                    <Typography gutterBottom variant="h4" component="h2"align='center'>
                      Campaign
                    </Typography>
                  </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  componentWillUnmount(){
    this.actionObserver.unsubscribe(this);
  }

}

export default Menu;
