import axios from "axios";
import Cookies from "universal-cookie";
import {
  DEVICE_FAIL,
  DEVICE_REQUEST,
  DEVICE_SUCCESS,
  REGISTER_NEW_DEVICE_REQUEST,
  REGISTER_NEW_DEVICE_SUCCESS,
  REGISTER_NEW_DEVICE_FAIL,
  GET_DEVICE_EVENTS_BY_ID_FAIL,
  GET_DEVICE_EVENTS_BY_ID_SUCCESS,
  GET_DEVICE_EVENTS_BY_ID_REQUEST,
  UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
  UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
  UPDATE_DEVICE_DETAILS_BY_ID_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
  GET_REGISTERED_DEVICE_DETAILS_FAIL,
  GET_DEVICE_ALARMS_BY_ID_FAIL,
  GET_DEVICE_ALARMS_BY_ID_REQUEST,
  GET_DEVICE_ALARMS_BY_ID_SUCCESS,
  GET_DEVICE_LOGS_BY_ID_FAIL,
  GET_DEVICE_LOGS_BY_ID_REQUEST,
  GET_DEVICE_LOGS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_REQUEST,
  GET_DEVICE_TRENDS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_FAIL,
  GET_LOG_MSG_OCCURENCE_FAIL,
  GET_LOG_MSG_OCCURENCE_REQUEST,
  GET_LOG_MSG_OCCURENCE_SUCCESS,
  GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
  GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
  GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
  GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_REQUEST,
  GET_ABOUT_SECTION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS,
  GET_SERVICE_RECORDS_DETAILS_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS_FAIL,
  GET_SINGLE_DEVICEID_REQUEST,
  GET_SINGLE_DEVICEID_SUCCESS,
  GET_SINGLE_DEVICEID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_REQUEST,
  GET_SINGLE_DEVICEIDBY_USERID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_REQUEST,
  GET_SINGLE_UPLOAD_FILE_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_FAIL,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_SUCCESS,
  GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_FAIL,
  GET_PATIENT_DETAILS_REQUEST,
  GET_PATIENT_DETAILS_SUCCESS,
  GET_PATIENT_DETAILS_FAIL,
  GET_PATIENT_DETAILS_BY_UHID_REQUEST,
  GET_PATIENT_DETAILS_BY_UHID_SUCCESS,
  GET_PATIENT_DETAILS_BY_UHID_FAIL,
  PUT_PATIENT_DATA_REQUEST,
  PUT_PATIENT_DATA_SUCCESS,
  PUT_PATIENT_DATA_FAIL,
  ADD_PATIENT_DIAGNOSE_REQUEST,
  ADD_PATIENT_DIAGNOSE_SUCCESS,
  ADD_PATIENT_DIAGNOSE_FAIL,
  GET_PATIENT_DIAGNOSE_REQUEST,
  GET_PATIENT_DIAGNOSE_SUCCESS,
  GET_PATIENT_DIAGNOSE_FAIL,
  GET_UHIDS_LIST_REQUEST,
  GET_UHIDS_LIST_SUCCESS,
  GET_UHIDS_LIST_FAIL,
  GET_REQUEST_USER_DATA_REQUEST,
  GET_REQUEST_USER_DATA_SUCCESS,
  GET_REQUEST_USER_DATA_FAIL,
  GET_USER_DEVICE_REQUEST,
  GET_USER_DEVICE_SUCCESS,
  GET_USER_DEVICE_FAIL,
  GET_SINGLE_PRODUCTION_DATA_FAIL,
  GET_SINGLE_PRODUCTION_DATA_SUCCESS,
  GET_SINGLE_PRODUCTION_DATA_REQUEST,
  POST_EDIT_ACCOUNT_DETAILS_FAIL,
  POST_EDIT_ACCOUNT_DETAILS_SUCCESS,
  POST_EDIT_ACCOUNT_DETAILS_REQUEST,
  NEW_DEVICES_REQUEST,
  NEW_DEVICES_SUCCESS,
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
  POST_DEVICE_ID_FROM_LOCK_REQUEST,
  POST_DEVICE_ID_FROM_LOCK_SUCCESS,
  POST_DEVICE_ID_FROM_LOCK_FAIL,
  GET_ALL_USER_COUNT_DATA_FAIL,
  GET_ALL_USER_COUNT_DATA_SUCCESS,
  GET_ALL_USER_COUNT_DATA_REQUEST,
} from "../types/DeviceConstant";
import { toast } from "react-hot-toast";
const cookies = new Cookies();

export const deviceAction =
  ( page, limit, searchData ) =>
    async (dispatch) => {
      try {
        dispatch({
          type: DEVICE_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        let response;
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events?search=${searchData}&page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: DEVICE_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: DEVICE_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };


export const newDeviceAction =
  ({ page, limit, searchData, projectCode }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: NEW_DEVICES_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        let response;
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/AllEvents/Events/${projectCode}?search=${searchData}&page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: NEW_DEVICES_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: NEW_DEVICES_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getUserDeviceAction =
  ({ page, limit, searchData }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_USER_DEVICE_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        let response;
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events?search=${searchData}&page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_USER_DEVICE_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_USER_DEVICE_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

//Register API Used in EditDetailsModal
export const registerNewDevice =
  ({
    DeviceId,
    DepartmentName,
    HospitalName,
    DoctorName,
    Wardno,
    IMEINumber,
    VentiOperator,
    AliasName,
    deviceType
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: REGISTER_NEW_DEVICE_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/devices/register/`,
          {
            DeviceId,
            Department_Name: DepartmentName,
            Hospital_Name: HospitalName,
            Doctor_Name: DoctorName,
            Ward_No: Wardno,
            IMEI_NO: IMEINumber,
            Bio_Med: VentiOperator,
            Alias_Name: AliasName,
            deviceType: deviceType
          },
          config
        );
        dispatch({
          type: REGISTER_NEW_DEVICE_SUCCESS,
          payload: data,
        });
        if (data.statusCode === 200) {
          alert("Register Success");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        dispatch({
          type: REGISTER_NEW_DEVICE_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getRegisteredDetailsById =
  (
    DeviceID,
    DoctorName,
    HospitalName,
    Alias,
    IMEINumber,
    VentiOperator,
    Wardno
  ) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_REGISTERED_DEVICE_DETAILS_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/devices/`,
          {
            DeviceId: DeviceID,
            Doctor_Name: DoctorName,
            hospitalName: HospitalName,
            departmentName: Alias,
            IMEI_NO: IMEINumber,
            Bio_Med: VentiOperator,
            Ward_No: Wardno,
          },
          config
        );

        dispatch({
          type: GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: GET_REGISTERED_DEVICE_DETAILS_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

// If yopu saw an error regarding deviceId,  _ref kind of so just do {deviceId} to deviceId
export const getSingleDeviceIdDetails = (DeviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_DEVICEID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/getdevice/${DeviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_DEVICEID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_DEVICEID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    });
  }
};
export const getSingleDeviceIdByUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getAssignedDeviceByUserId/${userId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    });
  }
};
export const updateDetailsById =
  ({
    DeviceId,
    departmentName,
    hospitalName,
    Doctor_Name,
    Ward_No,
    IMEI_NO,
    Bio_Med,
    Alias_Name,
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: UPDATE_DEVICE_DETAILS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        let { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/devices/update/${DeviceId}`,
          {
            Department_Name: departmentName,
            Hospital_Name: hospitalName,
            Doctor_Name,
            Ward_No,
            IMEI_NO,
            Bio_Med,
            Alias_Name,
          },
          config
        );
        dispatch({
          type: UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };
export const getAboutSectionById = (did) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const DeviceId121 = did;
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/about/${DeviceId121}`,
      config
    );
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getDeviceEventsById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_DEVICE_EVENTS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const DeviceId12 = urlParams.get("DeviceId");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceEvents/${DeviceId12}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_DEVICE_EVENTS_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_DEVICE_EVENTS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getNewDevicesEventsById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_NEW_DEVICES_EVENTS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const DeviceId12 = urlParams.get("DeviceId");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceEvents/${DeviceId12}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_NEW_DEVICES_EVENTS_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_NEW_DEVICES_EVENTS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };
export const getCalibrationById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const DeviceId12 = urlParams.get("DeviceId");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/calibration/${DeviceId12}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_DEVICE_CALIBRATION_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };
export const getDeviceAlarmsById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_DEVICE_ALARMS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const DeviceId121 = urlParams.get("DeviceId");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceAlerts/${DeviceId121}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_DEVICE_ALARMS_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_DEVICE_ALARMS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getNewDevicesAlarmsById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_NEW_DEVICES_ALARMS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const DeviceId121 = urlParams.get("DeviceId");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceAlerts/${DeviceId121}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_NEW_DEVICES_ALARMS_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_NEW_DEVICES_ALARMS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getDeviceLogsById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_DEVICE_LOGS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const DeviceId121 = localStorage.getItem("deviceid");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceLogs/${DeviceId121}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_DEVICE_LOGS_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_DEVICE_LOGS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getNewDeviceLogsById =
  ({ page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_NEW_DEVICES_LOGS_BY_ID_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const DeviceId121 = localStorage.getItem("deviceid");
        let response;

        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceLogs/${DeviceId121}?page=${page}&limit=${limit}`,
          config
        );
        dispatch({
          type: GET_NEW_DEVICES_LOGS_BY_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_NEW_DEVICES_LOGS_BY_ID_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

// trends data
export const getDeviceTrendsById = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_TRENDS_BY_ID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const DeviceId12 = localStorage.getItem("deviceid");
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceTrends/${DeviceId12}`,

      config
    );
    dispatch({
      type: GET_DEVICE_TRENDS_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_TRENDS_BY_ID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

// THIS IS A API OF TREND WHERE WE GETING DATA WITH USE OF PROJECT CODE 
export const getNewDevicesOfTrendsById = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_NEW_DEVICES_OF_TRENDS_BY_ID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const DeviceId12 = localStorage.getItem("deviceid");
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/v2/deviceTrends/${DeviceId12}`,

      config
    );
    dispatch({
      type: GET_NEW_DEVICES_OF_TRENDS_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_NEW_DEVICES_OF_TRENDS_BY_ID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getLogMsgOccurence = (did, logMsg) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/logMsgOccurence2/${did}?logMsg=${logMsg}`,
      config
    );
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getDeviceCrashAnalytics = (did, logMsg) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-crashlytics-data2/${did}?&logMsg=${logMsg}`,
      config
    );
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getServiceRecordsById =
  ({ did, page, limit }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_SERVICE_RECORDS_DETAILS,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-by-deviceId?deviceId=${did}&SBXMH`,
          config
        );
        dispatch({
          type: GET_SERVICE_RECORDS_DETAILS_SUCCESS,
          payload: data.data,
        });
      } catch (error) {
        dispatch({
          type: GET_SERVICE_RECORDS_DETAILS_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getSingleUploadFile = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/s3/get-uploaded-files/${deviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getDeviceIdBySerialNumber =
  (seerialNumber) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SERIAL_NO_BY_DEVICE_ID_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/production/get-by-serialNumber/${seerialNumber}`,
        config
      );
      dispatch({
        type: GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode === 400) {
        alert("Already Use");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Internal server error"
      ) {
        return null;
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message === undefined
      ) {
        return null;
      } else {
        toast.error(
          error.response && error.response.data && error.response.data.message
        );
      }
      dispatch({
        type: GET_SERIAL_NO_BY_DEVICE_ID_REQUEST_FAIL,
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

export const getPatientDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DETAILS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-allUhid`,
      config
    );
    dispatch({
      type: GET_PATIENT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DETAILS_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getPatientDetailsByUhid = (uhid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DETAILS_BY_UHID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-patient-details/${uhid}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DETAILS_BY_UHID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DETAILS_BY_UHID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getPatientDetailsOfNewDevicesByUhid = (deviceid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-patient-list/v2/${deviceid}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DETAILS_OF_NEW_DEVICES_BY_UHID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};


export const getPatientDischargeAction = (projectCode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DISCHARGE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-all-patient-discharge-data/v2/${projectCode}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DISCHARGE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DISCHARGE_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const postPatientDataAction =
  ({
    UHID,
    age,
    weight,
    height,
    deviceId,
    dosageProvided,
    patientName,
    ward_no,
    doctor_name,
    id
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: PUT_PATIENT_DATA_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/patient/update-patient/${id}`,
          {
            UHID,
            age,
            weight,
            height,
            deviceId,
            dosageProvided,
            patientName,
            ward_no,
            doctor_name,
          },
          config
        );
        dispatch({
          type: PUT_PATIENT_DATA_SUCCESS,
          payload: data.data,
        });
        if (data.statusCode === 200) {
          alert('Data Success')
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        dispatch({
          type: PUT_PATIENT_DATA_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const postPatientDiagnose =
  ({ uhid, medicine, procedure, others }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: ADD_PATIENT_DIAGNOSE_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/patient/add-medical-diagnose/${uhid}`,
          {
            medicine,
            procedure,
            others,
          },
          config
        );
        dispatch({
          type: ADD_PATIENT_DIAGNOSE_SUCCESS,
          payload: data.data,
        });
      } catch (error) {
        dispatch({
          type: ADD_PATIENT_DIAGNOSE_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const getPatientDiagnoseData = (uhid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENT_DIAGNOSE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-diagnose/${uhid}`,
      config
    );
    dispatch({
      type: GET_PATIENT_DIAGNOSE_SUCCESS,
      payload: data.data,
    });
    if (data.statusCode === 201) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DIAGNOSE_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getUhidListData = (uhid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_UHIDS_LIST_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/get-uhids`,
      config
    );
    dispatch({
      type: GET_UHIDS_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_UHIDS_LIST_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getRequestUserDataAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REQUEST_USER_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/send-device-req`,
      { deviceId },
      config
    );
    dispatch({
      type: GET_REQUEST_USER_DATA_SUCCESS,
      payload: data.data,
    });
    if (data && data.statusCode === 200) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
      localStorage.setItem('reqStatus', 'Pending')
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.statusCode === 400
    ) {
      alert(
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      );
    }
    dispatch({
      type: GET_REQUEST_USER_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getSingleProductionDataAction =
  (serialNumber) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_PRODUCTION_DATA_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/get-complete-device-details/${serialNumber}`,
        config
      );
      dispatch({
        type: GET_SINGLE_PRODUCTION_DATA_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCTION_DATA_FAIL,
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

export const postEditAccountDetails =
  ({
    seriallNo,
    ackDate,
    ackNo,
    billedTo,
    consinee,
    consigneeAddress,
    document_ref_no,
    irn,
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: POST_EDIT_ACCOUNT_DETAILS_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/logger/accounts/update-data`,
          {
            seriallNo,
            ackDate,
            ackNo,
            billedTo,
            consinee,
            consigneeAddress,
            document_ref_no,
            irn,
          },
          config
        );
        dispatch({
          type: POST_EDIT_ACCOUNT_DETAILS_SUCCESS,
          payload: data.data,
        });
        if (data?.statusCode === 200) {
          alert(data?.message)
          window.location.reload();
        }
      } catch (error) {
        dispatch({
          type: POST_EDIT_ACCOUNT_DETAILS_FAIL,
          payload:error?.response?.data?.message,
        });
      }
    };

export const postLockToDeviceIdAction =
  ({ DeviceId, isPaymentDone, isLocked }) => async (dispatch) => {
    try {
      dispatch({
        type: POST_DEVICE_ID_FROM_LOCK_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/devices/payment-update`,
        {
          DeviceId, isPaymentDone, isLocked
        },
        config
      );
      dispatch({
        type: POST_DEVICE_ID_FROM_LOCK_SUCCESS,
        payload: data.data,
      });
      if (data.statusCode === 200) {
        alert("Device Locked");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      dispatch({
        type: POST_DEVICE_ID_FROM_LOCK_FAIL,
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