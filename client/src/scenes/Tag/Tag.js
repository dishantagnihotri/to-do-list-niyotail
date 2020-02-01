import React, { useContext } from "react";
import TagsContext from "../../contexts/TagsContext";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
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
