// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import axios from "axios";
import { Message } from "antd";
import {
  FILTER_ERR,
  ADD_FILTER,
  DELETE_FILTER,
  EDIT_FILTER,
  GET_FILTERS,
  GET_FILTER,
  URL,
} from "../actionTypes";
import { getCookie } from "./authActions";
import { inProgress, notInProgress } from "./uxActions";

export const getFilters = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/filter`);
    if (data.message) {
      return dispatch({ type: FILTER_ERR, payload: data.message });
    }
    let final = await data.result.filter((data) => {
      data.key = data._id;
      return data;
    });
    dispatch({ type: GET_FILTERS, payload: final });
  } catch (error) {
    // Message.error(error.response.data.message);
    return dispatch({
      type: FILTER_ERR,
      payload: error.response.data.message,
    });
  }
};

export const getFiltersLocal = async (host) => {
  try {
    const res = await fetch(`${URL}/api/filter`);
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

export const getFilter = (id) => async (dispatch) => {
  dispatch(inProgress());
  try {
    const { data } = await axios.get(`${URL}/api/filter/${id}`);
    dispatch({ type: GET_FILTER, payload: data.result });
    dispatch(notInProgress());
  } catch (error) {
    // console.log(error.response);
    dispatch(notInProgress());
    if (error.response.data.message) {
      Message.error(error.response.data.message);
      return dispatch({
        type: FILTER_ERR,
        payload: error.response.data.message,
      });
    }
  }
};

export const addFilter = (body, cb) => async (dispatch) => {
  const token = getCookie("token");
  dispatch(inProgress());
  try {
    let { data } = await axios.post(`${URL}/api/filter`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("Filter is added successfully");
    if (cb) {
      cb(true);
    }
    dispatch(notInProgress());
    return dispatch(getFilters());
  } catch (error) {
    Message.error("Unable to add this filter");
    dispatch(notInProgress());
    // return console.log(error.response);
  }
};

export const deleteFilter = (id) => async (dispatch) => {
  const token = getCookie("token");
  // console.log(id);
  try {
    let { data } = await axios.delete(`${URL}/api/filter/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("Filter is deleted successfully");
    return dispatch(getFilters());
  } catch (error) {
    Message.error("Unable to delete this filter");
    // return console.log(error.response);
  }
};

export const editFilter = (body, id, cb) => async (dispatch) => {
  try {
    const token = getCookie("token");
    dispatch(inProgress());
    let { data } = await axios.patch(`${URL}/api/filter/${id}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    Message.success("Filter status is changed successfully");
    dispatch({ type: EDIT_FILTER, payload: data.result });
    if (cb) {
      cb(true);
    }
    // dispatch(serviceOpenAndClose2());
    dispatch(notInProgress());
    return dispatch(getFilters());
  } catch (error) {
    // Message.error(error.response.data.message);
    dispatch(notInProgress());
    Message.error("Unable to edit this filter");
    return console.log(error.response.data);
  }
};
