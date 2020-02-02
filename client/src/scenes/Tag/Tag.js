import React from "react";
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
    <ListItem role={undefined} dense button onClick={handleToggle(tag)}>
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

export default Tag;
