import React, { useEffect } from 'react'
import Style from "../../../css/ReadyToDispatch.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import back from "../../../assets/images/back.png";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { getaccountsDetailsAction } from '../../../store/action/DispatchDetailsAction';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarForAll from '../../../utils/NavBarForAll';

function AccountAllDataModule() {

  const getAccountDataReducer = useSelector((state) => state.getAccountDataReducer);
  const { loading, data,error } = getAccountDataReducer;
  const getDispatchData = data && data.data
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getaccountsDetailsAction({ page: 1, limit: recordsPerPage })
    )
  }, ([]))

  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = getDispatchData && getDispatchData.slice(firstIndex, lastIndex);
  const [query, setQuery] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const handleClickSearch = () => {
    if (query && query.length > 0) {
      dispatch(getaccountsDetailsAction({ page: 1, limit: recordsPerPage, searchData: query }));
    }
    else {

    }
  }

  const handleSearch=(e)=>{
    const searchData=e.target.value;
    if (e.keyCode === 13) {
     return dispatch(
      getaccountsDetailsAction({ page:1, limit:recordsPerPage, searchData} )
      );
    }
  }

  const history = useNavigate();
  const handleRequest = () => {
    history('/dispatchDevice')
  }

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
          <div
            className={Style.mainDiv}
          >
            {/* Events  */}
          
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                  <div
                    className="search_section"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="input_section"
                      style={{
                        display: "flex",
                        backgroundColor: "rgb(152, 0, 76)",
                        width: "100%",
                        padding: '1rem',
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="search_input"
                        type="text"
                        placeholder="Enter Serial Number"
                        onChange={(e)=>{if(e.target.value===''){
                          setQuery(e.target.value.toLowerCase())
                          const limit=recordsPerPage;
                          const page=1;
                          const searchData='';
                          dispatch(
                            getaccountsDetailsAction( {page, limit, searchData} )
                          );
                        }}}
                        onKeyUp={handleSearch}
                        style={{
                          padding: "0.7rem",
                          border: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <td scope="col" class="px-6 py-3 text-left text-white font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)', fontSize: '0.8rem' }}>
                          Serial Number
                        </td>
                        <td scope="col" class="px-6 py-3 text-left text-white font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)', fontSize: '0.8rem' }}>
                          Invoice Number
                        </td>
                        <td scope="col" class="px-6 py-3 text-left text-white font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)', fontSize: '0.8rem' }}>
                          E-way Number
                        </td>
                        <td scope="col" class="px-6 py-3 text-left text-white font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)', fontSize: '0.8rem' }}>
                          Consignee Name
                        </td>
                        <td scope="col" class="px-6 py-3 text-left text-white font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)', fontSize: '0.8rem' }}>
                          Billed To
                        </td>
                        <td scope="col" class="px-6 py-3 text-left text-white font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)', fontSize: '0.8rem' }}>
                          Action
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {records?.length>0?
                      records && records.map((item1, index) => {
                        return (
                          <tr class="bg-white border-b hover:bg-gray-50">
                            <th class="px-6 py-4 text-left">
                              {item1.serialNo}
                            </th>
                            <td class="px-6 py-4 text-left">
                              {item1.invoiceNo ? item1.invoiceNo : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-left">
                              {item1.ewaybillNo ? item1.ewaybillNo : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-left">
                              {item1.consinee ? item1.consinee : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-left">
                              {item1.billedTo ? item1.billedTo : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-left">
                              <button onClick={() => { history(`/singleAccountData?serialNumber=${item1.serialNo}`) }} style={{ padding: '8px', width: '5rem', backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '8px' }} >More</button>
                            </td>
                          </tr>
                        )
                      }):
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
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                    {incPage > 1 ?
                      <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                        <img src={back} style={{ width: "3rem" }} />
                      </button>
                      : " "}
                      {!error && !loading?
                    incPage !== totalPage ?
                      <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                        <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                      </button>
                      : " ":""}
                  </ul>
                </nav>
              
          </div>
        </Col>
      </Row>
    </div>
  )
  function prePage() {
    dispatch(getaccountsDetailsAction({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getaccountsDetailsAction({ page: incPage + 1, limit: recordsPerPage }))
  }
}

export default AccountAllDataModule