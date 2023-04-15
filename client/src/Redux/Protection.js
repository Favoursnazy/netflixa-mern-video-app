import { logoutAction } from "./Actions/userAction";

export const ErrorAction = (error, dispatch, action) => {
  const message =
    error.message && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not Authorized, token failed!") {
    dispatch(logoutAction());
  }
  return dispatch({ type: action, payload: message });
};

// API TOKEN PROTECTION
export const tokenProtection = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  if (!userInfo?.token) {
    return null;
  } else {
    return userInfo.token;
  }
};
