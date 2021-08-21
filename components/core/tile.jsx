import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Tile = (props) =>{
    return<Card className={props.class}>
    <CardActionArea onClick={props.handleClick}>
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography align="center" variant="h5" component="h2">
          {props.count}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

export default Tile;