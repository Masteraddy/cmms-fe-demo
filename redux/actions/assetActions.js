// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import { URL, EDIT_ASSET, GET_ASSET, GET_ASSETS } from '../actionTypes';
import { getCookie } from './authActions';
import { inProgress, notInProgress } from '../actions';

export const getAssets = () => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/asset`)
    .then((response) => {
      let final = response.data.result.filter((data) => {
        data.key = data._id;
        return data;
      });
      dispatch({ type: GET_ASSETS, payload: final });
      dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getAssetLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/asset`);
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

export const getAsset = (id, cb) => (dispatch) => {
  dispatch(inProgress());
  axios
    .get(`${URL}/api/asset/${id}`)
    .then((response) => {
      if (response.data.success) {
        let data = response.data.result;
        dispatch({ type: GET_ASSET, payload: data });
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

export const deleteAsset = (id) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  // console.log(id);
  axios
    .delete(`${URL}/api/asset/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Asset is deleted successfully');
        dispatch(notInProgress());
        dispatch(getAssets());
        return;
      }
      Message.error('Error while deleting the asset');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const addAsset = (body, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .post(`${URL}/api/asset`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Asset is added successfully');
        dispatch(notInProgress());
        dispatch(getAssets());
        cb(true);
      }
      // console.log(result);
      Message.error('Error while adding asset');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const editAsset = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  dispatch(inProgress());
  axios
    .patch(`${URL}/api/asset/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Asset data is changed successfully');
        dispatch({ type: EDIT_ASSET, payload: {} });
        dispatch(notInProgress());
        dispatch(getAssets());
        return cb(true);
      }
      // console.log(result);
      Message.error('Error while updating the asset');
      return dispatch(notInProgress());
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const selectAsset = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  console.log(body, id);
  dispatch(inProgress());
  axios
    .put(`${URL}/api/asset/select/${id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Asset data is changed successfully');
        dispatch({ type: EDIT_ASSET, payload: {} });
        dispatch(notInProgress());
        return dispatch(getAssets());
      }
      // console.log(result);
      Message.error('Error while updating the asset');
      dispatch(notInProgress());
      return cb(true);
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};

export const submitAsset = (body, id, cb) => (dispatch) => {
  const token = getCookie('token');
  let lendId = body.lendId;
  dispatch(inProgress());
  axios
    .put(`${URL}/api/asset/submit/${id}/${lendId}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('Asset data is changed successfully');
        dispatch({ type: EDIT_ASSET, payload: {} });
        dispatch(notInProgress());
        return dispatch(getAssets());
      }
      // console.log(result);
      Message.error('Error while updating the asset');
      dispatch(notInProgress());
      return cb(true);
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      return console.log(err.response.data);
    });
};
