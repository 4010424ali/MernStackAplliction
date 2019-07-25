import React, { useEffect } from 'react';

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

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getScreams }
)(Home);
