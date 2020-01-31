import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import ListsContext from "../../contexts/ListsContext";
import ToDo from "../../components/ToDo";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const List = ({ list }) => {
  console.log("init list - ", list);
  const classes = useStyles();
  const { deleteLists } = useContext(ListsContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <React.Fragment>
            <IconButton
              aria-label="show more"
              onClick={() => deleteLists(list)}
            >
              <DeleteSweepIcon />
            </IconButton>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </React.Fragment>
        }
        title={list.title}
        subheader={list.updated_at}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ToDo todos={list.todos} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default List;
