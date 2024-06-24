import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../../css/ManagerUsers.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { appDisapprovePendingDataAction, getActiveAdminDataAction } from "../../../store/action/AdminDashboard";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
function ManageAdminModule() {
  const [openModal, setOpenModal] = useState(false);
  const [update_Id, setUpdate_Id] = useState();
  const getActiveAdminReducer = useSelector(
    (state) => state.getActiveAdminReducer
  );
  const { loading, data } = getActiveAdminReducer;
  const adminData = data && data.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveAdminDataAction());
  }, [dispatch]);

  const history = useNavigate()
  return (
    <>
      {/* <Toaster /> */}
      <div
      >
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
        </div>
        <div id="div1" className={Style.Container}>
          {/* Events  */}
          {adminData && adminData.length > 0 ?
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                      User Name
                    </td>
                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                      Department
                    </td>
                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                      Contact
                    </td>
                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                      More
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {adminData && adminData.map((item) => {
                    return (
                      <tr class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-center font-semibold text-gray-900">
                          {item.firstName}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.department}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.contactNumber}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          <button onClick={() => {
                            setUpdate_Id(item._id)
                            setOpenModal(true)
                          }} style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '10px', borderRadius: '8px' }}>More</button>
                        </td>
                        <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
                          <Modal.Header />
                          <h3 className="mb-1 ml-1 text-xl text-center font-normal text-gray-900">
                            Admin Details
                          </h3>
                          <hr />
                          <Modal.Body>
                            <div className="text-center">
                              <div className="flex justify-between">
                                <div className="flex row g-3">
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Name:
                                    </h4>
                                    <span className="text-sm font-normal">{item.firstName}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Department:
                                    </h4>
                                    <span className="text-sm font-normal">{item.department}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Last Login:
                                    </h4>
                                    <span className="text-sm font-normal">{item.lastLogin.split('GMT')[0].split(' ')[0]} {item.lastLogin.split('GMT')[0].split(' ')[1]} {item.lastLogin.split('GMT')[0].split(' ')[2]} {item.lastLogin.split('GMT')[0].split(' ')[3]}
                                    </span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Register On:
                                    </h4>
                                    <span className="text-sm font-normal">
                                      {item.requestedOn.split('GMT')[0].split(' ')[0]} {item.requestedOn.split('GMT')[0].split(' ')[1]} {item.requestedOn.split('GMT')[0].split(' ')[2]} {item.requestedOn.split('GMT')[0].split(' ')[3]}
                                    </span>
                                  </div>

                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Country Name:
                                    </h4>
                                    <span className="text-sm font-normal">{item.countryName ? item.countryName : '---'}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Account Status:
                                    </h4>
                                    <span className="text-sm font-normal">{item.accountStatus ? item.accountStatus : '---'}</span>
                                  </div>
                                </div>
                                <div className="flex row g-3">
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Email:
                                    </h4>
                                    <span className="text-sm font-normal">{item.email}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Hospital Name:
                                    </h4>
                                    <span className="text-sm font-normal">{item.hospitalName}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      Contact:
                                    </h4>
                                    <span className="text-sm font-normal">{item.contactNumber}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      State Name:
                                    </h4>
                                    <span className="text-sm font-normal">{item.stateName ? item.stateName : '---'}</span>
                                  </div>
                                  <div className="flex" style={{ gap: '5px' }}>
                                    <h4 className="text-sm font-normal text-gray-800">
                                      User Type:
                                    </h4>
                                    <span className="text-sm font-normal">{item.userType ? item.userType : '---'}</span>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer className="flex justify-center">
                            {item.accountStatus == 'Active' ?
                              <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                dispatch(appDisapprovePendingDataAction({ accountStatus: 'Inactive', _id: update_Id }))
                                setOpenModal(false)
                                alert('Remove access successfully')
                              }}>
                                Remove Access
                              </button>
                              :
                              <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                dispatch(appDisapprovePendingDataAction({ accountStatus: 'Active', _id: update_Id }))
                                setOpenModal(false)
                                alert('Grant access successfully')
                              }}>
                                Grant Access
                              </button>
                            }
                          </Modal.Footer>
                        </Modal>
                      </tr>
                    )
                  })}
                </tbody>

              </table>
            </div>
            :
            <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
              {adminData && adminData.length == 0 && (
                <section>
                  <span>
                    No Data Found
                  </span>
                </section>
              )}
              {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}>Loading...</span>}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default ManageAdminModule;