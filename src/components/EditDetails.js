import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui stuff
import themeFile from '../util/theme';
import { makeStyles } from '@material-ui/core/styles';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

// Icon
import EditIcon from '@material-ui/icons/Edit';

// redux import
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userAction';

const useStyles = makeStyles(themeFile);

const EditDetails = props => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const { bio, website, location } = props.credentials;
    console.log(bio, website, location);
    setBio(bio || '');
    setWebsite(website || '');
    setLocation(location || '');
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };
    console.log(bio, website, location);
    props.editUserDetails(userDetails);
    handleOpen();
  };

  const handleChange = e => {
    if (e.target.name === 'bio') {
      setBio(e.target.value);
    }
    if (e.target.name === 'website') {
      setWebsite(e.target.value);
    }
    if (e.target.name === 'location') {
      setLocation(e.target.value);
    }
  };

  return (
    <>
      <ToolTip title="Edit Details" placement="top">
        <IconButton onClick={handleOpen} style={{ float: 'right' }}>
          <EditIcon color="primary" />
        </IconButton>
      </ToolTip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              value={bio}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your Personal/Professional Website"
              value={website}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              value={location}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cencel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(EditDetails);
