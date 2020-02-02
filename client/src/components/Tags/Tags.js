import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, List } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import Tag from "../../scenes/Tag";

const Tags = ({ todos_id, isEditingTodo }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // getAllTagsAssociatedWithToDo();
  }, [todos_id]);

  useEffect(() => {}, [isEditingTodo]);

  // const getAllTagsAssociatedWithToDo = async () => {
  //   console.log("fetching tags");

  //   try {
  //     const response = await api.get(`/todos/${todos_id}/tags`);
  //     console.log(response);

  //     if (response.status === 200) {
  //       setTags(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //     // toast.error("Unable to update. Try again!");
  //   }
  // };

  const handleAddTags = tag => {
    console.log(tag);
    // try {
    // const response = await api.post(`lists`, mappedData);

    // if (response.status === 200) {
    // if (response.data && response.data.data.length) {
    // console.log("list", response.data);

    setTags(prevState => prevState.concat(tag));

    // toast.success("New task created.");
    // }
    // }
    // } catch (error) {
    //   console.log({ error });
    //   toast.error(error.message);

    //   if (error.data) {
    //     error.data.forEach(err => {
    //       // toast.error(err[0]);
    //     });
    //   }
    // } finally {
    //   // - Disable loader
    //   console.log("disabled");
    // }
  };

  const handleDeleteTags = tag => {
    setTags(prevState => prevState.filter(state => state !== tag));
  };

  return (
    <React.Fragment>
      <Grid container>
        <StyledList>
          {(() => {
            if (isEditingTodo) {
              return (
                <ChipInput
                  value={tags}
                  fullWidth
                  placeholder="Assign Tags"
                  onAdd={tag => handleAddTags(tag)}
                  onDelete={(tag, index) => handleDeleteTags(tag, index)}
                />
              );
            }

            if (tags && tags.length) {
              return tags.map((tag, index) => {
                return <Tag key={index} tag={tag} />;
              });
            }

            return;
          })()}
        </StyledList>
      </Grid>
    </React.Fragment>
  );
};
export default Tags;

const StyledList = styled(List)`
  width: 100%;
`;
