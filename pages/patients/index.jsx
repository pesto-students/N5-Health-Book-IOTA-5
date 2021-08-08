import React, { useState ,useEffect} from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StarIcon from "@material-ui/icons/Star";
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import moment from "moment";
import Link from '@material-ui/core/Link';
import {firebaseService} from '../../services/firebase-db-service';

const useStyles = makeStyles({
  root: {
  width: 200,
  flexGrow: 1  
  },   
 
});

const Patients = () =>{
const classes = useStyles();
 
const [visits, setVisits] = useState([]);

useEffect(() => {

var fb = new firebaseService("Visits");
fb.getAll().then((res)=>{
  setVisits(res);

}).catch((err)=>{
  console.log("error");
})

  
}, []);



const handleClick = () =>{
  Router.push('/visits');
 }



  return (
    <div className="container">      
    <h1 style={{ color: '#2362AD' }}>Patient History</h1>
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>        
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            Visits
          </Typography>
          <Typography align="center" variant="h5" component="h2">
            20
          </Typography>  
         
        </CardContent>
      </CardActionArea>      
    </Card>
<hr></hr>
<VerticalTimeline>
  {visits && visits.map(value=>{
 return (
   <>
  <VerticalTimelineElement
  key={value.id}
  className="vertical-timeline-element--work"
  // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
  // date={value.data.visitTime}
  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  icon={<AssignmentIcon />}
>
<Typography gutterBottom className="vertical-timeline-element-title" variant="h5" component="h3">
Visited Dr. {value.data.doctor}
</Typography>
  <Typography className="vertical-timeline-element-subtitle" variant="h5" component="h2">
  Complaint: {value.data.complaint}
          </Typography>
  
  <Typography variant="h5" component="p">
  Note: {value.data.note}
  </Typography> 
  
  <Typography gutterBottom>
  <Link href="/visits/add"><a>Go to visit</a></Link>
  </Typography>
  <Typography  gutterBottom variant="subtitle2" component="h2">
    {moment(value.data.visitTime).format("DD.MMM.yyyy hh:mm a")}
  </Typography>

</VerticalTimelineElement>
  {/* <Typography variant="h5" component="h3">
 {value.data.visitTime}
  </Typography>*/}
  </> 
 )}
  
)}
  
  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2010 - 2011"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<AssignmentIcon />}
  >
    <h3 className="vertical-timeline-element-title">Art Director</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2008 - 2010"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<AssignmentIcon />}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2006 - 2008"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<AssignmentIcon />}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="April 2013"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    icon={<AssignmentIcon />}
  >
    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
    <p>
      Strategy, Social Media
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="November 2012"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    icon={<AssignmentIcon />}
  >
    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
    <p>
      Creative Direction, User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2002 - 2006"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    icon={<AssignmentIcon />}
  >
    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
    <p>
      Creative Direction, Visual Design
    </p>
  </VerticalTimelineElement> */}
  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    icon={<StarIcon />}
  />
</VerticalTimeline>
    </div>
   
   ); }

Patients.layout = "auth";

export default Patients;

    
  

