import React, { useState, useEffect } from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
  } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import StarIcon from "@material-ui/icons/Star";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Link from "@material-ui/core/Link";

const Timeline = (props)=>{


    return <VerticalTimeline>
    {props.visits &&
      props.visits.map((value) => {
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

export default Timeline;