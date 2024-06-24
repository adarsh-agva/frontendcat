import React from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../css/DeviceAssign.module.css";
import { Row, Col } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById } from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Model from "./Model";
import { Button, Modal } from 'flowbite-react';
import { Toaster, toast } from "react-hot-toast";
import { deviceAssignAction } from "../../store/action/AdminDashboard";
import { getRegisteredDetailsById } from "../../store/action/DeviceAction";
// import { toast, Toaster } from "react-hot-toast";
function DeviceAssign() {
  const [userId, setUserId] = useState("");
  const [openModal, setOpenModal] = useState()
  const props = { openModal, setOpenModal };

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get('DeviceId')

  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data } = allUsersDetailsReducer;
  const registerUsers = data && data.data;
  const registerUsersId = registerUsers;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = registerUsersId && registerUsersId.slice(firstIndex, lastIndex);
  const npage = Math.ceil(registerUsersId && registerUsersId.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  useEffect(() => {
    dispatch(getAllUsersDetalisById({ page: 1, limit: recordsPerPage }));
  }, []);

  // const getRegisteredDetailsReducer = useSelector(
  //   (state) => state.getRegisteredDetailsReducer
  // );
  // const { data12 } = getRegisteredDetailsReducer;
  // let regDetail = data12;

  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState([]);
  const assignBtn = (e) => {
    e.preventDefault()
    // if (!selectId.length) {
    //   toast.error("Select DeviceId");
    // } else {
      const DeviceId=deviceId
      dispatch(deviceAssignAction({ _id: selectId ,DeviceId}));
      toast.success("Success");
    // }
  };
  useEffect(() => {
    dispatch(getRegisteredDetailsById());
  }, []);
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the value to the array if the checkbox is checked
      setSelectId([...selectId, value]);
    } else {
      // Remove the value from the array if the checkbox is unchecked
      setSelectId(selectId.filter((item) => item !== value));
    }
  };

  const goBack = () => {
    window.history.go(-1)
  }
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className={Style.container}
        id="blur"
        style={{
          position: "relative",
          top: "6rem",
          marginLeft: "7%",
          width: "90%",
        }}
      >
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", justifyContent: 'space-between', marginBottom: '10px' }}
        >
          <div className={Style.deviceSummary}>
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4 className={Style.Header}>Device Assign</h4>
          </div>
          {/* <button style={{ padding: '1vw', backgroundColor: 'black', color: 'white', borderRadius: '8px' }}>Assign</button> */}
          <button
            className={Style.adminbtn}
            onClick={() =>{
              // setIsOpen(true, setUserId(proj.entry._id))
              const DeviceId=deviceId
              dispatch(deviceAssignAction({ _id: selectId ,DeviceId}));
            }}
          >
            Assign
          </button>
        </div>
        <div class="relative overflow-x-auto" style={{ borderRadius: '10px' }}>
          <table class="w-full text-sm text-left text-gray-500 :text-gray-400">
            <thead class="text-xs text-gray-700 uppercase :text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Select</th>
                <th scope="col" class="px-6 py-3">User Name</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Hospital Name</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
              {/* TABLE HERE */}

            </thead>
            {records &&
              records.map((entry, index) => {
                var firstname = entry.firstName;
                var name = firstname + " " + entry.lastName;
                return (
                  <tbody>
                    <tr class="bg-white border-b :bg-gray-800 :border-gray-700" key={index}>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                        <input type="checkbox"
                          value={entry._id}
                          onChange={(e) => handleChange(e)}
                          checked={selectId.includes(entry._id)}
                        />
                      </td>
                      <td class="px-6 py-4">
                        {name}
                      </td>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                        {entry.email}
                      </td>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                        {entry.hospitalName}
                      </td>
                      <td>
                        <button
                          className={Style.viewbtn}
                          onClick={() => {
                            navigate(`/assignDeviceToUserModel?userId=${entry._id}`)
                          }
                          }
                        >
                          More
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
        <div
          className="left_arrow" style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
              {incPage > 1 ?
                <Link onClick={prePage}>
                  <img src={back} style={{ width: "3rem" }} />
                </Link>
                : " "}
              {numbers.map((n, i) => (
                <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
              ))}
              {incPage !== totalPage ?
                <Link onClick={nextPage}>
                  <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                </Link>
                : " "}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
  function prePage() {
    dispatch(getAllUsersDetalisById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getAllUsersDetalisById({ page: incPage + 1, limit: recordsPerPage }))
  }
}

export default DeviceAssign;
