import React, { useEffect } from "react";
import Style from "../../../css/ProductionDataModul.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import back from "../../../assets/images/back.png";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { getproductionDetailsAction } from "../../../store/action/DispatchDetailsAction";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarForAll from "../../../utils/NavBarForAll";

function ProductionDataModule() {
  const [openModal, setOpenModal] = useState(false);
  const productionAllDetailsReducer = useSelector(
    (state) => state.productionAllDetailsReducer
  );
  const { loading, data, error } = productionAllDetailsReducer;
  const getDispatchData = data && data.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproductionDetailsAction({ page: 1, limit: recordsPerPage }));
  }, []);

  const [dhrFileLink, setDhrFileLink] = useState();
  const [deviceIdForReport, setdeviceIdForReport] = useState();
  const [serialNoForSingle, setSerialNoForSingle] = useState();
  const [productType, setProductType] = useState();
  const [productCode, setProductCode] = useState();
  const history = useNavigate();
  const incPage = parseInt(data && data.currentPage);
  const totalPage = parseInt(data && data.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =
    getDispatchData && getDispatchData.slice(firstIndex, lastIndex);
  const [query, setQuery] = useState("");

  const handleClickSearch = () => {
    if (query && query.length > 0) {
      dispatch(
        getproductionDetailsAction({
          page: 1,
          limit: recordsPerPage,
          searchData: query,
        })
      );
    } else {
    }
  };

  // const handleSearchChange = (e) => {
  //   setQuery(e.target.value.toLowerCase());
  // };

  // const ref = collection(firestore, "com.agvahealthcare.ventilator_ext");
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { applink, appVersion, updateStatus } = firebaseData;
  //   console.log("firebaseData1", firebaseData);

  //   const data = {
  //     isUpdate: firebaseData?.updateStatus,
  //     version: firebaseData?.appVersion,
  //     update_url: firebaseData?.applink,
  //     update_id: deviceIdForReport,
  //   };
  //   try {
  //     addDoc(ref, data);
  //     console.log("hey", ref, data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div>
      <NavBarForAll />
      <Row className="rowSection">
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={Style.NavbarColumn}
          style={{ width: "100%" }}
        >
          <div className={Style.mainDiv}>
            {/* Heading Section */}
            <div className={Style.topHeading}>
              <h3 className={Style.heading}>AgVa Pro</h3>
              <div className={Style.deviceSummary}>
                <Link to="/productionModel">
                  <img src={back} loading="lazy" className={Style.backImage} />
                </Link>
                <h1 class="text-2xl font-extrabold">
                  Master
                  <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">
                    Data
                  </small>
                </h1>
              </div>
            </div>
            {/* Events  */}

            <div
              class="relative overflow-x-auto shadow-md sm:rounded-lg"
              style={{ borderRadius: "1.5rem" }}
            >
              <div className="search_section" style={{ display: "flex" }}>
                <div
                  className="input_section"
                  style={{
                    display: "flex",
                    backgroundColor: "rgb(152, 0, 76)",
                    width: "100%",
                    padding: "1rem",
                    alignItems: "center",
                  }}
                >
                  <input
                    className="search_input"
                    type="text"
                    placeholder="Enter Device ID"

                    onChange={(e) => {
                      if (e.target.value === '') {
                        setQuery(e.target.value.toLowerCase())
                        const limit = recordsPerPage;
                        const page = 1;
                        const searchData = '';
                        dispatch(
                          getproductionDetailsAction({ page, limit, searchData })
                        );
                      }
                    }}

                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        return dispatch(
                          getproductionDetailsAction({ page: 1, limit: recordsPerPage, searchData: e.target.value })
                        );
                      }
                    }}
                    style={{
                      padding: "0.7rem",
                      border: "0px",
                      width: "100%",
                    }}
                  />
                  <button
                    className={Style.searchBtn}
                    onClick={handleClickSearch}
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{
                        color: "#ffff",
                        padding: "0px 8px",
                      }}
                    />
                  </button>
                </div>
              </div>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Device ID
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Serial Number
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Product Type
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Sim No.
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Hardware Version
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Software Version
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Manufacturing Date
                    </td>
                    <td
                      scope="col"
                      class="px-6 py-3 text-left text-white font-semibold"
                      style={{
                        backgroundColor: "rgb(152, 0, 76)",
                        fontSize: "0.8rem",
                      }}
                    >
                      DHR File
                    </td>
                    {/* <td
                          scope="col"
                          class="px-6 py-3 text-left text-white font-semibold"
                          style={{
                            backgroundColor: "rgb(152, 0, 76)",
                            fontSize: "0.8rem",
                          }}
                        >
                          Update Data
                        </td> */}
                  </tr>
                </thead>
                <tbody>
                  {records?.length > 0 ?
                    records &&
                    records.map((item1, index) => {
                      return (
                        <tr class="bg-white border-b hover:bg-gray-50">
                          <th class="px-6 py-4 text-left">
                            {item1.deviceId}
                          </th>
                          <td class="px-6 py-4 text-left">
                            {item1.serialNumber ? item1.serialNumber : "NA"}
                          </td>
                          <td class="px-6 py-4 text-left">
                            {item1.productType ? item1.productType : "NA"}
                          </td>
                          <td class="px-6 py-4 text-left">
                            {item1.simNumber ? item1.simNumber : "NA"}
                          </td>
                          <td class="px-6 py-4 text-left">
                            {item1.hw_version ? item1.hw_version : "NA"}
                          </td>
                          <td class="px-6 py-4 text-left">
                            {item1.sw_version ? item1.sw_version : "NA"}
                          </td>
                          <td class="px-6 py-4 text-left">
                            {item1.manufacturingDate
                              ? item1.manufacturingDate
                              : "NA"}
                          </td>
                          <td class="px-6 py-4 text-left">
                            <button
                              onClick={() => {
                                setDhrFileLink(item1.location);
                                setdeviceIdForReport(item1.deviceId);
                                setSerialNoForSingle(item1.serialNumber);
                                setProductType(item1.productType);
                                setProductCode(item1.productType == 'Suction' ? '003' : item1.productType == 'Agva Pro' ? "002" : '004')
                                setOpenModal(true);
                              }}
                              style={{
                                textDecoration: "none",
                                backgroundColor: "rgb(152, 0, 76)",
                                color: "white",
                                padding: "10px",
                                width: "5vw",
                                borderRadius: "5px",
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    }) :
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
                        {error  && (
                          <div
                            style={{
                              width: "100%",
                              position:'absolute',
                              top:'50%',
                              textAlign:'center'
                            }}
                          >
                            <h6>{error}</h6>
                          </div>
                        )}
                      </div>
}
                </tbody>
              </table>
            </div>
            {/* open dhr file options */}
            <Modal id="default-modal" show={openModal} size="md" popup>
              <Modal.Header
                style={{ display: "flex", justifyContent: "end" }}
              >
                <button
                  style={{ height: "1rem" }}
                  onClick={() => setOpenModal(false)}
                >
                  <AiOutlineClose />
                </button>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                    Please select and option to view file.
                  </h3>
                  <div className="flex justify-center gap-4">
                    {dhrFileLink && dhrFileLink.length > 0 ? (
                      <Link
                        to={dhrFileLink}
                        rel="prerender"
                        style={{
                          textDecoration: "none",
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px",
                          borderRadius: "8px",
                        }}
                      >
                        Master File
                      </Link>
                    ) : (
                      <Link
                        style={{
                          textDecoration: "none",
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px",
                          borderRadius: "8px",
                        }}
                      >
                        No Master File
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        history(
                          `/reportDataForProduction?deviceId=${deviceIdForReport}`
                        );
                      }}
                      style={{
                        backgroundColor: "white",
                        border: "0.5px solid gray",
                        color: "black",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      Service Report
                    </button>
                    <button
                      onClick={() => {
                        history(
                          `/singleProductionDataWithEdit?serialNo=${serialNoForSingle}&deviceId=${deviceIdForReport}`
                        );
                      }}
                      style={{
                        backgroundColor: "white",
                        border: "0.5px solid gray",
                        color: "black",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      All Data
                    </button>
                    <Link to={`/deviceEvents?code=${'SBXMH'}&projectName=${productType}&DeviceId=${deviceIdForReport}&projectCode=${productCode}`}
                      style={{
                        backgroundColor: "white",
                        border: "0.5px solid gray",
                        color: "black",
                        padding: "10px",
                        borderRadius: "8px",
                        textDecoration: 'none'
                      }}
                      onClick={() => localStorage.setItem("deviceid", deviceIdForReport)}>
                      Monitor Data
                    </Link>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <nav aria-label="Page navigation example">
              <ul
                class="pagination justify-content-end"
                style={{ display: "flex", alignItems: "center" }}
              >
                {incPage > 1 ? (
                  <button
                    onClick={prePage}
                    style={{ border: "0px", backgroundColor: "white" }}
                  >
                    <img
                      src={back}
                      loading="lazy"
                      style={{ width: "3rem" }}
                    />
                  </button>
                ) : (
                  " "
                )}
                {!error && !loading?
                  incPage !== totalPage ? (
                    <button
                      onClick={nextPage}
                      style={{ border: "0px", backgroundColor: "white" }}
                    >
                      <img
                        src={back}
                        loading="lazy"
                        style={{ width: "3rem", transform: "rotate(180deg)" }}
                      />
                    </button>
                  ) : (
                    " "
                  ) : ''}
              </ul>
            </nav>

          </div>
        </Col>
      </Row>
    </div>
  );
  function prePage() {
    dispatch(
      getproductionDetailsAction({ page: incPage - 1, limit: recordsPerPage })
    );
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    dispatch(
      getproductionDetailsAction({ page: incPage + 1, limit: recordsPerPage })
    );
  }
}

export default ProductionDataModule;
