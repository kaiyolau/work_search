import {
  CREATE_APP,
  LOGIN_APP,
  DELETE_APP,
} from "../actions/types";

const initialState = [];

const appReducer = (app = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_APP:
      return [...app, payload];
    case DELETE_APP:
      return app.filter(({ id }) => id !== payload.id);

    default:
      return app;
  }
};

export default appReducer;
