// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import { URL, GET_CSS, GET_CS } from '../actionTypes';
import { getCookie } from './authActions';
import Router from 'next/router';
import { inProgress, notInProgress } from './uxActions';

export const getCss = () => (dispatch) => {
  axios
    .get(`${URL}/api/cs`)
    .then((response) => {
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
        data.date = new Date(data.createdAt).toDateString();
        return data;
      });
      dispatch({ type: GET_CSS, payload: final });
      dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getCssLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/cs`);
    const data = await res.json();
    if (data.message) {
      Message.error(data.message);
      return;
    }
    let final = data.result.filter((data) => {
      data.key = data._id;
      data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
      data.date = new Date(data.createdAt).toDateString();
      return data;
    });
    return final;
  } catch (error) {
    if (error) {
      console.error(error);
      return;
    }
  }
};

export const getCs = (id) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/cs/${id}`)
    .then((response) => {
      if (response.data.message) {
        let data = response.data.result;
        dispatch({ type: GET_CS, payload: data });
        cb(true);
        dispatch(notInProgress());
      }
    })
    .catch((err) => {
      console.log(err);
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const deleteCs = (id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(id);
  axios
    .delete(`${URL}/api/cs/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('End User feedback is deleted successfully');
        dispatch(notInProgress());
        dispatch(getCss());
        return;
      }
      Message.error('Error while deleting');
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const addCs = (body) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(token, body);
  axios
    .post(`${URL}/api/cs`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Submitted successfully');
        dispatch(notInProgress());
        dispatch(getCss());
        // dispatch({ type: ADD_INSPECTION, payload: result.data });
        Router.push('/');
        return;
      }
      // console.log(result);
      Message.error('Error while submitting');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error('Error while submitting');
      console.log(err.response);
      console.log(err);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};
