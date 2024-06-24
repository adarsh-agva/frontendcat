/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ToggleTabs from './Components/ToggleTabs';
import Style from '../../css/Analytics.module.css';
import AnalyticsEventDataComp from './Components/AnalyticsEventDataComp';
import EventByVersion from './Components/EventByVersion';

import {
  getCrashFreeUsersData,
  getCrashAnalyticsData,
} from '../../store/action/LogsAction';
import { getLogMsgOccurenceWRTDate } from '../../store/action/LogsAction';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticeIcon from '../../assets/icons/analyticIcon.png';
import SideBar from '../../utils/Sidebar';
import { Navbar } from '../../utils/NavBar';
import { faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';

export default function Analytics() {
  const date = useState({
    start: null,
    end: null,
  })[0];
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  var titleVal, subTitleVal;

  var dt = new Date();
  date.end = dt.toISOString().slice(0, 10);
  dt.setDate(dt.getDate() - 90);
  date.start = dt.toISOString().slice(0, 10);

  // URL STRING
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');

  const projectName = urlParams.get('name');
  const projectCodeAnalytics = urlParams.get('projectCodeAnalytics');
  let stackArray = urlParams.get('col') || '';

  let stackArrayNew = stackArray.split('at ') && stackArray.split(')');

  const sidebar_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: AnalyticeIcon,
      linkName: 'Analytics',
      link: ``,
    },
    link2: {
      iconName: `./assets/icons/settings.png`,
      linkName: 'Settings',
      link: `/settings?code=${code}&name=${projectName}`,
    },
    link3: {
      iconName: `./assets/icons/settings.png`,
      linkName: 'Settings',
      link: `/alarm?code=${code}&name=${projectName}`,
    },
  };
  const navigation_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faChartLine,
      linkName: 'Analytics',
    },
    link2: {
      iconName: faCog,
      linkName: 'Settings',
    },
  };

  let mapArrayKey = stackArrayNew.map((val, index) => {
    return val;
  });
  const stackErrorLine = () => {
    var causedError, noCousedError;

    if (mapArrayKey.length == 1) {
      setTitle(mapArrayKey[0]);
      titleVal = mapArrayKey[0];
      setSubTitle('');
      subTitleVal = '';
    } else {
      for (let key in mapArrayKey) {
        if (mapArrayKey[key].includes('Caused by:')) {
          causedError = mapArrayKey[parseInt(key) + 1]; //takes key value from 1 instead of 0
          setTitle(
            causedError.split('(')[1].replace(':', ' line ').split(')')[0]
          );
          titleVal = causedError
            .split('(')[1]
            .replace(':', ' line ')
            .split(')')[0];
          setSubTitle(causedError);
          subTitleVal = causedError;
        }
      }

      if (!stackArray.includes('Caused by:')) {
        noCousedError =
          mapArrayKey[1].split('(')[1].replace(':', ' ').split(')')[0] &&
          mapArrayKey[1].split('(')[1].replace(':', ' ').replace(' ', ' line ');
        setTitle(noCousedError);
        titleVal = noCousedError;
        setSubTitle(mapArrayKey[1].concat(')'));
        subTitleVal = mapArrayKey[1].concat(')');

      }
    }
  };

  const getCrashFreeUsersDataReducer = useSelector(
    (state) => state.getCrashFreeUsersDataReducer
  );

  const { loading, data } = getCrashFreeUsersDataReducer;
  let users = data && data.response ? data.response.length : 0;
  let totalCount = 0;
  if (data && data.response.length !== 0) {
    data.response.map((e) => (totalCount += e.count));
  }

  const dispatch = useDispatch();

  const dispatchmultiple = () => {
    dispatch(
      getCrashFreeUsersData(
        code,
        subTitleVal ? subTitleVal.replace(' at ', '') : titleVal,
        projectCodeAnalytics
      )
    );

    dispatch(
      getCrashAnalyticsData(
        code,
        subTitleVal ? subTitleVal.replace(' at ', '') : titleVal,
        projectCodeAnalytics
      )
    );
    dispatch(
      getLogMsgOccurenceWRTDate({
        code,
        startDate: date.start,
        endDate: date.end,
        logMsg: subTitleVal ? subTitleVal.replace(' at ', '') : titleVal,
        code1: projectCodeAnalytics,
      })
    );
  };

  useEffect(() => {
    stackErrorLine();
  }, []);

  useEffect(() => {
    dispatchmultiple();
  }, []);
  return (
    <>
      <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar sidebar_details={sidebar_details} />
        </Col>
        <Col xl={10} lg={10} md={10} sm={10} className="colSection">
          <Navbar navigation_details={navigation_details} />
          <Container className={`${Style.mainContainer} container`}>
            {/* data from api */}
            <Col>
              <h2
                className="darkModeColor"
                style={{
                  fontWeight: '600',
                }}
              >
                {title}
              </h2>
              <p
                className="darkModeColor"
                style={{
                  fontWeight: '600',
                }}
              >
                {subTitle}
              </p>
            </Col>

            <Col className="my-4">
              {loading ? (
                'Loading'
              ) : (
                <p className={`${Style.paraTextIssue} darkModeColor`}>
                  This issue has{' '}
                  <strong style={{ color: 'rgb(152, 0, 76)' }}>
                    {totalCount} crash
                  </strong>{' '}
                  events affecting
                  <strong style={{ color: 'rgb(152, 0, 76)' }}> {users} users</strong>
                </p>
              )}
            </Col>
            <Col>
              <Row>
                <Col xl={8} md={8} sm={12}>
                  <EventByVersion />
                </Col>
                <Col xl={4} md={4} sm={12}>
                  <ToggleTabs />
                </Col>
              </Row>
            </Col>

            <Col
              className={`${Style.AnalyticsEvents}  my-4 mt-5`}
              xl={12}
              md={12}
              sm={12}
            >
              <p
                className="darkModeColor"
                style={{
                  color: '#000',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                Events
              </p>
            </Col>

            {/* data tables   */}
            <Col>
              <AnalyticsEventDataComp />
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
}
