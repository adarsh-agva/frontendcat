import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import back from "../../assets/images/back.png";
import NavBarForAll from "../NavBarForAll";
import { getDoctorAccessListAction, removeDoctorAccessListAction } from "../../store/action/AdminDashboard";
import { Link } from "react-router-dom";

function HospitalAdminRemoveDoctors() {
  const [openModal, setOpenModal] = useState(false);
  const divRef = useRef(null);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get("DeviceId");
  const getDoctorAccessListReducer = useSelector(
    (state) => state.getDoctorAccessListReducer
  );
  const {loading,error, data } = getDoctorAccessListReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctorAccessListAction(deviceId))
  }, [])
  const newData = data && data.data;
  console.log("data", data);


  const goBack = () => {
    window.history.go(-1)
  }

  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "1rem", width: '96%' }}>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "#707070",
          }}
        >
          <Link onClick={goBack}>
            <img src={back} style={{ width: "3rem" }} />
          </Link>
          <h4>Assigned Owner</h4>
        </div>

        <div ref={divRef}>
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
                    Name
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                  >
                    Contact
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
                    Department
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
                {newData && newData.length > 0 ? (
                  newData &&
                  newData.map((item, index) => {
                    return (
                      <tr class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-center ">{item?.firstName} {item?.lastName}</td>
                        <td class="px-6 py-4 text-center ">
                          {item.contactNumber}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.email}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.hospitalName}
                        </td>
                        <td class="px-6 py-4 text-center ">{item.department}</td>
                        <td class="px-6 py-4 text-center font-semibold text-gray-900">
                          <button
                            style={{
                              backgroundColor: "rgb(152, 0, 76)",
                              color: "white",
                              padding: "8px",
                              borderRadius: "8px",
                            }}
                            onClick={() => {
                              setOpenModal(true);
                            }}
                          >
                            Remove
                          </button>
                        </td>
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
                                Are you sure you want to remove this user?
                              </h3>
                              <div className="flex justify-center gap-4">
                                <button
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "8px",
                                  }}
                                  onClick={() => {
                                    dispatch(
                                      removeDoctorAccessListAction({
                                        _id: item._id,
                                      })
                                    );
                                    setOpenModal(false);
                                  }}
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
                      </tr>
                    );
                  })
                ) : (
                  <div
                            style={{
                              height: "500px",
                              backgroundColor: "white",
                              width: "100%",
                              borderRadius: "20px",
                              background: "#FFFFFF 0% 0% no-repeat padding-box",
                            }}
                          >
                            {loading && (
                              <span
                                style={{ position: "absolute", top: "50%", right: "50%" }}
                              >
                                {" "}
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                </div>
                              </span>
                            )}
                            {error && (
                              <div
                                style={{
                                  width: "100%",
                                  position: 'absolute',
                                  top: '50%',
                                  textAlign: 'center'
                                }}
                              >
                                <h6>{error}</h6>
                              </div>
                            )}
                          </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HospitalAdminRemoveDoctors;
