import React, { useState } from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../css/ManagerUsers.module.css";
import { Row } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById, updateAllUsersDetailsById, userDeleteAction } from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
function ManageUsers() {
  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { loading, data } = allUsersDetailsReducer;
  const dispatch = useDispatch();
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data && data.data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  const page=1;
  let limit=recordsPerPage;
  useEffect(() => {
    dispatch(getAllUsersDetalisById( page, limit ));
  }, [dispatch]);

  const history = useNavigate()
  return (
    <>
      <Toaster />
      <div
      >
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
        </div>
        <div className={Style.Container}>
          {/* Events  */}
          {records && records.length > 0 ?
            <>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                <table class="w-full text-sm text-left text-gray-500">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        User Name
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        Email
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        Department
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        Resources
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        Hospital Name
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        Action
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        Delete
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {records && records.map((item1, index) => {
                      var firstname = item1.firstName
                      var name = firstname + " " + item1.lastName
                      return (
                        <tr class="bg-white border-b hover:bg-gray-50">
                          <td class="px-6 py-4 text-center font-semibold text-gray-900">
                            {name}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {item1.email}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {!item1.department ? "--" : item1.department}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {!item1.resourse ? "--" : item1.resourse}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {item1.hospitalName}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            <select style={{ padding: "9px",width:'8rem', borderRadius: "8px", border: "0px", backgroundColor: "rgb(152, 0, 76)", color: "white" }}
                              onChange={(e) => {
                                dispatch(updateAllUsersDetailsById({ userType: e.target.value, _id: item1._id }))
                                toast.success('Role Module Changed')
                                history('/manageUsers')
                              }}>
                              <option >{item1.userType}</option>
                              {item1.userType == 'User' ?
                                <>
                                  <option value="Hospital-Admin">Hospital Admin</option>
                                </>
                                :
                                item1.userType == 'Hospital-Admin' ?
                                  <>
                                    <option value="User">User</option>
                                  </>
                                  :
                                  <>
                                    <option value="User">User</option>
                                  </>
                              }
                            </select>
                          </td>
                          <td class="px-6 py-4 text-center ">
                            <button className={Style.viewbtn} onClick={() => {
                              dispatch(userDeleteAction({ userId: item1._id }))
                              toast.success('User Delete Sucessfully')
                            }
                            }>Delete</button>
                          </td>
                        </tr>
                      )
                    })}
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
                  {numbers.map((n, i) => (
                    <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                  ))}
                  {incPage !== totalPage ?
                    <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                      <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                    </button>
                    : " "}
                </ul>
              </nav>
            </>
            :
            <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
              {records && records.length == 0 && (
                <section className={Style.noDataFound}>
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

export default ManageUsers;