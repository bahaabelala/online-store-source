import * as actionTypes from "./actions/actionTypes";

const initialState = {
  token: null,
  userID: null,
  userRole: null,
  authRedirectPath: '/',
  loading: false,
};

// > Rendering the spinner
const showSpinner = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

// > Storing Auth. Data
const register = (state, action) => {
  return {
    ...state,
    token: action.token,
    userID: action.userID,
    userRole: action.userRole,
    loading: false,
  };
};

const logout = (state, action) => {
  return {
    ...state,
    token: null,
    userID: null,
    userRole: null,
  };
};

// > Changing Authentication redirect path
const changeAuthRedirectPath = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.redirectPath,
  }
}

// > ==== REDUCER ====

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD:
      return showSpinner(state, action);

    case actionTypes.REGISTER:
      return register(state, action);

    case actionTypes.LOGOUT:
      return logout(state, action);

    case actionTypes.CHANGE_AUTH_REDIRECT_PATH:
      return changeAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default reducer;
