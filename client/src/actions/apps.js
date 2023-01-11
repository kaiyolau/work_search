import {
  CREATE_APP,
  DELETE_APP,
} from "./types";

import AppDataService from "../services/AppService";

export const createApp = ( postingId, currentApp) => async (dispatch) => {
  try {
    const res = await AppDataService.create(postingId, currentApp );
    dispatch({
      type: CREATE_APP,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteApp = () => async (dispatch) => {
  try {
    const res = await AppDataService.remove();

    dispatch({
      type: DELETE_APP,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
