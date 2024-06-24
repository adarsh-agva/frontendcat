import React, { useEffect } from 'react'
import { Navbar } from './NavBar'
import SideBar from './Sidebar'
import Style from "../css/ManagerUsers.module.css";
import { Link, useNavigate } from 'react-router-dom';
import back from "../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { getServicesDataAction } from '../store/action/ServiceEngAction';
import { Button } from 'react-bootstrap';
import NavBarForAll from './NavBarForAll';
function Notification() {
    // Service Data
    const getAllServicesDataReducer = useSelector((state) => state.getAllServicesDataReducer);
    const { data, loading } = getAllServicesDataReducer;
    const notifyData = data && data.data;

    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        return (() => {
            dispatch(getServicesDataAction())
        })
    }, [dispatch])

    return (
        <div>
                             <NavBarForAll />

            <div
                className=""
                style={{
                    position: "relative",
                    top: "6.5rem",
                    marginLeft: "1%",
                    width: "98%",
                }}
            >
                {/* Heading Section */}
                <div
                    className="topHeading"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div
                        className={Style.deviceSummary}
                    >
                        <div className={Style.deviceSummary}>
                            <Link to='/Support_eng_data_module'>
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                            <h4 className={Style.Header}>Notifications</h4>
                        </div>
                    </div>
                </div>
                <div className={Style.Container}>
                    {/* Events  */}
                    {notifyData && notifyData.length > 0 ?
                        <>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Serial No.
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Hospital Name
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                State
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                City
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Countrys
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Email
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Action
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notifyData && notifyData.map((item1, index) => {
                                            return (
                                                <tr class="bg-white border-b hover:bg-gray-50">
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.serialNo}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.hospitalName}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.state ? item1.state : 'NA'}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.city ? item1.city : 'NA'}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.country ? item1.country : 'NA'}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.email}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        <button onClick={() => { history(`/singleServicesData?deviceId=${item1.deviceId}`) }} class="text-white bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                                                            More
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* <nav aria-label="Page navigation example">
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
                            </nav> */}
                        </>
                        :
                        <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
                            {notifyData && notifyData.length == 0 && (
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
        </div>
    )
}

export default Notification