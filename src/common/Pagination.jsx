import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../hooks/usePagination";
import "../css/Pagination.css";
import { useDispatch } from "react-redux";
import { alarmAction } from "../store/action/AlarmAction";
import {eventAction} from "../store/action/EventsAction"
import { getProjectByCode } from "../store/action/ProjectAction";


const Pagination = (props) => {
  const dispatch = useDispatch();
  var url_string = window.location.href;
  var url = new URL(url_string);
  const {
    code,
    projectType,
    diffdate,
    date,
    filters,
    filters1,
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);

    // if url is alerts
    if (url.href.includes("alarm")) {
      dispatch(
        alarmAction(code,date, projectType, diffdate, currentPage + 1, pageSize)
      );
    }
    if (url.href.includes("events")) {
      dispatch(
        eventAction(code,date, projectType, diffdate, currentPage + 1, pageSize)
      );
    }
    // if url is logable
    if (url.href.includes("log_table")) {
      dispatch(
        getProjectByCode(
          code,
          date,
          filters,
          currentPage + 1,
          pageSize,
          projectType
        )
      );
    }
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    // if url is alerts
    if (url.href.includes("alarm")) {
      dispatch(
        alarmAction(code,date, projectType, diffdate, currentPage - 1, pageSize)
      );
    }
    // If url is events
    if (url.href.includes("event")) {
      dispatch(
        eventAction(code,date, projectType, diffdate, currentPage - 1, pageSize)
      );
    }
    // if url is logable
    if (url.href.includes("log_table")) {
      dispatch(
        getProjectByCode(
          code,
          date,
          filters,
          currentPage - 1,
          pageSize,
          projectType
        )
      );
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}

        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <React.Fragment key={i}>
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}

              onClick={() => {
                onPageChange(pageNumber);

                if (url.href.includes("alarm")) {
                  dispatch(
                    alarmAction(code,date, projectType, diffdate, currentPage + 1, pageSize)
                  );
                }
                if (url.href.includes("log_table")) {
                  dispatch(
                    getProjectByCode(
                      code,
                      date,
                      filters,
                      pageNumber,
                      pageSize,
                      projectType
                    )
                  );
                }
              }}
            >
              {pageNumber}
            </li>
          </React.Fragment>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}

        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
