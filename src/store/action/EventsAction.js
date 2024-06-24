import axios from "axios";
import Cookies from 'universal-cookie';
import {
  EVENT_FAIL,
  EVENT_REQUEST,
  EVENT_SUCCESS,
} from "../types/EventConstants";

const cookies = new Cookies();

export const eventAction = (
  code = null,
  projectType = null,
  diffdate = null,
  page = 1,
  record = 25,
  sort = null
) => async (dispatch) => {
  try {
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
      
    let date = new Date();
    let endDate = date.toLocaleDateString();
    endDate =
      endDate.split("/")[2] +
      "/" +
      endDate.split("/")[0] +
      "/" +
      endDate.split("/")[1];
      // console.log('endDate',endDate)
      
    dispatch({
      type: EVENT_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/events/${code}?projectType=${projectType}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${record}&sort=${sort}`, 
      config
    );

    dispatch({
      type: EVENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_FAIL,
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
