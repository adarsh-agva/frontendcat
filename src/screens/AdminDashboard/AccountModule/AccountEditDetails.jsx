import React, { useEffect, useState } from "react";
import Style from "../../../css/Production.module.css";
import { toast, Toaster } from "react-hot-toast";
import { getEditProductionDataAction } from "../../../store/action/DispatchDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import back from "../../../assets/images/back.png";
import { Link } from "react-router-dom";
import NavBarForAll from "../../../utils/NavBarForAll";
import e from "cors";
import {
  getSingleProductionDataAction,
  postEditAccountDetails,
} from "../../../store/action/DeviceAction";
function AccountEditDetails() {
  const dispatch = useDispatch();
  const [loadinState, setLoadingState] = useState(false);
  const getSingleProductionDataReducer = useSelector(
    (state) => state.getSingleProductionDataReducer
  );
  const { loading, data } = getSingleProductionDataReducer;
  const getDispatchData = data?.accountsData;

  const [dispatchDetails, setDispatchDetails] = useState({
    ackDate: getDispatchData?.ackDate,
    ackNumber: getDispatchData?.ackNo,
    billedTo: getDispatchData?.billedTo,
    consignee: getDispatchData?.consinee,
    consigneeAddress: getDispatchData?.consigneeAddress,
    document_ref_no: getDispatchData?.document_ref_no,
    irnNumber: getDispatchData?.irn,
  });
  useEffect(() => {
    dispatch(getSingleProductionDataAction(serialNumber));
    if (getDispatchData && getDispatchData.length > 0) {
      setDispatchDetails({
        ackDate: getDispatchData?.ackDate,
        ackNumber: getDispatchData?.ackNo,
        billedTo: getDispatchData?.billedTo,
        consignee: getDispatchData?.consinee,
        consigneeAddress: getDispatchData?.consigneeAddress,
        document_ref_no: getDispatchData?.document_ref_no,
        irnNumber: getDispatchData?.irn,
      });
    }
  }, [dispatch]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get("deviceId");
  const serialNumber = urlParams.get("serialNumber");

  const dispatchHandler = (e) => {
    e.preventDefault();
    dispatch(
      postEditAccountDetails({
        seriallNo: serialNumber,
        ackDate: dispatchDetails?.ackDate,
        ackNo: dispatchDetails?.ackNo,
        billedTo: dispatchDetails?.billedTo,
        consinee: dispatchDetails?.consinee,
        consigneeAddress: dispatchDetails?.consigneeAddress,
        document_ref_no: dispatchDetails?.document_ref_no,
        irn: dispatchDetails?.irn,
      })
    );
  };
  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      {/* <Navbar /> */}
      <NavBarForAll />
      <Toaster />
      <div className={Style.mainContainer}>
        <div className={Style.dispatchContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              height: "auto",
            }}
          >
            <Link onClick={goBack} style={{ display: "block" }}>
              <img src={back} loading="lazy" style={{ width: "3rem" }} />
            </Link>
            <h1 class="text-2xl font-extrabold">
              Account
              <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">
                Edit
              </small>
            </h1>
            <hr style={{ color: "rgb(152, 0, 76)" }} />
          </div>
          <form>
            <div
              class="grid gap-6 mb-6 md:grid-cols-2"
              style={{ textAlign: "start" }}
            >
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Serial Number
                </label>
                <input
                  list="borow"
                  type="text"
                  id="first_name"
                  value={serialNumber}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="product"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  IRN Number
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setDispatchDetails({
                      ...dispatchDetails,
                      irnNumber: e.target.value,
                    });
                  }}
                  value={dispatchDetails.irnNumber}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter IRN Number"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ack Number
                </label>
                <input
                  type="text"
                  id="company"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      ackNumber: e.target.value,
                    })
                  }
                  value={dispatchDetails.ackNumber}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Ack Number"
                  required
                />
              </div>
              <div>
                <label
                  for="website"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ack Date
                </label>
                <input
                  type="date"
                  id="website"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      ackDate: e.target.value,
                    })
                  }
                  value={dispatchDetails.ackDate}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Billed to
                </label>
                <input
                  type="text"
                  id="company"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      billedTo: e.target.value,
                    })
                  }
                  value={dispatchDetails.billedTo}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Builled to"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      billedTo: e.target.value,
                    })
                  }
                  value={dispatchDetails.billedTo}
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Consignee Name
                </label>
                <input
                  type="text"
                  id="company"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      consignee: e.target.value,
                    })
                  }
                  value={dispatchDetails.consignee}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Consignee name"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Consignee Address
                </label>
                <input
                  type="text"
                  id="company"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      consigneeAddress: e.target.value,
                    })
                  }
                  value={dispatchDetails.consigneeAddress}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Testing Done By"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Document Ref. Number
                </label>
                <input
                  type="text"
                  id="company"
                  onChange={(e) =>
                    setDispatchDetails({
                      ...dispatchDetails,
                      document_ref_no: e.target.value,
                    })
                  }
                  value={dispatchDetails.document_ref_no}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Parts Issued By"
                  required
                />
              </div>
            </div>
            {/* software hardware */}
            <button
              type="submit"
              style={{ backgroundColor: "rgb(152, 0, 76)" }}
              onClick={dispatchHandler}
              class="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountEditDetails;
