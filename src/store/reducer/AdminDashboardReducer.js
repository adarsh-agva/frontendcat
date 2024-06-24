import {
  ALL_USERS_DETAILS_REQUEST,
  ALL_USERS_DETAILS_SUCCESS,
  ALL_USERS_DETAILS_FAIL,
  UPDATE_ALL_USERS_REQUEST,
  UPDATE_ALL_USERS_SUCCESS,
  UPDATE_ALL_USERS_FAIL,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL,
  DEVICE_ACTION_REQUEST,
  DEVICE_ACTION_SUCCESS,
  DEVICE_ACTION_FAIL,
  DEVICE_DELETE_REQUEST,
  DEVICE_DELETE_SUCCESS,
  DEVICE_DELETE_FAIL,
  ALL_ACTIVE_USERS_REQUEST,
  ALL_ACTIVE_USERS_SUCCESS,
  ALL_ACTIVE_USERS_FAIL,
  ALL_PENDING_USERS_REQUEST,
  ALL_PENDING_USERS_SUCCESS,
  ALL_PENDING_USERS_FAIL,
  PUT_APP_DISAPPROVE_PENDING_REQUEST,
  PUT_APP_DISAPPROVE_PENDING_SUCCESS,
  PUT_APP_DISAPPROVE_PENDING_FAIL,
  GET_HOSPITAL_ADMIN_USER_REQUEST,
  GET_HOSPITAL_ADMIN_USER_SUCCESS,
  GET_HOSPITAL_ADMIN_USER_FAIL,
  GET_USERDATA_BY_DEVICEiD_REQUEST,
  GET_USERDATA_BY_DEVICEiD_SUCCESS,
  GET_USERDATA_BY_DEVICEiD_FAIL,
  GET_ACCESS_DATA_ACTION_REQUEST,
  GET_ACCESS_DATA_ACTION_SUCCESS,
  GET_ACCESS_DATA_ACTION_FAIL,
  GET_ACCESS_REVIEW_DATA_ACTION_REQUEST,
  GET_ACCESS_REVIEW_DATA_ACTION_SUCCESS,
  GET_ACCESS_REVIEW_DATA_ACTION_FAIL,
  GET_ACTIVE_ADMIN_REQUEST,
  GET_ACTIVE_ADMIN_SUCCESS,
  GET_ACTIVE_ADMIN_FAIL,
  GET_EMPLOYEE_LIST_REQUEST,
  GET_EMPLOYEE_LIST_SUCCCESS,
  GET_EMPLOYEE_LIST_FAIL,
  GET_SOLD_DEMO_DATA_FAIL,
  GET_SOLD_DEMO_DATA_REQUEST,
  GET_SOLD_DEMO_DATA_SUCCESS,
  GET_ASSISTANT_REQUEST,
  GET_ASSISTANT_SUCCESS,
  GET_ASSISTANT_FAIL,
  ALL_INACTIVE_USERS_REQUEST,
  ALL_INACTIVE_USERS_SUCCESS,
  ALL_INACTIVE_USERS_FAIL,
  GET_DOCTOR_ACCESS_LIST_REQUEST,
  GET_DOCTOR_ACCESS_LIST_SUCCESS,
  GET_DOCTOR_ACCESS_LIST_FAIL,
  GET_ALL_ACCESS_DEVICE_TO_USER_ACTION,
  GET_ALL_ACCESS_DEVICE_TO_USER_SUCCESS,
  GET_ALL_ACCESS_DEVICE_TO_USER_FAIL
} from "../types/AdminDashboard";

export const allUsersDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_USERS_DETAILS_REQUEST:
      return { loading: true };

    case ALL_USERS_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALL_USERS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateAllUsersDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ALL_USERS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_ALL_USERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPDATE_ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const dashboardDataDefault = (state = {}, action) => {
  switch (action.type) {
    case ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST:
      return {
        loading: true,
      };
    case ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const deviceActionReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_ACTION_REQUEST:
      return {
        loading: true,
      };
    case DEVICE_ACTION_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case DEVICE_ACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const deviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_DELETE_REQUEST:
      return {
        loading: true,
      };
    case DEVICE_DELETE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case DEVICE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const activeUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_ACTIVE_USERS_REQUEST:
      return {
        loading: true,
      };
    case ALL_ACTIVE_USERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALL_ACTIVE_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const pendingUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PENDING_USERS_REQUEST:
      return {
        loading: true,
      };
    case ALL_PENDING_USERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALL_PENDING_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const pendingRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_APP_DISAPPROVE_PENDING_REQUEST:
      return {
        loading: true,
      };
    case PUT_APP_DISAPPROVE_PENDING_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case PUT_APP_DISAPPROVE_PENDING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const getHospitalAdminUserRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HOSPITAL_ADMIN_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_HOSPITAL_ADMIN_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_HOSPITAL_ADMIN_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const getUserDataByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERDATA_BY_DEVICEiD_REQUEST:
      return {
        loading: true,
      };
    case GET_USERDATA_BY_DEVICEiD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_USERDATA_BY_DEVICEiD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};




export const getUserAccessDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACCESS_DATA_ACTION_REQUEST:
      return {
        loading: true,
      };
    case GET_ACCESS_DATA_ACTION_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ACCESS_DATA_ACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};




export const getAccessReviewDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACCESS_REVIEW_DATA_ACTION_REQUEST:
      return {
        loading: true,
      };
    case GET_ACCESS_REVIEW_DATA_ACTION_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ACCESS_REVIEW_DATA_ACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const getActiveAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case GET_ACTIVE_ADMIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ACTIVE_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const getEmployeeListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_EMPLOYEE_LIST_SUCCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_EMPLOYEE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDemoSoldDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SOLD_DEMO_DATA_REQUEST:
      return {
        loading: true,
      };
    case GET_SOLD_DEMO_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SOLD_DEMO_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAssistantRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ASSISTANT_REQUEST:
      return {
        loading: true,
      };
    case GET_ASSISTANT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ASSISTANT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getInacticeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_INACTIVE_USERS_REQUEST:
      return {
        loading: true,
      };
    case ALL_INACTIVE_USERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALL_INACTIVE_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDoctorAccessListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DOCTOR_ACCESS_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_DOCTOR_ACCESS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DOCTOR_ACCESS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllAccessDeviceToiUser = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACCESS_DEVICE_TO_USER_ACTION:
      return {
        loading: true,
      };
    case GET_ALL_ACCESS_DEVICE_TO_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_ACCESS_DEVICE_TO_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};