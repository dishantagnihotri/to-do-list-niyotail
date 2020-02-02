import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Checkbox
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";

const Tag = ({ tag }) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    setChecked(!checked);
    // toggle on result too.
  };

  return (
    <ListItem dense button onClick={() => handleToggle(tag)}>
      <ListItemIcon>
        <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
      </ListItemIcon>

      <ListItemText primary={tag} />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          <CommentIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired
};

export default Tag;
