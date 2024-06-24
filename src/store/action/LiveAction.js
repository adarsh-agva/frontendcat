import axios from "axios";
import Cookies from 'universal-cookie';

import {
    LIVE_DATA_REQUEST,
    LIVE_DATA_SUCCESS,
    LIVE_DATA_FAIL
} from "../types/LiveConstants";
// import { useNavigate } from "react-router";

const cookies = new Cookies();
export const liveDataUpdate = (deviceId) => async (dispatch) => {
    // const navigate=useNavigate()
    try {
      dispatch({
        type: LIVE_DATA_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("deviceId hai",deviceId)
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/dynamicDeviceId/${deviceId}`,
        {deviceId},
        config
      );
      dispatch({
        type: LIVE_DATA_SUCCESS,
        payload: data,
      });
    //   if(data.statusCode==200){
    //     navigate("/live")
    //   }
      console.log("data action",data)
    } catch (error) {
      dispatch({
        type: LIVE_DATA_FAIL,
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