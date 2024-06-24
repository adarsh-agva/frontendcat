import {
    STORE_SYSTEM_REQUEST,
    STORE_SYSTEM_SUCCESS,
    STORE_SYSTEM_FAIL,
    ALL_HOSPITAL_DATA_REQUEST,
    ALL_HOSPITAL_DATA_SUCCESS,
    ALL_HOSPITAL_DATA_FAIL,
    ALL_TICKETS_DATA_BY_EMAIL_REQUEST_FAIL,
    ALL_TICKETS_DATA_BY_EMAIL_REQUEST_SUCCESS,
    ALL_TICKETS_DATA_BY_EMAIL_REQUEST,
    GET_HOSPITAL_REGISTER_DATA_SUCCESS,
    GET_HOSPITAL_REGISTER_DATA_FAIL,
    GET_HOSPITAL_REGISTER_DATA_REQUEST,
    GET_HOSPITAL_LIST_BY_PINCODE_REQUEST,
    GET_HOSPITAL_LIST_BY_PINCODE_SUCCESS,
    GET_HOSPITAL_LIST_BY_PINCODE_FAIL,
} from "../types/StoreConstant";
export const storeSystemReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_SYSTEM_REQUEST:
            return {
                loading: true,
            };
        case STORE_SYSTEM_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case STORE_SYSTEM_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const allHospitalDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_HOSPITAL_DATA_REQUEST:
            return {
                loading: true,
            };
        case ALL_HOSPITAL_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ALL_HOSPITAL_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const allTicketDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_TICKETS_DATA_BY_EMAIL_REQUEST:
            return {
                loading: true,
            };
        case ALL_TICKETS_DATA_BY_EMAIL_REQUEST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ALL_TICKETS_DATA_BY_EMAIL_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getHospitalFromAdding = (state = {}, action) => {
    switch (action.type) {
        case GET_HOSPITAL_REGISTER_DATA_REQUEST:
            return {
                loading: true,
            };
        case GET_HOSPITAL_REGISTER_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_HOSPITAL_REGISTER_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getHospitalListByPincodeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_HOSPITAL_LIST_BY_PINCODE_REQUEST:
            return {
                loading: true,
            };
        case GET_HOSPITAL_LIST_BY_PINCODE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_HOSPITAL_LIST_BY_PINCODE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
