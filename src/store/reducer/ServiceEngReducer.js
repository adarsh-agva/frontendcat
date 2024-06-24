import { GET_ALL_USER_COUNT_DATA_FAIL, GET_ALL_USER_COUNT_DATA_REQUEST, GET_ALL_USER_COUNT_DATA_SUCCESS } from "../types/DeviceConstant";
import {
    GET_ALL_TICKETS_DATA_REQUEST,
    GET_ALL_TICKETS_DATA_SUCCESS,
    GET_ALL_TICKETS_DATA_FAIL,
    GET_TICKET_DETAILS_BY_ID_REQUEST,
    GET_TICKET_DETAILS_BY_ID_SUCCESS,
    GET_TICKET_DETAILS_BY_ID_FAIL,
    GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS,
    GET_TICKET_DETAILS_BY_TICKET_NO_FAIL,
    GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST,
    GET_SERVICE_ENGINNER_DATA_REQUEST,
    GET_SERVICE_ENGINNER_DATA_SUCCESS,
    GET_SERVICE_ENGINNER_DATA_FAIL,
    GET_ALL_SERVICES_REQUEST,
    GET_ALL_SERVICES_SUCCESS,
    GET_ALL_SERVICES_FAIL,
    GET_SINGLE_SERVICES_REQUEST,
    GET_SINGLE_SERVICES_SUCCESS,
    GET_SINGLE_SERVICES_FAIL,
    GET_ALL_EXPENCE_DATA_REQUEST,
    GET_ALL_EXPENCE_DATA_SUCCESS,
    GET_ALL_EXPENCE_DATA_FAIL,
    GET_DEMO_DATA_REQUEST,
    GET_DEMO_DATA_SUCCESS,
    GET_DEMO_DATA_FAIL,
    GET_MILESTONE_COUNT_REQUEST,
    GET_MILESTONE_COUNT_SUCCESS,
    GET_MILESTONE_COUNT_FAIL,
    GET_MARKETING_USER_REQUEST,
    GET_MARKETING_USER_SUCCESS,
    GET_MARKETING_USER_FAIL,
    GET_TOTAL_DATA_COUNT_REQUEST,
    GET_TOTAL_DATA_COUNT_SUCCESS,
    GET_TOTAL_DATA_COUNT_FAIL,
    GET_SALES_DATA_REQUEST,
    GET_SALES_DATA_SUCCESS,
    GET_SALES_DATA_FAIL
} from "../types/ServiceEngType";
export const getAllTicketsDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_TICKETS_DATA_REQUEST:
            return { loading: true };

        case GET_ALL_TICKETS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_ALL_TICKETS_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getAllTicketsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TICKET_DETAILS_BY_ID_REQUEST:
            return { loading: true };

        case GET_TICKET_DETAILS_BY_ID_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_TICKET_DETAILS_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getTicketDetailsByNumberReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST:
            return { loading: true };

        case GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_TICKET_DETAILS_BY_TICKET_NO_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getServiceEngDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SERVICE_ENGINNER_DATA_REQUEST:
            return { loading: true };

        case GET_SERVICE_ENGINNER_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_SERVICE_ENGINNER_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getAllServicesDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_SERVICES_REQUEST:
            return { loading: true };

        case GET_ALL_SERVICES_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_ALL_SERVICES_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getSingleServicesDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_SERVICES_REQUEST:
            return { loading: true };

        case GET_SINGLE_SERVICES_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_SINGLE_SERVICES_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getExpencesDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_EXPENCE_DATA_REQUEST:
            return { loading: true };

        case GET_ALL_EXPENCE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_ALL_EXPENCE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getDemoDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DEMO_DATA_REQUEST:
            return { loading: true };

        case GET_DEMO_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_DEMO_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getMileStoneCountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_MILESTONE_COUNT_REQUEST:
            return { loading: true };

        case GET_MILESTONE_COUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_MILESTONE_COUNT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getMarketingUserReduser = (state = {}, action) => {
    switch (action.type) {
        case GET_MARKETING_USER_REQUEST:
            return { loading: true };

        case GET_MARKETING_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_MARKETING_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getTotalCountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TOTAL_DATA_COUNT_REQUEST:
            return { loading: true };

        case GET_TOTAL_DATA_COUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_TOTAL_DATA_COUNT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getSalesDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SALES_DATA_REQUEST:
            return { loading: true };

        case GET_SALES_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_SALES_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getAllUserCountReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_USER_COUNT_DATA_REQUEST:
        return { loading: true };
  
      case GET_ALL_USER_COUNT_DATA_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        }
      case GET_ALL_USER_COUNT_DATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state;
    }
  }