import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material UI stuff
import Grid from '@material-ui/core/Grid';

// Compoents import
import Scream from '../components/Scream';

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    console.log('useEffect is running');
    axios
      .get('/screams')
      .then(res => {
        console.log(res.data);
        setScreams(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screams ? (
          screams.map(scream => (
            <Scream key={scream.screamsId} scream={scream} />
          ))
        ) : (
          <p>Loading.....</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
