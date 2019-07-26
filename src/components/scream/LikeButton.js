import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Icon
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';
import { likeScream, unLikeScream } from '../../redux/actions/dataActions';

const LikeButton = props => {
  const likedScream = () => {
    if (
      props.user.likes &&
      props.user.likes.find(like => like.screamId === props.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeScreams = () => {
    props.likeScream(props.screamId);
  };
  const unLikeScream = () => {
    props.unLikeScream(props.screamId);
  };
  const { authenticated } = props.user;
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
  return likeButton;
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unLikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
