import React, { useState, useEffect, useRef } from 'react';
import CustomCard from '../../../../Container/CustomCard';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faDownload } from '@fortawesome/free-solid-svg-icons';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Style from './TableData.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectByCode } from '../store/action/ProjectAction';
import SpinnerCustom from '../../../../Container/SpinnerCustom';
import toast, { Toaster } from 'react-hot-toast';
import TableCard from '../../../../Container/TableCard';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../utils/ThemeContext';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import CustomPaginationTableData from '../common/CustomPaginationTableData';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

function TableData(props) {
  const { theme } = React.useContext(ThemeContext);
  const code = props.code;
  let filedate = new Date();
  const [selectionCount, setSelectionCount] = useState(0);
  const [dateSectionSelect, setDateSectionSelect] = useState(true);
  const [statusSectionSelect, setStatusSectionSelect] = useState(false);
  const [countPerPageSection, setCountPerPageSection] = useState(false);
  const [activeRecord, setActiveRecord] = useState({
    record10: false,
    record25: false,
    record50: false,
    record100: false,
  });
  const [disableButton, setDisableButton] = useState(true);
  const [selectTableState, setSelectTableState] = useState(false);

  const [pageNo, setPageNo] = useState(1);

  function setSelectionCountSync(state) {
    return new Promise((resolve) => {
      setSelectionCount(state, resolve);
    });
  }
  // SHOW DATE SECTION FUNCTION
  const handleShowDate = () => {
    setDateSectionSelect(true);
    setStatusSectionSelect(false);
    setCountPerPageSection(false);
  };
  // SHOW STATUS CODE SECTION FUNCTION
  const handleShowStatus = () => {
    setDateSectionSelect(false);
    setStatusSectionSelect(true);
    setCountPerPageSection(false);
  };

  // SHOW PAGE PER COUNT SECTION FUNCTION
  const handleShowPerPage = () => {
    setDateSectionSelect(false);
    setStatusSectionSelect(false);
    setCountPerPageSection(true);
  };

  var startDate, endDate;

  const [dateState, setDate] = useState({
    start: JSON.parse(localStorage.getItem('selected_date')).start,
    end: JSON.parse(localStorage.getItem('selected_date')).end,
  });

  var date = {
    start: JSON.parse(localStorage.getItem('selected_date')).start,
    end: JSON.parse(localStorage.getItem('selected_date')).end,
  };

  endDate = filedate.toISOString().slice(0, 10);
  filedate.setDate(filedate.getDate() - props.diffDate);
  startDate = filedate.toISOString().slice(0, 10);
  useEffect(() => {
    date.start = startDate;
    date.end = endDate;
    setDate({ start: startDate, end: endDate });
  }, [props.diffDate]);

  const [record, setRecords] = useState(
    localStorage.getItem('selected_record')
      ? JSON.parse(localStorage.getItem('selected_record'))
      : 25
  );

  const ref = useRef();

  const [logType, setLogType] = useState({
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
  });

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const bootstrapTableRef = useRef();

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: typeWiseDate } = getModelCodeReducer;

  const [activePage, setActivePage] = useState({ activePage: 1 });
  var projectCode = {
    code: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeCode
      : typeWiseDate &&
        typeWiseDate.modelList &&
        typeWiseDate.modelList[0].typeCode,
    name: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeName
      : typeWiseDate &&
        typeWiseDate.modelList &&
        typeWiseDate.modelList[0].typeName,
  };

  let projectCodeType = typeWiseDate && typeWiseDate.modelList[0].typeCode;

  //  1)  DIRECTION PAGE TO NEW PAGE
  let navigate = useNavigate();

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  const { loading, data } = getAllLogByCodeReducer;

  // project code to analytics screen
  const projectCodeAnalytics =
    (data &&
      data.data &&
      data.data.logs &&
      data.data.logs[0] &&
      data.data.logs[0].type) ||
    [];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: selectTableState,
    classes: 'selected-row',
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectionCount(document.querySelectorAll('.selected-row').length);
    },
    onSelectAll: (isSelect, rows, e) => {
      setSelectionCount(document.querySelectorAll('.selected-row').length);
    },
  };

  const dispatch = useDispatch();

  let logTypeFun = () => {
    if (logType.info) {
      localStorage.setItem(
        'selected_log',
        JSON.stringify({ ...logType, info: true })
      );
    }
    if (logType.error) {
      localStorage.setItem(
        'selected_log',
        JSON.stringify({ ...logType, error: true })
      );
    }
    if (logType.warn) {
      localStorage.setItem(
        'selected_log',
        JSON.stringify({ ...logType, warn: true })
      );
    }
    if (logType.debug) {
      localStorage.setItem(
        'selected_log',
        JSON.stringify({ ...logType, debug: true })
      );
    }
    if (logType.verbos) {
      localStorage.setItem(
        'selected_log',
        JSON.stringify({ ...logType, verbos: true })
      );
    }
  };

  let dateChipFun = () => {
    if (dateState.start) {
      localStorage.setItem(
        'selected_date',
        JSON.stringify({ ...dateState, start: dateState.start })
      );
    }
    if (dateState.end) {
      localStorage.setItem(
        'selected_date',
        JSON.stringify({ ...dateState, end: dateState.end })
      );
    }
  };


  const saveSearch = () => {
    // LOG TYPE
    logTypeFun();

    localStorage.setItem('page_no', 1);
    var pageNofromLocalStrg = localStorage.getItem('page_no');

    // DATE CHIPS
    dateChipFun();

    localStorage.setItem('selected_record', JSON.stringify(record));
    if (
      logType.info ||
      logType.error ||
      logType.warn ||
      logType.verbose ||
      logType.debug
    ) {
      dispatch(
        getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
      );
    } else {
      dispatch(
        getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
      );
    }

    toast.success('Filter saved');
    props.setShowTableField(false);
  };

  useEffect(() => {
    // LOG TYPE
    // logTypeFun();

    // DATE CHIPS
    dateChipFun();
  }, [logType, date]);

  const resetFilter = () => {
    setRecords(25);
    setPageNo(1);

    setActiveRecord({
      record10: false,
      record25: false,
      record50: false,
      record100: false,
    });

    localStorage.removeItem('selected_log');
    localStorage.removeItem('selected_date');
    localStorage.removeItem('selected_record');

    setLogType({
      error: '',
      info: '',
      warn: '',
      debug: '',
      verbose: '',
    });

    props.setShowTableField(false);
    dispatch(
      getProjectByCode(code, date, null, null, record, projectCode.code)
    );
    toast.success('Filter has been reset');
  };

  // FIRST DISPATCH OF TABLE DATA

  useEffect(() => {
    dispatch(
      getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
    );
  }, [pageNo, startDate, endDate]);

  // Columns
  function errorFormatter(cell, row) {
    if (row.log.type) {
      return (
        <span>
          {cell == 'error' ? (
            <p style={{ color: 'red' }}>{cell.toUpperCase()}</p>
          ) : cell == 'warn' ? (
            <p style={{ color: 'violet' }}>{cell.toUpperCase()}</p>
          ) : cell == 'info' ? (
            <p style={{ color: 'blue' }}>{cell.toUpperCase()}</p>
          ) : cell == 'verbose' ? (
            <p style={{ color: 'green' }}>{cell.toUpperCase()}</p>
          ) : (
            <p style={{ color: 'orange' }}>{cell.toUpperCase()}</p>
          )}
        </span>
      );
    }

    return <span>$ {cell} NTD</span>;
  }

  // @@ DOWNLOAD FUNCTION
  const handleDownload = (row) => {
    setSelectTableState(false);

    var a = document.createElement('a');
    a.target = '_blank';
    a.href = `https://0942-2401-4900-1f39-34dc-385b-1069-1819-5282.in.ngrok.io/${row.log.filePath}`;
    a.setAttribute('download', row.log.filePath);
    a.click();
  };

  const columns = [
    {
      dataField: 'log.message',
      text: 'Log Message',
      headerAlign: 'center',
      headerStyle: () => {
        return {
          backgroundColor: '#257d7c',
          color: '#fff',
          width: '100%',
        };
      },

      formatter: (col, row, rowIndex) => {
        var title;
        var colData = col.split('at ');
        var colDataTOString = colData.toString();
        if (colData) {
          if (colDataTOString.includes('(')) {
            title = colData[0].split(')')[0].concat(')');
          } else {
            title = colData[0].split(')')[0];
          }
        }
        if (colDataTOString.includes('java.lang.RuntimeException')) {
          title = colData[1].split('(')[1].replace(':', ' ').split(')')[0];
        } else {
          for (let key in colData) {
            if (colData[key].includes('Caused by:')) {
              title = colData[parseInt(key) + 1]
                .split('(')[1]
                .replace(':', ' line ')
                .split(')')[0];
            }
          }
        }
        return (
          <div className={Style.expandedRow}>
            {row && row.log && row.log.message && (
              <Link
                style={{ textDecoration: ' none' }}
                to={`/analytics?code=${props.code}&name=${
                  props.projectName
                }&col=${
                  row.log.filePath ? row.log.filePath : row.log.message
                }&rowlogGeneratedDate=${row.log.date}&version=${
                  row.version
                }&osArchitecture=${row.device.os.name}&modelName=${
                  row.device.name
                }&page-name=analytics&projectCodeAnalytics=${projectCodeAnalytics}`}
              >
                <p>{title.split(')')[0]}</p>
              </Link>
            )}

            {/* {title && title.indexOf(")") ? title.split(")")[0] : title} */}

            {row && row.log && row.log.filePath && (
              <section
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p style={{ cursor: 'not-allowed' }}>{row.log.file}</p>
                <section
                  style={{
                    backgroundColor: '#0099A4',
                    padding: '3px 5px',
                    color: '#fff',
                    borderRadius: '5px',
                  }}
                  onClick={() => handleDownload(row)}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </section>
              </section>
            )}
          </div>
        );
      },
      sort: true,
    },
    {
      headerStyle: () => {
        return {
          backgroundColor: '#257d7c',
          color: '#fff',
        };
      },
      dataField: 'device.did',
      text: 'MAC Address',
      sort: true,
      headerStyle: () => {
        return {
          backgroundColor: '#257d7c',
          color: '#fff',
          width: '40%',
        };
      },
    },
    {
      dataField: 'log.type',
      text: 'Log Type',
      headerStyle: () => {
        return {
          backgroundColor: '#257d7c',
          color: '#fff',
          width: '40%',
        };
      },

      formatter: errorFormatter,
      sort: true,
    },
    {
      dataField: 'log.date',
      text: 'Date',
      headerStyle: () => {
        return {
          backgroundColor: '#257d7c',
          color: '#fff',
          width: '40%',
        };
      },

      formatter: (cell) => {
        cell = cell.split('T')[0];
        let day = cell.split('-')[2];
        let month = cell.split('-')[1];
        let year = cell.split('-')[0];
        cell = `${day}-${month}-${year}`;
        return cell.split('T')[0];
      },
      sort: true,
    },
    {
      dataField: 'log.date',
      text: 'Time',
      headerStyle: () => {
        return {
          backgroundColor: '#257d7c',
          color: '#fff',
          width: '40%',
        };
      },

      formatter: (cell) => {
        cell = cell.split('T')[1];
        cell = cell.split('.')[0];
        let seconds = cell.split(':')[2];
        let minutes = cell.split(':')[1];
        let hours = cell.split(':')[0];
        cell =
          seconds !== '00' && hours !== '00' && minutes !== '00'
            ? `${hours}:${minutes}:${seconds}`
            : 'N/A';
        return cell;
      },
      sort: true,
    },
  ];

  useEffect(() => {
    // 1) If record are 10 in local storage
    if (localStorage.getItem('selected_record') == 10) {
      setRecords(10);
      setActiveRecord({
        ...activeRecord,
        record10: true,
      });
    }

    // 2) If record are 25 in local storage
    if (localStorage.getItem('selected_record') == 25) {
      setRecords(25);
      setActiveRecord({
        ...activeRecord,
        record25: true,
      });
    }
    // 3) If record are 50 in local storage
    if (localStorage.getItem('selected_record') == 50) {
      setRecords(50);
      setActiveRecord({
        ...activeRecord,
        record50: true,
      });
    }

    // 3) If record are 100 in local storage
    if (localStorage.getItem('selected_record') == 100) {
      setRecords(100);
      setActiveRecord({
        ...activeRecord,
        record100: true,
      });
    }
  }, []);

  const closeChips = (items, index) => {
    setLogType({ ...logType, [items]: false });
    dispatch(
      getProjectByCode(
        code,
        date,
        { ...logType, [items]: false },
        pageNo,
        record,
        projectCode.code
      )
    );
    localStorage.setItem(
      'selected_log',
      JSON.stringify({ ...logType, [items]: false })
    );
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

  // DATE CHIPS
  const closeDateChip = (index) => {
    if (index == 0) {
      setDate({
        ...dateState,
        start: '',
      });
      date.start = '';
      localStorage.setItem(
        'selected_date',
        JSON.stringify({ ...dateState, start: '' })
      );
      dispatch(
        getProjectByCode({
          code: code,
          date: date,
          projectType: projectCodeAnalytics,
        })
      );
    }
    if (index == 1) {
      setDate({
        ...dateState,
        end: '',
      });
      date.end = '';
      localStorage.setItem(
        'selected_date',
        JSON.stringify({ ...dateState, end: '' })
      );
      dispatch(
        getProjectByCode({
          code: code,
          date: date,
          projectType: projectCodeAnalytics,
        })
      );
    }
  };

  const DateChipsArray = [dateState.start, dateState.end];
  const dateChips = DateChipsArray.map((items, index) => (
    <section className={Style.chip}>
      <p style={{ color: '#fff' }}>{items}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        onClick={() => closeDateChip(items, index)}
      />
    </section>
  ));

  useEffect(() => {
    // Providing data to the type-dropdown
    props.tableDataStateFun(
      code,
      date,
      logType,
      pageNo,
      record,
      projectCodeType
    );
  }, []);

  return (
    <>
      <TableCard
        height={data && data.data && data.data.logs.length ? '100%' : '200px'}
        borderRadius="10px"
      >
        <Toaster />
        <section className={`${Style.OuterTable} `} ref={ref}>
          {data && data.data && data.data.logs.length > 0 && (
            <>
              <ToolkitProvider
                keyField="_id"
                data={data.data.logs}
                columns={columns}
                search
                exportCSV={{
                  exportAll: false,
                  fileName: `${code}_${filedate.toISOString()}.csv`,
                  onlyExportSelection: true,
                }}
              >
                {(toolkitProps) => (
                  <>
                    <div className={`${Style.BootstrapTable} TBSED`}>
                      <section className={Style.searchbar}>
                        <SearchBar {...toolkitProps.searchProps} />
                      </section>
                      {/* Chips section */}
                      <section className={Style.chipOuter}>
                        {/* DATE CHIPS */}
                        {dateState.start && dateChips[0]}
                        {dateState.end && dateChips[1]}

                        {logType.info && chipsSection[0]}
                        {logType.warn && chipsSection[1]}
                        {logType.error && chipsSection[2]}
                        {logType.debug && chipsSection[3]}
                        {logType.verbose && chipsSection[4]}
                      </section>
                      <section className={Style.filterOptions}>
                        <ExportCSVButton
                          {...toolkitProps.csvProps}
                          disabled={
                            bootstrapTableRef &&
                            bootstrapTableRef.current &&
                            bootstrapTableRef.current.selectionContext &&
                            bootstrapTableRef.current.selectionContext.selected
                              .length == 0
                              ? 'disabled'
                              : ''
                          }
                          disabled={selectionCount}
                        >
                          <FontAwesomeIcon icon={faDownload} />
                        </ExportCSVButton>
                      </section>
                    </div>

                    <BootstrapTable
                      ref={bootstrapTableRef}
                      {...toolkitProps.baseProps}
                      selectRow={selectRow}
                      // rowEvents={tableRowEvents}
                    />
                  </>
                )}
              </ToolkitProvider>
              <section className="p-2">
                <CustomPaginationTableData
                  data={data && data.data && data.data.count}
                  code={code}
                  date={date}
                  logType={logType}
                  record={record}
                  projectType={projectCode.code}
                />
              </section>
            </>
          )}

          {data && data.data && data.data.logs.length == 0 && (
            <section
              style={{
                height: '200px',
                textAlign: 'center',
                fontSize: '1.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme == 'dark-content' ? `#fff` : `#000`,
              }}
            >
              No data found
            </section>
          )}

          {loading && <SpinnerCustom height="200px" />}
        </section>
        <section>
          {props.showTableField ? (
            <CustomCard
              position="absolute"
              height="auto"
              width="450px"
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
                        className={
                          dateSectionSelect
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowDate}
                      >
                        Date
                      </p>
                      <p
                        className={
                          statusSectionSelect
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowStatus}
                      >
                        Log Category
                      </p>
                      <p
                        className={
                          countPerPageSection
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowPerPage}
                      >
                        Record per page
                      </p>
                    </section>
                  </Col>

                  {/* DATA CHANGE SECTION START FROM HERE */}
                  {dateSectionSelect ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.DateSection}>
                        <input
                          type="date"
                          min={date.start}
                          max={date.end}
                          value={
                            dateState && dateState.start
                              ? dateState.start
                              : localStorage.getItem('selected_date') &&
                                JSON.parse(
                                  localStorage.getItem('selected_date')
                                ).start
                          }
                          onChange={(e) => {
                            setDate({
                              ...dateState,
                              start: e.target.value,
                            });
                            date.start = e.target.value;
                          }}
                        />
                        <input
                          type="date"
                          min={date.start}
                          max={date.end}
                          value={
                            dateState && dateState.end
                              ? dateState.end
                              : localStorage.getItem('selected_date') &&
                                JSON.parse(
                                  localStorage.getItem('selected_date')
                                ).end
                          }
                          onChange={(e) => {
                            setDate({
                              ...dateState,
                              end: e.target.value,
                            });
                            date.end = e.target.value;
                          }}
                        />
                      </section>
                    </Col>
                  ) : null}

                  {/* STATUS CODE SECTION START HERE */}
                  {statusSectionSelect ? (
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
                            checked={logType.info}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                info: !logType.info,
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
                            checked={logType.warn}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                warn: !logType.warn,
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
                            checked={logType.error}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                error: !logType.error,
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
                            checked={logType.debug}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                debug: !logType.debug,
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
                            checked={logType.verbose}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                verbose: !logType.verbose,
                              });
                            }}
                          />
                        </section>
                      </section>
                    </Col>
                  ) : null}

                  {/* COUNT PER PAGE SECTION START FOM HERE   */}
                  {countPerPageSection ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.perPageOuter}>
                        <p
                          className={
                            activeRecord.record10
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            setRecords(10);
                            setActiveRecord({
                              record10: true,
                            });
                          }}
                        >
                          10
                        </p>
                        <p
                          className={
                            activeRecord.record25 || record == 25
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            setRecords(25);
                            setActiveRecord({
                              record25: true,
                            });
                          }}
                        >
                          25
                        </p>
                        <p
                          className={
                            activeRecord.record50
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            setRecords(50);
                            setActiveRecord({
                              record50: true,
                            });
                          }}
                        >
                          50
                        </p>
                        <p
                          className={
                            activeRecord.record100
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            setRecords(100);
                            setActiveRecord({
                              record100: true,
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
      </TableCard>
    </>
  );
}

export default TableData;
