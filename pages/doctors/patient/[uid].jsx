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
import Router, {useRouter} from "next/router";
import moment from "moment";
import Link from "@material-ui/core/Link";
import { firebaseService } from "../../../services/firebase-db-service";

import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import FaceIcon from "@material-ui/icons/Face";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAuth } from "../../../actions/auth";
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

const PateintHistory = ({}) => {
  const classes = useStyles();
  const [visits, setVisits] = useState([]);
  const [visitCount, setVisitCount] = useState();
  const [complaintState, setComplaintState] = useState({});
  const [color, setColor] = useState({});
  const [selectedComp, setSelectedComp] = useState("View All");
  const [patientComp, setPatientComp] = useState([]);
  const [patientName, setPatientName] = useState();
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
   
    let auth = isAuth(); 
    
   
    var fb = new firebaseService("Visits");
    fb.getPatientVisitsByUId(uid)
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
        setPatientName(list[0].data.patient);
       
      })
      .catch((err) => {
        console.log("error");
      });

    var fbComp = new firebaseService("Visits");

    fbComp
      .getPatientComplaints(uid)
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

  const handleTimeLineClick = (id) => {

    const win = window.open( 
      `/visits/view/${id}`, "_blank");
    
  }

  return (
    <div className="container">
      <h1 style={{ color: "#2362AD" }}>Patient History</h1>
      <div>
      <div class="row g-3">
            <div class="col-md-3">
            <Typography style={{color:"#2196f3",marginTop:"30px"}} variant="h3" gutterBottom>
                {patientName}
            </Typography>
      
            </div>
            <div class="col-md-9">            
            <Button variant="contained" style={{float:'right',marginTop:'50px'}} href={`/visits/add/${uid}`} size="large" color="primary">
               Add New Visit
            </Button>
       
            </div>
            {/* <div class="col-md-6"> */}
           {/* <Button variant="contained" href={`visits/add`} size="large" color="primary">
          Add Visit
        </Button> */}
            {/* </div> */}
       </div>
       </div>
       <hr></hr>
      <div className={classes.chip}>
      {patientComp.length > 0 &&
        <Chip label="View All" onClick={handleBtnClick} color="primary" />}
        {patientComp &&
          patientComp.map((value) => (
            <Chip key={value}  label={value} color="primary" onClick={handleBtnClick} />
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
                  
                  {/* <div style={{cursor:'pointer'}} onClick={handleTimeLineClick(value.id)}> */}
                  <Link style={{color:"white",textDecorationLine:"none",cursor:"pointer"}} target='_blank' href={`/visits/view/${value.id}`}>
                    <a class="tm-link" style={{cursor:"pointer"}}>
                  <Typography
                    gutterBottom
                    className="vertical-timeline-element-title"
                    variant="h5"
                    style={{color:'white'}}
                    component="h3"
                  >
                    Visited Dr. {value.data.doctor}
                  </Typography>
                  <Typography
                    className="vertical-timeline-element-subtitle"
                    style={{color:'white'}}
                    variant="h5"
                    component="h2"
                  >
                    Complaint: {value.data.complaint}
                  </Typography>

                  <Typography variant="h5" style={{color:'white'}} component="p">
                    Note: {value.data.note}
                  </Typography>

                  <Typography gutterBottom>
                    <Link target='_blank' href={`/visits/view/${value.id}`}>
                      <a style={{color:'white'}}>Go to visit</a>
                    </Link>
                  </Typography>
                  <Typography style={{color:'white'}} gutterBottom variant="subtitle2" component="h3">
                    {moment(value.data.visitTime).format("DD.MMM.yyyy hh:mm a")}
                  </Typography>
                  </a></Link>
                  {/* </div> */}
                  
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


export async function getServerSideProps ({ params }) {
 
  return { props: {}}
}

export default PateintHistory;
