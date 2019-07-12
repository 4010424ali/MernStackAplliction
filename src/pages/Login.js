import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Material UI stuuf
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px'
  },
  link: {
    marginTop: '1rem'
  },
  progress: {
    position: 'absolute'
  }
});

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '', general: '' });

  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password
    };

    axios
      .post('/login', userData)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.Token}`);
        setLoading(false);
        props.history.push('/');
      })
      .catch(err => {
        setError({
          email: err.response.data.email,
          password: err.response.data.password,
          general: err.response.data.general
        });
        setLoading(false);
      });
  };

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        {/* TODO: Image icomlater  margin:'20px auto 20px auto'*/}
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            className={classes.textField}
            helperText={error.email}
            error={error.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.TextField}
            helperText={error.password}
            error={error.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {error.general ? (
            <Typography variant="body2" className={classes.customError}>
              {error.general}
            </Typography>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : null}
          </Button>
           <br />
          <Typography variant="body2" color="primary" className={classes.link}>
            Don't have an account ? Sign up <Link to="/signup">here</Link>{' '}
          </Typography>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;
