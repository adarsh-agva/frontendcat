import {
    LIVE_DATA_REQUEST,
    LIVE_DATA_SUCCESS,
    LIVE_DATA_FAIL
} from "../types/LiveConstants";
export const liveDataReducer = (state = {}, action) => {
    switch (action.type) {
      case LIVE_DATA_REQUEST:
        return {
          loading: true,
        };
      case LIVE_DATA_SUCCESS:
        return {
          loading: false,
          adminInfo: action.payload,
        };
      case LIVE_DATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case LIVE_DATA_FAIL: {
        return {
          ...state,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  };