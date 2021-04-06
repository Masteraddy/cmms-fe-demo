// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import axios from "axios";
import { Message } from "antd";
import {
  IHS_DATA_ERR,
  ADD_IHS_DATA,
  DELETE_IHS_DATA,
  EDIT_IHS_DATA,
  GET_IHS_DATAS,
  GET_IHS_DATA,
  URL,
} from "../actionTypes";
import { getCookie } from "./authActions";
import { inProgress, notInProgress } from "./uxActions";

export const getIHSDatas = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/ihsdata`);
    if (data.message) {
      return dispatch({ type: IHS_DATA_ERR, payload: data.message });
    }
    let final = await data.result.filter((data) => {
      data.key = data._id;
      return data;
    });
    dispatch({ type: GET_IHS_DATAS, payload: final });
  } catch (error) {
    // Message.error(error.response.data.message);
    return dispatch({
      type: IHS_DATA_ERR,
      payload: error.response.data.message,
    });
  }
};

export const getIHSDatasLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/ihsdata`);
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

export const getIHSData = (id) => async (dispatch) => {
  dispatch(inProgress());
  try {
    const { data } = await axios.get(`${URL}/api/ihsdata/${id}`);
    dispatch({ type: GET_IHS_DATA, payload: data.result });
    dispatch(notInProgress());
  } catch (error) {
    // console.log(error.response);
    dispatch(notInProgress());
    if (error.response.data.message) {
      Message.error(error.response.data.message);
      return dispatch({
        type: IHS_DATA_ERR,
        payload: error.response.data.message,
      });
    }
  }
};

export const addIHSData = (body, cb) => async (dispatch) => {
  const token = getCookie("token");
  dispatch(inProgress());
  try {
    let { data } = await axios.post(`${URL}/api/ihsdata`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("IHSData is added successfully");
    if (cb) {
      cb(true);
    }
    dispatch(notInProgress());
    return dispatch(getIHSDatas());
  } catch (error) {
    Message.error("Unable to add this ihsdata");
    dispatch(notInProgress());
    // return console.log(error.response);
  }
};

export const deleteIHSData = (id) => async (dispatch) => {
  const token = getCookie("token");
  // console.log(id);
  try {
    let { data } = await axios.delete(`${URL}/api/ihsdata/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("IHSData is deleted successfully");
    return dispatch(getIHSDatas());
  } catch (error) {
    Message.error("Unable to delete this ihsdata");
    // return console.log(error.response);
  }
};

export const editIHSData = (body, id, cb) => async (dispatch) => {
  try {
    const token = getCookie("token");
    dispatch(inProgress());
    let { data } = await axios.patch(`${URL}/api/ihsdata/${id}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("IHSData status is changed successfully");
    dispatch({ type: EDIT_IHS_DATA, payload: data.result });
    if (cb) {
      cb(true);
    }
    // dispatch(serviceOpenAndClose2());
    dispatch(notInProgress());
    return dispatch(getIHSDatas());
  } catch (error) {
    // Message.error(error.response.data.message);
    dispatch(notInProgress());
    Message.error("Unable to edit this ihsdata");
    return console.log(error.response.data);
  }
};
