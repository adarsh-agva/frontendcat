import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appDisapprovePendingDataAction, getAccessUserDataAction, getAccessUserReviewDataAction, getAllUsersDetalisById } from '../../../store/action/AdminDashboard';
import SpinnerCustom from '../../../container/SpinnerCustom';
import { Button, Modal } from 'flowbite-react';
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineClose } from "react-icons/ai";

function AllUseres() {
  const [openModal, setOpenModal] = useState(false);
  const [active_Id, setActive_Id] = useState()
  const getUserAccessDataReducer = useSelector(
    (state) => state.getUserAccessDataReducer
  );
  const { loading, data } = getUserAccessDataReducer;
  const registerUsers = data && data.data;
  console.log('registerUsers', registerUsers)


  const getAccessReviewDataReducer = useSelector(
    (state) => state.getAccessReviewDataReducer
  );
  const { data: dataa } = getAccessReviewDataReducer;
  const datas = dataa && dataa.data;
  const deviceData = dataa && dataa.data;
  const doctorData = dataa && dataa.data2;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessUserDataAction())
  }, [])
  // console.log('09',active_Id)
  useEffect(() => {
    dispatch(getAccessUserReviewDataAction());
  }, [dispatch]);

  return (
    <>
      <div
      >
        <Toaster />
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
        </div>
        <div >
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Name
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Specality
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Contact
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    User Id
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Device Id
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Device
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {registerUsers && registerUsers.length > 0 ?
                  registerUsers && registerUsers.map((item, index) => {
                    return (
                      <tr class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-center font-semibold text-gray-900">
                          {item.firstName}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.speciality ? item.speciality : 'NA'}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.contactNumber ? item.contactNumber : 'NA'}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.userId ? item.userId : 'NA'}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.deviceId ? item.deviceId : 'NA'}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.DeviceType ? item.DeviceType : 'NA'}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          <button onClick={() => {
                            setOpenModal(true)
                            const userId = item.userId;
                            dispatch(getAccessUserReviewDataAction(userId))
                            setActive_Id(item.userId)
                          }} style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '10px', borderRadius: '5px' }}>Review</button>
                        </td>
                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                          <div style={{ display: 'flex', justifyContent:'space-between' ,alignItems:'center',padding: '1rem',}}>
                          <h4 style={{ color: 'gray' }}>Review</h4>

                            <button style={{ height: '1rem' }}
                              onClick={() => setOpenModal(false)}
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                          <hr />
                          <Modal.Body>
                            <div className="space-y-6">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <h4>Device Details:</h4>
                                {deviceData && deviceData.map((item) => {
                                  return (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div className='flex' style={{ gap: '0.3rem' }}>
                                        <h5 className='text-base'>Device Id:</h5>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{item.deviceId}</p>
                                      </div>
                                      <div className='flex' style={{ gap: '0.3rem' }}>
                                        <h5 className='text-base'>Device Type:</h5>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{item.DeviceType}</p>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <h4>Doctor:</h4>
                                <div className='flex' style={{ gap: '0.3rem' }}>
                                  <h5 className='text-base'>Doctor Name:</h5>
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{doctorData && doctorData.firstName ? doctorData.firstName : '---'}</p>
                                </div>
                                <div className='flex' style={{ gap: '0.3rem' }}>
                                  <h5 className='text-base'>Designation:</h5>
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{doctorData && doctorData.designation ? doctorData.designation : '---'}</p>
                                </div>
                                <div className='flex' style={{ gap: '0.3rem' }}>
                                  <h5 className='text-base'>Hospital Name:</h5>
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{doctorData && doctorData.hospitalName ? doctorData.hospitalName : '---'}</p>
                                </div>
                                <div className='flex' style={{ gap: '0.3rem' }}>
                                  <h5 className='text-base'>Speciality:</h5>
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{doctorData && doctorData.speciality ? doctorData.speciality : '---'}</p>
                                </div>
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
            {loading && <SpinnerCustom />}
          </div>
        </div>
      </div>
    </>
  )
}

export default AllUseres