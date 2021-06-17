import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import cardstwo from '../../assets/img/poker-cards.png'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
      },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <AppBar position="static" style={{backgroundColor:"rgb(40,40,40)"}}>
    <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        <img height="40px" src={cardstwo}></img>
        <p style={{display:'inline',marginLeft:'10px'}}>PokerHUD</p>
        </Typography>
        <Toolbar>
            <Button color="inherit"></Button>
            <Button color="inherit"></Button>
        </Toolbar>
        
    </Toolbar>
    </AppBar>
  );
}