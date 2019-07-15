import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// redux stuff
import { connect } from 'react-redux';
import { uploadImage, logOutUser } from '../redux/actions/userAction';

// MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: 'inherit'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

const Profile = props => {
  const handleImageChange = e => {
    const image = e.target.files[0];

    // send image to the server
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadImage(formData);
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const classes = useStyles();
  const {
    user: {
      credentials: { handle, created_at, imageUrl, bio, website, location },
      loading,
      authenticated
    }
  } = props;
  let profileMarkUp = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              hidden="hidden"
            />
            <ToolTip title="Edit profile picture" placement="top">
              <IconButton onClick={handleEditImage} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </ToolTip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span> <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(created_at).format('MMM YYYY')} </span>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={'/login'}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={'/signup'}
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loadding</p>
  );

  return profileMarkUp;
};

Profile.prototype = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = { uploadImage, logOutUser };

export default connect(
  mapStateToProps,
  mapActionToProps
)(Profile);
