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
import Row from './Row'





function createData(name, calories, fat, carbs, protein,winFold,playerHistory) {
  //console.log(playerHistory.history)
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    winFold,
    history: playerHistory.history,
  };
}

export default function CollapsibleTable(props) {
  var rows = []
  
  for(var i = 0;i<props.data.length;i++){
    //console.log(props.history[i].history)
    var row = createData(props.data[i].player,props.data[i].chips,props.data[i].rounds,props.data[i].seeFlop, props.data[i].preflopraise, props.data[i].winFold,props.history[i])
    rows.push(row)
  }
  //const rows = [
  //  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  //  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  //  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  //  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  //  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  //];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Player</TableCell>
            <TableCell align="right">Chips</TableCell>
            <TableCell align="right">Hands</TableCell>
            <TableCell align="right">See Flop %</TableCell>
            <TableCell align="right">Raise Flop %</TableCell>
            <TableCell align="right">Win by Fold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}