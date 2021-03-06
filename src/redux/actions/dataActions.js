import {
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SCREAM,
  STOP_UI_LOADING,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then(res => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SET_SCREAMS, payload: [] });
    });
};

export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({
        type: STOP_UI_LOADING
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: STOP_UI_LOADING
      });
    });
};

export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/screams', newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// LIKE THE SCREAM
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch(getScream(screamId));
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// UNLIKE THE SCREAM
export const unLikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch(getScream(screamId));
      dispatch({ type: UNLIKE_SCREAM, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const submitCommment = (screamId, commentData) => dispatch => {
  console.log(commentData);
  axios
    .post(`/scream/${screamId}/comments`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteScream = screamid => dispatch => {
  axios
    .delete(`/scream/${screamid}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamid
      });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};
