import {
  DEVICE_FAIL,
  DEVICE_REQUEST,
  DEVICE_SUCCESS,
  GET_DEVICE_EVENTS_BY_ID_FAIL,
  GET_DEVICE_EVENTS_BY_ID_SUCCESS,
  GET_DEVICE_EVENTS_BY_ID_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_FAIL,
  GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
  GET_REGISTERED_DEVICE_DETAILS_REQUEST,
  GET_DEVICE_ALARMS_BY_ID_FAIL,
  GET_DEVICE_ALARMS_BY_ID_REQUEST,
  GET_DEVICE_ALARMS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_REQUEST,
  GET_DEVICE_TRENDS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_FAIL,
  GET_DEVICE_LOGS_BY_ID_FAIL,
  GET_DEVICE_LOGS_BY_ID_REQUEST,
  GET_DEVICE_LOGS_BY_ID_SUCCESS,
  GET_LOG_MSG_OCCURENCE_FAIL,
  GET_LOG_MSG_OCCURENCE_REQUEST,
  GET_LOG_MSG_OCCURENCE_SUCCESS,
  GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
  GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
  GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
  GET_DEVICE_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_FAIL,
  GET_DEVICE_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST,
  GET_DEVICE_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
  GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_REQUEST,
  GET_ABOUT_SECTION_BY_ID_SUCCESS,
  GET_ABOUT_SECTION_BY_ID_FAIL,
  GET_SERVICE_RECORDS_DETAILS,
  GET_SERVICE_RECORDS_DETAILS_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS_FAIL,
  GET_SINGLE_DEVICEID_REQUEST,
  GET_SINGLE_DEVICEID_SUCCESS,
  GET_SINGLE_DEVICEID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
  GET_SINGLE_DEVICEIDBY_USERID_REQUEST,
  GET_SINGLE_DEVICEIDBY_USERID_FAIL,
  GET_SINGLE_UPLOAD_FILE_REQUEST,
  GET_SINGLE_UPLOAD_FILE_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_FAIL,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_SUCCESS,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_FAIL,
  GET_PATIENT_DETAILS_SUCCESS,
  GET_PATIENT_DETAILS_FAIL,
  GET_PATIENT_DETAILS_REQUEST,
  GET_PATIENT_DETAILS_BY_UHID_SUCCESS,
  GET_PATIENT_DETAILS_BY_UHID_FAIL,
  GET_PATIENT_DETAILS_BY_UHID_REQUEST,
  GET_PATIENT_DIAGNOSE_REQUEST,
  GET_PATIENT_DIAGNOSE_SUCCESS,
  GET_PATIENT_DIAGNOSE_FAIL,
  GET_UHIDS_LIST_SUCCESS,
  GET_UHIDS_LIST_REQUEST,
  GET_UHIDS_LIST_FAIL,
  GET_SINGLE_PRODUCTION_DATA_REQUEST,
  GET_SINGLE_PRODUCTION_DATA_SUCCESS,
  GET_SINGLE_PRODUCTION_DATA_FAIL,
  NEW_DEVICES_SUCCESS,
  NEW_DEVICES_REQUEST,
  NEW_DEVICES_FAIL,
  GET_NEW_DEVICES_EVENTS_BY_ID_REQUEST,
  GET_NEW_DEVICES_EVENTS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_EVENTS_BY_ID_FAIL,
  GET_NEW_DEVICES_ALARMS_BY_ID_REQUEST,
  GET_NEW_DEVICES_ALARMS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_ALARMS_BY_ID_FAIL,
  GET_NEW_DEVICES_LOGS_BY_ID_REQUEST,
  GET_NEW_DEVICES_LOGS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_LOGS_BY_ID_FAIL,
  GET_NEW_DEVICES_OF_TRENDS_BY_ID_REQUEST,
  GET_NEW_DEVICES_OF_TRENDS_BY_ID_SUCCESS,
  GET_NEW_DEVICES_OF_TRENDS_BY_ID_FAIL,
  GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_REQUEST,
  GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_SUCCESS,
  GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_FAIL,
  GET_PATIENT_DISCHARGE_REQUEST,
  GET_PATIENT_DISCHARGE_SUCCESS,
  GET_PATIENT_DISCHARGE_FAIL,
  GET_LOCK_KEY_BYDEVICEID_ACTION,
  GET_LOCK_KEY_BYDEVICEID_SUCCESS,
  GET_LOCK_KEY_BYDEVICEID_FAIL,
  GET_ALL_USER_COUNT_DATA_REQUEST,
  GET_ALL_USER_COUNT_DATA_SUCCESS,
  GET_ALL_USER_COUNT_DATA_FAIL
} from "../types/DeviceConstant";

export const deviceReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_REQUEST:
      return {
        loading: true,
      };
    case DEVICE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case DEVICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const newDeviceReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_DEVICES_REQUEST:
      return {
        loading: true,
      };
    case NEW_DEVICES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case NEW_DEVICES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// deviceAssignByUserId
export const deviceAssignDataByUserId = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_DEVICEIDBY_USERID_REQUEST:
      return {
        loading: true,
      };
    case GET_SINGLE_DEVICEIDBY_USERID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_SINGLE_DEVICEIDBY_USERID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
//  About Reducer
export const getAllAboutByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ABOUT_SECTION_BY_ID_REQUEST:
      return { loading: true };

    case GET_ABOUT_SECTION_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_ABOUT_SECTION_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
// Event Reducer
export const getAllEventsByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_EVENTS_BY_ID_REQUEST:
      return { loading: true };

    case GET_DEVICE_EVENTS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_DEVICE_EVENTS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getAllEventsByNewDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_DEVICES_EVENTS_BY_ID_REQUEST:
      return { loading: true };

    case GET_NEW_DEVICES_EVENTS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_NEW_DEVICES_EVENTS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
// Alarm Reducer
export const getAllAlarmsByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_ALARMS_BY_ID_REQUEST:
      return { loading: true };

    case GET_DEVICE_ALARMS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_DEVICE_ALARMS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getAllAlarmsByNewDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_DEVICES_ALARMS_BY_ID_REQUEST:
      return { loading: true };

    case GET_NEW_DEVICES_ALARMS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_NEW_DEVICES_ALARMS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

// Trends Reducer
export const getAllTrendsByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_TRENDS_BY_ID_REQUEST:
      return { loading: true };

    case GET_DEVICE_TRENDS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_DEVICE_TRENDS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

// THIS IS THE REDUCER SECTION DATA OF NEW DEVICES OF TRENDS 
export const getAllTrendsByNewDevicesIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_DEVICES_OF_TRENDS_BY_ID_REQUEST:
      return { loading: true };

    case GET_NEW_DEVICES_OF_TRENDS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_NEW_DEVICES_OF_TRENDS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
// Calibation Reducer
export const getCalibrationByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_CALIBRATION_BY_ID_REQUEST:
      return { loading: true };

    case GET_DEVICE_CALIBRATION_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_DEVICE_CALIBRATION_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
export const getAllLogsByDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_LOGS_BY_ID_REQUEST:
      return { loading: true };

    case GET_DEVICE_LOGS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_DEVICE_LOGS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getAllLogsByNewDeviceIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_DEVICES_LOGS_BY_ID_REQUEST:
      return { loading: true };

    case GET_NEW_DEVICES_LOGS_BY_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_NEW_DEVICES_LOGS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getRegisteredDetailsReducer = (state = {}, action) => {
  // console.log(`payload ${action.payload}`)
  switch (action.type) {
    case GET_REGISTERED_DEVICE_DETAILS_REQUEST:
      return { loading: true };

    case GET_REGISTERED_DEVICE_DETAILS_SUCCESS:
      return {
        loading: false,
        data12: action.payload,
      }
    case GET_REGISTERED_DEVICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }

}
export const getLogMsgOccurenceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_MSG_OCCURENCE_REQUEST:
      return { loading: true };

    case GET_LOG_MSG_OCCURENCE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOG_MSG_OCCURENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export const getDeviceCrashAnalyticsDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST:
      return { loading: true };

    case GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export const getDeviceLogMsgOccurenceWRTDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEVICE_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST:
      return { loading: true };

    case GET_DEVICE_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_DEVICE_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export const getAllServiceRecordsDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_SERVICE_RECORDS_DETAILS:
      return { loading: true };

    case GET_SERVICE_RECORDS_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_SERVICE_RECORDS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
export const getAllSectionByDeviceId = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_DEVICEID_REQUEST:
      return { loading: true };

    case GET_SINGLE_DEVICEID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_SINGLE_DEVICEID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getSingleUploadFileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_UPLOAD_FILE_REQUEST:
      return { loading: true };

    case GET_SINGLE_UPLOAD_FILE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_SINGLE_UPLOAD_FILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getDeviceIdBySerialNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SERIAL_NO_BY_DEVICE_ID_REQUEST:
      return { loading: true };

    case GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getPatientDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PATIENT_DETAILS_REQUEST:
      return { loading: true };

    case GET_PATIENT_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_PATIENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getPatientDetailsByUhidReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PATIENT_DETAILS_BY_UHID_REQUEST:
      return { loading: true };

    case GET_PATIENT_DETAILS_BY_UHID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_PATIENT_DETAILS_BY_UHID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getPatientNewDetailsOfDevicesByUhidReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_REQUEST:
      return { loading: true };

    case GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getPatientDiagnose = (state = {}, action) => {
  switch (action.type) {
    case GET_PATIENT_DIAGNOSE_REQUEST:
      return { loading: true };

    case GET_PATIENT_DIAGNOSE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_PATIENT_DIAGNOSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getUhidsListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_UHIDS_LIST_REQUEST:
      return { loading: true };

    case GET_UHIDS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_UHIDS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}


export const getSingleProductionDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCTION_DATA_REQUEST:
      return { loading: true };

    case GET_SINGLE_PRODUCTION_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_SINGLE_PRODUCTION_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export const getPatientDischargeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PATIENT_DISCHARGE_REQUEST:
      return { loading: true };

    case GET_PATIENT_DISCHARGE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_PATIENT_DISCHARGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}