import {
    USERLOGIN_FAILED,
    USERLOGIN_SUCCESS,
    USERREGISTRATION_FAILED,
    USERREGISTRATION_SUCCESS,
  } from "../constants/userConstants";
  
  const initialState = {
    user: {},
    profile: {},
    errors: {},
  };
  
  const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      // user
      case USERLOGIN_SUCCESS: {
        return { ...state, user: payload };
      }
      case USERLOGIN_FAILED: {
        return { ...state, errors: payload };
      }
      // profile
      case USERREGISTRATION_SUCCESS: {
        return { ...state, profile: payload };
      }
      case USERREGISTRATION_FAILED: {
        return { ...state, errors: payload };
      }
      default:
        return state;
    }
  };
  
  export default adminReducer;
  