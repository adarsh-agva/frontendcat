import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientDiagnoseData } from "../../store/action/DeviceAction";
import ServiceModuleNavBar from "./ServiceEnginner/ServiceModuleNavBar";
import { useNavigate } from "react-router";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-router-dom";
import back from "../../assets/images/back.png";

function NurseModuleData() {
  const getPatientDiagnose = useSelector((state) => state.getPatientDiagnose);
  const { loading, data } = getPatientDiagnose;
  const getAllTicket = data;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const UHID = urlParams.get("uhid");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPatientDiagnoseData(UHID));
  }, []);

  const handleAddHospital = () => {
    navigate(`/add_diagnose_data?uhId=${UHID}`);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <div>
        <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
          <div
            class="px-3 py-3 lg:px-5 lg:pl-3"
            style={{ backgroundColor: "rgb(152, 0, 76)" }}
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                {/* <Link to='/service_eng' class="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}> */}
                <span
                  to="/service_eng"
                  style={{ color: "white" }}
                  class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
                >
                  AgVa Healthcare
                </span>
                {/* </Link> */}
              </div>
              <div class="flex items-center">
                <div class="flex items-center ml-3">
                  {/* <Link to='/service_eng_installation'>
                                        <img src={installation} style={{ width: '2rem', height: '2rem' }} />
                                    </Link> */}
                </div>
                <div class="flex items-center ml-3">
                  <ServiceModuleNavBar />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div style={{ marginTop: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack}>
                            <img src={back} style={{ width: "3rem" }} />
                        </Link>
                        <h1 class="flex items-center text-3xl font-extrabold" style={{ justifyContent: 'center' }}>View<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-0 py-0.5 rounded   ml-2">Dosage</span></h1>
                    </div>
                    <div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: 'rgb(152, 0, 76)' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Diagnose</button>
                    </div>
                </div>
            </div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 :text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Medicine
                </th>
                <th scope="col" class="px-6 py-3">
                  Procedure
                </th>
                <th scope="col" class="px-6 py-3">
                  Others
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            {getAllTicket && getAllTicket.length > 0 ? (
              getAllTicket &&
              getAllTicket.map((item, index) => {
                return (
                  <tbody>
                    <tr
                      class="bg-white border-b :bg-gray-800 :border-gray-700"
                      key={index}
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        {item.medicine ? item.medicine : "---"}
                      </th>
                      <td class="px-6 py-4">
                        {item.procedure ? item.procedure : "---"}
                      </td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        <ReactReadMoreReadLess
                          charLimit={30}
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                        >
                          {item.others ? item.others : "---"}
                        </ReactReadMoreReadLess>
                      </td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        {item.date ? item.date.split("T")[0] : "---"}
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <div
                class="bg-white border-b :bg-gray-800 :border-gray-700"
                style={{ width: "350%", textAlign: "center" }}
              >
                <div class="px-8 py-8">No Data Found</div>
                {loading && (
                  <div
                    role="status"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 mr-2 text-gray-200 animate-spin :text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default NurseModuleData;
