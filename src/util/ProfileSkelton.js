import React from 'react';
import NoImg from '../image/no-image.jpeg';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import theme from '../util/theme';

const useStyle = makeStyles({
  paper: {
    padding: 20
  },
  '& .image-wrapper': {
    textAlign: 'center',
    position: 'relative'
  },
  profileDetails: {
    textAlign: 'center',
    '& a': {
      color: 'inherit'
    }
  },
  handle: {
    height: 20,
    backgroundColor: '#00bcd4',
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    marginBottom: 10
  }
});

const ProfileSkelton = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes['& .image-wrapper']}>
          <img
            src={NoImg}
            alt="profile"
            style={{ borderRadius: '50%', width: '100%' }}
          />
        </div>
        <hr />
        <div className={classes.profileDetails}>
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>loaction</span>
          <hr />
          <LinkIcon color="primary" /> http://location.com
          <hr />
          <CalendarToday color="primary" /> Join Date
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSkelton;
