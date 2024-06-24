import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_REQUEST_SUCCESS,
  GET_PROJECT_REQUEST_FAIL,
  GET_ALL_LOG_BY_CODE_REQUEST,
  GET_ALL_LOG_BY_CODE_SUCCESS,
  GET_ALL_LOG_BY_CODE_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST,
  UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
  UPLOAD_NEW_PROJECT_REQUEST_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST_RESET,
  GET_LOG_COUNT_REQUEST,
  GET_LOG_COUNT_SUCCESS,
  GET_LOG_COUNT_FAIL,
  GET_LOG_COUNT_BY_DATE_REQUEST,
  GET_LOG_COUNT_BY_DATE_SUCCESS,
  GET_LOG_COUNT_BY_DATE_FAIL,
  GET_ERROR_WRT_OS_REQUEST,
  GET_ERROR_WRT_OS_REQUEST_SUCCESS,
  GET_ERROR_WRT_OS_REQUEST_FAIL,
  GET_ERROR_COUNT_BY_VERSION_REQUEST,
  GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS,
  GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL,
  GET_DEVICE_INFO_REQUEST,
  GET_DEVICE_INFO_REQUEST_SUCCESS,
  GET_DEVICE_INFO_REQUEST_FAIL,
  GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST,
  GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
  GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_FAIL,
  GET_CRASH_FREE_USERS_REQUEST,
  GET_CRASH_FREE_USERS_REQUEST_SUCCESS,
  GET_CRASH_FREE_USERS_REQUEST_FAIL,
  GET_CRASH_ANALYTICS_DATA_REQUEST,
  GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS,
  GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL,
  GET_CRASH_FREE_USERS_DATA_REQUEST,
  GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS,
  GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL,
  GET_MODEL_CODE_REQUEST,
  GET_MODEL_CODE_SUCCESS,
  GET_MODEL_CODE_FAIL,
  ADD_CRASH_EMAIL_REQUEST,
  ADD_CRASH_EMAIL_REQUEST_SUCCESS,
  ADD_CRASH_EMAIL_REQUEST_FAIL,
  GET_PROJECT_BY_CODE_REQUEST,
  GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
  GET_PROJECT_BY_CODE_REQUEST_FAIL,
  GET_DEVICE_DETAILS_REQUEST,
  GET_DEVICE_DETAILS_SUCCESS,
  GET_DEVICE_DETAILS_FAIL,
} from "../types/ProjectConstants";

export const getAllProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
      return {
        loading: true,
      };
    case GET_PROJECT_REQUEST_SUCCESS:
      return {
        loading: false,
        allProjectData: action.payload,
      };
    case GET_PROJECT_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllLogByCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_LOG_BY_CODE_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_LOG_BY_CODE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_LOG_BY_CODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createNewProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_NEW_PROJECT_REQUEST:
      return { loading: true };

    case UPLOAD_NEW_PROJECT_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPLOAD_NEW_PROJECT_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPLOAD_NEW_PROJECT_REQUEST_RESET:
      return {
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getLogCountsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_COUNT_REQUEST:
      return { loading: true };

    case GET_LOG_COUNT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getLogCountsByDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_COUNT_BY_DATE_REQUEST:
      return { loading: true };

    case GET_LOG_COUNT_BY_DATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_COUNT_BY_DATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getErrorWRTOSReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERROR_WRT_OS_REQUEST:
      return { loading: true };

    case GET_ERROR_WRT_OS_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ERROR_WRT_OS_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getErrorWRTVersionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERROR_COUNT_BY_VERSION_REQUEST:
      return { loading: true };

    case GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDeviceInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_INFO_REQUEST:
      return { loading: true };

    case GET_DEVICE_INFO_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEVICE_INFO_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getLogMsgOccurenceWRTDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST:
      return { loading: true };

    case GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCrashFreeUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRASH_FREE_USERS_REQUEST:
      return { loading: true };

    case GET_CRASH_FREE_USERS_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRASH_FREE_USERS_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCrashAnalyticsDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRASH_ANALYTICS_DATA_REQUEST:
      return { loading: true };

    case GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCrashFreeUsersDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRASH_FREE_USERS_DATA_REQUEST:
      return { loading: true };

    case GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getModelCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MODEL_CODE_REQUEST:
      return { loading: true };

    case GET_MODEL_CODE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_MODEL_CODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addCrashEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CRASH_EMAIL_REQUEST:
      return { loading: true };

    case ADD_CRASH_EMAIL_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ADD_CRASH_EMAIL_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProjectByCodeSettingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT_BY_CODE_REQUEST:
      return { loading: true };

    case GET_PROJECT_BY_CODE_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_PROJECT_BY_CODE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllDeviceLogsReducer =(state={},action)=>{
  switch(action.type){
      case GET_DEVICE_DETAILS_REQUEST:
          return{
              loading:true,
          };
      case GET_DEVICE_DETAILS_SUCCESS:
          return{
              loading:false,
              allDeviceData:action.payload,
          }
      case GET_DEVICE_DETAILS_FAIL:
          return{
              loading:false,
              error:action.payload
          };
      default:
          return state;
  }
};