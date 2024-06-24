import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { alarmAction } from "../store/action/AlarmAction";

export default function CustomePaginationAlerts({
  data,
  code,
  date,
  record,
  projectType,
}) {

  //CURRENT PAGE NUMBER
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const dispatch = useDispatch();

  // @@ PAGE COUNT PUSHING INTO THE ARRAY
  let pageCountArray = [];
  for (var i = 1; i <= Math.ceil(data / record); i++) {
    pageCountArray.push(i);
  }

  //@@ ALL FUNCTION WARPER OBJECT
  const allPaginationFunctionObj = {
    firstPageFun: () => {
      dispatch(alarmAction(code, projectType, date, pageCountArray[0], record));
      setCurrentPageNumber(pageCountArray[0]);
      localStorage.setItem("page_no", pageCountArray[0]);

      localStorage.removeItem("pop_index");
      localStorage.removeItem("pagination_array");
    },
    lastPageFun: () => {
      dispatch(
        alarmAction(code, projectType, date, pageCountArray.at(-1), record)
      );
      setCurrentPageNumber(pageCountArray.at(-1));
      localStorage.setItem("page_no", pageCountArray.at(-1));

      //removing all indexs and array from pagination
      localStorage.removeItem("pop_index");
      localStorage.removeItem("pagination_array");
    },

    // @@ NEXT PAGE FUNCTION HERE-------------
    nextPageFunc: () => {
      dispatch(
        alarmAction(
          code,
          projectType,
          date,
          parseInt(currentPageNumber) + 1,
          record
        )
      );
      setCurrentPageNumber(parseInt(currentPageNumber) + 1);
      localStorage.setItem("page_no", parseInt(currentPageNumber) + 1);
    },
    pervPageFunc: () => {
      dispatch(
        alarmAction(
          code,
          projectType,
          date,
          parseInt(currentPageNumber) - 1,
          record
        )
      );
      setCurrentPageNumber(parseInt(currentPageNumber) - 1);
      localStorage.setItem("page_no", parseInt(currentPageNumber) - 1);
    },
    currentPageFun: (index) => {
      dispatch(
        alarmAction(
          code,
          JSON.parse(localStorage.getItem("project_type")).typeCode,
          date,
          index,
          record
        )
      );
      setCurrentPageNumber(index);
      localStorage.setItem("page_no", index);
    },
    breakItemFun: () => {
      var popIndexFromLocal = localStorage.getItem("pop_index")
        ? localStorage.getItem("pop_index")
        : 4;
      localStorage.setItem("pop_index", parseInt(popIndexFromLocal) + 4);

      pageCountArray = pageCountArray.slice(parseInt(popIndexFromLocal));
      localStorage.setItem("pagination_array", JSON.stringify(pageCountArray));

      localStorage.setItem("page_no", pageCountArray[0]);

      dispatch(
        alarmAction(
          code,
          localStorage.getItem("project_type")
            ? JSON.parse(localStorage.getItem("project_type")).typeCode
            : projectType,
          date,
          pageCountArray[0],
          record
        )
      );
    },
  };

  useEffect(() => {
    setCurrentPageNumber(
      localStorage.getItem("page_no") ? localStorage.getItem("page_no") : 1
    );
  }, []);

  let newArray = [];
  let arrayOfLocal = localStorage.getItem("pagination_array")
    ? JSON.parse(localStorage.getItem("pagination_array"))
    : "";

  newArray =
    arrayOfLocal &&
    arrayOfLocal.filter((element, index) => index < arrayOfLocal.length - 4);

  return (
    <>
      <Pagination>
        <Pagination.First
          onClick={allPaginationFunctionObj.firstPageFun}
          disabled={currentPageNumber == 1 ? "disabled" : ""}
        />

        {/* IF WE ARE IN FIRST PAGE OF LAST 4 INDEX ITEMS NEED TO DISAPPEAR THE PREVIOUS PAGE  */}
        {/* PREVIOUS PAGE */}

        <Pagination.Prev
          onClick={allPaginationFunctionObj.pervPageFunc}
          disabled={currentPageNumber == 1 ? "disabled" : ""}
        />

        {pageCountArray.length > 8 ? (
          <>
            {/* // MAPPING FIRST 4 PAGE NUMBER  */}
            {newArray
              ? newArray.map((items, index) => {
                return (
                  <>
                    {/* FIRST FOUR INDEXES */}
                    {index <= 4 && (
                      <Pagination.Item
                        onClick={() =>
                          allPaginationFunctionObj.currentPageFun(items)
                        }
                        active={items == currentPageNumber}
                      >
                        {items}
                      </Pagination.Item>
                    )}

                    {/*LAST FOUR INDEXS  */}
                  </>
                );
              })
              : pageCountArray.map((items, index) => {
                return (
                  <>
                    {/* FIRST FOUR INDEXES */}
                    {index <= 4 && (
                      <Pagination.Item
                        onClick={() =>
                          allPaginationFunctionObj.currentPageFun(items)
                        }
                        active={items == currentPageNumber}
                      >
                        {items}
                      </Pagination.Item>
                    )}

                    {/*LAST FOUR INDEXS  */}
                  </>
                );
              })}

            {/* IF WE ARE IN FIRST PAGE OF LAST 4 INDEX ITEMS NEED TO DISAPPEAR THE BREAKPOINT  ----** */}

            <Pagination.Item onClick={allPaginationFunctionObj.breakItemFun}>
              ...
            </Pagination.Item>

            {/* need to fix with dispatch value ------------------------------- */}
            {/*LAST FOUR INDEXS  */}
            {pageCountArray.slice(-4).map((items, index) => {
              return (
                <>
                  <Pagination.Item
                    onClick={() =>
                      allPaginationFunctionObj.currentPageFun(items)
                    }
                    active={items == currentPageNumber}
                  >
                    {items}
                  </Pagination.Item>
                </>
              );
            })}
          </>
        ) : (
          pageCountArray.map((items, index) => {
            return (
              <>
                <Pagination.Item
                  onClick={() => allPaginationFunctionObj.currentPageFun(items)}
                  active={items == currentPageNumber}
                >
                  {items}
                </Pagination.Item>
              </>
            );
          })
        )}

        <Pagination.Next
          onClick={allPaginationFunctionObj.nextPageFunc}
          disabled={currentPageNumber == pageCountArray.length ? "disable" : ""}
        />
        <Pagination.Last
          onClick={allPaginationFunctionObj.lastPageFun}
          disabled={currentPageNumber == pageCountArray.length ? "disable" : ""}
        />
      </Pagination>
    </>
  );
}
