import { UPDATE_FAIL, UPDATE_REQUEST, UPDATE_SUCCESS } from "../types/UpdateUserInfoConstants";

export const updateUserInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};