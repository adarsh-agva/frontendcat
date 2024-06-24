import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import { Navbar } from '../../../../utils/NavBar';
import SideBar from '../../../../utils/Sidebar';
import back from "../../../../assets/images/back.png";
import { getHospitalDataFromAdding } from '../../../../store/action/StoreSystem';
import { useDispatch, useSelector } from 'react-redux';
import { postPatientDataAction } from '../../../../store/action/DeviceAction';
import axios from 'axios';
import NavBarForAll from '../../../../utils/NavBarForAll';

function PatientDetails() {
    const [patientData, setPatientData] = useState({
        patientName: '',
        hospitalName: '',
        dosageProvided: '',
        age: '',
        height: '',
        deviceId: '',
        weight: ''
    })

    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])

    const [dhrSelect, setdhrSelect] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceUhId = urlParams.get("uhId");
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
            // toast.success('Uploaded successful')
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
        else if (!patientData.age) {
            toast.error('Enter Patient Age')
        }
        else if (patientData.age.length > 2) {
            toast.error('Enter Valid Age')
        }
        else if (!patientData.weight) {
            toast.error('Enter Patient Weight')
        }
        else if (patientData.height.length > 3) {
            toast.error('Enter Patient Height')
        }
        else if (!patientData.hospitalName) {
            toast.error('Enter Hospital Name')
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
        else if (patientData.age && patientData.weight && patientData.height && patientData.hospitalName && patientData.dosageProvided && selectedImage) {
            dispatch(postPatientDataAction({
                UHID: deviceUhId,
                patientName: patientData.patientName,
                age: patientData.age,
                weight: patientData.weight,
                height: patientData.height,
                deviceId: deviceId,
                hospitalName: patientData.hospitalName,
                dosageProvided: patientData.dosageProvided
            }))
        }
    }
    const navigate = useNavigate()
    const handleAddHospital = () => {
        navigate(`/add_diagnose?uhId=${deviceUhId}`)
    }
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <>
            <NavBarForAll />
            <Toaster />
            <div
                className="main-overview"
                style={{ position: "absolute", left: "4rem", width: '90%' }}
            >
                <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack}>
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                        </div>
                        <h1 class="flex items-center text-5xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">Details</span></h1>
                    </div>
                    <div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: 'rgb(152, 0, 76)' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Diagnose</button>
                    </div>
                </div>
                <form class="p-3">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">UHID</label>
                            <input
                                defaultValue={deviceUhId} disabled
                                type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                        </div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                            <input
                                defaultValue={deviceId} disabled
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
                                onChange={(e) => {
                                    setPatientData({ ...patientData, age: e.target.value })
                                }}
                                value={patientData.age} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Patient Age" required />
                        </div>
                        <div>
                            <label for="height" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Height (in Cm)</label>
                            <input type="number"
                                onChange={(e) => setPatientData({ ...patientData, height: e.target.value })} value={patientData.height}
                                id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Patient Height" required />
                        </div>
                        <div>
                            <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Weight (in Kg)</label>
                            <input type="number"
                                onChange={(e) => setPatientData({ ...patientData, weight: e.target.value })} value={patientData.weight}
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
                    </div>
                    <div class="mb-6">
                        <label for="file" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient File</label>
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
        </>
    )
}

export default PatientDetails