import axios from "axios";
import Cookies from 'universal-cookie';
import {
  STORE_SYSTEM_REQUEST,
  STORE_SYSTEM_SUCCESS,
  STORE_SYSTEM_FAIL,
  ALL_HOSPITAL_DATA_SUCCESS,
  ALL_HOSPITAL_DATA_REQUEST,
  ALL_HOSPITAL_DATA_FAIL,
  PUT_ALL_STORE_DATA_REQUEST,
  PUT_ALL_STORE_DATA_SUCCESS,
  PUT_ALL_STORE_DATA_FAIL,
  GET_NEW_HOSPITAL_DATA_REQUEST,
  GET_NEW_HOSPITAL_DATA_REQUEST_SUCCESS,
  GET_NEW_HOSPITAL_DATA_REQUEST_FAIL,
  ALL_TICKETS_DATA_BY_EMAIL_REQUEST_FAIL,
  ALL_TICKETS_DATA_BY_EMAIL_REQUEST_SUCCESS,
  ALL_TICKETS_DATA_BY_EMAIL_REQUEST,
  FEEDBACK_DATA_REQUEST,
  FEEDBACK_DATA_SUCCESS,
  FEEDBACK_DATA_FAIL,
  GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_SUCCESS,
  GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_FAIL,
  GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_REQUEST,
  GET_HOSPITAL_REGISTER_DATA_REQUEST,
  GET_HOSPITAL_REGISTER_DATA_SUCCESS,
  GET_HOSPITAL_REGISTER_DATA_FAIL,
  GET_HOSPITAL_LIST_BY_PINCODE_REQUEST,
  GET_HOSPITAL_LIST_BY_PINCODE_SUCCESS,
  GET_HOSPITAL_LIST_BY_PINCODE_FAIL
} from "../types/StoreConstant";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
const cookies = new Cookies();

export const getStoreSystem = () => async (dispatch) => {
  try {
    dispatch({
      type: STORE_SYSTEM_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/service-eng-list`,
      config
    );
    dispatch({
      type: STORE_SYSTEM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: STORE_SYSTEM_FAIL,
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

export const getAllHospitalData = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_HOSPITAL_DATA_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/hospital/hospital-list`,
      config
    );
    dispatch({
      type: ALL_HOSPITAL_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_HOSPITAL_DATA_FAIL,
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

export const putallStoreDataAction = ({ serialNumber, deviceId, service_engineer, details, concerned_p_contact, issues, priority, pincode, dept_name, concerned_p_name, concerned_p_email, waranty_status, tag, address }) => async (dispatch) => {
  try {
    dispatch({
      type: PUT_ALL_STORE_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/support/create-ticket`,
      {
        serialNumber,
        deviceId,
        service_engineer,
        details,
        concerned_p_contact,
        issues,
        priority,
        pincode,
        dept_name,
        concerned_p_name,
        concerned_p_email,
        waranty_status,
        tag,
        address
      },
      config
    );
    dispatch({
      type: PUT_ALL_STORE_DATA_SUCCESS,
      payload: data,
    });
    // if (data.statusCode == 201) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 500);
    // }
  } catch (error) {
    dispatch({
      type: PUT_ALL_STORE_DATA_FAIL,
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
// export const getNewHospitalData = ({ Hospital_Name, Hospital_Address, Country, State,City,Pincode,District }) => async (dispatch) => {
//   try {
//     dispatch({
//       type: GET_NEW_HOSPITAL_DATA_REQUEST,
//     });
//     const token = cookies.get('ddAdminToken');
//     const history=useNavigate();
//     alert('1')
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}/hospital/register-hospital`,
//       {
//         Hospital_Name,
//         Hospital_Address,
//         Country,
//         State,
//         City,
//         Pincode,
//         District
//       },
//       config
//     );
//     dispatch({
//       type: GET_NEW_HOSPITAL_DATA_REQUEST_SUCCESS,
//       payload: data,
//     });
//     if (data.statusCode == 201) {
//       setTimeout(() => {
//         // window.location.reload();
//         toast.success('Hospital Add Success')
//         // history('/dispatchDevice')
//       }, 1000);
// //     }
//   } catch (error) {
//     dispatch({
//       type: GET_NEW_HOSPITAL_DATA_REQUEST_FAIL,
//       payload:
//         error &&
//         error.response &&
//         error.response.data &&
//         error.response.data.data &&
//         error.response.data.data.err &&
//         error.response.data.data.err.msg,
//     });
//   }
// };

export const getNewHospitalData = ({ Hospital_Name, Hospital_Address, Country, State, City, Pincode, District }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NEW_HOSPITAL_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/hospital/register-hospital`,
      {
        Hospital_Name,
        Hospital_Address,
        Country,
        State,
        City,
        Pincode,
        District
      },
      config
    );
    dispatch({
      type: GET_NEW_HOSPITAL_DATA_REQUEST_SUCCESS,
      payload: data,
    });
    console.log('data',data)
    if (data.statusCode == 201) {
      // setTimeout(() => {
      window.location.reload();
      // toast.success('Hospital Add Success')
      // history('/dispatchDevice')
      // }, 1000);
    }
  } catch (error) {
    dispatch({
      type: GET_NEW_HOSPITAL_DATA_REQUEST_FAIL,
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

export const getHospitalDataFromAdding = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOSPITAL_REGISTER_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/hospital-list`,
      config
    );
    dispatch({
      type: GET_HOSPITAL_REGISTER_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOSPITAL_REGISTER_DATA_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}

export const feedbackDataAction = ({ name, email, ticket_number, message, ratings, concerned_p_contact }) => async (dispatch) => {
  try {
    dispatch({
      type: FEEDBACK_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/support/add-feedback`,
      {
        name,
        email,
        ticket_number,
        message,
        ratings,
        concerned_p_contact,
      },
      config
    );
    dispatch({
      type: FEEDBACK_DATA_SUCCESS,
      payload: data,
    });
    console.log('00', name, email, ticket_number, message, ratings)
    // if (data.statusCode == 201) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 500);
    // }
  } catch (error) {
    dispatch({
      type: FEEDBACK_DATA_FAIL,
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

export const getTicketNumberByEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_TICKETS_DATA_BY_EMAIL_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-individual-ticket/${email}`,
      config
    );
    dispatch({
      type: ALL_TICKETS_DATA_BY_EMAIL_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TICKETS_DATA_BY_EMAIL_REQUEST_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}

export const getCPersonDetailsByNumber = ({ phone }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/get-concerned-person/${phone}`,
      config
    );
    dispatch({
      type: GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONCERNED_PERSONDETAILS_BY_NUYMBER_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}

export const getHospitalListFromPinCode = (pincode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOSPITAL_LIST_BY_PINCODE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/get-bypincode/${pincode}`,
      config
    );
    dispatch({
      type: GET_HOSPITAL_LIST_BY_PINCODE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOSPITAL_LIST_BY_PINCODE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}