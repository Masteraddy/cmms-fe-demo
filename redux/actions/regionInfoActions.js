// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import axios from "axios";
import { Message } from "antd";
import {
  REGION_INFO_ERR,
  ADD_REGION_INFO,
  DELETE_REGION_INFO,
  EDIT_REGION_INFO,
  GET_REGION_INFOS,
  GET_REGION_INFO,
  URL,
} from "../actionTypes";
import { getCookie } from "./authActions";
import { inProgress, notInProgress } from "./uxActions";

export const getRegionInfos = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/regioninfo`);
    if (data.message) {
      return dispatch({ type: REGION_INFO_ERR, payload: data.message });
    }
    let final = await data.result.filter((data) => {
      data.key = data._id;
      return data;
    });
    dispatch({ type: GET_REGION_INFOS, payload: final });
  } catch (error) {
    // Message.error(error.response.data.message);
    return dispatch({
      type: REGION_INFO_ERR,
      payload: error.response.data.message,
    });
  }
};

export const getRegionInfosLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/regioninfo`);
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

export const getRegionInfo = (id) => async (dispatch) => {
  dispatch(inProgress());
  try {
    const { data } = await axios.get(`${URL}/api/regioninfo/${id}`);
    dispatch({ type: GET_REGION_INFO, payload: data.result });
    dispatch(notInProgress());
  } catch (error) {
    // console.log(error.response);
    dispatch(notInProgress());
    if (error.response.data.message) {
      Message.error(error.response.data.message);
      return dispatch({
        type: REGION_INFO_ERR,
        payload: error.response.data.message,
      });
    }
  }
};

export const addRegionInfo = (body, cb) => async (dispatch) => {
  const token = getCookie("token");
  dispatch(inProgress());
  try {
    let { data } = await axios.post(`${URL}/api/regioninfo`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("RegionInfo is added successfully");
    if (cb) {
      cb(true);
    }
    dispatch(notInProgress());
    return dispatch(getRegionInfos());
  } catch (error) {
    Message.error("Unable to add this regioninfo");
    dispatch(notInProgress());
    // return console.log(error.response);
  }
};

export const deleteRegionInfo = (id) => async (dispatch) => {
  const token = getCookie("token");
  // console.log(id);
  try {
    let { data } = await axios.delete(`${URL}/api/regioninfo/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("RegionInfo is deleted successfully");
    return dispatch(getRegionInfos());
  } catch (error) {
    Message.error("Unable to delete this regioninfo");
    // return console.log(error.response);
  }
};

export const editRegionInfo = (body, id, cb) => async (dispatch) => {
  try {
    const token = getCookie("token");
    dispatch(inProgress());
    let { data } = await axios.patch(`${URL}/api/regioninfo/${id}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("RegionInfo status is changed successfully");
    dispatch({ type: EDIT_REGION_INFO, payload: data.result });
    if (cb) {
      cb(true);
    }
    // dispatch(serviceOpenAndClose2());
    dispatch(notInProgress());
    return dispatch(getRegionInfos());
  } catch (error) {
    // Message.error(error.response.data.message);
    dispatch(notInProgress());
    Message.error("Unable to edit this regioninfo");
    return console.log(error.response.data);
  }
};
