import axios from "axios";
import Cookies from 'universal-cookie';

import {
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
} from "../types/ProjectConstants";

const cookies = new Cookies();

// LOG COUNT
export const getLogTypeCounts =
  ({ code, diffDate, code1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOG_COUNT_REQUEST,
      });

      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      var dt = new Date();
      const end = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diffDate);
      const start = dt.toISOString().slice(0, 10);

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getLogsCount/${code}?startDate=${start}&endDate=${end}&projectType=${code1}`,
        config
      );
      dispatch({
        type: GET_LOG_COUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log("get log count api error", error);

      dispatch({
        type: GET_LOG_COUNT_FAIL,
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

// LOGS BY DATE FILTER
export const getLogByDate =
  ({ code, diffDate, code1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOG_COUNT_BY_DATE_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      var dt = new Date();
      const end = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diffDate);
      const start = dt.toISOString().slice(0, 10);

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/datewiselogcount/${code}?startDate=${start}&endDate=${end}&projectType=${code1}`,
        config
      );

      dispatch({
        type: GET_LOG_COUNT_BY_DATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_LOG_COUNT_BY_DATE_FAIL,
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

// LOG MSG OCCURRENCES
export const getLogMsgOccurenceWRTDate =
  ({ code, startDate, endDate, logMsg, code1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (startDate == null && endDate == null) {
        var dt = new Date();
        const endDate = dt.toISOString().slice(0, 10);
        dt.setDate(dt.getDate() - 10);
        const startDate = dt.toISOString().slice(0, 10);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}&projectType=${code1}`,

          config
        );
        dispatch({
          type: GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
          payload: data.data,
        });
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}&projectType=${code1}`,
          config
        );
        dispatch({
          type: GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LOG_MSG_OCCURRENCE_COUNT_WRT_DATE_REQUEST_FAIL,
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

// CRASH FREE USERS
export const getCrashFreeUsers =
  ({ code, diffDate, code1 }) =>
  async (dispatch) => {
    try {
      var dt = new Date();
      const endDate = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diffDate);
      const startDate = dt.toISOString().slice(0, 10);

      dispatch({
        type: GET_CRASH_FREE_USERS_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/crashfree-users-datewise/${code}?startDate=${startDate}&endDate=${endDate}&projectType=${code1}`,
        config
      );
      dispatch({
        type: GET_CRASH_FREE_USERS_REQUEST_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CRASH_FREE_USERS_REQUEST_FAIL,
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

// CRASH ANALYTICS DATA
export const getCrashAnalyticsData =
  (code, logMsg, projectType) => async (dispatch) => {
    try {
      var dt = new Date();
      const endDate = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - 90);
      const startDate = dt.toISOString().slice(0, 10);

      dispatch({
        type: GET_CRASH_ANALYTICS_DATA_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-crashlytics-data/${code}?&startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}&projectType=${projectType}`,
        config
      );
      dispatch({
        type: GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS,
        payload: data.data,
      });

      // }
    } catch (error) {
      dispatch({
        type: GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL,
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

// CRASH FREE USERS
export const getCrashFreeUsersData =
  (code, logMsg, projectType) => async (dispatch) => {
    try {
      dispatch({
        type: GET_CRASH_FREE_USERS_DATA_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/logMsgOccurence/${code}?msg=${logMsg}&projectType=${projectType}`,
        config
      );
      dispatch({
        type: GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS,
        payload: data.data,
      });
      // console.log(data)
    } catch (error) {
      dispatch({
        type: GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL,
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

// LISTED DEVICE WITH MODEL
export const getDeviceModelCode = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MODEL_CODE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getDeviceCount/${code}`,
      config
    );
    dispatch({
      type: GET_MODEL_CODE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MODEL_CODE_FAIL,
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

// ERROR WITH OS ARCH.
export const getErrorWRTOS = (code, projectType) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getErrorCountByOSArchitecture/${code}?projectType=${projectType}`,
      config
    );
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST_FAIL,
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

// ERROR WITH VERSION
export const getErrorWRTVersion = (code, projectType) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getErrorCountByVersion/${code}?projectType=${projectType}`,
      config
    );
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL,
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
