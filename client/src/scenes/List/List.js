import React, { useContext } from "react";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  Divider,
  Grid
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import ListsContext from "../../contexts/ListsContext";
import ToDo from "../../components/ToDo";

const List = ({ list }) => {
  console.log("init list - ", list);
  const { deleteLists } = useContext(ListsContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Grid container justify="space-between" alignItems="flex-start">
      <Grid xs={11}>
        <StyledCard square bordercolor={list.color}>
          <StyledCardHeader
            onClick={handleExpandClick}
            avatar={
              <StyledAvatar aria-label="recipe" bgcolor={list.color}>
                {list.title ? list.title.charAt(0) : "D"}
              </StyledAvatar>
            }
            action={
              <React.Fragment>
                <IconButton onClick={handleExpandClick} color="primary">
                  <StyledExpandMoreIcon expanded={expanded} />
                </IconButton>
              </React.Fragment>
            }
            title={list.title}
            subheader={list.updated_at}
          />

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider />

            {/* <CardContent> */}
            <ToDo todos={list.todos} lists_id={list.id} />
            {/* </CardContent> */}
          </Collapse>
          <Divider />
        </StyledCard>
      </Grid>

      <StyledDeleteHolder>
        <IconButton aria-label="show more" onClick={() => deleteLists(list.id)}>
          <StyledDeleteSweepIcon />
        </IconButton>
      </StyledDeleteHolder>
    </Grid>
  );
};

export default List;

const StyledCard = styled(Card)`
  width: 100%;
  border: 1px solid #dadce0;
  border-left: 3px solid ${props => props.bordercolor};
  border-radius: 0;
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

const StyledAvatar = styled(Avatar)`
  background-color: ${props => props.bgcolor};
  text-transform: uppercase;
`;

const StyledDeleteSweepIcon = styled(DeleteSweepIcon)`
  color: #ff5252;
`;

const StyledCardHeader = styled(CardHeader)`
  cursor: pointer;
`;

const StyledDeleteHolder = styled.div`
  padding: 15px;
`;
