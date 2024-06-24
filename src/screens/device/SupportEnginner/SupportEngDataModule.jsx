import SideBar from '../../../utils/Sidebar'
import { Navbar } from '../../../utils/NavBar'
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../../css/Support.module.css";
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import back from "../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import production from "../../../assets/icons/Production.png"
import { deleteStatusDataAction, getAllTicketsDataAction, getServicesDataAction, postReAssignList } from '../../../store/action/ServiceEngAction';
import { getStoreSystem } from '../../../store/action/StoreSystem';
import { Toaster, toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdAdd } from "react-icons/io";
import NavBarForAll from '../../../utils/NavBarForAll';
function SupportEngDatamODULE() {
    const [openModal, setOpenModal] = useState();
    const [detailsData, setDetailsData] = useState()
    const [assignDetails, setAssignDetails] = useState()
    const [query, setQuery] = useState("");
    const [checkboxEmail, setCheckBoxEmail] = useState({ service_engineer: '', id: '' })
    const props = { openModal, setOpenModal };


    // Service Data
    const getAllServicesDataReducer = useSelector((state) => state.getAllServicesDataReducer);
    const { data, loading, error } = getAllServicesDataReducer;
    const getAllTicket = data && data.data;

    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        dispatch(getServicesDataAction())
    }, [])

    const goBack = () => {
        window.history.go(-1)
    }

    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { data: ticketData } = getTicketDetailsByNumberReducer;

    const [updateEmail, setUpdateEmail] = useState('')
    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = getAllTicket && getAllTicket.slice(firstIndex, lastIndex);

    useEffect(() => {
        dispatch(getStoreSystem())
    }, [dispatch])

    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: serviceEngData } = storeSystemReducer;
    const serviceEngDataa = serviceEngData && serviceEngData.data;

    const assignBtn = (e) => {
        if (checkboxEmail && checkboxEmail.service_engineer === '') {
            toast.error("Select Email");
        } else {
            const service_engineer = checkboxEmail.service_engineer;
            const id = checkboxEmail.id;
            dispatch(postReAssignList(service_engineer, id));
            toast.success("Success");
            props.setOpenModal(undefined)
            history('/Support_eng_data_module')
            console.log('checkboxEmail', checkboxEmail)
        }
    };
    useEffect(() => {
        postReAssignList()
    }, [])

    const handleClickSearch = (e) => {
        e.preventDefault();
        if (query && query.length > 0) {
            const searchData = query
            const filter = ''
            dispatch(getServicesDataAction(filter, searchData))
        }
        else {
            const searchData = query
            const filter = ''
            dispatch(getServicesDataAction(filter, searchData))
        }
    }
    const handleSearchChange = (e) => {
        const searchData = e.target.value;
        if (e.keyCode === 13) {
            const page = 1;
            const limit = recordsPerPage;
            return dispatch(
                getServicesDataAction(page, limit, searchData)
            );
        }
    }
    return (
        <>
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
                        {/* Heading Section */}
                        <div style={{ position: 'fixed', right: '3rem', bottom: '3rem', zIndex: '2' }}>
                            <button onClick={() => { history('/supportForm') }} style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '20px', borderRadius: '80px' }}>
                                <Link
                                    to="/supportForm"
                                    style={{ textDecoration: "none", color: 'white', }}
                                >
                                    <IoMdAdd />
                                </Link>
                            </button>
                        </div>
                        <div
                            className={Style.topHeading}
                        >
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2%', flexWrap: 'wrap' }} className="rowSection">
                                <h3>All Tickets Data</h3>
                            </div>
                        </div>
                        {/* Events  */}
                        <>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                                <div style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                    <form>
                                        <div class="relative" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                            <div
                                                className="input_section"
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "white",
                                                    borderRadius: "10px",
                                                    width: "90%",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <input
                                                    onChange={(e) => {
                                                        if (e.target.value === '') {
                                                            const limit = recordsPerPage;
                                                            const page = 1;
                                                            const searchData = '';
                                                            dispatch(
                                                                getServicesDataAction(page, limit, searchData)
                                                            );
                                                        }
                                                    }}

                                                    onKeyUp={handleSearchChange}
                                                    type="search" id="default-search" class="block w-full p-3 pl-10 text-sm text-gray-900 border border-white rounded-lg bg-gray-10 focus:ring-blue-500 focus:border-blue-500 " placeholder='Search By:Ticket No.,email..' required />
                                                <button className={Style.searchBtn} onClick={handleClickSearch}>
                                                    <FontAwesomeIcon
                                                        icon={faMagnifyingGlass}
                                                        style={{
                                                            color: "#ffff",
                                                            padding: "0px 8px",
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                            <select onChange={(e) => {
                                                const filter = e.target.value
                                                dispatch(getServicesDataAction(filter))
                                            }} style={{ border: '0.1px solid black', borderRadius: '10px', margin: '1px', padding: '5px' }}>
                                                <option value=''>Sort by:</option>
                                                <option value='All'>All Tickets</option>
                                                <option value='Open'>Open Tickets</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Ticket Number
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Date
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Ticket Status
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Contact Number
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Email
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Country
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                State
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                City
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Priority
                                            </td>
                                            <td scope="col" class="text-center text-white text-3xl font-medium" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Assign
                                            </td>
                                        </tr>
                                    </thead>
                                    {records?.length > 0 ?
                                        <tbody>
                                            {records && records.map((item1, index) => {
                                                return (
                                                    <tr class="bg-white border-b hover:bg-gray-50">
                                                        <td class="px-6 py-4 text-center" style={{ cursor: 'pointer' }}>
                                                            <Link to={`/Ticket_details?ticket=${item1 && item1.serialNo}`} style={{ textDecoration: "none", color: 'black' }}>
                                                                {item1.serialNo ? item1.serialNo : 'NA'}
                                                            </Link>
                                                        </td>
                                                        <td class="px-6 py-4 text-center text-lg-center">
                                                            {item1.date ? item1.date : 'NA'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center "
                                                        >
                                                            <h6 style={item1.ticketStatus === 'Closed' ? { backgroundColor: 'green', color: 'white', padding: '10px' } : { backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '2px' }}>
                                                                {item1.ticketStatus ? item1.ticketStatus : 'NA'}
                                                            </h6>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.contactNo ? item1.contactNo : 'NA'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.email ? item1.email : 'NA'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.country ? item1.country : 'NA'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.state ? item1.state : 'NA'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.city ? item1.city : 'NA'}
                                                        </td>
                                                        {/* <td class="px-6 py-4 text-center ">
                                                            <Button onClick={() => {
                                                                (props.setOpenModal('default'))
                                                                setDetailsData(item1.message)
                                                            }
                                                            }>Issues</Button>
                                                        </td> */}
                                                        {/* <td class="px-6 py-4 text-center ">
                                                            <Button onClick={() => {
                                                                // (props.setOpenModal('default'))
                                                                setDetailsData(item1.details)
                                                            }
                                                            }>View</Button>
                                                            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                                                                <Modal.Header style={{ padding: '1rem' }}>Device Details</Modal.Header>
                                                                <Modal.Body>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </td> */}
                                                        <td class="flex px-6 py-4 text-center justify-center">
                                                            <select style={{ width: '7rem' }} onChange={(e) => {
                                                                dispatch(deleteStatusDataAction({ id: item1._id, priority: e.target.value }))
                                                                toast.success('Priority Changed')
                                                                history('/Support_eng_data_module')
                                                            }}
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                                                <option>{item1.priority}</option>
                                                                {item1.priority == 'Medium' ?
                                                                    <option value='Critical'>Critical</option>
                                                                    :
                                                                    <option value='Medium'>Medium</option>
                                                                }
                                                            </select>
                                                        </td>
                                                        {/* <td class="px-6 py-4 text-center ">
                                                            <select style={{ width: '7rem' }} onChange={(e) => {
                                                                dispatch(deleteStatusDataAction({ id: item1._id, ticket_status: e.target.value }))
                                                                toast.success('Action Changed')
                                                                history('/Support_eng_data_module')
                                                            }
                                                            }
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                                                <option>{item1.ticket_status ? item1.ticket_status : 'Open'}</option>
                                                                {item1.ticket_status == 'Open' ?
                                                                    <>
                                                                        <option value='Re-Open'>Re-Open</option>
                                                                        <option value='Close'>Close</option>
                                                                    </>
                                                                    :
                                                                    item1.ticket_status == 'Re-Open' ?
                                                                        <option value='Close'>Close</option> :
                                                                        <option value='Re-Open'>Re-Open</option>
                                                                }
                                                            </select>
                                                        </td> */}
                                                        {/* <td class="px-6 py-4 text-center ">
                                                            <select style={{ width: '10rem' }} onChange={(e) => { dispatch(deleteStatusDataAction({ id: item1._id, isFeedback: e.target.value })) }}
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                                                <option>{item1.isFeedback}</option>
                                                                <option value='Submitted'>Submited</option>
                                                                <option value='Not-Submitted,'>Not Submited</option>
                                                                <option value='Submitted-Without-Feedback'>Submited with feedback</option>
                                                            </select>
                                                        </td> */}
                                                        <td class="px-6 py-4 text-center justify-center">
                                                            <Button onClick={() => {
                                                                (props.setOpenModal('defaultData'))
                                                                setAssignDetails(serviceEngDataa)
                                                                setCheckBoxEmail({ ...checkboxEmail, id: item1._id })

                                                            }
                                                            }>Assign</Button>
                                                            <Modal show={props.openModal === 'defaultData'} onClose={() => props.setOpenModal(undefined)}>
                                                                <Modal.Header style={{ padding: '1rem' }}>Device Details</Modal.Header>
                                                                <Modal.Body>
                                                                    <div className="space-y-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                                                        <input list="nameList" onChange={(e) => setCheckBoxEmail({ ...checkboxEmail, service_engineer: e.target.value })} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                                                                        <datalist id='nameList' onChange={(e) => setCheckBoxEmail({ ...checkboxEmail, service_engineer: e.target.value })} value={checkboxEmail.service_engineer}>
                                                                            {assignDetails && assignDetails.map((item) => {
                                                                                return (
                                                                                    <option value={item.email}>{item.firstName}</option>
                                                                                )
                                                                            })}
                                                                        </datalist>
                                                                        <Button type='Button'
                                                                            onClick={assignBtn}>Assign</Button>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                        :
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
                                    }
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
                </Col>
            </Row>
        </>
    )
    function prePage() {
        dispatch(getAllTicketsDataAction({ page: incPage - 1, limit: recordsPerPage }))
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        dispatch(getAllTicketsDataAction({ page: incPage + 1, limit: recordsPerPage }))
    }
}

export default SupportEngDatamODULE