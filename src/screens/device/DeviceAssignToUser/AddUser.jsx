import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../../css/DeviceAssign.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deviceAssignAction,
  getAllUsersDetalisById,
} from "../../../store/action/AdminDashboard";
import { Toaster, toast } from "react-hot-toast";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
function AddUser() {
  const [openModal, setOpenModal] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get("DeviceId");

  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data } = allUsersDetailsReducer;
  const registerUsers = data && data.data;
  const registerUsersId = registerUsers;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =
    registerUsersId && registerUsersId.slice(firstIndex, lastIndex);
  const npage = Math.ceil(
    registerUsersId && registerUsersId.length / recordsPerPage
  );
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1);
  useEffect(() => {
    dispatch(getAllUsersDetalisById({ page: 1, limit: recordsPerPage }));
  }, []);

  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState([]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectId(value);
    // this code is for multipe
    // if (checked) {
    //     // Add the value to the array if the checkbox is checked
    //     setSelectId([...selectId, value]);
    // } else {
    //     // Remove the value from the array if the checkbox is unchecked
    //     setSelectId(selectId.filter((item) => item !== value));
    // }
  };

  const handleSubmit = () => {
    if (!selectId) {
      toast.error("Select Assistant");
    } else {
      dispatch(deviceAssignAction({ assistantId: selectId, deviceId }));
    }
    setOpenModal(false);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <div>
        <Toaster />
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "10px",
          }}
        >
          <button
            className={Style.adminbtn}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Assign
          </button>
        </div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
              <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                Are you sure you want to assign to this user?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                  onClick={
                    handleSubmit
                    // () => {
                    // dispatch(deviceAssignAction({ _id: selectId, deviceId }));
                    // toast.success('User Assigned')
                    // setOpenModal(false)
                    // }
                  }
                >
                  Yes, I'm sure
                </button>
                <button
                  style={{
                    backgroundColor: "white",
                    border: "0.5px solid gray",
                    color: "black",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                  onClick={() => setOpenModal(false)}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div class="relative overflow-x-auto" style={{ borderRadius: "10px" }}>
          <table class="w-full text-sm text-left text-gray-500 :text-gray-400">
            <thead class="text-xs text-gray-700 uppercase :text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Select
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Contact
                </th>
                <th scope="col" class="px-6 py-3">
                  Department
                </th>
                <th scope="col" class="px-6 py-3">
                  Hospital Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
              {/* TABLE HERE */}
            </thead>
            {records &&
              records.map((entry, index) => {
                var firstname = entry.firstName;
                var name = firstname + " " + entry.lastName;
                return (
                  <tbody>
                    <tr
                      class="bg-white border-b :bg-gray-800 :border-gray-700"
                      key={index}
                    >
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        <input
                          type="checkbox"
                          value={entry._id}
                          onChange={(e) => handleChange(e)}
                          checked={selectId.includes(entry._id)}
                        />
                      </td>
                      <td class="px-6 py-4">{name}</td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        {entry.contactNumber}
                      </td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        {entry.department}
                      </td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                      >
                        {entry.hospitalName}
                      </td>
                      <td>
                        <button
                          className={Style.viewbtn}
                          onClick={() => {
                            navigate(
                              `/assignDeviceToUserModel?userId=${entry._id}`
                            );
                          }}
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
      </div>
    </>
  );
}

export default AddUser;
