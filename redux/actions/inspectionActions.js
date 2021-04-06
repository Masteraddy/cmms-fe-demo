// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import { URL, GET_INSPECTIONS, GET_INSPECTION } from '../actionTypes';
import { getCookie } from './authActions';
import Router from 'next/router';
import { inProgress, notInProgress } from './uxActions';

export const getInspections = () => (dispatch) => {
  axios
    .get(`${URL}/api/inspection`)
    .then((response) => {
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        data.categoryname = `${data.category.name}, ${data.category.type}`;
        data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
        data.date = new Date(data.createdAt).toDateString();
        let schedule = new Date(data.timescheduled);
        data.timeschedule = schedule.toDateString();
        return data;
      });
      dispatch({ type: GET_INSPECTIONS, payload: final });
      dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getInspectionsLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/inspection`);
    const data = await res.json();
    if (data.message) {
      Message.error(data.message);
      return;
    }
    let final = data.result.filter((data) => {
      data.key = data._id;
      let schedule = new Date(data.timescheduled);
      data.timeschedule = schedule.toDateString();
      data.categoryname = `${data.category.name}, ${data.category.type}`;
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

export const getInspection = (id, cb) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/inspection/${id}`)
    .then((response) => {
      if (response.data.success) {
        let data = response.data.result;
        let schedule = new Date(data.timescheduled);
        data.categoryname = `${data.category.name}, ${data.category.type}`;
        data.project = `${data.projectsite.property} at ${data.projectsite.location}`;
        data.timeschedule = schedule.toDateString();
        dispatch({ type: GET_INSPECTION, payload: data });
        dispatch(notInProgress());
        cb(true);
        return;
      }
      Message.error(response.data.message);
      dispatch(notInProgress());
      cb(false);
    })
    .catch((err) => {
      console.log(err);
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const scheduleInsTime = (body, id, user) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  const data = { email: user.email, timescheduled: body.timescheduled };
  // console.log(data);
  if (user.usertype === 'user') return dispatch(notInProgress());
  axios
    .put(`${URL}/api/inspection/${id}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Time was scheduled successfully');
        dispatch(notInProgress());
        return dispatch(getInspections(user));
      }
      Message.error('Error while schedulling time');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error('Unable to schedule time');
      dispatch(notInProgress());
      return console.log(err.response);
    });
};

export const changeInspectionStatus = (body, id, user, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  let data = {};
  if (body.status === 'done') {
    data = { status: body.status, timecompleted: Date.now() };
  } else {
    data = { status: body.status };
  }
  axios
    .patch(`${URL}/api/inspection/${id}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inspection status is changed successfully');
        dispatch(notInProgress());
        cb(true);
        return dispatch(getInspections(user));
      }
      Message.error('Error while changing the inspection status');
      cb(false);
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error('Unable to change this inspection status');
      dispatch(notInProgress());
      return console.log(err.response);
    });
};

export const deleteInspection = (id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(id);
  axios
    .delete(`${URL}/api/inspection/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inspection is deleted successfully');
        dispatch(notInProgress());
        dispatch(getInspections());
        return;
      }
      Message.error('Error while deleting the inspection');
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const addInspection = (body) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(token, body);
  axios
    .post(`${URL}/api/inspection`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inspection is added successfully');
        dispatch(notInProgress());
        dispatch(getInspections());
        // dispatch({ type: ADD_INSPECTION, payload: result.data });
        Router.push('/data');
        return;
      }
      // console.log(result);
      Message.error('Error while adding inspection');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error('Error while adding inspection');
      console.log(err.response);
      console.log(err);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};
