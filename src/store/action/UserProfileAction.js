import axios from "axios";
import Cookies from 'universal-cookie';
import { USER_PASSWORD_CHANGE_REQUEST, USER_PASSWORD_CHANGE_SUCESS, USER_PASSWORD_CHANGE_FAIL, } from "../types/UserConstants";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCSESS, HISTORY_DATA_REQUEST, HISTORY_DATA_SUCCESS, HISTORY_DATA_FAIL, POST_ADD_EXPERIENCE_REQUEST, POST_ADD_EXPERIENCE_SUCCESS, POST_ADD_EXPERIENCE_FAIL, GET_USER_PROFILE_DATA_REQUEST, GET_USER_PROFILE_DATA_SUCCESS, GET_USER_PROFILE_DATA_FAIL, GET_SINGLE_EXPERIENCE_OF_USER_FAIL, GET_SINGLE_EXPERIENCE_OF_USER_SUCCESS, GET_SINGLE_EXPERIENCE_OF_USER_REQUEST, PUT_USER_EXPERIENCE_DATA_REQUEST, PUT_USER_EXPERIENCE_DATA_SUCCESS, PUT_USER_EXPERIENCE_DATA_FAIL, PUT_END_ASSOCIATIN_FAIL, PUT_END_ASSOCIATIN_SUCCESS, PUT_END_ASSOCIATIN_REQUEST } from "../types/UserInfoConstant";
import { toast } from "react-hot-toast";

const cookies = new Cookies();

// USER PASSWORD UPDATE
export const passwordChangeAction =
  (password, newPassword) => async (dispatch) => {
    try {
      var response;
      dispatch({ type: USER_PASSWORD_CHANGE_REQUEST });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const body = {
        currentPassword: password,
        newPassword: newPassword,
      };
      response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/users/changepassword`,
        body,
        config
      );
      dispatch({
        type: USER_PASSWORD_CHANGE_SUCESS,
        payload: response.data,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      // console.log("error", error);

      dispatch({
        type: USER_PASSWORD_CHANGE_FAIL,
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
export const userInfoActionFn = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/me`,
      config
    );
    dispatch({
      type: USER_DETAILS_SUCSESS,
      payload: response.data,
    });
  } catch (error) {
    // console.log("get log count api error", error);

    dispatch({
      type: USER_DETAILS_FAIL,
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
export const getHistoryLogsData = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: HISTORY_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/user-activity?search=${searchData}&page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: HISTORY_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_DATA_FAIL,
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

export const addExperienceAction = ({ userId, associationName, startDate, workEmail, endDate, designation, department, workType, workPhoneNo }) => async (dispatch) => {
  try {
    dispatch({
      type: POST_ADD_EXPERIENCE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/add-experience`,
      { userId, associationName, startDate, workEmail, endDate, designation, department, workType, workPhoneNo },
      config
    );
    dispatch({
      type: POST_ADD_EXPERIENCE_SUCCESS,
      payload: response.data,
    });
    if(response && response.data && response.data.statusCode==200){
      alert(response && response.data &&response.data.message)
      window.location.reload();
    }
  } catch (error) {
    if (error.response &&
      error.response.data &&
      error.response.data.statusCode
      === 400) {
      toast.error(error.response &&
        error.response.data &&
        error.response.data.message)
    }
    dispatch({
      type: POST_ADD_EXPERIENCE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.message,
    });
  }
};
export const getUserProfileDataAction = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROFILE_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/${userId}`,
      config
    );
    dispatch({
      type: GET_USER_PROFILE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_DATA_FAIL,
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

export const getSingleExperienceOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_EXPERIENCE_OF_USER_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/get-user-experience/${userId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_EXPERIENCE_OF_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EXPERIENCE_OF_USER_FAIL,
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

export const updateUserExperienceData = ({ userId, profileId, associationName, workAddress, workEmail, endDate, designation, department, workType, workPhoneNo }) => async (dispatch) => {
  try {
    dispatch({
      type: PUT_USER_EXPERIENCE_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/update-experience`,
      { userId, profileId, associationName, workAddress, workEmail, endDate, designation, department, workType, workPhoneNo },
      config
    );
    dispatch({
      type: PUT_USER_EXPERIENCE_DATA_SUCCESS,
      payload: response.data,
    });
    if(response && response.data && response.data.statusCode===200){
      alert(response && response.data && response.data.message)
      window.location.reload()
    }
  } catch (error) {
    dispatch({
      type: PUT_USER_EXPERIENCE_DATA_FAIL,
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

export const putEndAssociationAction = ({ profileId, userId }) => async (dispatch) => {
  try {
    dispatch({
      type: PUT_END_ASSOCIATIN_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/end-association`,
      { profileId, userId },
      config
    );
    dispatch({
      type: PUT_END_ASSOCIATIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PUT_END_ASSOCIATIN_FAIL,
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