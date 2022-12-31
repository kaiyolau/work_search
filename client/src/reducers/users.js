import {
    CREATE_USER,
    LOGIN_USER,
    RETRIEVE_USER,
    LOGOUT_USER,
    LOGOUTALL_USER,
    DELETE_USER,
  } from "../actions/types";

  const initialState = [];

  const userReducer = (user = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case CREATE_USER:
        return [...user, payload];

      case LOGIN_USER:
        return [...user, payload];

      case RETRIEVE_USER:
        return payload;

      case LOGOUT_USER:
        return payload;

      case LOGOUTALL_USER:
        return payload;

      case DELETE_USER:
        return user.filter(({ id }) => id !== payload.id);

      default:
        return user;
    }
  };

  export default userReducer;
