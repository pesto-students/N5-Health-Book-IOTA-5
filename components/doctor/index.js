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
    const [visitCount, setVisitCount] = useState(0);
    const [search, setSearch] = useState();
    const [servedPatient, setServedPatient] = useState();
    const [selectedComp, setSelectedComp] = useState("View All");
    useEffect(() => {
      
      let auth = isAuth();
      GetVisitsByDoctorUId(auth.uid).then((visits)=>{
        
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
    })

}
const handleClick = () => {
    Router.push("/visits");
  };



    // function createData(name, calories, fat, carbs, protein) {
    //     return { name, calories, fat, carbs, protein };
    //   }
      
    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];
  
return(
<Layout title={`Dashboard`}>
    <div style={{marginTop:'50px',padding:'50px'}}>
    <div class="row g-3">
    <div class="col-md-2">
    <Card className={classes.card}>
    
    <CardActionArea onClick={handleClick}>
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="h2">
          Patient Served
        </Typography>
        <Typography align="center" variant="h5" component="h2">
          {visitCount}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
    </div>
    <div class="col-md-2">
    <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="h2">
              Visits
            </Typography>
            <Typography align="center" variant="h5" component="h2">
              {visitCount}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
    </div>
    

      
      <hr></hr>
    <div class="row g-3">
         <div class="col-md-6">
         <Paper component="form" onSubmit={e => { e.preventDefault();searchPatient();  }} className={classes.root}>
      
      <InputBase
        className={classes.input}
        onChange={(e)=>setSearch(e.target.value)}
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
              <StyledTableCell align="right"><Button variant="contained" href={`doctors/patient/${row.data.patientUid}`} color="primary">View</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
        </div>
    </div>
</Layout>
);
}

export default Doctor;

