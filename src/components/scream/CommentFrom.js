import React, { useState, useEffect } from 'react';

// Material UI stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// reduxn
import { connect, useSelector } from 'react-redux';
import { submitCommment } from '../../redux/actions/dataActions';

const useStyle = makeStyles({
  visibleSaparators: {
    width: '32rem',
    borderBottom: '1px solid rgba(0,0,0, 0.1)',
    margin: 20
  },
  button: {
    marginTop: 20
  }
});

const CommentFrom = props => {
  const [body, setBody] = useState('');
  const [error, setError] = useState({ err: '' });
  const classes = useStyle();
  const err = useSelector(state => state.UI.errors);
  const authenticated = useSelector(state => state.user.authenticated);

  useEffect(() => {
    if (err) {
      setError({ err: err.comments });
    }
  }, [err]);

  const handleChange = e => {
    if (e.target.name === 'body') {
      setBody(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.submitCommment(props.screamId, { body });
    setBody('');
    setError('');
  };

  const commentFromMark = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={error.err ? true : false}
          helperText={error.err}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          submit
        </Button>
      </form>
      <hr className={classes.visibleSaparators} />
    </Grid>
  ) : null;

  return commentFromMark;
};

export default connect(
  null,
  { submitCommment }
)(CommentFrom);
