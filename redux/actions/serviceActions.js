// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import {
  SERVICE_ERR,
  ADD_SERVICE,
  DELETE_SERVICE,
  EDIT_SERVICE,
  GET_SERVICES,
  GET_SERVICE,
  URL,
} from '../actionTypes';
import { getCookie } from './authActions';
import {
  serviceOpenAndClose,
  serviceOpenAndClose2,
  inProgress,
  notInProgress,
} from './uxActions';

export const getServices = () => (dispatch) => {
  axios
    .get(`${URL}/api/service`)
    .then((response) => {
      if (response.data.message) {
        Message.error(response.data.message);
        return dispatch({ type: SERVICE_ERR, payload: response.data.message });
      }
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        return data;
      });
      // Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
      dispatch({ type: GET_SERVICES, payload: final });
    })
    .catch((err) => {
      console.log(err.response.data);
      Message.error(err.response.data.message);
      return dispatch({
        type: SERVICE_ERR,
        payload: err.response.data.message,
      });
    });
};

export const getServicesLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/service`);
    const data = await res.json();
    if (data.message) {
      Message.error(data.message);
      return;
    }
    let final = data.result.filter((data) => {
      data.key = data._id;
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

export const getService = (id) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/service/${id}`)
    .then((response) => {
      if (response.data.message) {
        Message.error(response.data.message);
        dispatch(notInProgress());
        return dispatch({ type: SERVICE_ERR, payload: response.data.message });
      }
      // Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
      dispatch({ type: GET_SERVICE, payload: response.result });
      dispatch(notInProgress());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(notInProgress());
      if (err.response.data.message) {
        Message.error(err.response.data.message);
        return dispatch({
          type: SERVICE_ERR,
          payload: err.response.data.message,
        });
      }
    });
};

export const deleteService = (id) => (dispatch) => {
  const token = getCookie('token');
  // console.log(id);
  axios
    .delete(`${URL}/api/service/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Service is deleted successfully');
        return dispatch(getServices());
      }
      Message.error('Error while deleting the service');
    })
    .catch((err) => {
      Message.error('Unable to delete this service');
      return console.log(err.response);
    });
};

export const addService = (body) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(token, body);
  axios
    .post(`${URL}/api/service`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Service is added successfully');
        // dispatch({ type: ADD_SERVICE, payload: result.data });
        dispatch(serviceOpenAndClose());
        dispatch(notInProgress());
        return dispatch(getServices());
      }
      console.log(result);
      Message.error('Error while adding service');
      dispatch(notInProgress());
    })
    .catch((err) => {
      // console.log(err);
      Message.error('Unable to add this service');
      dispatch(notInProgress());
      return console.log(err.response);
    });
};

export const editService = (body, id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .patch(`${URL}/api/service/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Service status is changed successfully');
        dispatch({ type: EDIT_SERVICE, payload: {} });
        dispatch(serviceOpenAndClose2());
        dispatch(notInProgress());
        return dispatch(getServices());
      }
      // console.log(result);
      Message.error('Error while updating the service');
      dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error('Unable to change this service status');
      dispatch(notInProgress());
      return console.log(err.response);
    });
};
