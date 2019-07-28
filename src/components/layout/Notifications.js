import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

// Material Ui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconBtn from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// Redux stuff
import { connect, useSelector } from 'react-redux';
import { markNotificationRead } from '../../redux/actions/userAction';

const Notifications = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = useSelector(state => state.user.notifications);

  const handleOpen = e => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpen = () => {
    let unReadNotificationIds = notifications
      .filter(noti => !noti.read)
      .map(noti => noti.notificationId);
    props.markNotificationRead(unReadNotificationIds);
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter(noti => noti.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter(noti => noti.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }
  dayjs.extend(relativeTime);
  let notificationMarkUp =
    notifications && notifications.length > 0 ? (
      notifications.map(noti => {
        const verb = noti.type === 'like' ? 'Liked' : 'commented on';
        const time = dayjs(noti.created_at).fromNow();
        const iconColor = noti.read ? 'primary' : 'secondary';
        const icon =
          noti.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} />
          );

        return (
          <MenuItem key={noti.notificationId} onClick={handleClose}>
            {icon}
            <Typography
              variant="body1"
              component={Link}
              color="textPrimary"
              to={`/user/${noti.recipient}/scream/${noti.screamId}`}
            >
              {noti.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notification yet</MenuItem>
    );

  return (
    <>
      <Tooltip placement="top" title="notifications">
        <IconBtn
          aria-owns={anchorEl ? 'simple-munu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconBtn>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpen}
      >
        {notificationMarkUp}
      </Menu>
    </>
  );
};

export default connect(
  null,
  { markNotificationRead }
)(Notifications);
