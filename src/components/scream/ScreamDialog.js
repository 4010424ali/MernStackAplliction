import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// component import
import LikedButton from './LikeButton';
import Comments from './Comments';
import CommentFrom from './CommentFrom';

// MATERIAL-UI STUFF
import { makeStyles } from '@material-ui/core/styles';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icon
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';

const useStyle = makeStyles({
  invisibleSaprater: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '91%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

const ScreamDialog = props => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.getScream(props.screamId);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {
    scream: {
      screamId,
      body,
      created_at,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments
    },
    UI: { loading }
  } = props;
  const dialogContent = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img src={userImage} alt="profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/user/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSaprater} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(created_at).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSaprater} />
        <Typography variant="body1">{body}</Typography>
        <LikedButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <ToolTip title="comments" placement="top">
          <IconButton className="button">
            <ChatIcon color="primary" />
          </IconButton>
        </ToolTip>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.invisibleSaprater} />
      <CommentFrom screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      <ToolTip title="Expand Scream" placement="top">
        <IconButton onClick={handleOpen} className={classes.expandButton}>
          <UnfoldMore color="primary" />
        </IconButton>
      </ToolTip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <ToolTip title="Close" placement="top">
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon color="primary" />
          </IconButton>
        </ToolTip>
        <DialogContent className={classes.dislogContent}>
          {dialogContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { getScream }
)(ScreamDialog);
