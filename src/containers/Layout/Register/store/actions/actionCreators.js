import * as actionTypes from "./actionTypes";
import axios from "../../../../../axios/axios-users";

// > Loading (rendering slider component) action
const load = () => {
  return {
    type: actionTypes.LOAD,
  };
};

// > Authenticating User
const authenticate = (token, userID, userRole) => {
  localStorage.setItem("authInfo", JSON.stringify({ token, userID, userRole }));

  return {
    type: actionTypes.REGISTER,
    token,
    userID,
    userRole,
  };
};

// > Registering (Signing in or up)
export const register = (payload, isSignUp) => {
  return dispatch => {
    (async () => {
      try {
        dispatch(load());

        let endpoint = isSignUp ? "/signup" : "/login";
        let requestBody = isSignUp
          ? {
            email: payload.email,
            password: payload.password,
            name: payload.username,
            passwordConfirm: payload.passwordConfirm,
          }
          : {
            email: payload.email,
            password: payload.password,
          };

        const response = await axios.post(endpoint, requestBody),
          responseData = response.data;

        dispatch(
          authenticate(
            responseData.token,
            responseData.user._id,
            responseData.user.role
          )
        );
      } catch (error) { 
        console.log(error)
      }
    })();
  };
};

// > Logging out
export const logout = () => {
  localStorage.removeItem("authInfo");

  return {
    type: actionTypes.LOGOUT,
  };
};

// > Checking the authentication state of the user when beginning the website
export const checkAuthState = () => {
  return dispatch => {
    const authInfo = localStorage.getItem("authInfo");

    if (authInfo) {
      const userInfo = JSON.parse(authInfo);

      dispatch(
        authenticate(userInfo.token, userInfo.userID, userInfo.userRole)
      );
    }
  };
};

// > Changing authentication redirect path
export const changeAuthRedirectPath = path => {
  return {
    type: actionTypes.CHANGE_AUTH_REDIRECT_PATH,
    redirectPath: path,
  }
}