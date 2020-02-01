import React, { useState } from "react";
import styled from "styled-components";

import TagsContext from "../../contexts/TagsContext";
import AddNewTags from "../AddNewTags";
import Tag from "../../scenes/Tag";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

const Tags = props => {
  const [tags, setTags] = useState([1, 2, 3, 4, 5]);

  const addNewTags = () => {};

  return (
    <TagsContext.Provider
      value={{
        tags,
        addNewTags: addNewTags
      }}
    >
      <TagsContext.Consumer>
        {state => (
          <React.Fragment>
            <Grid container xs={12}>
              <Typography variant="h5" gutterBottom>
                Tags
              </Typography>
            </Grid>
            <Grid container>
              <StyledList>
                {(() => {
                  if (tags && tags.length) {
                    return tags.map((tag, index) => {
                      return <Tag key={index} tag={tag} context={state} />;
                    });
                  }

                  return "No tags.";
                })()}
              </StyledList>
            </Grid>
            {/* <AddNewTags context={state} /> */}
          </React.Fragment>
        )}
      </TagsContext.Consumer>
    </TagsContext.Provider>
  );
};
export default Tags;

const StyledList = styled(List)`
  width: 100%;
`;
