/* eslint-disable */
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import AWS from 'aws-sdk';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faSortUp,
  faDownload,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { getProjectByCode } from '../../../../store/action/ProjectAction';
import TableCard from '../../../../container/TableCard';
import Style from '../../../../css/TableDataNew.module.css';
import CustomCard from '../../../../container/CustomCard';
import { ThemeContext } from '../../../../utils/ThemeContext';
import toast from 'react-hot-toast';
import SpinnerCustom from '../../../../container/SpinnerCustom';
import { checkBoxReducer } from './store/Reducer';
import {
  SEARCH_FIELD,
  SELECT_PAGE_NO,
  DATE_SELECTION,
  STATUS_SELECTION,
  RECORDS,
  LOGTYPE,
  SORT_ICON_FILTER,
  ALL_CHECkBOX,
  RECORD_PER_PAGE_SECTION,
  ACTIVE_RECORDS,
  DATE,
} from './store/Type';
import Pagination from '../../../../common/Pagination';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
});

// var arrayofSelectRow = []
// var getPrivousArray = {}

export default function TableDataNew(props) {
  // ALL CHECKED BOX CHECK STATE
  // const [allCheckBox, setAllCheckBox] = useState(false);
  const { theme } = React.useContext(ThemeContext);
  // const code = props.code;
  let filedate = new Date();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectTypeCode = urlParams.get('projectType');

  // ======================================Reducer from Redux===================================
  // ===========================================================================================
  // ===========================================================================================

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data } = getAllLogByCodeReducer;
  // ============================================
  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: typeWiseDate } = getModelCodeReducer;
  const dispatch = useDispatch();

  // ======================================New State management================================
  // ===========================================================================================
  // ===========================================================================================
  // @@  STATE MANAGEMENT WITH USE REDUCER STARTS ------
  /*
  useReducer --> to manage single checkbox and all checkbox state and export data by conditionally
  initialState == checkbox selection state, page number state, date state,counter page state
  
  */
  const initialState = {
    pageNo: 1,
    dateSection: true,
    statusSection: false,
    recordPerPageSection: false,
    countPerPage: false,
    logType: {
      error: localStorage.getItem('selected_log')
        ? JSON.parse(localStorage.getItem('selected_log')).error
        : false,
      info: localStorage.getItem('selected_log')
        ? JSON.parse(localStorage.getItem('selected_log')).info
        : false,
      warn: localStorage.getItem('selected_log')
        ? JSON.parse(localStorage.getItem('selected_log')).warn
        : false,
      debug: localStorage.getItem('selected_log')
        ? JSON.parse(localStorage.getItem('selected_log')).debug
        : false,
      verbose: localStorage.getItem('selected_log')
        ? JSON.parse(localStorage.getItem('selected_log')).verbose
        : false,
    },
    sortIconFilter: {
      LM: false,
      AD: false,
      LT: false,
      DA: false,
      TI: false,
    },
    record: localStorage.getItem('selected_record')
      ? JSON.parse(localStorage.getItem('selected_record'))
      : 25,

    activeRecord: {
      record10: false,
      record25: false,
      record50: false,
      record100: false,
    },

    dateState: {
      start: JSON.parse(localStorage.getItem('selected_date')).start,
      end: JSON.parse(localStorage.getItem('selected_date')).end,
    },
    searchField: '',
    // allCheckBox: false,
    // singleCheckbox: false,
  };

  const [currentStateTableData, dispatchTableData] = useReducer(
    checkBoxReducer,
    initialState
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [checkedLogs, setCheckedLogs] = useState([]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data?.logs.map((log) => log._id));
    setCheckedLogs(data?.data?.logs);
    if (isCheckAll) {
      setIsCheck([]);
      setCheckedLogs([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    setIsCheck([...isCheck, id]);
    setCheckedLogs([...checkedLogs, JSON.parse(name)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setCheckedLogs(
        checkedLogs.filter((item) => {
          return item._id !== id;
        })
      );
    }
  };

  const setDownloadButton = useState(false)[1];

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * currentStateTableData.record;
    const lastPageIndex = firstPageIndex + currentStateTableData.record;
    return (
      data && data.data && data.data.logs.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage]);

  // CHECKBOX STATE MANAGEMENT WITH User REDUCER END ---------------------------------------------
  // ===========================================================================================
  // ===========================================================================================
  // ===========================================================================================

  const hadnleMulteDispatch = (type, data) => {
    // console.log("data here", type, data);
    return dispatchTableData({ type: type, data: data });
  };

  // SHOW DATE SECTION FUNCTION
  const handleShowDate = () => {
    hadnleMulteDispatch(DATE_SELECTION, true);
    hadnleMulteDispatch(STATUS_SELECTION, false);
    hadnleMulteDispatch(RECORD_PER_PAGE_SECTION, false);
  };
  // SHOW STATUS CODE SECTION FUNCTION
  const handleShowStatus = () => {
    hadnleMulteDispatch(DATE_SELECTION, false);
    hadnleMulteDispatch(STATUS_SELECTION, true);
    hadnleMulteDispatch(RECORD_PER_PAGE_SECTION, false);
  };

  // SHOW PAGE PER COUNT SECTION FUNCTION
  const handleShowPerPage = () => {
    hadnleMulteDispatch(DATE_SELECTION, false);
    hadnleMulteDispatch(STATUS_SELECTION, false);
    hadnleMulteDispatch(RECORD_PER_PAGE_SECTION, true);
  };

  // =============================================================================
  // =============================================================================
  // =============================================================================

  var date = {
    start: currentStateTableData.dateState.start,
    end: currentStateTableData.dateState.end,
  };

  var startDate, endDate;
  endDate = filedate.toISOString().slice(0, 10);
  filedate.setDate(filedate.getDate() - props.diffDate);
  startDate = filedate.toISOString().slice(0, 10);

  // project code to analytics screen
  const projectCodeAnalytics =
    (data &&
      data.data &&
      data.data.logs &&
      data.data.logs[0] &&
      data.data.logs[0].type) ||
    [];

  // PROJECT CODE
  var projectCode = {
    code: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeCode
      : projectTypeCode,
    name: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeName
      : typeWiseDate &&
        typeWiseDate.modelList &&
        typeWiseDate.modelList[0].typeName,
  };

  let projectCodeType = typeWiseDate && typeWiseDate.modelList[0].typeCode;

  // DOWNLOAD CSV FILE FUNCTION
  const downloadCSVFun = ({ data, fileName, fileType }) => {
    console.log('data', data);
    var csv = ' Log Message';
    csv += '\t Mac Address';
    csv += '\t Log Type';
    csv += '\t Date';
    csv += '\t Time';
    csv += '\n';
    for (var i = 0; i < data.length; i++) {
      let logMsg = data[i].log.message;
      logMsg = logMsg.replaceAll('\n\t', '');
      csv += `${logMsg}\t${data[i].device.did}\t${data[i].log.type}\t${
        data[i].log.date.split('T')[0]
      }\t${data[i].log.date.split('T')[1].split('.')[0]}`;
      // csv += `${logMsg}\t${data[i].device.did}\t${data[i].log.type}`;
      csv += '\n';
    }

    const blob = new Blob([csv], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  // RESET FILTER FUNCTION
  const resetFilter = () => {
    // multy dispatch for resetfilter
    const multipleDispatch = (type, data) => {
      // console.log("data here", type, data);

      return dispatchTableData(type, data);
    };

    multipleDispatch({ type: RECORDS, data: currentStateTableData.record });
    multipleDispatch({
      type: SELECT_PAGE_NO,
      data: currentStateTableData.pageNo,
    });
    multipleDispatch({
      type: ACTIVE_RECORDS,
      data: {
        record10: false,
        record25: false,
        record50: false,
        record100: false,
      },
    });

    localStorage.removeItem('selected_log');
    localStorage.removeItem('selected_date');
    localStorage.removeItem('selected_record');
    localStorage.removeItem('page_no');

    multipleDispatch({
      type: LOGTYPE,
      data: {
        error: null,
        info: null,
        warn: null,
        debug: null,
        verbose: null,
      },
    });

    props.setShowTableField(false);

    dispatch(
      getProjectByCode(
        props.code,
        date,
        null,
        currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code,
        null
      )
    );
    toast.success('Filter has been reset');
  };

  // STATUS LOG TYPE CHIPS

  const chipsArray = ['info', 'warn', 'error', 'debug', 'verbose'];

  const chipsSection = chipsArray.map((items, index) => (
    <section className={Style.chip}>
      <p style={{ color: '#fff' }}>{items.toUpperCase()}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        onClick={() => closeChips(items, index)}
      />
    </section>
  ));

  // close chips
  const closeChips = (items, index) => {
    dispatchTableData({
      type: LOGTYPE,
      data: {
        ...currentStateTableData.logType,
        [items]: false,
      },
    });
    dispatch(
      getProjectByCode(
        props.code,
        date,
        { ...currentStateTableData.logType, [items]: false },
        currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code
      )
    );
    localStorage.setItem(
      'selected_log',
      JSON.stringify({ ...currentStateTableData.logType, [items]: false })
    );
  };

  // DATE CHIPS
  const DateChipsArray = [
    currentStateTableData.dateState.start,
    currentStateTableData.dateState.end,
  ];
  const dateChips = DateChipsArray.map((items) => (
    <section className={Style.chip}>
      <p style={{ color: '#fff' }}>{items}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        // onClick={() => closeDateChip(items, index)}
      />
    </section>
  ));

  // SAVE SEARCH FUNCTION
  const saveSearch = () => {
    // LOG TYPE
    if (currentStateTableData.logType) {
      localStorage.setItem(
        'selected_log',
        JSON.stringify({
          ...currentStateTableData.logType,
          [currentStateTableData.logType]: true,
        })
      );
    }

    localStorage.setItem('page_no', 1);

    // DATE CHIPS
    dateChipFun();

    localStorage.setItem(
      'selected_record',
      JSON.stringify(currentStateTableData.record)
    );
    if (
      currentStateTableData.logType.info ||
      currentStateTableData.logType.error ||
      currentStateTableData.logType.warn ||
      currentStateTableData.logType.verbose ||
      currentStateTableData.logType.debug
    ) {
      dispatch(
        getProjectByCode(
          props.code,
          date,
          currentStateTableData.logType,
          currentStateTableData.pageNo,
          currentStateTableData.record,
          projectCode.code
        )
      );
    } else {
      dispatch(
        getProjectByCode(
          props.code,
          date,
          currentStateTableData.logType,
          currentStateTableData.pageNo,
          currentStateTableData.record,
          projectCode.code
        )
      );
    }

    toast.success('Filter saved');
    props.setShowTableField(false);
  };

  let dateChipFun = () => {
    if (currentStateTableData.dateState.start) {
      localStorage.setItem(
        'selected_date',
        JSON.stringify({
          ...currentStateTableData.dateState,
          start: currentStateTableData.dateState.start,
        })
      );
    }
    if (currentStateTableData.dateState.end) {
      localStorage.setItem(
        'selected_date',
        JSON.stringify({
          ...currentStateTableData.dateState,
          end: currentStateTableData.dateState.end,
        })
      );
    }
  };

  // ========================================

  const callbackfnDispatchGetAllData = (sortType) => {
    dispatch(
      getProjectByCode(
        props.code,
        date,
        currentStateTableData.logType,
        localStorage.getItem('page_no')
          ? JSON.parse(localStorage.getItem('page_no'))
          : currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code,
        sortType
      )
    );
  };

  // SORTING FUNCTION
  // multple dispatch function for sorting
  const multpleDispatchSort = (type, data) => {
    return dispatchTableData({
      type: type,
      data: data,
    });
  };

  const sortTableFunLM = (callbackDispatchAllData) => {
    // LM -- log message
    if (currentStateTableData.sortIconFilter.LM) {
      return callbackDispatchAllData('-log.message');
    } else if (!currentStateTableData.sortIconFilter.LM) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: true,
        AD: false,
        LT: false,
        DA: false,
        TI: false,
      });

      return callbackDispatchAllData('log.message');
    }
  };

  const sortTableFunAD = (callbackDispatchAllData) => {
    // AD-- mac address
    if (currentStateTableData.sortIconFilter.AD) {
      return callbackDispatchAllData('-device.did');
    } else if (!currentStateTableData.sortIconFilter.AD) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: false,
        AD: true,
        LT: false,
        DA: false,
        TI: false,
      });
      return callbackDispatchAllData('device.did');
    }
  };

  const sortTableFunLT = (callbackDispatchAllData) => {
    // LT -- logotype
    if (currentStateTableData.sortIconFilter.LT) {
      return callbackDispatchAllData('-log.type');
    } else if (!currentStateTableData.sortIconFilter.LT) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: false,
        AD: false,
        LT: true,
        DA: false,
        TI: false,
      });
      return callbackDispatchAllData('log.type');
    }
  };

  const sortTableFunDT = (callbackDispatchAllData) => {
    // DT -- date TI-- time
    if (
      currentStateTableData.sortIconFilter.DA ||
      currentStateTableData.sortIconFilter.TI
    ) {
      return callbackDispatchAllData('-log.date');
    } else if (
      !currentStateTableData.sortIconFilter.DA ||
      !currentStateTableData.sortIconFilter.TI
    ) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: false,
        AD: false,
        LT: false,
        DA: true,
        TI: true,
      });
      return callbackDispatchAllData('log.date');
    }
  };

  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
  const handleSearchFunc = (event) => {
    dispatchTableData({
      type: SEARCH_FIELD,
      data: event.target.value,
    });
  };
  let tableData = data && data.data && data.data.logs;

  // console.log("tableData", tableData)

  let search =
    (currentStateTableData.searchField &&
      currentStateTableData.searchField.trim() &&
      currentStateTableData.searchField.trim().toLowerCase()) ||
    '';
  if (search.length > 0) {
    tableData = tableData.filter(function (item) {
      return (
        item.log.date.split('T')[0].toLowerCase().includes(search) ||
        item.log.date.split('T')[1].toLowerCase().includes(search) ||
        item.log.file.toLowerCase().includes(search) ||
        item.log.message.toLowerCase().includes(search) ||
        item.log.type.toLowerCase().includes(search) ||
        item.device.did.toLowerCase().includes(search) ||
        item.type.toLowerCase().includes(search) ||
        item.version.includes(search)
      );
    });
  }

  /***
   * conditions ----
   * -> all checkbox checked so off single checkbox
   * -> sort array by there index for rew select state
   * -> delte both duplace item and previous item as well
   */

  // @@ DOWNLOAD FUNCTION
  const handleDownload = async (row) => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        Bucket: process.env.REACT_APP_S3_BUCKET,
        region: 'ap-south-1',
      });

      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: row.log.filePath,
      };

      const data = await s3.getObject(params).promise();

      let blob = new Blob([data.Body], { type: data.ContentType });
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `s3://${process.env.REACT_APP_S3_BUCKET}/${row.log.filePath}`;
      link.click();
    } catch (error) {
      console.log('Download error : ', error);
    }
  };
  // @@ first dispatch of table data
  useEffect(() => {
    dispatch(
      getProjectByCode(
        props.code,
        date,
        currentStateTableData.logType,
        currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code
      )
    );
  }, [currentStateTableData.pageNo, startDate, endDate]);

  useEffect(() => {
    dispatch(
      getProjectByCode(props.code, null, null, null, null, projectCode.code)
    );
  }, []);
  useEffect(() => {
    // Providing data to the type-dropdown
    props.tableDataStateFun(
      props.code,
      date,
      currentStateTableData.logType,
      currentStateTableData.pageNo,
      currentStateTableData.record,
      projectCodeType
    );
  }, []);
  useEffect(() => {
    date.start = startDate;
    date.end = endDate;
    // setDate({ start: startDate, end: endDate }); ----**
  }, [props.diffDate]);

  // console.log("tableData", tableData)

  return (
    <TableCard height="100%" borderRadius="10px">
      <section>
        {/*SEARCH SECTION  */}
        <section className={Style.searchSection}>
          <input
            type="text"
            placeholder="Search..."
            value={currentStateTableData.searchField}
            onChange={handleSearchFunc}
          />
          {/* Chips section */}
          <section className={Style.chipExportSection}>
            <section className={Style.chipInner}>
              {currentStateTableData.logType.info && chipsSection[0]}
              {currentStateTableData.logType.warn && chipsSection[1]}
              {currentStateTableData.logType.error && chipsSection[2]}
              {currentStateTableData.logType.debug && chipsSection[3]}
              {currentStateTableData.logType.verbose && chipsSection[4]}

              {/* DATE CHIPS */}
              {currentStateTableData.dateState.start && dateChips[0]}
              {currentStateTableData.dateState.end && dateChips[1]}
            </section>
          </section>
          {/* {console.log("date", new Date().getDay() + "-" + new Date().getMonth() + "-" + new Date().getFullYear())} */}
          <button
            // id="download_button"
            // style={{
            //   opacity:
            //     currentStateTableData.allCheckBox ||
            //       currentStateTableData.singleCheckbox
            //       ? "100%"
            //       : "30%",
            // }}
            // onClick={() =>
            // (currentStateTableData.allCheckBox || newItemsArray.length) &&
            //   downloadCSVFun({
            //     data: currentStateTableData.allCheckBox
            //       ? tableData
            //       : newItemsArray,
            //     fileName: `${props.code}.csv`,
            //     fileType: "text/csv;charset=utf-8;",
            //   })
            // }

            disabled={checkedLogs?.length ? null : 'disabled'}
            style={{
              border: 'none',
              opacity: checkedLogs?.length ? '100%' : '40%',
            }}
            onClick={() =>
              downloadCSVFun({
                data: checkedLogs,

                fileName: `${props.code}-${
                  new Date().getDay() +
                  '-' +
                  new Date().getMonth() +
                  '-' +
                  new Date().getFullYear()
                }.csv`,

                fileType: 'text/csv;charset=utf-8;',
              })
            }
          >
            <FontAwesomeIcon
              icon={faDownload}
              style={{
                background: '#21969D',
                padding: '10px',
                borderRadius: '5px',
                color: '#fff',
              }}
            />
          </button>
        </section>

        {/*  TABLE */}
        <section className={Style.customeTable}>
          <section className={Style.tableHeader}>
            <section>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={isCheckAll}
                id="selectAll"
              />
            </section>
            <section
              style={{ color: theme === 'light-theme' ? '#000' : '#fff' }}
            >
              Log Message
              <span
                style={{ cursor: 'pointer', margin: '0px 5px' }}
                onClick={() => sortTableFunLM(callbackfnDispatchGetAllData)}
              >
                <FontAwesomeIcon
                  icon={
                    currentStateTableData.sortIconFilter.LM
                      ? faSortDown
                      : faSortUp
                  }
                  onClick={() => {
                    dispatchTableData({
                      type: SORT_ICON_FILTER,
                      data: {
                        ...currentStateTableData.sortIconFilter,
                        LM: !currentStateTableData.sortIconFilter.LM,
                      },
                    });
                  }}
                />
              </span>
            </section>
            <section
              style={{ color: theme === 'light-theme' ? '#000' : '#fff' }}
            >
              Log Type
              <span
                style={{ cursor: 'pointer', margin: '0px 5px' }}
                onClick={() => sortTableFunLM(callbackfnDispatchGetAllData)}
              >
                <FontAwesomeIcon
                  icon={
                    currentStateTableData.sortIconFilter.LM
                      ? faSortDown
                      : faSortUp
                  }
                  onClick={() => {
                    dispatchTableData({
                      type: SORT_ICON_FILTER,
                      data: {
                        ...currentStateTableData.sortIconFilter,
                        LM: !currentStateTableData.sortIconFilter.LM,
                      },
                    });
                  }}
                />
              </span>
            </section>

            <section>
              <section
                style={{ color: theme === 'light-theme' ? '#000' : '#fff' }}
              >
                Device Id
                <span
                  style={{ cursor: 'pointer', margin: '0px 5px' }}
                  onClick={() => sortTableFunAD(callbackfnDispatchGetAllData)}
                >
                  <FontAwesomeIcon
                    icon={
                      currentStateTableData.sortIconFilter.AD
                        ? faSortDown
                        : faSortUp
                    }
                    onClick={() => {
                      dispatchTableData({
                        type: SORT_ICON_FILTER,
                        data: {
                          ...currentStateTableData.sortIconFilter,
                          AD: !currentStateTableData.sortIconFilter.AD,
                        },
                      });
                    }}
                  />
                </span>
              </section>
            </section>
            <section>
              <section style={{ color: theme === 'light-theme' ? '' : '#fff' }}>
                Category
                <span
                  style={{ cursor: 'pointer', margin: '0px 5px' }}
                  onClick={() => sortTableFunLT(callbackfnDispatchGetAllData)}
                >
                  <FontAwesomeIcon
                    icon={
                      currentStateTableData.sortIconFilter.LT
                        ? faSortDown
                        : faSortUp
                    }
                    onClick={() => {
                      dispatchTableData({
                        type: SORT_ICON_FILTER,
                        data: {
                          ...currentStateTableData.sortIconFilter,
                          LT: !currentStateTableData.sortIconFilter.LT,
                        },
                      });
                    }}
                  />
                </span>
              </section>
            </section>
            <section>
              <section style={{ color: theme === 'light-theme' ? '' : '#fff' }}>
                Date
                <span
                  style={{ cursor: 'pointer', margin: '0px 5px' }}
                  onClick={() => sortTableFunDT(callbackfnDispatchGetAllData)}
                >
                  <FontAwesomeIcon
                    icon={
                      currentStateTableData.sortIconFilter.DA
                        ? faSortDown
                        : faSortUp
                    }
                    onClick={() => {
                      dispatchTableData({
                        type: SORT_ICON_FILTER,
                        data: {
                          ...currentStateTableData.sortIconFilter,
                          DA: !currentStateTableData.sortIconFilter.DA,
                        },
                      });
                    }}
                  />
                </span>
              </section>
            </section>
            <section>
              <section style={{ color: theme === 'light-theme' ? '' : '#fff' }}>
                Time
                <span
                  style={{ cursor: 'pointer', margin: '0px 5px' }}
                  onClick={() => sortTableFunDT(callbackfnDispatchGetAllData)}
                >
                  <FontAwesomeIcon
                    icon={
                      currentStateTableData.sortIconFilter.TI
                        ? faSortDown
                        : faSortUp
                    }
                    onClick={() => {
                      dispatchTableData({
                        type: SORT_ICON_FILTER,
                        data: {
                          ...currentStateTableData.sortIconFilter,
                          TI: !currentStateTableData.sortIconFilter.TI,
                        },
                      });
                    }}
                  />
                </span>
              </section>
            </section>
          </section>
          {tableData &&
            tableData.map((item, index) => {
              return (
                <React.Fragment key={item._id}>
                  {/* {console.log("item", item)} */}
                  {/* {console.log(item)} */}
                  <section className={Style.tableBody}>
                    <section style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        id={item._id}
                        name={JSON.stringify(item)}
                        onChange={handleClick}
                        checked={isCheck.includes(item._id)}
                      />
                    </section>
                    <section style={{ width: '80%' }}>
                      {item && item.log && item.log.filePath ? (
                        <section style={{ cursor: 'pointer' }}>
                          <p onClick={() => handleDownload(item)}>
                            {item.log.file}
                          </p>
                        </section>
                      ) : (
                        <a
                          className={Style.logMsg}
                          style={{
                            color: theme === 'light-theme' ? '#7D7A8C' : '#fff',
                          }}
                          href={`/analytics?code=${props.code}&name=${props.projectName}&col=${item?.log?.message}&rowlogGeneratedDate=${item?.log?.date}&version=${item?.version}&osArchitecture=${item?.device?.os?.name}&modelName=${item.device.name}&pagename=analytics&projectCodeAnalytics=${projectCodeAnalytics}`}
                        >
                          {item.log.filePath
                            ? item.log.file
                            : item.log.message.includes('at ')
                            ? item.log.message.split('at ')[0]
                            : item.log.message}
                        </a>
                      )}
                    </section>
                    <section>
                      <p
                        style={{
                          color: theme === 'light-theme' ? '#000' : '#fff',
                        }}
                      >
                        {item.log.message && 'TEXT'}
                      </p>
                      <p
                        style={{
                          color: theme === 'light-theme' ? '#000' : '#fff',
                        }}
                      >
                        {item.log.filePath && 'FILE'}
                      </p>
                    </section>

                    <section
                      style={{ color: theme === 'light-theme' ? '' : '#fff' }}
                    >
                      {item?.device?.did}
                    </section>
                    <section>
                      {item.log.type === 'error' && (
                        <span style={{ color: 'red' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type === 'info' && (
                        <span style={{ color: 'blue' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type === 'warn' && (
                        <span style={{ color: 'violet' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type === 'debug' && (
                        <span style={{ color: 'green' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type === 'verbose' && (
                        <span style={{ color: 'purple' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                    </section>
                    <section
                      style={{ color: theme === 'light-theme' ? '' : '#fff' }}
                    >
                      {item.log.date.split('T')[0]}
                    </section>
                    <section
                      style={{ color: theme === 'light-theme' ? '' : '#fff' }}
                    >
                      {item.log.date.split('T')[1].split('.')[0]}
                    </section>
                  </section>
                </React.Fragment>
              );
            })}
        </section>

        {/* DROPDOWN FILTER */}
        <section>
          {props.showTableField ? (
            <CustomCard
              position="absolute"
              height="auto"
              width="450px"
              top="0%"
              right="0%"
              padding="10px"
              boxShadow="0px 0px 4px -2px rgba(0,0,0,0.75)"
            >
              <section className={Style.TopButton}>
                <Button className="m-2" onClick={resetFilter}>
                  Reset Filter
                </Button>
                <Button className="m-2" onClick={saveSearch}>
                  Save Filter
                </Button>
              </section>
              <section>
                <Row>
                  <Col xl={6} md={6} sm={6}>
                    <section className={`m-2`}>
                      <p
                        style={{ cursor: 'pointer' }}
                        className={
                          currentStateTableData.dateSection
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowDate}
                      >
                        Date
                      </p>
                      <p
                        style={{ cursor: 'pointer' }}
                        className={
                          currentStateTableData.statusSection
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowStatus}
                      >
                        Log Category
                      </p>
                      {/* <p
                        className={
                          currentStateTableData.recordPerPageSection
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowPerPage}
                      >
                        Record per page
                      </p> */}
                    </section>
                  </Col>

                  {/* DATA CHANGE SECTION START FROM HERE */}
                  {currentStateTableData.dateSection ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.DateSection}>
                        <input
                          type="date"
                          min={date.start}
                          max={date.end}
                          value={
                            startDate && startDate.start
                              ? startDate.start
                              : localStorage.getItem('selected_date') &&
                                JSON.parse(
                                  localStorage.getItem('selected_date')
                                ).start
                          }
                          onChange={(e) => {
                            dispatchTableData({
                              type: DATE,
                              data: {
                                ...currentStateTableData.dateState,
                                start: e.target.value,
                              },
                            });

                            date.start = e.target.value;
                          }}
                        />
                        <input
                          type="date"
                          min={date.start}
                          max={date.end}
                          value={
                            startDate && startDate.start
                              ? startDate.start
                              : localStorage.getItem('selected_date') &&
                                JSON.parse(
                                  localStorage.getItem('selected_date')
                                ).end
                          }
                          onChange={(e) => {
                            dispatchTableData({
                              type: DATE,
                              data: {
                                ...currentStateTableData.dateState,
                                end: e.target.value,
                              },
                            });

                            currentStateTableData.date.end = e.target.value;
                          }}
                        />
                      </section>
                    </Col>
                  ) : null}

                  {/* STATUS CODE SECTION START HERE */}
                  {currentStateTableData.statusSection ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.StatusSection}>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Info
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.info}
                            onChange={(e) => {
                              dispatchTableData({
                                type: LOGTYPE,
                                data: {
                                  ...currentStateTableData.logType,
                                  info: !currentStateTableData.logType.info,
                                },
                              });
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Warn
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.warn}
                            onClick={(e) => {
                              dispatchTableData({
                                type: LOGTYPE,
                                data: {
                                  ...currentStateTableData.logType,
                                  warn: !currentStateTableData.logType.warn,
                                },
                              });
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Error
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.error}
                            onClick={(e) => {
                              dispatchTableData({
                                type: LOGTYPE,
                                data: {
                                  ...currentStateTableData.logType,
                                  error: !currentStateTableData.logType.error,
                                },
                              });
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Debug
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.debug}
                            onClick={(e) => {
                              dispatchTableData({
                                type: LOGTYPE,
                                data: {
                                  ...currentStateTableData.logType,
                                  debug: !currentStateTableData.logType.debug,
                                },
                              });
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Verbose
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.verbose}
                            onClick={(e) => {
                              dispatchTableData({
                                type: LOGTYPE,
                                data: {
                                  ...currentStateTableData.logType,
                                  verbose:
                                    !currentStateTableData.logType.verbose,
                                },
                              });
                            }}
                          />
                        </section>
                      </section>
                    </Col>
                  ) : null}

                  {/* COUNT PER PAGE SECTION START FOM HERE   */}
                  {currentStateTableData.recordPerPageSection ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.perPageOuter}>
                        <p
                          className={
                            currentStateTableData.activeRecord.record10
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            dispatchTableData({ type: RECORDS, data: 10 });
                            dispatchTableData({
                              type: ACTIVE_RECORDS,
                              data: {
                                record10: true,
                              },
                            });
                          }}
                        >
                          10
                        </p>
                        <p
                          className={
                            currentStateTableData.activeRecord.record25 ||
                            currentStateTableData.record == 25
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            dispatchTableData({ type: RECORDS, data: 25 });
                            dispatchTableData({
                              type: ACTIVE_RECORDS,
                              data: {
                                record25: true,
                              },
                            });
                          }}
                        >
                          25
                        </p>
                        <p
                          className={
                            currentStateTableData.activeRecord.record50
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            dispatchTableData({ type: RECORDS, data: 50 });
                            dispatchTableData({
                              type: ACTIVE_RECORDS,
                              data: {
                                record50: true,
                              },
                            });
                          }}
                        >
                          50
                        </p>
                        <p
                          className={
                            currentStateTableData.activeRecord.record100
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            dispatchTableData({ type: RECORDS, data: 100 });
                            dispatchTableData({
                              type: ACTIVE_RECORDS,
                              data: {
                                record100: true,
                              },
                            });
                          }}
                        >
                          100
                        </p>
                      </section>
                    </Col>
                  ) : null}
                </Row>
              </section>
            </CustomCard>
          ) : null}
        </section>

        {loading && <SpinnerCustom height="200px" />}
        {data && data.data && !data.data.count && (
          <section className={Style.noDataFound}>
            <p style={{ color: theme == 'light-theme' ? `#000` : `#fff` }}>
              No Data Found
            </p>
          </section>
        )}
        {tableData && (
          <section className="p-2">
            {/* {console.log("mmm",data && data?.data && data?.data.count)} */}

            <Pagination
              code={props.code}
              date={date}
              filters={currentStateTableData.logType}
              projectType={projectCode.code}
              // className="pagination-bar"
              currentPage={currentPage}
              totalCount={data?.data?.count ? data?.data.count : 0}
              pageSize={currentStateTableData.record}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </section>
        )}
      </section>
    </TableCard>
  );
}
