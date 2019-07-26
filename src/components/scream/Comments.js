import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  visibleSaparators: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0, 0.1)',
    margin: 20
  },
  invisibleSaprater: {
    border: 'none',
    margin: 4
  },
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
    marginLeft: '2rem',
    alignSelf: 'center'
  },
  commentData: {
    marginLeft: 20
  }
});

const Comments = props => {
  const classes = useStyles();
  const { comments } = props;

  return (
    <Grid container>
      {comments.map(comment => {
        const { body, created_at, userImage, userHamdle } = comment;
        return (
          <>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={3}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHamdle}`}
                      color="primary"
                    >
                      {userHamdle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(created_at).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSaprater} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <hr className={classes.visibleSaparators} />
          </>
        );
      })}
    </Grid>
  );
};

export default Comments;
