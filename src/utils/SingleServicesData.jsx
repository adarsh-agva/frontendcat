import React, { useCallback, useEffect, useState } from 'react'
import { Navbar } from './NavBar'
import SideBar from './Sidebar'
import Style from "../css/ManagerUsers.module.css";
import { Link, useNavigate } from 'react-router-dom';
import back from "../assets/images/back.png";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useDispatch, useSelector } from 'react-redux';
import { getOtpForTicketServicesAction, getSingleServicesDataAction, getVerifiedOtpServiceAction, sendTicketStatusDataAction } from '../store/action/ServiceEngAction';
import { Button, Modal } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import Otpinput from '../screens/auth/OtpInput';
import shield from "../assets/icons/shield.png"
import NavBarForAll from './NavBarForAll';

function SingleServicesData() {
    const [issuesData, setIssuesData] = useState({
        name: '',
        email: '',
        wardNo: '',
        contactNo: '',
        hospitalName: '',
        department: '',
        issues: ''
    })

    const [state, setState] = useState({
        otp: null,
    });

    const [openModal, setOpenModal] = useState();
    const [detailsData, setDetailsData] = useState()
    const [singleData, setSingleData] = useState({
        name: '',
        email: '',
        wardNo: '',
        contactNo: '',
        hospitalName: '',
        department: '',
        issues: ''
    })
    const [checkedValue, setCheckedValue] = useState([]);



    // console.log('checkboxes',checkboxes)
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setCheckedValue(prev => [...prev, value])
        }
        else (
            setCheckedValue(pre => {
                return [...pre.filter(skill => skill !== value)]
            })
        )
    };

    console.log(checkedValue)
    const props = { openModal, setOpenModal };
    const getSingleServicesDataReducer = useSelector((state) => state.getSingleServicesDataReducer);
    const { data, loading } = getSingleServicesDataReducer;
    const notifySingleData = data && data.data;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get('deviceId')
    const date = localStorage.getItem('_date')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleServicesDataAction(deviceId))
    }, [])
    var phoneno = /^\d{10}$/
    const engineerNumber = singleData.contactNo;
    const _id = localStorage.getItem('_idd')
    const contactNo = singleData.contactNo;
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(sendTicketStatusDataAction(_id, contactNo))
        setTimeout(() => {
            props.setOpenModal('pop-up')
        }, 1000);
    })
    const handleVerifyOtp = useCallback(() => {
        if (!state.otp) {
            toast.error('Enter Otp')
        }
        else {
            const otp = state.otp;
            dispatch(getVerifiedOtpServiceAction(otp, deviceId))
        }
    })

    const handleAddTicket = (e) => {
        e.preventDefault()
        if (!issuesData.name) {
            toast.error('Enter Name')
        }
        else if (!issuesData.email) {
            toast.error('Enter Email')
        }
        else if (!issuesData.wardNo) {
            toast.error('Enter Ward Number')
        }
        else if (!issuesData.hospitalName) {
            toast.error('Enter Hosapital Name')
        }
        else if (!issuesData.contactNo) {
            toast.error('Contact Number')
        }
        else if (!issuesData.department) {
            toast.error('Enter Department')
        }
        else if (!issuesData.issues) {
            toast.error('Enter Issues')
        }
        else if (!issuesData.name && issuesData.email && issuesData.wardNo && issuesData.contactNo && issuesData.hospitalName && issuesData.department) {
            dispatch(sendTicketStatusDataAction({
                deviceId: deviceId,
                date: date,
                message: issuesData.issues,
                name: issuesData.name,
                hospitalName: issuesData.hospitalName,
                wardNo: issuesData.wardNo,
                email: issuesData.email,
                department: issuesData.department,
                contactNo: issuesData.contactNo
            }))
        }
    }
    return (
        <div>
            {/* <Navbar /> */}
            {/* <SideBar /> */}
            <NavBarForAll/>
            <Toaster />
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
                            <Link to='/notificationHandle'>
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                            <h4 className={Style.Header}>Notifications</h4>
                        </div>
                        <button className={Style.addTicketBtn} onClick={() => { props.setOpenModal('defaultAdd') }}>
                            Add Ticket
                        </button>
                    </div>
                </div>
                <div className={Style.Container}>
                    {/* Events  */}
                    {notifySingleData && notifySingleData.length > 0 ?
                        <>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Device Id
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Serial No.
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Date
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Issue
                                            </td>
                                            <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                                                Status
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notifySingleData && notifySingleData.map((item1, index) => {
                                            return (
                                                <tr class="bg-white border-b hover:bg-gray-50">
                                                    <td class="px-6 py-4 text-center font-semibold text-gray-900">
                                                        {item1.deviceId}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.serialNo}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        {item1.date.split(' ')[0]}
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        <ReactReadMoreReadLess
                                                            charLimit={30}
                                                            readMoreText={"Read more ▼"}
                                                            readLessText={"Read less ▲"}
                                                        >
                                                            {item1.message}
                                                        </ReactReadMoreReadLess>
                                                    </td>
                                                    <td class="px-6 py-4 text-center ">
                                                        <div>
                                                            <button style={item1.ticketStatus == 'Open' ? { backgroundColor: '#FFBF00', color: 'black', width: '6vw', height: '2.5vw', borderRadius: '5px' } : { borderRadius: '5px', backgroundColor: '#AC0303', color: 'white', padding: '8px', width: '6vw', height: '2.5vw', }}
                                                                onClick={() => {
                                                                    (item1.ticketStatus == 'Open' ? props.setOpenModal('default') : props.setOpenModal('defaults'))
                                                                    setDetailsData(item1)
                                                                    localStorage.setItem('_idd', item1._id)
                                                                    localStorage.setItem('_date', item1.date)
                                                                    setSingleData({
                                                                        ...singleData, name: item1.name, email: item1.email,
                                                                        wardNo: item1.wardNo,
                                                                        contactNo: item1.contactNo,
                                                                        hospitalName: item1.hospitalName,
                                                                        department: item1.department,
                                                                        issues: item1.message
                                                                    })
                                                                }
                                                                }>{item1.ticketStatus}</button>
                                                            {/* open */}
                                                            {item1.ticketStatus == 'Open' ?
                                                                <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                                                                    <Modal.Header style={{ padding: '1rem' }}>Ticket Details</Modal.Header>
                                                                    <Modal.Body>
                                                                        <div className="space-y-6">
                                                                            <div style={{ backgroundColor: '#FFBF00', display: 'inline-block', padding: '8px', borderRadius: '5px' }}>
                                                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                                                    <h6>Ticket Number</h6>
                                                                                    -
                                                                                    <p style={{ color: 'white' }}>{detailsData && detailsData.serialNo}</p>
                                                                                </div>
                                                                            </div>
                                                                            <h4>Details</h4>
                                                                            <div style={{ display: 'flex', padding: '5px', justifyContent: 'space-between' }}>

                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</lable>
                                                                                        <p>
                                                                                            {singleData.name}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Email</lable>
                                                                                        <p>
                                                                                            {singleData.email}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Ward No.</lable>
                                                                                        <p>
                                                                                            {singleData.wardNo}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Contact Number</lable>
                                                                                        <p>
                                                                                            {singleData.contactNo}
                                                                                        </p>

                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</lable>
                                                                                        <p>
                                                                                            {singleData.hospitalName}
                                                                                        </p>

                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Department</lable>
                                                                                        <p>
                                                                                            {singleData.department}
                                                                                        </p>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                                                <h4>Issues</h4>
                                                                                <p>
                                                                                    {singleData.issues.split(',')[0]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[1]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[2]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[3]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[4]}
                                                                                </p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                <button style={{ display: 'flex', justifyContent: 'center' }} onClick={handleSubmit} class="text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Ticket Close</button>
                                                                                <button style={{ display: 'flex', justifyContent: 'center' }} onClick={() => { props.setOpenModal(undefined) }} class="text-black bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Close</button>
                                                                            </div>
                                                                        </div>
                                                                    </Modal.Body>
                                                                </Modal>
                                                                :
                                                                <Modal show={props.openModal === 'defaults'} onClose={() => props.setOpenModal(undefined)}>
                                                                    <Modal.Header style={{ padding: '1rem' }}>Ticket Details</Modal.Header>
                                                                    <Modal.Body>
                                                                        <div className="space-y-6">
                                                                            <div style={{ backgroundColor: '#FFBF00', display: 'inline-block', padding: '8px', borderRadius: '5px' }}>
                                                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                                                    <h6>Ticket Number</h6>
                                                                                    -
                                                                                    <p style={{ color: 'white' }}>{detailsData && detailsData.serialNo}</p>
                                                                                </div>
                                                                            </div>
                                                                            <h4>Details</h4>
                                                                            <div style={{ display: 'flex', padding: '5px', justifyContent: 'space-between' }}>

                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</lable>
                                                                                        <p>
                                                                                            {singleData.name}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Email</lable>
                                                                                        <p>
                                                                                            {singleData.email}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Ward No.</lable>
                                                                                        <p>
                                                                                            {singleData.wardNo}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Contact Number</lable>
                                                                                        <p>
                                                                                            {singleData.contactNo}
                                                                                        </p>

                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</lable>
                                                                                        <p>
                                                                                            {singleData.hospitalName}
                                                                                        </p>

                                                                                    </div>
                                                                                    <div>
                                                                                        <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Department</lable>
                                                                                        <p>
                                                                                            {singleData.department}
                                                                                        </p>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                                                <h4>Issues</h4>
                                                                                <p>
                                                                                    {singleData.issues.split(',')[0]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[1]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[2]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[3]}
                                                                                    <br />
                                                                                    {singleData.issues.split(',')[4]}
                                                                                </p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                                <button style={{ display: 'flex', justifyContent: 'center' }} onClick={() => { props.setOpenModal(undefined) }} class="text-black bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Close</button>
                                                                            </div>
                                                                        </div>
                                                                    </Modal.Body>
                                                                </Modal>
                                                            }
                                                            {/* otp */}
                                                            <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                                                                <Modal.Header />
                                                                <Modal.Body>
                                                                    <div className="text-center">
                                                                        <div class="mb-6">
                                                                            <img src={shield} style={{ height: '3rem', display: 'block', margin: '10px auto' }} />
                                                                            <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Code</label>
                                                                            <div class="flex items-center" style={{ gap: '20px' }}>
                                                                                <Otpinput setState={setState} state={state} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-center gap-4">
                                                                            <button class="text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                                                                onClick={handleVerifyOtp}
                                                                            >
                                                                                Verify OTP
                                                                            </button>
                                                                            <button class="text-black bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                                                                onClick={() => props.setOpenModal(undefined)}
                                                                            >
                                                                                Back
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                            {/* add services */}
                                                            <Modal show={props.openModal === 'defaultAdd'} onClose={() => props.setOpenModal(undefined)}>
                                                                <Modal.Header style={{ padding: '1rem' }}>Add Ticket</Modal.Header>
                                                                <Modal.Body>
                                                                    <div className="space-y-6">
                                                                        <h4>Details</h4>
                                                                        <div style={{ display: 'flex', padding: '5px', justifyContent: 'space-between' }}>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                <div>
                                                                                    <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</lable>
                                                                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, name: e.target.value })} value={issuesData.name}
                                                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Name" required />
                                                                                </div>
                                                                                <div>
                                                                                    <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Email</lable>
                                                                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, email: e.target.value })} value={issuesData.email}
                                                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Email" required />
                                                                                </div>
                                                                                <div>
                                                                                    <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Ward No.</lable>
                                                                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, wardNo: e.target.value })} value={issuesData.wardNo}
                                                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Ward Number" required />
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                                <div>
                                                                                    <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Contact Number</lable>
                                                                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, contactNo: e.target.value })} value={issuesData.contactNo}
                                                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Contact Number" required />
                                                                                </div>
                                                                                <div>
                                                                                    <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</lable>
                                                                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, hospitalName: e.target.value })} value={issuesData.hospitalName}
                                                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                                                                                </div>
                                                                                <div>
                                                                                    <lable class="block mb-2 text-sm font-medium text-gray-900 :text-white">Department</lable>
                                                                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, department: e.target.value })} value={issuesData.department}
                                                                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Department Name" required />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                                            <h4>Issues</h4>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                                                                                <div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input
                                                                                                value='General Service'
                                                                                                onChange={handleCheckboxChange} id="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Genral Services</label>
                                                                                    </div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input type="checkbox"
                                                                                                onChange={handleCheckboxChange} id="remember" value='Operating Support' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Operating Support</label>
                                                                                    </div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input
                                                                                                onChange={handleCheckboxChange} id="remember" type="checkbox" value='Request for Consumables' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Request for Consumables</label>
                                                                                    </div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input
                                                                                                onChange={handleCheckboxChange} id="remember" type="checkbox" value='Physical Damage' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Damage</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input
                                                                                                onChange={handleCheckboxChange} id="remember" type="checkbox" value='Issue in Ventilation' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Issue in Ventilation</label>
                                                                                    </div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input
                                                                                                onChange={handleCheckboxChange} id="remember" type="checkbox" value='Performance Issues' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Performance Issues</label>
                                                                                    </div>
                                                                                    <div class="flex items-start mb-6">
                                                                                        <div class="flex items-center h-5">
                                                                                            <input
                                                                                                onChange={handleCheckboxChange} id="remember" type="checkbox" value='Apply for CMC/AMC' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                                                        </div>
                                                                                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apply for CMC/AMC</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <button style={{ display: 'flex', justifyContent: 'center' }}
                                                                            onClick={handleAddTicket}
                                                                            class="text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Ticket Add</button>
                                                                        <button style={{ display: 'flex', justifyContent: 'center' }} onClick={() => { props.setOpenModal(undefined) }} class="text-black bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Close</button>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
                            {notifySingleData && notifySingleData.length == 0 && (
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

export default SingleServicesData