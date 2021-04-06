// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import axios from "axios";
import { Message } from "antd";
import {
  SITE_INFO_ERR,
  ADD_SITE_INFO,
  DELETE_SITE_INFO,
  EDIT_SITE_INFO,
  GET_SITE_INFOS,
  GET_SITE_INFO,
  URL,
} from "../actionTypes";
import { getCookie } from "./authActions";
import { inProgress, notInProgress } from "./uxActions";

export const getSiteInfos = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/siteinfo`);
    if (data.message) {
      return dispatch({ type: SITE_INFO_ERR, payload: data.message });
    }
    let final = await data.result.filter((data) => {
      data.key = data._id;
      return data;
    });
    dispatch({ type: GET_SITE_INFOS, payload: final });
  } catch (error) {
    // Message.error(error.response.data.message);
    return dispatch({
      type: SITE_INFO_ERR,
      payload: error.response.data.message,
    });
  }
};

export const getSiteInfosLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/siteinfo`);
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

export const getSiteInfo = (id) => async (dispatch) => {
  dispatch(inProgress());
  try {
    const { data } = await axios.get(`${URL}/api/siteinfo/${id}`);
    dispatch({ type: GET_SITE_INFO, payload: data.result });
    dispatch(notInProgress());
  } catch (error) {
    // console.log(error.response);
    dispatch(notInProgress());
    if (error.response.data.message) {
      Message.error(error.response.data.message);
      return dispatch({
        type: SITE_INFO_ERR,
        payload: error.response.data.message,
      });
    }
  }
};

export const addSiteInfo = (body, cb) => async (dispatch) => {
  const token = getCookie("token");
  dispatch(inProgress());
  try {
    let { data } = await axios.post(`${URL}/api/siteinfo`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("SiteInfo is added successfully");
    if (cb) {
      cb(true);
    }
    dispatch(notInProgress());
    return dispatch(getSiteInfos());
  } catch (error) {
    Message.error("Unable to add this siteinfo");
    dispatch(notInProgress());
    // return console.log(error.response);
  }
};

export const deleteSiteInfo = (id) => async (dispatch) => {
  const token = getCookie("token");
  // console.log(id);
  try {
    let { data } = await axios.delete(`${URL}/api/siteinfo/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("SiteInfo is deleted successfully");
    return dispatch(getSiteInfos());
  } catch (error) {
    Message.error("Unable to delete this siteinfo");
    // return console.log(error.response);
  }
};

export const editSiteInfo = (body, id, cb) => async (dispatch) => {
  try {
    const token = getCookie("token");
    dispatch(inProgress());
    let { data } = await axios.patch(`${URL}/api/siteinfo/${id}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("SiteInfo status is changed successfully");
    dispatch({ type: EDIT_SITE_INFO, payload: data.result });
    if (cb) {
      cb(true);
    }
    // dispatch(serviceOpenAndClose2());
    dispatch(notInProgress());
    return dispatch(getSiteInfos());
  } catch (error) {
    // Message.error(error.response.data.message);
    dispatch(notInProgress());
    Message.error("Unable to edit this siteinfo");
    return console.log(error.response.data);
  }
};
