import React, { useCallback, useEffect, useState } from 'react'
import Style from "../../../css/Production.module.css"
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import {
    deviceAction,
    getDeviceIdBySerialNumber,
} from "../../../store/action/DeviceAction";
import { Button, Modal } from 'flowbite-react';
import shield from "../../../assets/icons/shield.png"
import { getAllHospitalData, getStoreSystem, putallStoreDataAction, getCPersonDetailsByNumber, getHospitalDataFromAdding, getHospitalListFromPinCode } from "../../../store/action/StoreSystem"
import { Link, useNavigate } from 'react-router-dom';
import back from "../../../assets/images/back.png";
import { getDeviceIdListByHospitalName, verifyEmialForSuppport, verifyOtpForSuppport } from '../../../store/action/VerifiedEmail';
import Otpinput from '../../auth/OtpInput';
import { getSerialNumberList } from '../../../store/action/DispatchDetailsAction';

function ServiceEngFormData() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: '',
        service_engineer: "",
        issue: "",
        concerned_p_contact: "",
        priority: "",
        pincode: '',
        department: '',
        emailConcernedPerson: '',
        nameConcernedPerson: '',
        serialNumber: '',
        tagName: '',
        hospitalName: ''
    })
    console.log('dispatchDetails', dispatchDetails)
    const [state, setState] = useState({
        otp: null,
    });
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [verifyBtn, setVerifyBtn] = useState('Verify')

    const getHospitalListByPincodeReducer = useSelector((state) => state.getHospitalListByPincodeReducer);
    const { data: hospitalDatFromPincode } = getHospitalListByPincodeReducer;

    console.log('hospitalDatFromPincode', hospitalDatFromPincode)
    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: serialNoData } = getDeviceIdBySerialNumberReducer;

    console.log('serialNoData', serialNoData)
    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: data121 } = storeSystemReducer;
    const serviceEngName = data121 && data121.data

    const verifyOtpReducer = useSelector(
        (state) => state.verifyOtpReducer
    );
    const { data: dataa, message: msg, error } = verifyOtpReducer;

    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    // Hpospital Data
    const deviceIdByHospitalNameReducer = useSelector((state) => state.deviceIdByHospitalNameReducer);
    const { data: dataDeviceId } = deviceIdByHospitalNameReducer;
    const deviceIdByHospital = dataDeviceId && dataDeviceId.data

    const verifyEmailReducer = useSelector((state) => state.verifyEmailReducer);
    const { loading, data, message } = verifyEmailReducer;

    // const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    // const { data: data1 } = getDeviceIdBySerialNumberReducer;

    // Serial Number Data
    const getSerialNumberListReducer = useSelector((state) => state.getSerialNumberListReducer);
    const { data: dataSerialNumbers } = getSerialNumberListReducer;
    console.log('dataSerialNumbers', dataSerialNumbers)


    useEffect(() => {
        dispatch(getSerialNumberList())
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])

    // email verified
    const email = dispatchDetails.emailConcernedPerson
    useEffect(() => {
        dispatch(verifyEmialForSuppport(email))
    }, [email])

    // Hospital Name
    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])


    useEffect(() => {
        dispatch(getStoreSystem())
    }, [])

    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])

    useEffect(() => {
        dispatch(getHospitalListFromPinCode())
    }, [])
    const navigate = useNavigate()
    const allDataFromDeviceId = `Device Id: ${serialNoData && serialNoData.deviceId},
    Concerned Person Name: ${serialNoData && serialNoData.concerned_person}, 
    Concerned Person Email: ${dispatchDetails && dispatchDetails.emailConcernedPerson},
    Concerned Person Contact: ${serialNoData && serialNoData.concerned_p_contact},
    Hospital Name: ${serialNoData && serialNoData.hospitalName},
    Warrenty Status: ${serialNoData && serialNoData.dateOfWarranty},
    Sim Number: ${serialNoData && serialNoData.simNumber},
    Batch Number : ${serialNoData && serialNoData.batchNumber},
    Manufacturing : ${serialNoData && serialNoData.manufacturingDate},
    Dispatch Date: ${serialNoData && serialNoData.dispatchDate},
    Product Type:${serialNoData && serialNoData.productType},
    Address:${serialNoData && serialNoData.address},`
    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    let priuorityValid = "Select Priority"
    let tagValid = "Select Tag"
    const dispatchHandler = () => {
        let regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
        if (!dispatchDetails.service_engineer) {
            toast.error("Enter Service Engineer Name")
        }
        else if (!dispatchDetails.issue) {
            toast.error("Enter Issues")
        }
        else if (!allDataFromDeviceId) {
            toast.error("Enter Details")
        }
        else if (!dispatchDetails.priority) {
            toast.error("Select Priority")
        }
        else if (dispatchDetails.tagName === tagValid) {
            toast.error('Select Tag Name')
        }
        else if (!dispatchDetails.emailConcernedPerson) {
            toast.error('Enter Concerned Person Email')
        }
        else if (!dispatchDetails.nameConcernedPerson) {
            toast.error('Enter Concerned Person Name')
        }
        else if (!dispatchDetails.concerned_p_contact) {
            toast.error('Enter Concerned Person Number')
        }
        else if (verifyBtn === 'Verify') {
            toast.error('Please Verify Email')
        }
        else if (dispatchDetails.priority === priuorityValid) {
            toast.error("Select Priority")
        }
        else if (dispatchDetails.service_engineer && dispatchDetails.nameConcernedPerson && dispatchDetails.issue && allDataFromDeviceId && dispatchDetails.priority && dispatchDetails.tagName && dispatchDetails.emailConcernedPerson) {
            toast.success("Success")
            const serialNumber1 = dispatchDetails && dispatchDetails.serialNumber.length > 0 ? dispatchDetails && dispatchDetails.serialNumber : serialNoData && serialNoData.serialNumber
            dispatch(putallStoreDataAction({
                deviceId: serialNoData && serialNoData.deviceId,
                service_engineer: dispatchDetails.service_engineer,
                details: allDataFromDeviceId,
                concerned_p_contact: serialNoData && serialNoData.concerned_p_contact,
                issues: dispatchDetails.issue,
                priority: dispatchDetails.priority,
                pincode: dispatchDetails && dispatchDetails.pincode,
                dept_name: serialNoData && serialNoData.department_name,
                waranty_status: serialNoData && serialNoData.dateOfWarranty,
                concerned_p_name: dispatchDetails && dispatchDetails.nameConcernedPerson,
                concerned_p_email: dispatchDetails && dispatchDetails.emailConcernedPerson,
                serialNumber: serialNumber1,
                tag: dispatchDetails && dispatchDetails.tagName,
                address: serialNoData && serialNoData.address,
            }))
            setTimeout(() => {
               window.location.reload();
            }, 1000);
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }
    const handleSubmitOtp = (e) => {
        e.preventDefault()
        const otp = state.otp
        if (!otp) {
            toast.error('Enter OTP')
        }
        else {
            dispatch(verifyOtpForSuppport(otp))
            if (data && data.statusCode == 200) {
                toast.success(data && data.message)
                setVerifyBtn('Verified')
                setTimeout(() => {
                    props.setOpenModal(undefined)
                }, 500);
            }
            else if (error) {
                toast.error(error)
            }
        }
    }

    const handleDhrFile = useCallback((e) => {
        e.preventDefault()
        let regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
        if (!dispatchDetails.emailConcernedPerson) {
            toast.error('Please Enter Email First')
        }
        else if (!regEx.test(dispatchDetails.emailConcernedPerson)) {
            toast.error('Enter Correct Email')
        }
        else if (regEx.test(dispatchDetails.emailConcernedPerson)) {
            const email = dispatchDetails.emailConcernedPerson.toLowerCase();
            dispatch(verifyEmialForSuppport(email))
            if (message) {
                toast.error(message)
                setVerifyBtn('Verified')
            }
            else {
                props.setOpenModal('pop-up')

            }
        }
    })

    const handleAddHospital = useCallback(() => {
        navigate('/add_hospital')
    })
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    const warrent_date = serialNoData && serialNoData.dateOfWarranty
    const warrentyDateCheck = serialNoData && serialNoData.dateOfWarranty

    return (
        <div className={Style.mainContainer}>
            <div className={Style.dispatchContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Assign<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Tickets</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <button onClick={handleAddHospital} style={{ backgroundColor: 'rgb(152, 0, 76)' }} type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Add Hospital</button>
                </div>
                <form >
                    <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                        <div>
                            <label for="first_name" style={{ textAlign: 'start' }}
                             class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                            {dispatchDetails && dispatchDetails.deviceId.length > 0 ?
                                <input id='arrow' value={serialNoData && serialNoData.serialNumber} disabled
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                                :
                                <>
                                    <input list='serialno' type="text" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, serialNumber: e.target.value })
                                        const serialNumber = e.target.value;
                                        dispatch(getDeviceIdBySerialNumber(serialNumber))
                                    }} value={dispatchDetails.serialNumber} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                                    <datalist id='serialno'>
                                        {dataSerialNumbers && dataSerialNumbers.data && dataSerialNumbers.data.map((item) => {
                                            return (
                                                <option value={item.serialNumber}>{item.serialNumber}</option>
                                            )
                                        })}
                                    </datalist>
                                </>

                            }
                        </div>
                        {/* pin code */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Pin Code</label>
                            {dispatchDetails.serialNumber.length > 0 ?
                                <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '0.6rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <input placeholder='Enter Pincode' defaultValue={serialNoData && serialNoData.pincode} disabled />
                                </div> :
                                <>
                                    <input type="number" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, pincode: e.target.value })
                                        const pincode = e.target.value
                                        dispatch(getHospitalListFromPinCode(pincode))
                                    }}
                                        value={dispatchDetails.pincode} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter PinCode" required />
                                </>
                            }</div>
                        <div>
                            <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                            {dispatchDetails.serialNumber.length > 0 ?
                                <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '0.6rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <input placeholder='Enter Hospital Name' defaultValue={dispatchDetails.serialNumber.length > 0 ? serialNoData && serialNoData.hospitalName : ''} disabled />
                                </div>
                                :
                                dispatchDetails && dispatchDetails.pincode.length > 0 ?
                                    <>
                                        <input list='data' type="text" onChange={(e) => {
                                            setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })
                                            const hospitalName = e.target.value
                                            dispatch(getDeviceIdListByHospitalName(hospitalName))
                                        }} value={dispatchDetails.hospitalName} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                                        <datalist id='data'>
                                            {hospitalDatFromPincode && hospitalDatFromPincode.map((item) => {
                                                return (
                                                    <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                                )
                                            })}
                                        </datalist>
                                    </>
                                    :
                                    <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '0.6rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        <input placeholder='Enter Hospital Name' defaultValue={serialNoData && serialNoData.hospitalName} disabled />
                                    </div>
                            }
                        </div>
                        {/* deviceIdByHospital */}
                        <div>
                            <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device ID</label>
                            {dispatchDetails.serialNumber.length > 0 ?
                                <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '0.6rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <input placeholder='Enter Device Id' defaultValue={serialNoData && serialNoData.deviceId} disabled />
                                </div>
                                :
                                dispatchDetails && dispatchDetails.hospitalName.length > 0 ?
                                    <>
                                        <input list='data2' type="text" onChange={(e) => {
                                            setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })
                                            const deviceId = e.target.value
                                            dispatch(getDeviceIdBySerialNumber(deviceId))
                                        }} value={dispatchDetails.deviceId} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                                        <datalist id='data2'>
                                            {deviceIdByHospital && deviceIdByHospital.map((item) => {
                                                return (
                                                    <option value={item.deviceId}>{item.deviceId} {item.message}
                                                        {/* <p style={item.message=='INACTIVE'?{color:'green'}:{color:'red'}}>{item.message}</p> */}
                                                    </option>
                                                )
                                            })}
                                        </datalist>
                                    </>
                                    :
                                    <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '0.6rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        <input placeholder='Enter Device Id' defaultValue={serialNoData && serialNoData.deviceId} disabled />
                                    </div>
                            }
                        </div>
                        {/* select service enginner */}
                        <div >
                            <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Service Engineer</label>
                            <input list="nameList" onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                            <datalist id='nameList' onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} value={dispatchDetails.service_engineer}>
                                {serviceEngName && serviceEngName.map((item) => {
                                    return (
                                        <option value={item.email}>{item.firstName} ({item.userStatus == 'Active' ? 'On Work' : 'On Leave'})</option>
                                    )
                                })}
                            </datalist>
                        </div>
                        {/* tag name */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Select Tag Name</label>
                            <select onChange={(e) => setDispatchDetails({ ...dispatchDetails, tagName: e.target.value })}
                                value={dispatchDetails.tagName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                <option>Select Tag</option>
                                <option value='Installation'>Installation</option>
                                <option value='Service'>Service</option>
                            </select>
                        </div>
                        {/* issues */}
                        <div>
                            <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Issues</label>
                            <textarea list="nameList" onChange={(e) => setDispatchDetails({ ...dispatchDetails, issue: e.target.value })}
                                value={dispatchDetails.issue}
                                id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                        </div>

                        {/* Department */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Department Name</label>
                            <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                {serialNoData && serialNoData.department_name}
                            </div>
                        </div>
                        {/* Warrenty Status */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Warranty Status</label>
                            <div style={(serialNoData && serialNoData.dateOfWarranty && serialNoData.dateOfWarranty.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                {warrentyDateCheck >= currentDate ? 'ACTIVE' : warrentyDateCheck >= currentDate ? 'INACTIVE' : ''}
                            </div>
                        </div>
                        {/* nameConcernedPerson */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Name</label>
                            <input list='concernedName' type="text" onChange={(e) => {
                                setDispatchDetails({ ...dispatchDetails, nameConcernedPerson: e.target.value })
                            }} value={dispatchDetails.nameConcernedPerson} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Name" required />
                            <datalist id='concernedName'>
                                <option value={serialNoData && serialNoData.concerned_person}>{serialNoData && serialNoData.concerned_person}
                                </option>
                            </datalist>
                        </div>
                        {/* concerned person email */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Email</label>
                            <div class="flex items-center">
                                <input type="text" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, emailConcernedPerson: e.target.value })
                                    dispatchDetails && dispatchDetails.emailConcernedPerson === '' ? setVerifyBtn('Verify') : setVerifyBtn('Verify')
                                }
                                }
                                    value={dispatchDetails.emailConcernedPerson} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Email" required />
                                {verifyBtn === 'Verified' ?
                                    <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>
                                        {verifyBtn}
                                    </button>
                                    :
                                    <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        {verifyBtn}
                                    </button>
                                }
                            </div>
                            {dispatchDetails && dispatchDetails.emailConcernedPerson && dispatchDetails.emailConcernedPerson.length > 0 ?
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
                                                <Button onClick={handleSubmitOtp} color="failure"
                                                // onClick={() => props.setOpenModal(undefined)}
                                                >
                                                    Verify OTP
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                                :
                                ''}
                        </div>
                        {/* concerned person number */}
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Number</label>
                            <input list='concernedNumber' type="text" onChange={(e) => {
                                setDispatchDetails({ ...dispatchDetails, concerned_p_contact: e.target.value })
                            }} value={dispatchDetails.concerned_p_contact} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Contact" required />
                            <datalist id='concernedNumber'>
                                <option value={serialNoData && serialNoData.concerned_p_contact}>{serialNoData && serialNoData.concerned_p_contact}
                                </option>
                            </datalist>
                        </div>

                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Priority</label>
                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" onChange={(e) => setDispatchDetails({ ...dispatchDetails, priority: e.target.value })} value={dispatchDetails.priority}>
                                <option>Select Priority</option>
                                <option value='Medium'>Medium</option>
                                <option value='Critical'>Critical</option>
                            </select>
                        </div>
                    </div>
                    <div className={Style.rightForm}>
                        <div className={Style.formItem}>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Details</label>
                            <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                <div contenteditable="false" className='innerDiv' onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceIdDetails: e.target.value })} value={dispatchDetails.deviceIdDetails}>
                                    Device Id: {serialNoData && serialNoData.deviceId}
                                    <br />
                                    Concerned Person Name: {serialNoData && serialNoData.concerned_person}
                                    <br />
                                    Concerned Person Email: {dispatchDetails && dispatchDetails.emailConcernedPerson}
                                    <br />
                                    Concerned Person Contact: {serialNoData && serialNoData.concerned_p_contact}
                                    <br />
                                    Hospital Name: {serialNoData && serialNoData.hospitalName}
                                    <br />
                                    Warrenty Status: {serialNoData && serialNoData.dateOfWarranty}
                                    <br />
                                    Sim Number: {serialNoData && serialNoData.simNumber}
                                    <br />
                                    Batch Number : {serialNoData && serialNoData.batchNumber}
                                    <br />
                                    Manufacturing date : {serialNoData && serialNoData.manufacturingDate}
                                    <br />
                                    Dispatch date : {serialNoData && serialNoData.dispatchDate}
                                    <br />
                                    Product Type: {serialNoData && serialNoData.productType}
                                    <br />
                                    Address: {serialNoData && serialNoData.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <hr style={{ color: "#707070" }} />
                    <div className={Style.buttonContainer} >
                        <button className={Style.continuebtn} onClick={dispatchHandler}>Assign Ticket</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ServiceEngFormData