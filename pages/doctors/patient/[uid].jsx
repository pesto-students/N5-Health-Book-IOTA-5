import React, { useState, useEffect } from "react";
import "react-vertical-timeline-component/style.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Router, {useRouter} from "next/router";
import { firebaseService } from "../../../services/firebase-db-service";
import Chip from "@material-ui/core/Chip";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAuth } from "../../../actions/auth";
import Timeline from "../../../components/core/timeline";
import { ErrorBoundary } from "@sentry/react";

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
        
      })
      .catch((err) => {
        console.log("error");
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
        <ErrorBoundary>
          <Timeline visits={visits} />
        </ErrorBoundary>
      }
    </div>
  );
};


export async function getServerSideProps ({ params }) {
 
  return { props: {}}
}

export default PateintHistory;
