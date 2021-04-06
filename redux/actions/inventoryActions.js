// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import {
  URL,
  EDIT_INVENTORY,
  GET_INVENTORY,
  GET_INVENTORYS,
} from '../actionTypes';
import { getCookie } from './authActions';
import { inProgress, notInProgress } from '../actions';

export const getInventorys = () => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/inventory`)
    .then((response) => {
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        return data;
      });
      dispatch({ type: GET_INVENTORYS, payload: final });
      dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getInventoryLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/inventory`);
    const data = await res.json();
    // console.log(data[0]);

    let final = data.result.map((dt) => {
      dt.key = dt._id;
      // data.all = data.used + data.available;
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

export const getInventory = (id, cb) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/inventory/${id}`)
    .then((response) => {
      if (response.data.success) {
        let data = response.data.result;
        dispatch({ type: GET_INVENTORY, payload: data });
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

export const deleteInventory = (id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(id);
  axios
    .delete(`${URL}/api/inventory/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inventory is deleted successfully');
        dispatch(notInProgress());
        dispatch(getInventorys());
        return;
      }
      Message.error('Error while deleting the inventory');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const addInventory = (body, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .post(`${URL}/api/inventory`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inventory is added successfully');
        dispatch(notInProgress());
        dispatch(getInventorys());
        cb(true);
      }
      // console.log(result);
      Message.error('Error while adding inventory');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const editInventory = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .patch(`${URL}/api/inventory/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inventory data is changed successfully');
        dispatch({ type: EDIT_INVENTORY, payload: {} });
        dispatch(notInProgress());
        dispatch(getInventorys());
        return cb(true);
      }
      // console.log(result);
      Message.error('Error while updating the inventory');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const selectInventory = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');

  dispatch(inProgress());
  axios
    .put(`${URL}/api/inventory/select/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inventory data is changed successfully');
        dispatch({ type: EDIT_INVENTORY, payload: {} });
        dispatch(notInProgress());
        return dispatch(getInventorys());
      }
      // console.log(result);
      Message.error('Error while updating the inventory');
      dispatch(notInProgress());
      return cb(true);
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const submitInventory = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  let lendId = body.lendId;
  dispatch(inProgress());
  axios
    .put(`${URL}/api/inventory/submit/${id}/${lendId}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inventory data is changed successfully');
        dispatch({ type: EDIT_INVENTORY, payload: {} });
        dispatch(notInProgress());
        return dispatch(getInventorys());
      }
      // console.log(result);
      Message.error('Error while updating the inventory');
      dispatch(notInProgress());
      return cb(true);
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const statusInventory = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  // Message.loading('Loading...');
  let lendId = body.lendId;
  dispatch(inProgress());
  axios
    .put(`${URL}/api/inventory/status/${id}/${lendId}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Inventory data is changed successfully');
        dispatch({ type: EDIT_INVENTORY, payload: {} });
        dispatch(notInProgress());
        dispatch(getInventorys());
        cb(true);
        return;
      }
      // console.log(result);
      Message.error('Error while updating the inventory');
      dispatch(notInProgress());
      return cb(false);
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};
