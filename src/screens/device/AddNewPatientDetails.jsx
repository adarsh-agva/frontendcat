
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import back from "../../assets/images/back.png"
import axios from 'axios';
import { getHospitalDataFromAdding } from '../../store/action/StoreSystem';
import { getPatientDetailsByUhid, getUhidListData, postPatientDataAction } from '../../store/action/DeviceAction';
import ServiceModuleNavBar from './ServiceEnginner/ServiceModuleNavBar';

function AddNewPatientDetails() {
    const [patientData, setPatientData] = useState({
        uhid: '',
        patientName: '',
        hospitalName: '',
        dosageProvided: '',
        age: '',
        height: '',
        deviceId: '',
        weight: '',
        wardNumber: '',
        doctorName: ''
    })
    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    // Hpospital Data
    const getUhidsListReducer = useSelector((state) => state.getUhidsListReducer);
    const { data: uhidList } = getUhidsListReducer;
    useEffect(() => {
        dispatch(getUhidListData())
    }, [])
    // Device Id By UHID 
    const getPatientDetailsByUhidReducer = useSelector((state) => state.getPatientDetailsByUhidReducer);
    const { data } = getPatientDetailsByUhidReducer;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])

    useEffect(() => {
        dispatch(getPatientDetailsByUhid())
    }, [])
    const [dhrSelect, setdhrSelect] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceUhId = patientData.uhid;
    const deviceId = urlParams.get("deviceId");

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const generatePdfAndUploadToS3 = async (e) => {
        e.preventDefault()
        setdhrSelect(true)
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/patient/upload-patient-file/${deviceId}/${deviceUhId}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded successful')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };
    const handleSubmitData = (e) => {
        e.preventDefault()
        if (!patientData.patientName) {
            toast.error('Enter Patient Name')
        }
        else if (!patientData.uhid) {
            toast.error('Enter UHID')
        }
        else if (!patientData.hospitalName) {
            toast.error('Enter Hospital Name')
        }
        else if (!patientData.wardNumber) {
            toast.error('Enter Ward Number')
        }
        else if (!patientData.doctorName) {
            toast.error('Enter Dr. Name')
        }
        else if (dhrSelect === false) {
            toast.error("Please click on DHR File select");
        }
        else if (!patientData.dosageProvided) {
            toast.error('Enter Dosage Provided')
        }
        else if (patientData.dosageProvided.length > 2) {
            toast.error('Enter valid Dosage number')
        }
        else if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        else if (patientData.hospitalName && patientData.wardNumber && patientData.doctorName && patientData.dosageProvided && selectedImage) {
            dispatch(postPatientDataAction({
                patientName: patientData.patientName,
                UHID: patientData.uhid,
                age: data.age,
                weight: data.weight,
                height: data.height,
                deviceId: data.deviceId,
                hospitalName: patientData.hospitalName,
                dosageProvided: patientData.dosageProvided,
                ward_no: patientData.wardNumber,
                doctor_name: patientData.doctorName
            }))
        }
    }
    const navigate = useNavigate()
    const handleAddHospital = () => {
        navigate(`/add_diagnose_data?uhId=${deviceUhId}`)
    }
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <div>
            <Toaster />
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 :bg-gray-800 :border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    <div class="flex items-center justify-between">
                        <div class="contents items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" style={{ color: 'white' }}>
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <span style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap :text-white">AgVa Healthcare</span>
                            <div class="flex items-center">
                                <div class="flex items-center ml-3">
                                    <ServiceModuleNavBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack}>
                            <img src={back} style={{ width: "3rem" }} />
                        </Link>
                        <h1 class="flex items-center text-3xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">Details</span></h1>
                    </div>
                </div>
            </div>
            <form class="p-3">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">UHID</label>
                        <input list='uhidlist'
                            onChange={(e) => {
                                setPatientData({ ...patientData, uhid: e.target.value })
                                const uhid = e.target.value
                                dispatch(getPatientDetailsByUhid(uhid))
                            }}
                            value={patientData.uhid}
                            type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter UHID" required />

                        <datalist id='uhidlist'>
                            {uhidList && uhidList.map((item) => {
                                return (
                                    <option value={item.UHID}>{item.UHID}</option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                        <input
                            defaultValue={patientData.uhid.length > 0 ? data && data.deviceId : ''} disabled
                            type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Name</label>
                        <input type="text"
                            onChange={(e) => {
                                setPatientData({ ...patientData, patientName: e.target.value })
                            }}
                            value={patientData.patientName}
                            id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Patient Name" required />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Age</label>
                        <input type="number"
                            defaultValue={data && data.age} disabled id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Patient Age" required />
                    </div>
                    <div>
                        <label for="height" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Height (in Cm)</label>
                        <input type="number"
                            defaultValue={patientData.uhid.length > 0 ? data && data.height : ''} disabled
                            id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Patient Height" required />
                    </div>
                    <div>
                        <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Weight (in Kg)</label>
                        <input
                            defaultValue={patientData.uhid.length > 0 ? data && data.weight : ''} disabled
                            id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Patient Weight" required />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                        <input list="data" type="text"
                            onChange={(e) => {
                                setPatientData({ ...patientData, hospitalName: e.target.value })
                            }}
                            value={patientData.hospitalName} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                        <datalist id='data'>
                            {dataHospital && dataHospital.map((item) => {
                                return (
                                    <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Dosage Provided</label>
                        <input type="number"
                            onChange={(e) => setPatientData({ ...patientData, dosageProvided: e.target.value })} value={patientData.dosageProvided}
                            id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Dosage Provided" required />
                    </div>
                    <div>
                        <label for="doctorName" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Doctor Name</label>
                        <input type="text"
                            onChange={(e) => setPatientData({ ...patientData, doctorName: e.target.value })} value={patientData.doctorName}
                            id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Doctor Name" required />
                    </div>
                    <div>
                        <label for="wardNumber" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Ward Number</label>
                        <input type="text"
                            onChange={(e) => setPatientData({ ...patientData, wardNumber: e.target.value })} value={patientData.wardNumber}
                            id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="file" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Upload Patient Diagnose File</label>
                    <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                        <input type="file"
                            onChange={handleImageSelect}
                            id="file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                        <button style={{ width: '20%', height: '3rem' }}
                            onClick={generatePdfAndUploadToS3}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Select</button>
                    </div>
                </div>
                <button style={{ backgroundColor: 'rgb(152, 0, 76)', width: '100%' }}
                    onClick={handleSubmitData}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default AddNewPatientDetails