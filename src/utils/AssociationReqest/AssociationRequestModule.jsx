import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/images/back.png";
import Style from "../../css/DevicePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssistantRequestAction, appDisapprovePendingDataAction,
} from "../../store/action/AdminDashboard";
import SpinnerCustom from "../../container/SpinnerCustom";
import {  Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import NavBarForAll from "../NavBarForAll";

function AssociationRequestModule() {
    const getAssistantRequestReducer = useSelector((state) => state.getAssistantRequestReducer);
    const { loading, data } = getAssistantRequestReducer;

    const [openModal, setOpenModal] = useState(false);
    const [openModalReq, setOpenModalReq] = useState(false);

    const requestData=data?.data;
    console.log('data ',data)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssistantRequestAction());
  }, [dispatch]);
  return (
    <div>
      <NavBarForAll />
      <div
        className=""
        style={{
          position: "relative",
          top: "6rem",
          marginLeft: "2%",
          width: "96%",
        }}
      >
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              className="deviceSummary"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Link to="/home">
                <img src={back} style={{ width: "3rem" }} alt="back" />
              </Link>
              <h4 className={Style.Header}>Asistant Request</h4>
            </div>
          </div>
        </div>
        <div>
          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ borderRadius: "1.5rem" }}
          >
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    First Name
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    Designation
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    Email
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    Hospital Name
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    Designation
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                                {requestData && requestData.length > 0 ?
                                    requestData && requestData.map((item, index) => {
                                        return (
                                            <tr class="bg-white border-b hover:bg-gray-50">
                                                <td class="px-6 py-4 text-center font-semibold text-gray-900">
                                                    {item.firstName?item.firstName:'N/A'}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.designation}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.email}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.hospitalName}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.speciality}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                                        <button style={{ padding: '12px', backgroundColor: 'rgb(152, 0, 76)', borderRadius: '8px', color: 'white' }}
                                                            onClick={() => { setOpenModal(true) }}
                                                            >
                                                            Accept
                                                        </button>
                                                        <button style={{ padding: '12px', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', border: '0.1px solid rgba(0, 0, 0, 0.16)', borderRadius: '8px', color: 'black' }}
                                                            onClick={() => { setOpenModalReq(true) }}
                                                            >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                                    <Modal.Header />
                                                    <Modal.Body>
                                                        <div className="text-center">
                                                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
                                                            <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to accept this user?
                                                            </h3>
                                                            <div className="flex justify-center gap-4">
                                                                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                                                    dispatch(appDisapprovePendingDataAction({ accountStatus: 'Active', userId: item._id}))
                                                                    setTimeout(() => {
                                                                        setOpenModal(false)
                                                                    }, 1000);
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
                                                <Modal show={openModalReq} size="md" onClose={() => setOpenModalReq(false)} popup>
                                                    <Modal.Header />
                                                    <Modal.Body>
                                                        <div className="text-center">
                                                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
                                                            <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to reject this user?
                                                            </h3>
                                                            <div className="flex justify-center gap-4">
                                                                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                                                    dispatch(appDisapprovePendingDataAction({ accountStatus: 'Inactive', userId: item._id}))
                                                                    setTimeout(() => {
                                                                        setOpenModalReq(false)
                                                                    }, 1000);
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
                                {loading && <SpinnerCustom />}
                            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssociationRequestModule;
