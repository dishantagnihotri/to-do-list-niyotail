import React, { useContext } from "react";
import TagsContext from "../../contexts/TagsContext";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AddNewTags = () => {
  const { addNewTags } = useContext(TagsContext);

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h5" gutterBottom>
          Tags
        </Typography>
      </Grid>
    </React.Fragment>
  );
};
export default AddNewTags;
