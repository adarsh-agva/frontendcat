import axios from "axios";
import Cookies from 'universal-cookie';
import {
    VERIFY_EMAIL_FOR_SUPPORT_REQUEST,
    VERIFY_EMAIL_FOR_SUPPORT_REQUEST_SUCCESS,
    VERIFY_EMAIL_FOR_SUPPORT_REQUEST_FAIL,
    VERIFY_OTP_FOR_SUPPORT_REQUEST,
    VERIFY_OTP_FOR_SUPPORT_REQUEST_SUCCESS,
    VERIFY_OTP_FOR_SUPPORT_REQUEST_FAIL,
    GET_DEVICEID_BY_HOSPITAL_REQUEST,
    GET_DEVICEID_BY_HOSPITAL_SUCCESS,
    GET_DEVICEID_BY_HOSPITAL_FAIL
} from "../types/VerifyEmailsConstant";
const cookies = new Cookies();

export const verifyEmialForSuppport = (email) => async (dispatch) => {
    try {
        dispatch({
            type: VERIFY_EMAIL_FOR_SUPPORT_REQUEST,
        });
        const token = cookies.get('ddAdminToken');
        console.log('000', email)
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        let response;
        response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/common/send-verification-email`,
            { email },
            config
        );
        dispatch({
            type: VERIFY_EMAIL_FOR_SUPPORT_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: VERIFY_EMAIL_FOR_SUPPORT_REQUEST_FAIL,
            payload:
                error &&
                error.response &&
                error.response.data &&
                error.response.data.data &&
                error.response.data.data.err &&
                error.response.data.data.err.msg,
        });
    }
};

export const verifyOtpForSuppport = (otp) => async (dispatch) => {
    try {
        dispatch({
            type: VERIFY_OTP_FOR_SUPPORT_REQUEST,
        });
        const token = cookies.get('ddAdminToken');
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        let response;
        response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/common/verify-otp`,
            { otp },
            config
        );
        dispatch({
            type: VERIFY_OTP_FOR_SUPPORT_REQUEST_SUCCESS,
            payload: response.data,
        });
        // if (response.data.statusCode == 200) {
        //    console.log()
        //     alert(response.data.message)
        // }
    } catch (error) {
        // if (error.response.data.statusCode == 400) {
        //     alert(error.response.data.message)
        // }
        dispatch({
            type: VERIFY_OTP_FOR_SUPPORT_REQUEST_FAIL,
            payload:
                error &&
                error.response &&
                error.response.data &&
                error.response.data.data &&
                error.response.data.data.err &&
                error.response.data.data.err.msg,
        });
    }
};

export const getDeviceIdListByHospitalName = (hospitalName) => async (dispatch) => {
    try {
        dispatch({
            type: GET_DEVICEID_BY_HOSPITAL_REQUEST,
        });
        const token = cookies.get('ddAdminToken');
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        let response;
        response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/devices/get-devices-by-hospital/${hospitalName}`,
            config
        );
        dispatch({
            type: GET_DEVICEID_BY_HOSPITAL_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_DEVICEID_BY_HOSPITAL_FAIL,
            payload:
                error &&
                error.response &&
                error.response.data &&
                error.response.data.data &&
                error.response.data.data.err &&
                error.response.data.data.err.msg,
        });
    }
};