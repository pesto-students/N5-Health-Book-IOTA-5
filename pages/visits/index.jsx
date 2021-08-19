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
import Button from '@material-ui/core/Button';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    fontWeight: 700
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
        {row.data.documents &&
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>  }
        </StyledTableCell>
       
        <StyledTableCell component="th" scope="row">
          {row.data.visitNo}
        </StyledTableCell>
        <StyledTableCell align="right">{row.data.doctor}</StyledTableCell>
        <StyledTableCell align="right">{row.data.complaint}</StyledTableCell>
        <StyledTableCell align="right">{moment(row.data.visitTime).format("DD/MM/yyyy hh:mm a")}</StyledTableCell>
        <StyledTableCell align="right"><Button variant="contained" color="primary" href={`/visits/view/${row.id}`}>View</Button></StyledTableCell>
      </StyledTableRow>
      <TableRow>
      {row.data.documents &&
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Documents
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Report</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">File</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.data.documents && row.data.documents.map((doc) => (
                    <StyledTableRow key={doc.report}>
                      <TableCell component="th" scope="row">
                        {doc.report}
                      </TableCell>
                      <TableCell>{moment(doc.date).format("DD-MM-yyyy")}</TableCell>
                      {/* <TableCell align="right"><a href={'/api/v1/print/example.pdf'} target='_blank' rel='noopener noreferrer' /></TableCell> */}
                      <TableCell align="right"><Button variant="contained" color="primary" target='_blank' href={`${doc.file}`}>Download</Button></TableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
}
      </TableRow>
      </>
  
  );
}


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
    <div className="container" style={{marginTop:"7rem"}}>
     <h1 style={{ color: '#2362AD' }}>Visits</h1>
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