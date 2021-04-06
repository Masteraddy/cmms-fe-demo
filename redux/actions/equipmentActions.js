// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import {
  URL,
  EDIT_EQUIPMENT,
  GET_EQUIPMENT,
  GET_EQUIPMENTS,
} from '../actionTypes';
import { getCookie } from './authActions';
import { inProgress, notInProgress } from '../actions';

export const getEquipments = () => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/equipment`)
    .then((response) => {
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        return data;
      });
      dispatch({ type: GET_EQUIPMENTS, payload: final });
      dispatch(notInProgress());
    })
    .catch((err) => {
      console.log(err);
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getEquipmentLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/equipment`);
    const data = await res.json();
    // console.log(data[0]);

    let final = data.result.map((dt) => {
      dt.key = dt._id;
      return dt;
    });
    return final;
    // return [];
  } catch (error) {
    console.log(error.message);
    // Message.error(error.message);
    return [];
  }
};

export const getEquipment = (id, cb) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/equipment/${id}`)
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: GET_EQUIPMENT, payload: response.data.result });
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

export const deleteEquipment = (id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(id);
  axios
    .delete(`${URL}/api/equipment/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Equipment is deleted successfully');
        dispatch(notInProgress());
        dispatch(getEquipments());
        return;
      }
      Message.error('Error while deleting the equipment');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const addEquipment = (body, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .post(`${URL}/api/equipment`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Equipment is added successfully');
        dispatch(notInProgress());
        dispatch(getEquipments());
        cb(true);
      }
      // console.log(result);
      Message.error('Error while adding equipment');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const editEquipment = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .patch(`${URL}/api/equipment/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Equipment data is changed successfully');
        dispatch({ type: EDIT_EQUIPMENT, payload: {} });
        dispatch(notInProgress());
        dispatch(getEquipments());
        return cb(true);
      }
      // console.log(result);
      Message.error('Error while updating the equipment');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const selectEquipment = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');

  dispatch(inProgress());
  axios
    .put(`${URL}/api/equipment/select/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Equipment data is changed successfully');
        dispatch({ type: EDIT_EQUIPMENT, payload: {} });
        dispatch(notInProgress());
        return dispatch(getEquipments());
      }
      // console.log(result);
      Message.error('Error while updating the equipment');
      dispatch(notInProgress());
      return cb(true);
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const submitEquipment = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');

  let lendId = body.lendId;

  dispatch(inProgress());
  axios
    .put(`${URL}/api/equipment/submit/${id}/${lendId}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Equipment data is changed successfully');
        dispatch({ type: EDIT_EQUIPMENT, payload: {} });
        dispatch(notInProgress());
        dispatch(getEquipments());
        return cb(true);
      }
      // console.log(result);
      Message.error('Error while updating the equipment');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};
