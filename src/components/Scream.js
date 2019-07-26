import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// components
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

// redux import
import { connect } from 'react-redux';
import { likeScream, unLikeScream } from '../redux/actions/dataActions';

// M-UI styles
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Icon
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
});

const Scream = props => {
  const classes = useStyles();

  const likedScream = () => {
    if (
      props.user.likes &&
      props.user.likes.find(like => like.screamId === props.scream.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeScreams = () => {
    props.likeScream(props.scream.screamId);
  };
  const unLikeScream = () => {
    props.unLikeScream(props.scream.screamId);
  };
  const {
    body,
    userImage,
    created_at,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = props.scream;

  const {
    user: {
      authenticated,
      credentials: { handle }
    }
  } = props;

  dayjs.extend(relativeTime);

  const likeButton = !authenticated ? (
    <ToolTip title="like" placement="top">
      <IconButton>
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </IconButton>
    </ToolTip>
  ) : likedScream() ? (
    <ToolTip title="unlike" placement="top">
      <IconButton onClick={unLikeScream}>
        <FavoriteIcon color="primary" />
      </IconButton>
    </ToolTip>
  ) : (
    <ToolTip title="like" placement="top">
      <IconButton onClick={likeScreams}>
        <FavoriteBorder color="primary" />
      </IconButton>
    </ToolTip>
  );
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamsId={screamId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/user/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(created_at).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} likes</span>
        <ToolTip title="comments" placement="top">
          <IconButton className="button">
            <ChatIcon color="primary" />
          </IconButton>
        </ToolTip>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = {
  likeScream,
  unLikeScream
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Scream);
