import {
  DATE_SELECTION,
  DATE,
  LOGTYPE,
  RECORDS,
  SEARCH_FIELD,
  SELECT_PAGE_NO,
  ALL_CHECkBOX,
  SORT_ICON_FILTER,
  STATUS_SELECTION,
  SINGLE_CHECKBOX_SELECTION,
  RECORD_PER_PAGE_SECTION,
  ACTIVE_RECORDS,
} from "./Type";

export const checkBoxReducer = (state, action) => {
  switch (action.type) {
    //CHECKBOX SECTION
    case SINGLE_CHECKBOX_SELECTION:
      return {
        ...state,
        type: action.type,
        singleCheckbox: action.data,
      };

    case ALL_CHECkBOX:
      return {
        ...state,
        type: action.type,
        allCheckBox: action.data,
      };

    //PAGE SECTION
    case SELECT_PAGE_NO:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    //dropdone SECTION ----------
    case DATE_SELECTION:
      return {
        ...state,
        type: action.type,
        dateSection: action.data,
      };

    case STATUS_SELECTION:
      return {
        ...state,
        type: action.type,
        statusSection: action.data,
      };

    case RECORD_PER_PAGE_SECTION:
      return {
        ...state,
        type: action.type,
        recordPerPageSection: action.data,
      };

    //LOGTYPE SECTION
    case LOGTYPE:
      return {
        ...state,
        type: action.type,
        logType: action.data,
      };

    //FILTER SECTION
    case SORT_ICON_FILTER:
      return {
        ...state,
        type: action.type,
        sortIconFilter: action.data,
      };

    //RECORDS SECTION
    case RECORDS:
      return {
        ...state,
        type: action.type,
        record: action.data,
      };

    case ACTIVE_RECORDS:
      return {
        ...state,
        type: action.type,
        activeRecord: action.data,
      };

    //DATE SECTION
    case DATE:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    // SEARCH FILED
    case SEARCH_FIELD:
      return {
        ...state,
        type: action.type,
        searchField: action.data,
      };

    default:
      return state;
  }
};
