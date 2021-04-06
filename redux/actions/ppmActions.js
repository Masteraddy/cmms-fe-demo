// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import { URL, GET_PPMS, GET_PPM } from '../actionTypes';
import { getCookie } from './authActions';
import Router from 'next/router';
import { inProgress, notInProgress } from './uxActions';

export const getPpms = () => (dispatch) => {
  axios
    .get(`${URL}/api/ppm`)
    .then((response) => {
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        data.categoryname = `${data.category.name}, ${data.category.type}`;
        data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
        data.date = new Date(data.createdAt).toDateString();
        data.nextdater = new Date(data.nextdate).toDateString();
        data.startdater = new Date(data.startdate).toDateString();
        return data;
      });
      dispatch({ type: GET_PPMS, payload: final });
      dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getPpmsLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/ppm`);
    const data = await res.json();
    if (data.message) {
      Message.error(data.message);
      return;
    }
    let final = data.result.filter((data) => {
      data.key = data._id;
      data.categoryname = `${data.category.name}, ${data.category.type}`;
      data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
      data.date = new Date(data.createdAt).toDateString();
      data.nextdater = new Date(data.nextdate).toDateString();
      data.startdater = new Date(data.startdate).toDateString();
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

export const getPpm = (id, cb) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/ppm/${id}`)
    .then((response) => {
      if (response.data.message) {
        let data = response.data.result;
        data.categoryname = `${data.category.name}, ${data.category.type}`;
        data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
        data.nextdater = new Date(data.nextdate).toDateString();
        data.startdater = new Date(data.startdate).toDateString();
        dispatch({ type: GET_PPM, payload: data });
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

export const deletePpm = (id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(id);
  axios
    .delete(`${URL}/api/ppm/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('PPM is deleted successfully');
        dispatch(notInProgress());
        dispatch(getPpms());
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

export const addPpm = (body, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(token, body);
  axios
    .post(`${URL}/api/ppm`, body, {
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
        dispatch(getPpms());
        if (cb) {
          cb(true);
        }
        // dispatch({ type: ADD_INSPECTION, payload: result.data });
        // Router.push('/data');

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
