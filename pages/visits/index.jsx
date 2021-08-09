import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import { isAuth} from '../../actions/auth';
import {firebaseService} from '../../services/firebase-db-service';
import moment from 'moment';
import Router from 'next/router';
import Link from 'next/link';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


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
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function createDataN(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price
  };
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // const handleClick = (id) =>{
  //   Router.push(`visits/${id}`);
  // }
  return (
   
    <>
      <StyledTableRow>
       
        <StyledTableCell>
        {row.reports &&
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>  }
        </StyledTableCell>
       
        <StyledTableCell component="th" scope="row">
          {row.visitNo}
        </StyledTableCell>
        <StyledTableCell align="right">{row.data.doctor}</StyledTableCell>
        <StyledTableCell align="right">{row.data.complaint}</StyledTableCell>
        <StyledTableCell align="right">{moment(row.data.visitTime).format("DD/MM/yyyy hh:mm a")}</StyledTableCell>
        <StyledTableCell align="right"><Link href={`/visits/view/${row.id}`} className="btn btn-primary"><a>View</a></Link></StyledTableCell>
      </StyledTableRow>
      {/* <TableRow>
      {row.history &&
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history && row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
}
      </TableRow> */}
      </>
  
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createDataN('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createDataN('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  // const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [visits, setVisits] = useState([]);



  useEffect(() => {
    let auth = isAuth();
    var fb = new firebaseService("Visits");
    fb.getPatientVisitsByUId(auth.uid).then((visits)=>{ 
       
     setVisits(visits);
    
    }).catch((err)=>{
      console.log("error");
    });
    
    }, []);

  return (
    <div className="container">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Visit#</StyledTableCell>
            <StyledTableCell align="right">Patient</StyledTableCell>
            <StyledTableCell align="right">Complaint</StyledTableCell>
            <StyledTableCell align="right">Visit Time</StyledTableCell>
            <StyledTableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}