import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clubs from '../assets/img/clubs.png'
import spades from '../assets/img/spades.png'
import diamond from '../assets/img/diamond.png'
import heart from '../assets/img/heart.png'
import { SnackbarContent } from '@material-ui/core';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const createHand = (hand) =>{
  if(hand && hand.length>0){
    var number1 = hand[0]
    var number2 = hand[3]
    hand.split("")
    if (hand[0]=="T"){
      number1 = "10"
    }
    if (hand[3]=="T"){
      number2 = "10"
    }
    if (hand[1]=="s"){
      var icon1 = spades
    }
    if (hand[1]=="d"){
      var icon1 = diamond
    }
    if (hand[1]=="h"){
      var icon1 = heart
    }
    if (hand[1]=="c"){
      var icon1 = clubs
    }
    if (hand[4]=="s"){
      var icon2 = spades
    }
    if (hand[4]=="d"){
      var icon2 = diamond
    }
    if (hand[4]=="h"){
      var icon2 = heart
    }
    if (hand[4]=="c"){
      var icon2 = clubs
    }
    return [number1,icon1,number2,icon2]
  }
  else{
    return ["","","",""]
  }
}
const createSymbol = (symbol) =>{
  if (symbol == "s"){
    return spades
  }
  if (symbol == "c"){
    return clubs
  }
  if (symbol == "h"){
    return heart
  }
  if (symbol == "d"){
    return diamond
  }
}
const createAction = (action) =>{
  if(action == "win2"){
    return "Heads up Win"
  }
  if(action == "win1"){
    return "Win by Fold"
  }
  return action
}
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment >
      <TableRow className={classes.root} style={{backgroundColor:'rgb(70,70,70)',color:'rgb(255,255,255)'}}>
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{color:'rgb(255,255,255)'}}>
          {row.name}
        </TableCell>
        <TableCell align="right" style={{color:'rgb(255,255,255)'}}>{row.calories}</TableCell>
        <TableCell align="right" style={{color:'rgb(255,255,255)'}}>{row.fat}</TableCell>
        <TableCell align="right" style={{color:'rgb(255,215,80)'}}>{row.carbs}</TableCell>
        <TableCell align="right" style={{color:'rgb(255,115,80)'}}>{row.protein}</TableCell>
        <TableCell align="right" style={{color:'rgb(115,215,180)'}}>{row.winFold}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Chips</TableCell>
                    <TableCell>Hand</TableCell>
                    <TableCell>Table</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.slice(0).reverse().map((historyRow) => (
                    <TableRow key={historyRow.hand}>
                      <TableCell component="th" scope="row">
                        {historyRow.hand}
                      </TableCell>
                      <TableCell>{historyRow.chips}</TableCell>
                      <TableCell component="th" scope="row">
                        {createHand(historyRow.cards)[0]}<img height="10px" src={createHand(historyRow.cards)[1]}></img>{createHand(historyRow.cards)[2]}<img height="10px" src={createHand(historyRow.cards)[3]}></img>{historyRow.type? historyRow.type :" "}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.table ? historyRow.table.split(" ").map((element)=>(
                          <>
                            {element[0] =="T"?"10":element[0]}<img height="10px"src={createSymbol(element[1])}></img>
                          </>
                          
                        )):""}
                      </TableCell>
                      <TableCell align="right">{createAction(historyRow.action)}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


export default Row;