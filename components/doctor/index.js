import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StarIcon from "@material-ui/icons/Star";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import moment from "moment";
import Link from "@material-ui/core/Link";
import { firebaseService } from "../../services/firebase-db-service";

import "bootstrap/dist/css/bootstrap.min.css";
import { isAuth } from "../../actions/auth";
import Layout from '../container/doctor';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {GetPatientsByMobile} from '../../services/patient-service';
import { GetVisitsByDoctorUId } from "../../services/visit-service";
import Tile from '../../components/core/tile';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      color: '#2196f3'
    },
    divider: {
      height: 28,
      margin: 4,
    },
    card: {
        width: 200,
        flexGrow: 1,   
        backgroundColor: '#2196f3',
        color: 'white',
      },
  }));

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
  

const Doctor = () =>{ 
    const classes = useStyles();
    const [visits, setVisits] = useState([]);
    const [visitCount, setVisitCount] = useState();
    const [search, setSearch] = useState();
    const [servedPatient, setServedPatient] = useState();
    const [selectedComp, setSelectedComp] = useState("View All");
    const [docName, setDocName]= useState();
    useEffect(() => {
      
      let auth = isAuth();
     
      GetVisitsByDoctorUId(auth.uid).then((visits)=>{
    
        let dName = visits[0].data.doctor;
        dName = dName.split(" ")[0];
        setDocName(dName);
        setVisitCount(visits.length);
        var patient = visits.map((value)=>{
         return value.data.patientUid;          
        })
        
        let uniqueUid = [...new Set(patient)];
        setServedPatient(uniqueUid.length);
      });



    },[]);
const searchPatient = () => {
    setVisits([]);
    if(search){
    GetPatientsByMobile(search).then((data)=>{
      
        var fbVisit = new firebaseService("Visits");
        let container = [];
        data.map((val)=>{
       
                fbVisit.getPatientVisitsByUId(val.uid).then((values)=>{
                    
                    var visitsData = values.length > 1 ? values[values.length - 1] : values[0];
                    container.push(visitsData);
                    setVisits(container);                    
                });
        
       });
    });
  }

}
const handleClick = () => {
  const win = window.open( 
    `/doctors/visits`, "_blank");
    // Router.push("/doctors/visits");
  };

  function createData(visit, doc, complaint, med, note) {
    return { visit, doc, complaint, med, note };
  }
  
  const rows = [
    createData('05-07-2021 9:00 am', 'Dr Prachi Shah', 'Cough', 'TasQ DX, CTZ', 'Avoid junk food'),
    createData('12-07-2021 2:00 pm', 'Dr Jigish Desai', 'Fever', 'Nimovin plus, Levoctin', 'Take rest and complete medications on time'),
    createData('25-07-2021 10:00 am', 'Dr Nitin Apa', 'Maleria', 'Malorone, Primaquine', 'Eat more fruits and take rest.'),
    createData('02-08-2021 6:00 pm', 'Dr Arpita Patel', 'Maleria', 'Malorone, Krintafel', 'Eat more fruits and take rest.'),
    createData('11-08-2021 5:00 pm', 'Dr Prachi Shah', 'Cough', 'Kough cyrup, Cetrezin', 'Avoid oily food'),
  ];

return(
  <div>
    <div style={{marginTop:'50px',padding:'50px'}}>
    
      <div class="row g-3">
            <div class="col-md-3">
            <h2 style={{fontWeight:"600"}}>
                 Welcome Dr. {docName}
            </h2>
            </div>          
      </div>
      <div class="row g-3">
         <div class="col-md-6" style={{marginLeft:"35%"}}>
         <p className="mb-2" style={{fontWeight:"bold"}}>For Final Demo Purpose Only</p>
         <p style={{color:'grey',fontSize:'12px',fontWeight:'bold'}}>Add Mobile No: 6565656565</p><p>
        <button name="doctor" className="btn btn-primary" style={{fontSize:"12px"}} onClick={()=> setSearch('6565656565')}>Click Here To Fill Mobile</button></p>
         <Paper component="form" onSubmit={e => { e.preventDefault();searchPatient();  }} className={classes.root}>
      
      <InputBase
        className={classes.input}
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
        placeholder="Search Patient"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={searchPatient} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      
    </Paper>
            </div>
        </div>
        <div style={{marginTop:'50px'}}>
        {visits && visits.length > 0 &&
        <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient</StyledTableCell>
            <StyledTableCell align="right">Complaint</StyledTableCell>
            <StyledTableCell align="right">Last Visited</StyledTableCell> 
            <StyledTableCell align="right"></StyledTableCell> 

          </TableRow>
        </TableHead>
        <TableBody>
          {visits && visits.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.data.patient}
              </StyledTableCell>
              <StyledTableCell align="right">{row.data.complaint}</StyledTableCell>
              <StyledTableCell align="right">{moment(row.data.visitTime).format("DD-MM-yyyy hh:mm a")}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" target='_blank' href={`doctors/patient/${row.data.patientUid}`} color="primary">View</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
        </div>
    <div class="row g-3 mt-4">
    <div class="col-md-2">
    <Tile class={classes.card} handleClick={handleClick} title="Patient Served" count={servedPatient} />    
    </div>
    <div class="col-md-2">
    <Tile class={classes.card} handleClick={handleClick} title="Visits" count={visitCount} />    
    </div>
    <div class="col-md-8">            
            <Button variant="contained" style={{float:'right',marginTop:'50px'}} href={`/visits/add/new`} size="large" color="primary">
               Add New Visit
            </Button>       
            </div>
    </div>  
      <hr></hr>
      <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Visit Date</StyledTableCell>
            <StyledTableCell align="right">Doctor</StyledTableCell>
            <StyledTableCell align="right">Complaint</StyledTableCell>
            <StyledTableCell align="right">Medications</StyledTableCell>
            <StyledTableCell align="right">Note</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.visit}
              </StyledTableCell>
              <StyledTableCell align="right">{row.doc}</StyledTableCell>
              <StyledTableCell align="right">{row.complaint}</StyledTableCell>
              <StyledTableCell align="right">{row.med}</StyledTableCell>
              <StyledTableCell align="right">{row.note}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    
    </div>
    </div>

);
}

export default Doctor;

