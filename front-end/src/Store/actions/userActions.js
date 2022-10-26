import axios from 'axios';
import {
    ADMINLOGIN,
    USERLOGIN_FAILED,
    USERLOGIN_SUCCESS,
    USERREGISTRATION_FAILED,
    USERREGISTRATION_SUCCESS,
} from '../constants/userConstants';

export const userSignup =() => {
    axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: {
         
        },
      })
        .then((res) => {
          console.log(res.data);
          dispatch(userSignupSuccess(res.data));
        //   history.goBack();
        })
        .catch((err) => {
          dispatch(userSignupFailed(err));
        //   notification.error({
        //     message: "Oops!",
        //     description: "Account or password is not wrong!",
        //   });
        });

}
export const userSignIn =() => {
    axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: {
         
        },
      })
        .then((res) => {
          console.log(res.data);
          dispatch(userSignupSuccess(res.data));
        //   history.goBack();
        })
        .catch((err) => {
          dispatch(userSignupFailed(err));
        //   notification.error({
        //     message: "Oops!",
        //     description: "Account or password is not wrong!",
        //   });
        });
    
}
export const userSignupSuccess =(data) => {
    return {
        type: USERREGISTRATION_SUCCESS,
        payload: data,
    };
    
}
export const userSignupFailed =(err) => {
    return {
        type: USERREGISTRATION_FAILED,
        payload: err,
    };
    
}
export const userSignInSuccess =(data) => {
    return {
        type: USERLOGIN_SUCCESS,
        payload: data,
    };
}
export const userSignInFailed =(err) => {
    return {
        type: USERLOGIN_FAILED,
        payload: err,
    }; 
}