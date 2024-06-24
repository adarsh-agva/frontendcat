import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deviceAction } from '../../../store/action/DeviceAction';
import { getAllHospitalData } from '../../../store/action/StoreSystem';
import { Toaster, toast } from 'react-hot-toast';
import { instalationReportAction } from "../../../store/action/ServiceEngAction"
import axios from 'axios';

function InstallationRecords() {
    const [indtallationData, setInstallationData] = useState({
        deviceId: '',
        concernedPersonName: '',
        dateOfWaranty: '',
        hospitalName: '',
        Address: '',
        ServiceEngName: '',
    })
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data

    // hospital reducer
    const allHospitalDataReducer = useSelector((state) => state.allHospitalDataReducer);
    const { data: dataa } = allHospitalDataReducer;
    const getHospitalData = dataa && dataa.data
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])
    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const generatePdfAndUploadToS3 = async (e) => {
        e.preventDefault()
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        const deviceId=indtallationData.deviceId;
        const flag='INS-REPORT';
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/support/upload-installation-report/${deviceId}/${flag}`, formData,
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
        const formData = new FormData();
        formData.append('file', selectedImage);
        console.log('file', selectedImage)
        console.log('indtallationData', indtallationData)
        if (!indtallationData.deviceId) {
            toast.error('Enter Device Id')
        }
        else if (!indtallationData.concernedPersonName) {
            toast.error('Enter Concerned Person Name')
        }
        else if (!indtallationData.dateOfWaranty) {
            toast.error('Enter Date Of Warranty')
        }
        else if (!indtallationData.hospitalName) {
            toast.error('Enter Hospital Name')
        }
        else if (!indtallationData.Address) {
            toast.error('Enter Address')
        }
        else if (!indtallationData.ServiceEngName) {
            toast.error('Enter Service Eng. Name')
        }
        else if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        else if (indtallationData.deviceId && indtallationData.concernedPersonName && indtallationData.dateOfWaranty && indtallationData.hospitalName && indtallationData.Address && indtallationData.ServiceEngName && selectedImage) {

            dispatch(instalationReportAction({
                deviceId: indtallationData.deviceId,
                concernedPName: indtallationData.concernedPersonName,
                dateOfWarranty: indtallationData.dateOfWaranty,
                hospitalName: indtallationData.hospitalName,
                address: indtallationData.Address,
            }))
        }

    }
    return (
        <div>
            <Toaster />
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 :bg-gray-800 :border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" style={{ color: 'white' }}>
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to='/service_eng' class="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}>
                                <span style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap :text-white">AgVa Healthcare</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: '5rem' }}>
                <h1 class="flex items-center text-5xl font-extrabold" style={{ justifyContent: 'center' }}>Assign<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">user</span></h1>
            </div>
            <form class="p-3">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                        <input list='borow' onChange={(e) => {
                            setInstallationData({ ...indtallationData, deviceId: e.target.value })
                        }} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                        <datalist id='borow'>
                            {deviceIdData && deviceIdData.map((item) => {
                                return (
                                    <option value={item.deviceId}>{item.deviceId}</option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Name</label>
                        <input type="text" onChange={(e) => {
                            setInstallationData({ ...indtallationData, concernedPersonName: e.target.value })
                        }} id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Name" required />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Date Of Warranty</label>
                        <input type="date" onChange={(e) => {
                            setInstallationData({ ...indtallationData, dateOfWaranty: e.target.value })
                        }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                        <input list="data" type="text" onChange={(e) => setInstallationData({ ...indtallationData, hospitalName: e.target.value })} value={indtallationData.hospitalName} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                        <datalist id="data">
                            {getHospitalData && getHospitalData.map((item, index) => {
                                return (
                                    <option key={index} >{item.Hospital_Name}</option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                        <input type="text" onChange={(e) => setInstallationData({ ...indtallationData, Address: e.target.value })} value={indtallationData.Address} id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Address" required />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Service Eng. Name</label>
                        <input type="text" onChange={(e) => setInstallationData({ ...indtallationData, ServiceEngName: e.target.value })} value={indtallationData.ServiceEngName} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Eng. Name" required />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="file" class="block mb-2 text-sm font-medium text-gray-900 :text-white">File</label>
                    <div class="flex gap-2 mb-6 md:grid-cols-2" style={{alignItems:'center'}}>
                        <input type="file" onChange={handleImageSelect} id="file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                    <button style={{width:'20%',height:'3rem'}} onClick={generatePdfAndUploadToS3} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Select</button>
                    </div>
                </div>
                <button style={{backgroundColor:'rgb(152, 0, 76)',width:'100%'}} onClick={handleSubmitData} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default InstallationRecords