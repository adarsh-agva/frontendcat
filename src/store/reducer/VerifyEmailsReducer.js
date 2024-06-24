import {
    VERIFY_OTP_FOR_SUPPORT_REQUEST,
    VERIFY_OTP_FOR_SUPPORT_REQUEST_SUCCESS,
    VERIFY_OTP_FOR_SUPPORT_REQUEST_FAIL,
    VERIFY_EMAIL_FOR_SUPPORT_REQUEST,
    VERIFY_EMAIL_FOR_SUPPORT_REQUEST_SUCCESS,
    VERIFY_EMAIL_FOR_SUPPORT_REQUEST_FAIL,
    GET_DEVICEID_BY_HOSPITAL_REQUEST,
    GET_DEVICEID_BY_HOSPITAL_SUCCESS,
    GET_DEVICEID_BY_HOSPITAL_FAIL
} from "../types/VerifyEmailsConstant";

export const verifyOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_OTP_FOR_SUPPORT_REQUEST:
            return {
                loading: true,
            };
        case VERIFY_OTP_FOR_SUPPORT_REQUEST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case VERIFY_OTP_FOR_SUPPORT_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const verifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_EMAIL_FOR_SUPPORT_REQUEST:
            return {
                loading: true,
            };
        case VERIFY_EMAIL_FOR_SUPPORT_REQUEST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case VERIFY_EMAIL_FOR_SUPPORT_REQUEST_FAIL:
            return {
                loading: false,
                message: action.payload,
            };
        case VERIFY_EMAIL_FOR_SUPPORT_REQUEST_FAIL: {
            return {
                ...state,
                message: action.payload,
            };
        }
        default:
            return state;
    }
};
export const deviceIdByHospitalNameReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DEVICEID_BY_HOSPITAL_REQUEST:
            return {
                loading: true,
            };
        case GET_DEVICEID_BY_HOSPITAL_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DEVICEID_BY_HOSPITAL_FAIL:
            return {
                loading: false,
                message: action.payload,
            };
        case GET_DEVICEID_BY_HOSPITAL_FAIL: {
            return {
                ...state,
                message: action.payload,
            };
        }
        default:
            return state;
    }
};