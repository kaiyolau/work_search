import {
    CREATE_USER,
    LOGIN_USER,
    RETRIEVE_USER,
    LOGOUT_USER,
    LOGOUTALL_USER,
    DELETE_USER,
  } from "./types";

  import UserDataService from "../services/UserService";

  export const createUser = ( name, email, password) => async (dispatch) => {
    try {
      const res = await UserDataService.create({ name, email, password });
      localStorage.setItem('token', res.data.token);
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const loginUser = (email, password) => async (dispatch) => {
    try {
      const res = await UserDataService.login({ email, password });
      // console.log("res is", res);
      localStorage.setItem('token', res.data.token);

      const token = localStorage.getItem('token');
      console.log('showing token from loginUser:',token)
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      console.log("err is", err);
      return Promise.reject(err);
    }
  };

  export const retrieveUser = () => async (dispatch) => {
    try {
      const res = await UserDataService.get();

      dispatch({
        type: RETRIEVE_USER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // export const retrieveUserPosts = () => async (dispatch) => {
  //   try {
  //     const res = await UserDataService.getUserPosts();

  //     dispatch({
  //       type: RETRIEVE_USER,
  //       payload: res.data,
  //     });
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };

  export const logoutUser = () => async (dispatch) => {
    try {
      const res = await UserDataService.logout();

      dispatch({
        type: LOGOUT_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const logoutAllUser = () => async (dispatch) => {
    try {
      const res = await UserDataService.logoutAll();
      console.log('response from action:',res)
      dispatch({
        type: LOGOUTALL_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const deleteUser = () => async (dispatch) => {
    try {
      const res = await UserDataService.remove();

      dispatch({
        type: DELETE_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

