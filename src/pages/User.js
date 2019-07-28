import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profiles/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkelton';

// Material UI
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const User = props => {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;

    if (screamId) {
      setScreamIdParam(screamId);
    }
    props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => console.log(err));
  }, []);
  const { screams, loading } = props.data;
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {loading ? (
            <ScreamSkeleton />
          ) : screams === null ? (
            <p>No Scream From This User</p>
          ) : !screamIdParam ? (
            screams.map(scream => {
              return <Scream key={scream.screamId} scream={scream} />;
            })
          ) : (
            screams.map(scream => {
              if (scream.screamId !== screamIdParam) {
                return <Scream key={scream.screamId} scream={scream} />;
              } else {
                return (
                  <Scream key={scream.screamId} scream={scream} openDialog />
                );
              }
            })
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(User);
