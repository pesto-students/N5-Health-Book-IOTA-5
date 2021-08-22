import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StarIcon from "@material-ui/icons/Star";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import moment from "moment";
import Link from "@material-ui/core/Link";
import { firebaseService } from "../../services/firebase-db-service";
import Chip from "@material-ui/core/Chip";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAuth } from "../../actions/auth";
import Tile from '../../components/core/tile';
import Timeline from '../../components/core/timeline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    flexGrow: 1,   
    backgroundColor: '#2196f3',
    color: 'white',
  },
  chip: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Patients = () => {
  const classes = useStyles();
  const [visits, setVisits] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const [complaintState, setComplaintState] = useState({});
  const [color, setColor] = useState({});
  const [selectedComp, setSelectedComp] = useState("View All");
  const [patientComp, setPatientComp] = useState([]);
  const [patientName, setPatientName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let auth = isAuth();
    var fb = new firebaseService("Visits");
    fb.getPatientVisitsByUId(auth.uid)
      .then((visits) => {
        let list = [];
        if (selectedComp != "View All") {
          list = visits
            .filter((a) => selectedComp == a.data.complaint)
            .map((visit) => {
              return visit;
            });
        } else {
          list = visits;
          setVisitCount(list.length);
        }
        setVisits(list);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error");
      });

    var fbComp = new firebaseService("Visits");

    fbComp
      .getPatientComplaints(auth.uid)
      .then((res) => {
        setPatientComp(res);
      
      })
      .catch((err) => {
        console.log("error");
      });

    var fbUser = new firebaseService("Users");
    fbUser.getUserByUId(auth.uid).then((value)=>{
     
      if(value.length > 0){
      let name = value[0].data.name;
      name = name.split(" ")[0];
       setPatientName(name);
      }
    }); 

  }, [selectedComp]);

  const handleBtnClick = async (e) => {
    complaintState[e.target.textContent] =
      !complaintState[e.target.textContent];
    setSelectedComp(e.target.textContent);
    
    setComplaintState(complaintState);
  };

  const handleClick = () => {
    Router.push("/visits");
  };

  return (
    <div className="container" style={{marginTop:"7rem"}}>
     {patientName && <h1 style={{ color: "black",fontWeight:"600",marginBottom:"2rem" }}>Welcome {patientName}</h1> }
     
      <Tile class={classes.root} handleClick={handleClick} title="Visits" count={visitCount} />    
      
      <hr></hr>
      {loading && <h3>Loading...</h3>}
      {visits.length == 0 && !loading &&
      <h3>History isn't vailbale.</h3>
      }
      <div className={classes.chip}>
      {patientComp.length > 0 && 
        <Chip label="View All" onClick={handleBtnClick} color="primary" />
      }
        {patientComp &&
          patientComp.map((value) => (
            <Chip key={value} size="medium" label={value} color="primary" onClick={handleBtnClick} />
          ))}
      </div>
      {visits && visits.length > 0 &&

      <Timeline visits={visits} />
}
    </div>
  );
};

export default Patients;
