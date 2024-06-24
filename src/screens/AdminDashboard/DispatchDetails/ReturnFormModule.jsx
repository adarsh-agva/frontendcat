import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchDetailsAction, getDeviceIdFromProduction, getPincodeData, getSerialNumberList, getSingleHospitalDetails, getproductionDetailsByIdAction, returnDispatchAction } from '../../../store/action/DispatchDetailsAction'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DispatchDetails.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { getHospitalDataFromAdding } from '../../../store/action/StoreSystem'
import { deviceAction, getDeviceIdBySerialNumber } from '../../../store/action/DeviceAction'
import NavBarForAll from '../../../utils/NavBarForAll'
import { Button, Card, Checkbox, Label, TextInput, Radio } from 'flowbite-react';
import axios from 'axios'

function ReturnFormModule() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: '',
        product_type: "",
        serial_no: "",
        hospitalName: "",
        concerned_person: "",
        distributer_gst: '',
        consignee_name: '',
        purpose: '',
        consignee_address: '',
        phone_number: "",
        concerned_person_email: '',
        leadMarketingUser: '',
        date_of_dispatch: "",
        distributor_name: "",
        distributor_contact: "",
        document_no: "",
        nDistrict: '',
        nPincode: '',
        nState: '',
        nCity: '',
        nAddress: '',
        panCardNo: '',
        otherRef: '',
        buyerName: '',
        buyerAddress: ''
    })
    const dispatch = useDispatch()
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serialNo = urlParams.get("serialNo");
    const deviceID = urlParams.get('deviceId')
    const productType = urlParams.get('product')
    const purpose = urlParams.get('purpose')


    // Single Hpospital Data
    const getHospitalDetailsReducer = useSelector((state) => state.getHospitalDetailsReducer);
    const { data: singleHospitalData } = getHospitalDetailsReducer;
    const singleDataOfHospital = singleHospitalData && singleHospitalData.data

    const hospitalPinCode = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode;
    const hospitalDistrict = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].District;
    const hospitalCity = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].City;
    const hospitalAddress = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Hospital_Address;
    const hospitalState = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].State
    // Serial No
    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: dataSerialNo, error } = getDeviceIdBySerialNumberReducer;
    useEffect(() => {
        dispatch(getDeviceIdBySerialNumber())
    }, [])


    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0]
    useEffect(() => {
        dispatch(getPincodeData())
    }, [])

    useEffect(() => {
        dispatch(getproductionDetailsByIdAction())
    }, [])

    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])
    useEffect(() => {
        dispatch(getDeviceIdFromProduction())
    }, [])

    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    var productValid = "Select Product Type"

    const pincodeNewData = dispatchDetails.nPincode.length > 0 ? dispatchDetails.nPincode : hospitalPinCode
    const districtNewData = dispatchDetails.nDistrict.length > 0 ? dispatchDetails.nDistrict : hospitalPinCode
    const cityNewData = dispatchDetails.nCity.length > 0 ? dispatchDetails.nCity : hospitalPinCode
    const stateNewData = dispatchDetails.nState.length > 0 ? dispatchDetails.nState : hospitalPinCode

    const [selectedImage, setSelectedImage] = useState(null);
    const [loadinState, setLoadingState] = useState(false)
    const [poFileSelect, setPoFileSelect] = useState(false)
    const [pdfUrl, setPdfUrl] = useState('');

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const purposeValid = 'Select Purpose'

    const generatePOFile = async (e) => {
        e.preventDefault();
        setPoFileSelect(true)
        if (!selectedImage) {
            toast.error('Please select a (PO) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logger/upload-po-file/${serialNo}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded SO File')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    }
    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails.date_of_dispatch) {
            toast.error("Enter Date Of Dispatch")
        }
        else if (!dispatchDetails.leadMarketingUser) {
            toast.error('Enter Lead marketing user')
        }
        else if (!dispatchDetails.consignee_name) {
            toast.error('Enter Consignee Name')
        }
        else if (!dispatchDetails.consignee_address) {
            toast.error('Enter Consignee Address')
        }
        else if (!dispatchDetails.distributer_gst) {
            toast.error('Enter Distributor GST Number')
        }
        else if (!dispatchDetails.concerned_person_email) {
            toast.error('Enter Concerned Person Email')
        }
        else if (!dispatchDetails.phone_number) {
            toast.error('Enter Concerned Person Number')
        }
        else if (!dispatchDetails.distributor_name) {
            toast.error('Enter Concerned Distributor Number')
        }
        else if (!dispatchDetails.distributor_contact) {
            toast.error('Enter Concerned Distributor Number')
        }
        else if (!dispatchDetails.phone_number) {
            toast.error('Enter Concerned Person Number')
        }
        else if (poFileSelect === false) {
            toast.error('Uoload SO File')
        }
        else if (!dispatchDetails.consignee_name) {
            toast.error('Enter Consignee Name')
        }
        else if (!dispatchDetails.buyerName) {
            toast.error('Enter Buyer Name')
        }
        else if (!dispatchDetails.buyerAddress) {
            toast.error('Enter Buyer Address')
        }
        else if (!dispatchDetails.purpose) {
            toast.error('Select Purpose')
        }
        else if (dispatchDetails.date_of_dispatch && dispatchDetails.distributer_gst && dispatchDetails.leadMarketingUser && dispatchDetails.buyerAddress && dispatchDetails.buyerName) {
            dispatch(returnDispatchAction({
                deviceId: deviceID,
                product_type: productType,
                serial_no: serialNo,
                purpose: dispatchDetails.purpose,
                concerned_person: dispatchDetails.concerned_person,
                distributor_gst: dispatchDetails.distributer_gst,
                consinee: dispatchDetails.consignee_name,
                consigneeAddress: dispatchDetails.consignee_address,
                phone_number: dispatchDetails.phone_number,
                marketing_lead: dispatchDetails.leadMarketingUser,
                concerned_person_email: dispatchDetails.concerned_person_email,
                address: hospitalAddress,
                date_of_dispatch: dispatchDetails.date_of_dispatch,
                hospital_name: dispatchDetails.hospitalName,
                pincode: pincodeNewData,
                distributor_name: dispatchDetails.distributor_name,
                distributor_contact: dispatchDetails.distributor_contact,
                district: districtNewData,
                state: stateNewData,
                city: cityNewData,
                document_no: dispatchDetails.document_no,
                otherRef: dispatchDetails.otherRef,
                buyerAddress: dispatchDetails.buyerAddress,
                buyerName: dispatchDetails.buyerName,
            }))
        }
    }

    const navigate = useNavigate()
    const handleAddHospital = () => {
        navigate('/add_hospital')
    }
    const goBack = () => {
        window.history.go(-1)
    }

    return (
        <>
            <Toaster />
            <NavBarForAll />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack} style={{ display: 'block' }}>
                                <img src={back} style={{ width: "3rem", }} />
                            </Link>
                            <h1 class="text-2xl font-extrabold">Return<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                            <hr style={{ color: "rgb(152, 0, 76)" }} />
                        </div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: 'rgb(152, 0, 76)' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Hospital</button>
                    </div>
                    <div>
                        <div
                            style={{ width: '100%' }}
                        >
                            <h4 style={{ textAlign: 'start', fontSize: "1.5rem", color: '#cd597b', paddingBottom: '1.5rem' }}>Device Details:</h4>

                            <Card
                            >
                                <form className='w-full flex gap-12 flex-wrap justify-between'>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>Serial Number<span>*</span> : </span>
                                            <input readOnly style={{ width: '20rem' }}
                                                defaultValue={serialNo} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>Device Id<span>*</span> :</span>
                                            <input readOnly style={{ width: '20rem' }}
                                                defaultValue={deviceID} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>Product Type<span>*</span> :</span>
                                            <input readOnly style={{ width: '20rem' }}
                                                defaultValue={productType} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" required />
                                        </section>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>Purpose<span>*</span> :</span>
                                            <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, purpose: e.target.value })} style={{ width: '20rem' }}
                                                value={dispatchDetails.purpose} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                                <option defaultChecked>{purposeValid}</option>
                                                <option>Sold</option>
                                                <option>Demo</option>
                                            </select>
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>Lead By<span>*</span> :</span>
                                            <input type="text" style={{ width: '20rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, leadMarketingUser: e.target.value })}
                                                value={dispatchDetails.leadMarketingUser} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Person Name.' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>SO Number:</span>
                                            <input type="text" style={{ width: '20rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, document_no: e.target.value })}
                                                value={dispatchDetails.document_no} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter SO Number' required />
                                        </section>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>SO File<span>*</span>:</span>
                                            <input type="file" onChange={handleImageSelect} style={{ width: '20rem' }}
                                                id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 :bg-gray-700 :border-gray-600" required />
                                        </section>
                                        {selectedImage ?
                                            <button style={{ width: '100%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generatePOFile} >
                                                upload
                                            </button>
                                            : ''
                                        }
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'black', width: '8rem', textAlign: 'start' }}>Other Refrences:</span>
                                            <input type="text" style={{ width: '20rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, otherRef: e.target.value })}
                                                value={dispatchDetails.otherRef} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Other Ref.' required />
                                        </section>
                                    </div>
                                </form>
                            </Card >
                        </div>
                    </div>
                    <div>
                        <div
                            style={{ width: '100%' }}
                        >
                            <h4 style={{ textAlign: 'start', fontSize: "1.5rem", color: '#cd597b', paddingBottom: '1.5rem' }}>Billed To:</h4>

                            <Card
                            >
                                <form className='w-full flex justify-between flex-wrap'>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '20rem', textAlign: 'start' }}>Buyer Name<span>*</span> :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, buyerName: e.target.value })}
                                                value={dispatchDetails.buyerName} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Buyer Name' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '20rem', textAlign: 'start' }}>Buyer Address<span>*</span> :</span>
                                            <textarea type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, buyerAddress: e.target.value })}
                                                value={dispatchDetails.buyerAddress} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Buyer Address' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '21rem', textAlign: 'start' }}>Concerned Person Email<span>*</span> :</span>
                                            <input type="email" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person_email: e.target.value })}
                                                value={dispatchDetails.concerned_person_email} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Concerned Person Email' required />

                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '20rem', textAlign: 'start' }}>Person Contact<span>*</span> :</span>
                                            <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, phone_number: e.target.value })}
                                                value={dispatchDetails.phone_number} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Concerned Person Contact' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '20rem', textAlign: 'start' }}>PAN Card No. :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, panCardNo: e.target.value })}
                                                value={dispatchDetails.panCardNo} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter PAN Card Number' required />
                                        </section>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '22rem', textAlign: 'start' }}>Distributor Name<span>*</span> :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_name: e.target.value })} value={dispatchDetails.distributor_name} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Distributor Name' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '22rem', textAlign: 'start' }}>Distributor Contact<span>*</span> :</span>
                                            <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_contact: e.target.value })}
                                                value={dispatchDetails.distributor_contact} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Distributor Contact' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '22rem', textAlign: 'start' }}>Concerned Person Name<span>*</span> :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person: e.target.value })}
                                                value={dispatchDetails.concerned_person} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Concerned Person Name' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', }}>
                                            <span style={{ color: 'black', width: '22rem', textAlign: 'start' }}>Destributor GST No.<span>*</span> :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributer_gst: e.target.value })}
                                                value={dispatchDetails.distributer_gst} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Distributer GST Number' required />
                                            {dispatchDetails.distributer_gst.length > 0 ?
                                                <div>
                                                    <span>Details:</span><p style={{ fontSize: '0.8rem', display: 'inline' }}>Verify</p>
                                                </div>
                                                : ''}
                                        </section>

                                    </div>
                                </form>
                            </Card >
                        </div>
                    </div>
                    <div>
                        <div
                            style={{ width: '100%' }}
                        >
                            <h4 style={{ textAlign: 'start', fontSize: "1.5rem", color: '#cd597b', paddingBottom: '1.5rem' }}>Shipped To:</h4>
                            <Card
                            >
                                <form className='w-full flex justify-between flex-wrap'>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '22rem', textAlign: 'start' }}>Consignee Name<span>*</span> :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, consignee_name: e.target.value })}
                                                value={dispatchDetails.consignee_name} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Consignee Name' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '22rem', textAlign: 'start' }}>Consignee Address<span>*</span> :</span>
                                            <textarea type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, consignee_address: e.target.value })}
                                                value={dispatchDetails.consignee_address} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Consignee Address' required />
                                        </section>

                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '12rem', textAlign: 'start' }}>Hospital Name:</span>
                                            <input list='data' type="text" onChange={(e) => {
                                                setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })
                                                const hospital_name = e.target.value;
                                                dispatch(getSingleHospitalDetails(hospital_name))
                                            }} value={dispatchDetails.hospitalName} style={{ width: '20rem' }} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder="Enter Hospital Name" required />
                                            <datalist id='data'>
                                                {dataHospital && dataHospital.map((item) => {
                                                    return (
                                                        <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                                    )
                                                })}
                                            </datalist>
                                        </section>

                                        {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'black', width: '12rem', textAlign: 'start' }}>Address :</span>
                                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { width: '20rem', padding: '0.6rem', textAlign: 'start' } : { width: '20rem', padding: '1.2rem', textAlign: 'start' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600">
                                                    {hospitalAddress}
                                                </div>
                                            </section>
                                            :
                                            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'black', width: '12rem', textAlign: 'start' }}>Address :</span>
                                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nAddress: e.target.value })} style={{ width: '20rem' }}
                                                    value={dispatchDetails.nAddress} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter Address' required />
                                            </section>}
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'black', width: '12rem', textAlign: 'start' }}>Dispatch Date<span>*</span> :</span>
                                            <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, date_of_dispatch: e.target.value })} style={{ width: '20rem' }}
                                                value={dispatchDetails.date_of_dispatch} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" required />
                                        </section>



                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', }}>
                                            <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>PinCode :</span>
                                            {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { width: "20rem", padding: '0.6rem', textAlign: 'start' } : { width: '20rem', padding: '1.2rem', textAlign: 'start' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600">
                                                    {hospitalPinCode}
                                                </div>
                                                :
                                                <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nPincode: e.target.value })} style={{ width: '20rem' }}
                                                    value={dispatchDetails.nPincode} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter PIN code' required />
                                            }
                                        </section>


                                        {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>District :</span>
                                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].District.length > 0) ? { width: '20rem', padding: '0.6rem', textAlign: 'start' } : { width: '20rem', padding: '1.2rem', textAlign: 'start' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600">
                                                    {hospitalDistrict}
                                                </div>
                                            </section>
                                            :
                                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>District :</span>
                                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nDistrict: e.target.value })} style={{ width: '20rem' }}
                                                    value={dispatchDetails.nDistrict} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter District' required />
                                            </section>
                                        }
                                        {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>State :</span>
                                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Hospital_Address.length > 0) ? { width: '20rem', padding: '0.6rem', textAlign: 'start' } : { width: '20rem', padding: '1.2rem', textAlign: 'start' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600">
                                                    {hospitalState}
                                                </div>
                                            </section>
                                            :
                                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>State :</span>
                                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nState: e.target.value })} style={{ width: '20rem' }}
                                                    value={dispatchDetails.nState} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter State' required />
                                            </section>}
                                        {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>City :</span>
                                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].City.length > 0) ? { width: '20rem', padding: '0.6rem', textAlign: 'start' } : { width: '20rem', padding: '1.2rem', textAlign: 'start' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600">
                                                    {hospitalCity}
                                                </div>
                                            </section>
                                            :
                                            <section style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ color: 'black', width: '7rem', textAlign: 'start' }}>City :</span>
                                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nCity: e.target.value })} style={{ width: '20rem' }}
                                                    value={dispatchDetails.nCity} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600" placeholder='Enter City' required />
                                            </section>}

                                    </div>

                                </form>
                            </Card >
                        </div>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <button type="submit" style={{ backgroundColor: 'rgb(152, 0, 76)' }} onClick={dispatchHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Request Doc</button>
                    </div>
                </div >
            </div >
        </>
    )
}

export default ReturnFormModule