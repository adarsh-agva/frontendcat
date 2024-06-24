import axios from "axios";
import Cookies from 'universal-cookie';
import {
  ALARM_FAIL,
  ALARM_REQUEST,
  ALARM_SUCCESS,
} from "../types/AlarmConstant";

const cookies = new Cookies();

export const alarmAction = (
  code = null,
  projectType = null,
  diffdate = null,
  filters = localStorage.getItem('filteredAlerts'),
  page = 1,
  record = 25,
  sort = null
) => async (dispatch) => {
  try {
    let date = new Date();
    let endDate = date.toLocaleDateString();
    endDate =
      endDate.split("/")[2] +
      "/" +
      endDate.split("/")[0] +
      "/" +
      endDate.split("/")[1];
      // console.log('endDate',endDate)

    let startDate = new Date(
      new Date().setDate(new Date().getDate() - diffdate)
    )
      .toLocaleString()
      .split(",")[0];
    startDate =
      startDate.split("/")[2] +
      "/" +
      startDate.split("/")[0] +
      "/" +
      startDate.split("/")[1];
      // console.log('startDate',startDate)
    

    dispatch({
      type: ALARM_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let response;
    let logString = "";
    console.log(filters)
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          logString += `${key}-`;
          // console.log("logstring", logString);
        }
      }
    }

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/alerts/${code}?projectType=${projectType}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${record}&sort=${sort}&filters=${filters}`, 
      config
    );

    dispatch({
      type: ALARM_SUCCESS,
      payload: response.data,
    });
    // console.log(filters,'filters')
  } catch (error) {
    dispatch({
      type: ALARM_FAIL,
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
