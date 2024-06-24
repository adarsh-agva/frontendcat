import React, { useEffect, useRef, useState } from 'react'
import back from "../../../assets/images/back.png";
import Style from "../../../css/DeviceAssign.module.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserFromAssignedDeviceAction, getUserDataByDeviceId } from '../../../store/action/AdminDashboard';
import { Toaster, toast } from 'react-hot-toast';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function AssignedUsers() {
  const [openModal, setOpenModal] = useState(false);
  const divRef = useRef(null);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get('DeviceId')
  const getUserDataByDeviceIdReducer = useSelector(
    (state) => state.getUserDataByDeviceIdReducer
  );
  const { data } = getUserDataByDeviceIdReducer;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDataByDeviceId())
  }, [])
  const newData = data && data.data;
  return (
    <div
    >
      {/* <Toaster /> */}
      {/* Heading Section */}
      <div ref={divRef}>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                  Name
                </td>
                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                  Contact
                </td>
                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                  Hospital Name
                </td>
                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                  Department
                </td>
                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {newData && newData.length > 0 ?
                newData && newData.map((item, index) => {
                  return (
                    <tr class="bg-white border-b hover:bg-gray-50">
                      <td class="px-6 py-4 text-center ">
                        {item.firstName}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.contactNumber}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.hospitalName}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.department}
                      </td>
                      <td class="px-6 py-4 text-center font-semibold text-gray-900">
                        <button style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '8px', borderRadius: '8px' }}
                          onClick={() => {
                            setOpenModal(true)
                          }}
                        >Remove</button>
                      </td>
                      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
                            <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                              Are you sure you want to remove this user?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                dispatch(deleteUserFromAssignedDeviceAction({ _id: item._id }))
                                setOpenModal(false)
                              }}>
                                Yes, I'm sure
                              </button>
                              <button style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }} onClick={() => setOpenModal(false)}>
                                No, cancel
                              </button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </tr>
                  )
                })
                :
                <div style={{ height: '30vh', position: 'relative', left: '32rem', top: '6rem' }}>
                  <span>
                    No Data Found
                  </span>
                </div>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AssignedUsers