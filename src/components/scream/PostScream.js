import React, { useState, useEffect } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icon
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect, useSelector } from 'react-redux';
import { postScream } from '../../redux/actions/dataActions';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto'
  },
  submitButton: {
    position: 'relative',
    margin: '1rem 0',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeBtn: {
    position: 'absolute',
    left: '91%',
    top: '9%'
  }
});

const PostScream = props => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [error, setError] = useState({ err: '' });
  const err = useSelector(state => state.UI.errors);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (err) {
      setError({ error: err.error });
    } else {
      handleClose();
    }
  }, [err]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = e => {
    if (e.target.name === 'body') {
      setBody(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.postScream({ body });

    setBody('');
    setError({});
  };

  const {
    UI: { loading }
  } = props;

  return (
    <>
      <ToolTip title="Post a Scream" placement="top">
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </ToolTip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <ToolTip title="Close" placement="top">
          <IconButton onClick={handleClose} className={classes.closeBtn}>
            <CloseIcon />
          </IconButton>
        </ToolTip>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              value={body}
              row="3"
              placeholder="Enter Scream"
              error={error.error ? true : false}
              helperText={error.error}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
              multiline
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Add Scream
              {loading ? (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              ) : null}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postScream }
)(PostScream);
