import {
  ALL_ROW_SELECTED,
  DATE_DROPDOWN,
  DIFF_DATE,
  FILTERS,
  DISABLE_BUTTON,
  PROJECT_CODE,
  RECORDS,
  SEARCH_FIELD,
  SHOW_TABLE_FIELDS,
  SORT_ICONS,
  TABLE_DATA_STATE,
} from "./Types";

export const alertDataReducer = (state, action) => {
  switch (action.type) {
    case TABLE_DATA_STATE:
      return {
        ...state,
        type: action.type,
         tableDataState: action.data,
      };

    case DIFF_DATE:
      return {
        ...state,
        type: action.type,
        diffDate: action.data,
      };

    case DISABLE_BUTTON:
      return {
        ...state,
        type: action.type,
        disableButton: action.data,
      };

    case DATE_DROPDOWN:
      return {
        ...state,
        type: action.type,
        dateDropDown: action.data,
      };

    case SHOW_TABLE_FIELDS:
      return {
        ...state,
        type: action.type,
        showTableField: action.data,
      };

    case RECORDS:
      return {
        ...state,
        type: action.type,
        record: action.data,
      };

    case PROJECT_CODE:
      return {
        ...state,
        type: action.type,
        projectCode: action.data,
      };

    case SEARCH_FIELD:
      return {
        ...state,
        type: action.type,
        searchField: action.data,
      };

    case SORT_ICONS:
      return {
        ...state,
        type: action.type,
        sortIcons: action.data,
      };

    case ALL_ROW_SELECTED:
      return {
        ...state,
        type: action.type,
        allRowSelect: action.data,
      };
      case FILTERS:
        return{
          ...state,
          type:action.type,
          filters1:action.data,
        }

    default:
      return state;
  }
};
