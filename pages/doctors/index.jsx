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

const Doctor = () => {
  const classes = useStyles();
  const [visits, setVisits] = useState([]);
  const [visitCount, setVisitCount] = useState();
  const [complaintState, setComplaintState] = useState({});
  const [color, setColor] = useState({});
  const [selectedComp, setSelectedComp] = useState("View All");
  const [patientComp, setPatientComp] = useState([]);

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

  return (
    <div className="container">
      
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
        <Chip label="View All" onClick={handleBtnClick} color="primary" />
        {patientComp &&
          patientComp.map((value) => (
            <Chip key={value}  label={value} color="primary" onClick={handleBtnClick} />
          ))}
      </div>

      <VerticalTimeline>
        {visits &&
          visits.map((value) => {
            return (
              <>
                <VerticalTimelineElement
                  key={value.id}
                  className="vertical-timeline-element--work"
                  // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  // date={value.data.visitTime}
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                  icon={<AssignmentIcon />}
                >
                  <Typography
                    gutterBottom
                    className="vertical-timeline-element-title"
                    variant="h5"
                    component="h3"
                  >
                    Visited Dr. {value.data.doctor}
                  </Typography>
                  <Typography
                    className="vertical-timeline-element-subtitle"
                    variant="h5"
                    component="h2"
                  >
                    Complaint: {value.data.complaint}
                  </Typography>

                  <Typography variant="h5" component="p">
                    Note: {value.data.note}
                  </Typography>

                  <Typography gutterBottom>
                    <Link href={`/visits/view/${value.id}`}>
                      <a>Go to visit</a>
                    </Link>
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    {moment(value.data.visitTime).format("DD.MMM.yyyy hh:mm a")}
                  </Typography>
                </VerticalTimelineElement>
                {/* <Typography variant="h5" component="h3">
 {value.data.visitTime}
  </Typography>*/}
              </>
            );
          })}

       
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </div>
  );
};

export default Doctor;
