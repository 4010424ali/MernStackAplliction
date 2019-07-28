import React, { useEffect } from 'react';

// redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

// Material UI stuff
import Grid from '@material-ui/core/Grid';

// Compoents import
import Scream from '../components/scream/Scream';
import Profile from '../components/profiles/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

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
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          <ScreamSkeleton />
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
