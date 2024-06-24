import {
  ALARM_FAIL,
  ALARM_REQUEST,
  ALARM_SUCCESS,
} from "../types/AlarmConstant";

export const alarmReducer = (state = {}, action) => {
  switch (action.type) {
    case ALARM_REQUEST:
      return {
        loading: true,
      };
    case ALARM_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALARM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
