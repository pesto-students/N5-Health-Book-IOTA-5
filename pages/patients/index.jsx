import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StarIcon from "@material-ui/icons/Star";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles } from "@material-ui/core/styles";
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
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import FaceIcon from "@material-ui/icons/Face";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAuth } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    flexGrow: 1,   
    backgroundColor: '#2196f3',
    color: 'white',
  },
  chip: {
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Patients = () => {
  const classes = useStyles();
  const [visits, setVisits] = useState([]);
  const [visitCount, setVisitCount] = useState();
  const [complaintState, setComplaintState] = useState({});
  const [color, setColor] = useState({});
  const [selectedComp, setSelectedComp] = useState("View All");
  const [patientComp, setPatientComp] = useState([]);
  const [patientName, setPatientName] = useState();

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
      })
      .catch((err) => {
        console.log("error");
      });

    var fbComp = new firebaseService("Visits");

    fbComp
      .getPatientComplaints(auth.uid)
      .then((res) => {
        setPatientComp(res);
        // let compState = {};
        // let compColor={};
        // for(let item in res){
        //   compState[res[item].id] = false;
        //   compColor[res[item].id] = "red";
        // }
        //  setComplaintState(compState);
        //  setColor(compColor);
      })
      .catch((err) => {
        console.log("error");
      });

    var fbUser = new firebaseService("Users");
    fbUser.getUserByUId(auth.uid).then((value)=>{
      debugger; 
      let name = value[0].data.name;
      name = name.split(" ")[0];
       setPatientName(name);
    }); 

  }, [selectedComp]);

  const handleBtnClick = async (e) => {
    complaintState[e.target.textContent] =
      !complaintState[e.target.textContent];
    setSelectedComp(e.target.textContent);
    // if(complaintState[e.target.textContent])
    // {

    //   // selectedComp.push(e.target.textContent);
    // }
    // else{
    // const i = selectedComp.indexOf(e.target.textContent);
    // if(i > -1){
    //   selectedComp.splice(i,1);
    // }
    // }
    // setSelectedComp(selectedComp);
    // let colorClass = complaintState[e.target.textContent] ? "red" : "green";
    // color[e.target.textContent] = colorClass;
    // setColor(color);
    setComplaintState(complaintState);
  };

  const handleClick = () => {
    Router.push("/visits");
  };

  return (
    <div className="container" style={{marginTop:"7rem"}}>
     {patientName && <h1 style={{ color: "black",fontWeight:"600",marginBottom:"2rem" }}>Welcome {patientName}</h1> }
      {/* <div class="row g-3">
            <div class="col-md-3">
            <h2>
                 Welcome {patientName}
            </h2>
            </div>          
      </div> */}
      <Card className={classes.root}>
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
      <hr></hr>
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
      <VerticalTimeline>
        {visits &&
          visits.map((value) => {
            return (
              <>
                <VerticalTimelineElement
                  key={value.id}
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  // date={value.data.visitTime}
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                  icon={<AssignmentIcon />}
                >
                  <Link style={{color:"white",textDecorationLine:"none",cursor:"pointer"}} target='_blank' href={`/visits/view/${value.id}`}>
                    <a class="tm-link" style={{cursor:"pointer"}}>
                  <Typography
                    gutterBottom
                    className="vertical-timeline-element-title"
                    variant="h5"
                    component="h3"
                    style={{color:'white'}}
                  >
                    Visited Dr. {value.data.doctor}
                  </Typography>
                  <Typography
                    className="vertical-timeline-element-subtitle"
                    variant="h5"
                    component="h2"
                    style={{color:'white'}}
                  >
                    Complaint: {value.data.complaint}
                  </Typography>

                  <Typography variant="h5" style={{color:'white'}} component="p">
                    Note: {value.data.note}
                  </Typography>

                  <Typography gutterBottom>
                    <Link href={`/visits/view/${value.id}`}>
                      <a style={{color:'white'}}>Go to visit</a>
                    </Link>
                  </Typography>
                  <Typography style={{color:'white'}} gutterBottom variant="subtitle2" component="h3">
                    {moment(value.data.visitTime).format("DD.MMM.yyyy hh:mm a")}
                  </Typography>
                   </a></Link>
                </VerticalTimelineElement>
              </>
            );
          })}

       
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
}
    </div>
  );
};

export default Patients;
