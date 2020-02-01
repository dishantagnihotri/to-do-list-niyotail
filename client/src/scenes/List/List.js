import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

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
import Divider from "@material-ui/core/Divider";

const List = ({ list }) => {
  console.log("init list - ", list);
  const { deleteLists } = useContext(ListsContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard square borderColor={list.color}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <React.Fragment>
            <IconButton
              aria-label="show more"
              onClick={() => deleteLists(list)}
            >
              <DeleteSweepIcon />
            </IconButton>

            <IconButton onClick={handleExpandClick}>
              <StyledExpandMoreIcon expanded={expanded} />
            </IconButton>
          </React.Fragment>
        }
        title={list.title}
        subheader={list.updated_at}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />

        <CardContent>
          <ToDo todos={list.todos} />
        </CardContent>
      </Collapse>
      <Divider />
    </StyledCard>
  );
};
export default List;

const StyledCard = styled(Card)`
  width: 100%;
  border: 0;
  border-left: 3px solid ${props => props.borderColor};
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  ${props => {
    if (props.expanded) {
      return `
        transform: rotate(180deg);
      `;
    } else {
      return `
        tranform: rotate(0deg);
      `;
    }
  }};
`;
