import React, { useState } from 'react';

// Material ui
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ToolTip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogAction from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

// Icon
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const useStyles = makeStyles({
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});
const DeleteScream = props => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteScream = () => {
    props.deleteScream(props.screamsId);
    setOpen(false);
  };

  return (
    <>
      <ToolTip title="Delete Scream" placement="top">
        <IconButton onClick={handleOpen} className={classes.deleteButton}>
          <DeleteOutline color="secondary" />
        </IconButton>
      </ToolTip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream</DialogTitle>
        <DialogAction>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogAction>
      </Dialog>
    </>
  );
};

export default connect(
  null,
  { deleteScream }
)(DeleteScream);
