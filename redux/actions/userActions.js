// actions/authActions.js
// import fetch from 'isomorphic-unfetch';
import cookie from 'react-cookies';
import Router from 'next/router';
import { Message } from 'antd';
import axios from 'axios';
import {
  inProgress,
  notInProgress,
  userOpenAndClose,
  userOpenAndClose2,
} from './uxActions';
import { setCookie } from '../actions';
import { USER_ERROR, EDITUSERINFO, USERSINFO, URL } from '../actionTypes';

export const createUser = (user) => (dispatch) => {
  // console.log(user);
  dispatch(inProgress());
  axios
    .post(`${URL}/api/user`, user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // console.log('ok set cookie', response.token);
      // console.log(response);
      if (response.data.success) {
        setCookie('token', response.data.token);
        Message.success('User Created Successfully!');
        dispatch(notInProgress());
        dispatch(userOpenAndClose());
        return dispatch(getUsers());
      }

      Message.error(response.data.message);
      dispatch(notInProgress());
      return dispatch({ type: USER_ERROR, payload: response.data.message });
    })
    .catch((err) => {
      Message.error(err.response.data.message);

      dispatch(notInProgress());
      console.log(err.response);
    });
};

export const editUser = (user, id) => (dispatch) => {
  dispatch(inProgress());
  const token = getCookie('token');
  // console.log(user, id);
  axios
    .patch(`${URL}/api/users/${id}`, user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((response) => {
      // console.log('ok set cookie', response.token);
      // console.log(response);
      if (response.data.success) {
        Message.success('Profile Updated');
        dispatch(notInProgress());
        dispatch(userOpenAndClose2());
        return dispatch(getUsers());
      }
      dispatch(notInProgress());
      Message.error(response.data.message);
      return;
      // .then(() => Router.push('/dashboard'));
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      dispatch(notInProgress());
      console.log(err.response);
    });
};

export const editUserType = (user, id, cb) => (dispatch) => {
  dispatch(inProgress());
  const token = getCookie('token');
  // console.log(user, id);
  axios
    .patch(
      `${URL}/api/user/type/${id}`,
      { usertype: user },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      if (response.data.success) {
        Message.success('Usertype Successfully change!');
        dispatch(getUsers());
        cb(true);
        return dispatch(notInProgress());
      }
      dispatch(notInProgress());
      cb(false);
      Message.error(response.data.message);
      return;
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      cb(false);
      dispatch(notInProgress());
      console.log(err.response);
    });
};

export const editUserLocation = (location, id, cb) => (dispatch) => {
  dispatch(inProgress());
  const token = getCookie('token');
  // console.log(user, id);
  axios
    .patch(
      `${URL}/api/user/location/${id}`,
      { location },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      if (response.data.success) {
        Message.success('Location is Changed Successfully!');
        dispatch(getUsers());
        cb(true);
        return dispatch(notInProgress());
      }
      dispatch(notInProgress());
      cb(false);
      Message.error(response.data.message);
      return;
    })
    .catch((err) => {
      Message.error(err.response.data.message);
      cb(false);
      dispatch(notInProgress());
      console.log(err.response);
    });
};

export const getEditUser = (id) => (dispatch) => {
  // const token = getCookie('token');
  dispatch(inProgress());
  axios
    .get(`${URL}/api/users/${id}`)
    .then((response) => {
      if (response.data.success) {
        dispatch(notInProgress());
        let result = response.data.result;
        if (result.location) {
          result.local = `${result.location.area} at ${result.location.state}`;
        }
        return dispatch({ type: EDITUSERINFO, payload: result });
      }
      Message.error(response.data.message);
      dispatch(notInProgress());
    })
    .catch((err) => {
      console.log(err.response);
      Message.error(err.response.data.message);
      dispatch(notInProgress());
    });
};

export const getUsers = () => (dispatch) => {
  const token = getCookie('token');
  // console.log(tokenz, token);
  if (!token) return null;
  axios
    .get(`${URL}/api/users`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      // console.log(response);
      if (response.data.success) {
        let final = response.data.result.filter((data) => {
          data.key = data._id;
          if (data.location) {
            data.local = `${data.location.area} at ${data.location.state}`;
          }
          return data;
        });
        dispatch({ type: USERSINFO, payload: final });
        return { loaded: true };
      }
      // dispatch({ type: USERSINFO, payload: final });
      // console.log(response.message);
    })
    .catch((err) => console.log(err.response));
};

export const getUsersLocal = async (host, token) => {
  // console.log(token);
  // const token = getCookie('token'object);
  try {
    // if (!token) return null;
    const res = await fetch(`${URL}/api/user`, {
      headers: {
        Accept: 'application/json',
        // Authorization: `${token}`,
      },
    });
    const users = await res.json();
    // console.log(users);
    if (!users.success) {
      console.log(users);
    }
    let final = users.result.filter((data) => {
      data.key = data._id;
      if (data.location) {
        data.local = `${data.location.area} at ${data.location.state}`;
      }
      return data;
    });
    return final;
  } catch (error) {
    return console.log(error);
  }
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(inProgress());
  const token = getCookie('token');
  axios
    .delete(`${URL}/api/user/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      if (result.data.success) {
        Message.success('User is deleted successfully');
        dispatch(notInProgress());
        return dispatch(getUsers());
      }
      dispatch(notInProgress());
      Message.error('Error while deleting the user');
    })
    .catch((err) => {
      dispatch(notInProgress());
      Message.error(err.response.data.message);
      return console.log(err.response);
    });
};

/**
 * cookie helper methods
 */

// export const setCookie = (key, value) => {
//   if (process.browser) {
//     cookie.save(key, value, {
//       path: '/',
//     });
//   }
// };

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
  return cookie.load(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
