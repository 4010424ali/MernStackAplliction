import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux stuff
import { connect } from 'react-redux';

// Compoents
import PostScream from '../scream/PostScream';

// Material ui stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

const Navbar = props => {
  const { authenticated } = props;
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <PostScream />
            <Link to={'/'}>
              <ToolTip title="Home" placement="top">
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </ToolTip>
            </Link>
            <ToolTip title="Notifications" placement="top">
              <IconButton>
                <Notifications />
              </IconButton>
            </ToolTip>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.protoType = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
