import React, { useState } from 'react'
import Style from "../../../css/ManagerUsers.module.css";
import back from "../../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { getAllUsersDetalisById, getEmployeeListAction, updateAllUsersDetailsById, userDeleteAction } from "../../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
function AddEmploye() {

    const getEmployeeListReducer = useSelector(
        (state) => state.getEmployeeListReducer
    );
    const { loading, data } = getEmployeeListReducer;
    const dispatch = useDispatch();
    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data && data.data.slice(firstIndex, lastIndex);
    useEffect(() => {
        dispatch(getEmployeeListAction({ page: 1, limit: recordsPerPage }));
    }, [dispatch]);

    const history = useNavigate()
    return (
        <div
        >
            <Toaster />
            {/* Heading Section */}
            <div
                className="topHeading"
                style={{ display: "flex", flexDirection: "column" }}
            >
            </div>
            <div className={Style.Container}>
                {/* Events  */}
                <>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                        <table class="w-full text-sm text-left text-gray-500 ">
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
                                        Employee Id
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                        Actions
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                        Delete
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.data && data.data.map((item1, index) => {
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
                                                {!item1.userType ? "NA" : item1.userType}
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                {!item1.employeeId ? 'NA' : item1.employeeId}
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                <select style={{ padding: "5px", padding: "9px", borderRadius: "8px", border: "0px", backgroundColor: "rgb(152, 0, 76)", color: "white" }}
                                                    onChange={(e) => {
                                                        dispatch(updateAllUsersDetailsById({ userType: e.target.value, _id: item1._id }))
                                                        toast.success('Role Module Changed')
                                                        history('/manageUsers')
                                                    }}>
                                                    <option >{item1.userType}</option>
                                                    {item1.userType == 'User' ?
                                                        <>
                                                            <option value="Dispatch">Dispatch</option>
                                                            <option value="Accounts">Accounts</option>
                                                            <option value="Production">Production</option>
                                                            <option value="Support">Support</option>
                                                            <option value="Service-Engineer">Service Engineer</option>
                                                        </>
                                                        :
                                                        item1.userType == 'Nurse' ?
                                                            <>
                                                                <option value="Dispatch">Dispatch</option>
                                                                <option value="Accounts">Accounts</option>
                                                                <option value="Production">Production</option>
                                                                <option value="Support">Support</option>
                                                                <option value="Service-Engineer">Service Engineer</option>
                                                            </>
                                                            :
                                                            item1.userType == 'Dispatch' ?
                                                                <>
                                                                    <option value="Production">Production</option>
                                                                    <option value="Accounts">Accounts</option>
                                                                    <option value="Support">Support</option>
                                                                    <option value="Service-Engineer">Service Engineer</option>
                                                                </>
                                                                :
                                                                item1.userType == 'Production' ?
                                                                    <>
                                                                        <option value="Accounts">Accounts</option>
                                                                        <option value="Dispatch">Dispatch</option>
                                                                        <option value="Support">Support</option>
                                                                        <option value="Service-Engineer">Service Engineer</option>
                                                                    </>
                                                                    :
                                                                    item1.userType == 'Support' ?
                                                                        <>
                                                                            <option value="Accounts">Accounts</option>
                                                                            <option value="Dispatch">Dispatch</option>
                                                                            <option value="Production">Production</option>
                                                                            <option value="Service-Engineer">Service Engineer</option>
                                                                        </>
                                                                        :
                                                                        item1.userType == 'Service-Engineer' ?
                                                                            <>
                                                                                <option value="Accounts">Accounts</option>
                                                                                <option value="Dispatch">Dispatch</option>
                                                                                <option value="Production">Production</option>
                                                                                <option value="Support">Support</option>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <option value="Accounts">Accounts</option>
                                                                                <option value="Dispatch">Dispatch</option>
                                                                                <option value="Production">Production</option>
                                                                                <option value="Support">Support</option>
                                                                                <option value="Service-Engineer">Service Engineer</option>
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
                            {incPage !== totalPage ?
                                <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                                    <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                                </button>
                                : " "}
                        </ul>
                    </nav>
                </>
            </div>
        </div>
    )
    function prePage() {
        dispatch(getEmployeeListAction({ page: incPage - 1, limit: recordsPerPage }))
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        dispatch(getEmployeeListAction({ page: incPage + 1, limit: recordsPerPage }))
    }
}

export default AddEmploye