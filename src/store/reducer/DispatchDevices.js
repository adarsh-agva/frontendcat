import { DISPATCH_DETAILS_FAIL, DISPATCH_DETAILS_REQUEST,  GET_COMPLETE_DISPATCHED_SUCCESS,
    GET_COMPLETE_DISPATCHED_FAIL,
    GET_COMPLETE_DISPATCHED_REQUEST, DISPATCH_DETAILS_SUCCESS, GET_ACCOUNT_DETAILS_FAIL, GET_ACCOUNT_DETAILS_REQUEST, GET_ACCOUNT_DETAILS_SUCCESS, GET_ACCOUNT_PENDING_DETAILS_FAIL, GET_ACCOUNT_PENDING_DETAILS_REQUEST, GET_ACCOUNT_PENDING_DETAILS_SUCCESS, GET_AWATING_SHIPMENT_WATING_FAIL, GET_AWATING_SHIPMENT_WATING_REQUEST, GET_AWATING_SHIPMENT_WATING_SUCCESS, GET_DATA_BY_SERIAL_NUMBER_FAIL, GET_DATA_BY_SERIAL_NUMBER_REQUEST, GET_DATA_BY_SERIAL_NUMBER_SUCCESS, GET_DEVICEID_FROM_PRODUCTION_FAIL, GET_DEVICEID_FROM_PRODUCTION_REQUEST, GET_DEVICEID_FROM_PRODUCTION_SUCCESS, GET_DHR_UPLOAD_FILE_FAIL, GET_DHR_UPLOAD_FILE_REQUEST, GET_DHR_UPLOAD_FILE_SUCCESS, GET_DISPATCH_DETAILS_DATA_BYID_FAIL, GET_DISPATCH_DETAILS_DATA_BYID_REQUEST, GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS, GET_DISPATCH_DETAILS_DATA_FAIL, GET_DISPATCH_DETAILS_DATA_REQUEST, GET_DISPATCH_DETAILS_DATA_SUCCESS, GET_PINCODE_DATA_FAIL, GET_PINCODE_DATA_REQUEST, GET_PINCODE_DATA_SUCCESS, GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL, GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST, GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS, GET_PRODUCTION_DETAILS_DATA_FAIL, GET_PRODUCTION_DETAILS_DATA_REQUEST, GET_PRODUCTION_DETAILS_DATA_SUCCESS, GET_READY_FOR_DISPATCH_FAIL, GET_READY_FOR_DISPATCH_REQUEST, GET_READY_FOR_DISPATCH_SUCCESS, GET_SERIAL_NUMBER_LIST_FAIL, GET_SERIAL_NUMBER_LIST_REQUEST, GET_SERIAL_NUMBER_LIST_SUCCESS, GET_SINGLE_HOSPITAL_DETAILS_FAIL, GET_SINGLE_HOSPITAL_DETAILS_REQUEST, GET_SINGLE_HOSPITAL_DETAILS_SUCCESS, GET_SINGLE_SERIAL_NO_TRACK_DATA_FAIL, GET_SINGLE_SERIAL_NO_TRACK_DATA_REQUEST, GET_SINGLE_SERIAL_NO_TRACK_DATA_SUCCESS, GET_EDIT_PRODUCTION_DATA_REQUEST, GET_EDIT_PRODUCTION_DATA_SUCCESS, GET_EDIT_PRODUCTION_DATA_FAIL, GET_EDIT_LIST_DATA_PRODUCTION_REQUEST, GET_EDIT_LIST_DATA_PRODUCTION_SUCCESS, GET_EDIT_LIST_DATA_PRODUCTION_FAIL, GET_RETURN_DEVICE_TO_ACCOUNT_REQUEST, GET_RETURN_DEVICE_TO_ACCOUNT_SUCCESS, GET_RETURN_DEVICE_TO_ACCOUNT_FAIL } from "../types/DispatchDeviceType";

export const dispatchDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_DETAILS_REQUEST:
            return { loading: true };

        case DISPATCH_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case DISPATCH_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const dispatchAllDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DISPATCH_DETAILS_DATA_REQUEST:
            return { loading: true };

        case GET_DISPATCH_DETAILS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DISPATCH_DETAILS_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const dispatchAllDetailsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DISPATCH_DETAILS_DATA_BYID_REQUEST:
            return { loading: true };

        case GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DISPATCH_DETAILS_DATA_BYID_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productionAllDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCTION_DETAILS_DATA_REQUEST:
            return { loading: true };

        case GET_PRODUCTION_DETAILS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_PRODUCTION_DETAILS_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productionAllDetailsByUserIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST:
            return { loading: true };

        case GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getdhrqualityFileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DHR_UPLOAD_FILE_REQUEST:
            return { loading: true };

        case GET_DHR_UPLOAD_FILE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DHR_UPLOAD_FILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getPiincodeDatReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PINCODE_DATA_REQUEST:
            return { loading: true };

        case GET_PINCODE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_PINCODE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getDeviceIdProductionReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DEVICEID_FROM_PRODUCTION_REQUEST:
            return { loading: true };

        case GET_DEVICEID_FROM_PRODUCTION_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DEVICEID_FROM_PRODUCTION_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getHospitalDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_HOSPITAL_DETAILS_REQUEST:
            return { loading: true };

        case GET_SINGLE_HOSPITAL_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_SINGLE_HOSPITAL_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getSerialNumberListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SERIAL_NUMBER_LIST_REQUEST:
            return { loading: true };

        case GET_SERIAL_NUMBER_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_SERIAL_NUMBER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getSingleSerialNoTrackReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_SERIAL_NO_TRACK_DATA_REQUEST:
            return { loading: true };

        case GET_SINGLE_SERIAL_NO_TRACK_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_SINGLE_SERIAL_NO_TRACK_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getAccountDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACCOUNT_DETAILS_REQUEST:
            return { loading: true };

        case GET_ACCOUNT_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_ACCOUNT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getDispatchPendingDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACCOUNT_PENDING_DETAILS_REQUEST:
            return { loading: true };

        case GET_ACCOUNT_PENDING_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_ACCOUNT_PENDING_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getShipmentAwatingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_AWATING_SHIPMENT_WATING_REQUEST:
            return { loading: true };

        case GET_AWATING_SHIPMENT_WATING_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_AWATING_SHIPMENT_WATING_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const getAccountDataBySerialNumberReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DATA_BY_SERIAL_NUMBER_REQUEST:
            return { loading: true };

        case GET_DATA_BY_SERIAL_NUMBER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DATA_BY_SERIAL_NUMBER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};




export const getReadyForDispatchDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_READY_FOR_DISPATCH_REQUEST:
            return { loading: true };

        case GET_READY_FOR_DISPATCH_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_READY_FOR_DISPATCH_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};



export const getCompleteDispatchedReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMPLETE_DISPATCHED_REQUEST:
            return { loading: true };

        case GET_COMPLETE_DISPATCHED_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_COMPLETE_DISPATCHED_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};




export const getEditProductionDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EDIT_PRODUCTION_DATA_REQUEST:
            return { loading: true };

        case GET_EDIT_PRODUCTION_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_EDIT_PRODUCTION_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};



export const getEditListDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EDIT_LIST_DATA_PRODUCTION_REQUEST:
            return { loading: true };

        case GET_EDIT_LIST_DATA_PRODUCTION_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_EDIT_LIST_DATA_PRODUCTION_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};




export const getReturnDataToAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_RETURN_DEVICE_TO_ACCOUNT_REQUEST:
            return { loading: true };

        case GET_RETURN_DEVICE_TO_ACCOUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_RETURN_DEVICE_TO_ACCOUNT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};