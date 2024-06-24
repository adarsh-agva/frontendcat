import {
  GET_PRODUCTION_DETAILS_DATA_REQUEST, PRODUCTION_DETAILS_REQUEST, PRODUCTION_DETAILS_SUCCESS, PRODUCTION_DETAILS_FAIL, DISPATCH_DETAILS_FAIL, DISPATCH_DETAILS_REQUEST, DISPATCH_DETAILS_SUCCESS, GET_DISPATCH_DETAILS_DATA_BYID_FAIL, GET_DISPATCH_DETAILS_DATA_BYID_REQUEST, GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS, GET_DISPATCH_DETAILS_DATA_FAIL, GET_DISPATCH_DETAILS_DATA_REQUEST, GET_DISPATCH_DETAILS_DATA_SUCCESS, GET_PRODUCTION_DETAILS_DATA_SUCCESS, GET_PRODUCTION_DETAILS_DATA_FAIL,
  GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST,
  GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS,
  GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL,
  GET_DHR_UPLOAD_FILE_REQUEST,
  GET_DHR_UPLOAD_FILE_SUCCESS,
  GET_DHR_UPLOAD_FILE_FAIL,
  GET_PINCODE_DATA_SUCCESS,
  GET_PINCODE_DATA_REQUEST,
  GET_PINCODE_DATA_FAIL,
  GET_DEVICEID_FROM_PRODUCTION_REQUEST,
  GET_DEVICEID_FROM_PRODUCTION_SUCCESS,
  GET_DEVICEID_FROM_PRODUCTION_FAIL,
  GET_EDIT_DISPATCH_DATA_REQUEST,
  GET_EDIT_DISPATCH_DATA_FAIL,
  GET_EDIT_DISPATCH_DATA_SUCCESS,
  GET_SINGLE_HOSPITAL_DETAILS_REQUEST,
  GET_SINGLE_HOSPITAL_DETAILS_SUCCESS,
  GET_SINGLE_HOSPITAL_DETAILS_FAIL,
  GET_SERIAL_NUMBER_LIST_REQUEST,
  GET_SERIAL_NUMBER_LIST_SUCCESS,
  GET_SERIAL_NUMBER_LIST_FAIL,
  GET_SINGLE_SERIAL_NO_TRACK_DATA_REQUEST,
  GET_SINGLE_SERIAL_NO_TRACK_DATA_SUCCESS,
  GET_SINGLE_SERIAL_NO_TRACK_DATA_FAIL,
  GET_ACCOUNT_DETAILS_FAIL,
  GET_ACCOUNT_DETAILS_SUCCESS,
  GET_ACCOUNT_DETAILS_REQUEST,
  GET_ACCOUNT_PENDING_DETAILS_REQUEST,
  GET_ACCOUNT_PENDING_DETAILS_SUCCESS,
  GET_ACCOUNT_PENDING_DETAILS_FAIL,
  POST_ACCOUNT_DATA_WITH_FILE_REQUEST,
  POST_ACCOUNT_DATA_WITH_FILE_SUCCESS,
  POST_ACCOUNT_DATA_WITH_FILE_FAIL,
  POST_SHIPMENT_DETAILS_FAIL,
  POST_SHIPMENT_DETAILS_SUCCESS,
  POST_SHIPMENT_DETAILS_REDUCER,
  GET_AWATING_SHIPMENT_WATING_REQUEST,
  GET_AWATING_SHIPMENT_WATING_SUCCESS,
  GET_AWATING_SHIPMENT_WATING_FAIL,
  GET_DATA_BY_SERIAL_NUMBER_SUCCESS,
  GET_DATA_BY_SERIAL_NUMBER_REQUEST,
  GET_DATA_BY_SERIAL_NUMBER_FAIL,
  GET_READY_FOR_DISPATCH_SUCCESS,
  GET_READY_FOR_DISPATCH_REQUEST,
  GET_READY_FOR_DISPATCH_FAIL,
  GET_COMPLETE_DISPATCHED_SUCCESS,
  GET_COMPLETE_DISPATCHED_FAIL,
  GET_COMPLETE_DISPATCHED_REQUEST,
  PUT_PRODUCTION_EDIT_FAIL,
  PUT_PRODUCTION_EDIT_SUCCESS,
  PUT_PRODUCTION_EDIT_REQUEST,
  GET_EDIT_PRODUCTION_DATA_FAIL,
  GET_EDIT_PRODUCTION_DATA_SUCCESS,
  GET_EDIT_PRODUCTION_DATA_REQUEST,
  GET_EDIT_LIST_DATA_PRODUCTION_FAIL,
  GET_EDIT_LIST_DATA_PRODUCTION_SUCCESS,
  GET_EDIT_LIST_DATA_PRODUCTION_REQUEST,
  RETURN_DISPATCH_DATA_FAIL,
  RETURN_DISPATCH_DATA_SUCCESS,
  RETURN_DISPATCH_DATA_REQUEST,
  GET_RETURN_DEVICE_TO_ACCOUNT_FAIL,
  GET_RETURN_DEVICE_TO_ACCOUNT_SUCCESS,
  GET_RETURN_DEVICE_TO_ACCOUNT_REQUEST,
  UPDATE_DEVICEID_BY_DISPATCH_FAIL,
  UPDATE_DEVICEID_BY_DISPATCH_SUCCESS,
  UPDATE_DEVICEID_BY_DISPATCH_REQUEST,
} from "../types/DispatchDeviceType";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
const cookies = new Cookies();
//  USER REGISTER ACTIONS
export const dispatchDetailsAction =
  ({
    deviceId,
    buyerAddress,
    consinee,
    product_type,
    serial_no,
    purpose,
    concerned_person,
    consigneeAddress,
    distributor_gst,
    phone_number,
    address,
    date_of_dispatch,
    hospital_name,
    pincode,
    distributor_name,
    distributor_contact,
    district,
    state,
    city,
    document_no,
    concerned_person_email,
    marketing_lead,
    buyerName,
    country,
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: DISPATCH_DETAILS_REQUEST,
        });
        const projectCode = "SBXMH"
        const config = {
          header: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/add-dispatch-details/${projectCode}`,
          {
            deviceId,
            product_type,
            serial_no,
            buyerAddress,
            buyerName,
            purpose,
            concerned_person,
            consinee,
            consigneeAddress,
            phone_number,
            address,
            date_of_dispatch,
            hospital_name,
            pincode,
            distributor_gst,
            distributor_contact,
            distributor_name,
            district,
            state,
            city,
            country,
            document_no,
            concerned_person_email,
            marketing_lead
          },
          config
        );
        dispatch({
          type: DISPATCH_DETAILS_SUCCESS,
          payload: data,
        });
        if (data.statusCode == 201) {
          alert('device add successfully')
          window.location.reload()
        }
      } catch (error) {
        dispatch({
          type: DISPATCH_DETAILS_FAIL,
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

export const getdispatchDetailsAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("heyy", page, limit)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId121 = urlParams.get('DeviceId');
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-dispatch-data/sbxmh?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getdispatchDetailsByDeviceIdAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_BYID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-dispatch-databyId/${deviceId}`,
      config
    );
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_BYID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const productionDetailsAction = ({
  deviceId,
  productType,
  purpose,
  batchNumber,
  manufacturingDate,
  qaDoneBy,
  dataEnteredBy,
  testingDoneBy,
  partsIssuedBy,
  serialNumber,
  dispatchDate,
  simNumber,
  hw_version,
  sw_version,
  turbineNumber,
  displayNumber

}) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTION_DETAILS_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/production/add-new`,
      {
        deviceId,
        productType,
        purpose,
        batchNumber,
        manufacturingDate,
        serialNumber,
        qaDoneBy,
        dataEnteredBy,
        testingDoneBy,
        partsIssuedBy,
        dispatchDate,
        simNumber,
        hw_version,
        sw_version,
        turbineNumber,
        displayNumber
      },
      config
    );
    dispatch({
      type: PRODUCTION_DETAILS_SUCCESS,
      payload: data,
    });
    if (data && data.statusCode == 201) {
      alert('data added successfully')
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: PRODUCTION_DETAILS_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getproductionDetailsAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/production/production-list?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getproductionDetailsByIdAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response;
    // console.log('id', deviceId)
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/production/get-byid/${deviceId}`,
      config
    );
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};
export const getDHRUploadFile = (deviceId, key) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DHR_UPLOAD_FILE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/production/get-production-file/${deviceId}/${key}`,
      config
    );
    dispatch({
      type: GET_DHR_UPLOAD_FILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DHR_UPLOAD_FILE_FAIL,
      payload:error?.response?.data?.message,
    });
  }

}

export const getPincodeData = (pincode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PINCODE_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('pincode', pincode)
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/common/search-by-pincode/${pincode}`,
      config
    );
    dispatch({
      type: GET_PINCODE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PINCODE_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getDeviceIdFromProduction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICEID_FROM_PRODUCTION_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/production/get-production-devices`,
      config
    );
    dispatch({
      type: GET_DEVICEID_FROM_PRODUCTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICEID_FROM_PRODUCTION_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const editDispatchDataModel = ({ deviceId,
  hospital_name,
  address,
  document_no,
  phone_number,
  concerned_person, serial_no, date_of_dispatch,purpose }) => async (dispatch) => {
    try {
      dispatch({
        type: GET_EDIT_DISPATCH_DATA_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/update-dispatch-data/SBXMH`,
        {
          deviceId,
          hospital_name,
          address,
          document_no,
          phone_number,
          concerned_person,
          serial_no,
          date_of_dispatch,
          purpose
        },
        config
      );
      dispatch({
        type: GET_EDIT_DISPATCH_DATA_SUCCESS,
        payload: response.data,
      });
      console.log('data', response.data)
      if (response.data.statusCode === 200) {
        toast.success('New Data Added')
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: GET_EDIT_DISPATCH_DATA_FAIL,
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

export const getSingleHospitalDetails = (hospital_name) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_HOSPITAL_DETAILS_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/get-byhospital/${hospital_name}`,
      config
    );
    dispatch({
      type: GET_SINGLE_HOSPITAL_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_HOSPITAL_DETAILS_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getSerialNumberList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERIAL_NUMBER_LIST_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/common/get-serial-number-list`,
      config
    );
    dispatch({
      type: GET_SERIAL_NUMBER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERIAL_NUMBER_LIST_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getSingleSerialNumberData = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_SERIAL_NO_TRACK_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/track-dispatched-device-location/${deviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_SERIAL_NO_TRACK_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SERIAL_NO_TRACK_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getaccountsDetailsAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACCOUNT_DETAILS_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/accounts/get-accounts-data?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_ACCOUNT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNT_DETAILS_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getaccountsPendingDetailsAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACCOUNT_PENDING_DETAILS_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/accounts/get-dispatch-req-data?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_ACCOUNT_PENDING_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNT_PENDING_DETAILS_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const postAccountDataWithFile = ({ seriallNo, irn, ackNo, ackDate, ewaybillNo, billedTo, consinee, invoiceNo, document_ref_no, consigneeAddress }) => async (dispatch) => {
  try {
    dispatch({
      type: POST_ACCOUNT_DATA_WITH_FILE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/accounts/save-data`,
      { seriallNo, ewaybillNo, billedTo, consinee, invoiceNo, document_ref_no, consigneeAddress, irn, ackNo, ackDate, },
      config
    );
    dispatch({
      type: POST_ACCOUNT_DATA_WITH_FILE_SUCCESS,
      payload: response.data,
    });
    if (response.data.statusCode === 200) {
      alert(response.data.message)
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: POST_ACCOUNT_DATA_WITH_FILE_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getDataBySerialNumberAccountAction = (serialNo) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DATA_BY_SERIAL_NUMBER_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/accounts/get-data/${serialNo}`,
      config
    );
    dispatch({
      type: GET_DATA_BY_SERIAL_NUMBER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DATA_BY_SERIAL_NUMBER_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const postShipmentDetailsAction = ({ seriallNo, trackingNo, vehicleNo, shipperContact, shipperName, comments, shippedThrough }) => async (dispatch) => {
  try {
    dispatch({
      type: POST_SHIPMENT_DETAILS_REDUCER,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/save-shipping-data`,
      { seriallNo, trackingNo, vehicleNo, shipperContact, shipperName, comments, shippedThrough },
      config
    );
    dispatch({
      type: POST_SHIPMENT_DETAILS_SUCCESS,
      payload: response.data,
    });
    if (response.data.statusCode == 200) {
      alert('Shipment successfully')
      window.location.reload()
    }
  } catch (error) {
    dispatch({
      type: POST_SHIPMENT_DETAILS_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getAwaitingShipmentAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_AWATING_SHIPMENT_WATING_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/get-awaiting-for-shipped?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_AWATING_SHIPMENT_WATING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_AWATING_SHIPMENT_WATING_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const getReadyToDispatchDetailsAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_READY_FOR_DISPATCH_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/get-production-list/v2?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_READY_FOR_DISPATCH_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_READY_FOR_DISPATCH_FAIL,
      payload:error?.response?.data?.message
    });
  }
};

export const getCompleteDispatchedDataAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COMPLETE_DISPATCHED_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/get-dispatched-device-list?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_COMPLETE_DISPATCHED_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPLETE_DISPATCHED_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};


export const getEditProductionDataAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EDIT_PRODUCTION_DATA_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/production/get-byid/${deviceId}`,
      config
    );
    dispatch({
      type: GET_EDIT_PRODUCTION_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_EDIT_PRODUCTION_DATA_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const putProductionDataAction = ({
  deviceId,
  productType,
  batchNumber,
  manufacturingDate,
  qaDoneBy,
  dataEnteredBy,
  testingDoneBy,
  partsIssuedBy,
  serialNumber,
  dispatchDate,
  simNumber,
  hw_version,
  sw_version,
  turbineNumber,
  displayNumber
}) => async (dispatch) => {
  try {
    dispatch({
      type: PUT_PRODUCTION_EDIT_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response;

    response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/production/update-production`,
      {
        deviceId,
        productType,
        batchNumber,
        manufacturingDate,
        qaDoneBy,
        dataEnteredBy,
        testingDoneBy,
        partsIssuedBy,
        serialNumber,
        dispatchDate,
        simNumber,
        hw_version,
        sw_version,
        turbineNumber,
        displayNumber
      },
      config
    );
    dispatch({
      type: PUT_PRODUCTION_EDIT_SUCCESS,
      payload: response.data,
    });
    if (response.data.statusCode === 201) {
      alert('Data Edit Successfully')
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: PUT_PRODUCTION_EDIT_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};


export const getEditListDataOfProduction = (serialNo) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EDIT_LIST_DATA_PRODUCTION_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/common/production-logs-data/${serialNo}`,
      config
    );
    dispatch({
      type: GET_EDIT_LIST_DATA_PRODUCTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_EDIT_LIST_DATA_PRODUCTION_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};

export const returnDispatchAction =
  ({
    deviceId,
    buyerAddress,
    consinee,
    product_type,
    serial_no,
    purpose,
    concerned_person,
    consigneeAddress,
    distributor_gst,
    phone_number,
    address,
    date_of_dispatch,
    hospital_name,
    pincode,
    distributor_name,
    distributor_contact,
    district,
    state,
    city,
    document_no,
    concerned_person_email,
    marketing_lead,
    buyerName
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: RETURN_DISPATCH_DATA_REQUEST,
        });
        const projectCode = "SBXMH"
        const config = {
          header: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/return-device/${projectCode}`,
          {
            deviceId,
            product_type,
            serial_no,
            buyerAddress,
            buyerName,
            purpose,
            concerned_person,
            consinee,
            consigneeAddress,
            phone_number,
            address,
            date_of_dispatch,
            hospital_name,
            pincode,
            distributor_gst,
            distributor_contact,
            distributor_name,
            district,
            state,
            city,
            document_no,
            concerned_person_email,
            marketing_lead
          },
          config
        );
        dispatch({
          type: RETURN_DISPATCH_DATA_SUCCESS,
          payload: data,
        });
        if (data.statusCode == 201) {
          alert('device add successfully')
          window.location.reload()
        }
      } catch (error) {
        dispatch({
          type: RETURN_DISPATCH_DATA_FAIL,
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


export const getReturnDataRequestByDispatchAction = ({ page, limit, searchData, deviceId }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RETURN_DEVICE_TO_ACCOUNT_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-return-device/${deviceId}?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_RETURN_DEVICE_TO_ACCOUNT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RETURN_DEVICE_TO_ACCOUNT_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};


export const updateDeviceId = ({ deviceId, newDeviceId }) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DEVICEID_BY_DISPATCH_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/devices/replace-deviceId`,
      { deviceId, newDeviceId },
      config
    );
    dispatch({
      type: UPDATE_DEVICEID_BY_DISPATCH_SUCCESS,
      payload: response.data,
    });
    if (response.data.statusCode == 200) {
      alert('Update successfully')
      window.location.reload()
    }
  } catch (error) {
    dispatch({
      type: UPDATE_DEVICEID_BY_DISPATCH_FAIL,
      payload:error?.response?.data?.message,
    });
  }
};