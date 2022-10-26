import axios from 'axios';
import {
    ADMINLOGIN,
    ADMINLOGIN_FAILED,
    ADMINLOGIN_SUCCESS,
    ADMINREGISTRATION_FAILED,
    ADMINREGISTRATION_SUCCESS,
} from '../constants/adminConstants';

export const adminSignup =() => {
    axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: {
         
        },
      })
        .then((res) => {
          console.log(res.data);
          dispatch(adminSignupSuccess(res.data));
        //   history.goBack();
        })
        .catch((err) => {
          dispatch(adminSignupFailed(err));
        //   notification.error({
        //     message: "Oops!",
        //     description: "Account or password is not wrong!",
        //   });
        });

}
export const adminSignIn =() => {
    axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: {
         
        },
      })
        .then((res) => {
          console.log(res.data);
          dispatch(adminSignupSuccess(res.data));
        //   history.goBack();
        })
        .catch((err) => {
          dispatch(adminSignupFailed(err));
        //   notification.error({
        //     message: "Oops!",
        //     description: "Account or password is not wrong!",
        //   });
        });
    
}
export const adminSignupSuccess =(data) => {
    return {
        type: ADMINREGISTRATION_SUCCESS,
        payload: data,
    };
    
}
export const adminSignupFailed =(err) => {
    return {
        type: ADMINREGISTRATION_FAILED,
        payload: err,
    };
    
}
export const adminSignInSuccess =(data) => {
    return {
        type: ADMINLOGIN_SUCCESS,
        payload: data,
    };
}
export const adminSignInFailed =(err) => {
    return {
        type: ADMINLOGIN_FAILED,
        payload: err,
    }; 
}