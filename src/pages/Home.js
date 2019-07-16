import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

// Material UI stuff
import Grid from '@material-ui/core/Grid';

// Compoents import
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = props => {
  useEffect(() => {
    props.getScreams();
  }, []);
  const { screams, loading } = props.data;
  console.log(props.data);
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {!loading ? (
          screams.map(scream => (
            <Scream key={scream.screamsId} scream={scream} />
          ))
        ) : (
          <p>Loading.....</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.protoType = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getScreams }
)(Home);
