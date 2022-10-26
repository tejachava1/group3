import {
    ADMINLOGIN_FAILED,
    ADMINLOGIN_SUCCESS,
    ADMINREGISTRATION_SUCCESS,
    ADMINREGISTRATION_FAILED
  } from "../constants/adminConstants";
  
  const initialState = {
    user: {},
    profile: {},
    errors: {},
  };
  
  const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      // user
      case ADMINLOGIN_SUCCESS: {
        return { ...state, user: payload };
      }
      case ADMINLOGIN_FAILED: {
        return { ...state, errors: payload };
      }
      // profile
      case ADMINREGISTRATION_SUCCESS: {
        return { ...state, profile: payload };
      }
      case ADMINREGISTRATION_FAILED: {
        return { ...state, errors: payload };
      }
      default:
        return state;
    }
  };
  
  export default adminReducer;
  