import React, { useEffect, useState } from 'react'
import Style from "../../../css/Production.module.css"
import { toast, Toaster } from 'react-hot-toast'
import { getEditProductionDataAction, productionDetailsAction, putProductionDataAction } from "../../../store/action/DispatchDetailsAction"
import { useDispatch, useSelector } from 'react-redux';
import back from "../../../assets/images/back.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBarForAll from '../../../utils/NavBarForAll';
import EditDataSaveFile from './EditDataSaveFile';
function EditProductionData() {

    const dispatch = useDispatch();
    const [loadinState, setLoadingState] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [todateformat, setTodateformat] = useState('');
    const [fromdateformat, setFromdateformat] = useState('');
    const [dhrSelect, setdhrSelect] = useState(false)
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data


    const getEditProductionDataReducer = useSelector((state) => state.getEditProductionDataReducer);
    const { loading, data: dataa } = getEditProductionDataReducer;
    const getDispatchData = dataa && dataa.data

    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: getDispatchData && getDispatchData.deviceId,
        productType: getDispatchData && getDispatchData.productType,
        serialNumber: getDispatchData && getDispatchData.serialNumber,
        manufacturingDate: getDispatchData && getDispatchData.manufacturingDate,
        batchNumber: getDispatchData && getDispatchData.batchNumber,
        simNumber: getDispatchData && getDispatchData.simNumber,
        hardwareV: getDispatchData && getDispatchData.hw_version,
        softwareV: getDispatchData && getDispatchData.sw_version,
        displayNumber: getDispatchData && getDispatchData.displayNumber,
        turbineNumber: getDispatchData && getDispatchData.turbineNumber,
        qaDoneBy: getDispatchData && getDispatchData.qaDoneBy,
        dataEnterBy: getDispatchData && getDispatchData.dataEnteredBy,
        testingDoneBy: getDispatchData && getDispatchData.testingDoneBy,
        partsIssuedBy: getDispatchData && getDispatchData.partsIssuedBy,
    })
    useEffect(() => {
        dispatch(getEditProductionDataAction(deviceId))
        if (getDispatchData && getDispatchData.length > 0) {
            setDispatchDetails({
                deviceId:  getDispatchData?.deviceId,
                productType:  getDispatchData?.productType,
                serialNumber:  getDispatchData?.serialNumber,
                manufacturingDate:  getDispatchData?.manufacturingDate,
                batchNumber:  getDispatchData?.batchNumber,
                simNumber:  getDispatchData?.simNumber,
                hardwareV:  getDispatchData?.hw_version,
                softwareV:  getDispatchData?.sw_version,
                displayNumber:  getDispatchData?.displayNumber,
                turbineNumber:  getDispatchData?.turbineNumber,
                qaDoneBy:  getDispatchData?.qaDoneBy,
                dataEnterBy:  getDispatchData?.dataEnteredBy,
                testingDoneBy:  getDispatchData?.testingDoneBy,
                partsIssuedBy:  getDispatchData?.partsIssuedBy,
            });
        }
    }, [])
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get("deviceId");
    const serialNumber = urlParams.get("serialNo");

    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        else if (!dispatchDetails.serialNumber) {
            toast.error("Enter Address")
        }
        else if (!dispatchDetails.batchNumber) {
            toast.error("Enter Batch No.")
        }
        else if (!dispatchDetails.manufacturingDate) {
            toast.error("Enter Date Of Manufacturing")
        }
        else if (!dispatchDetails.simNumber) {
            toast.error("Enter Phone Number")
        }
        else if (!dispatchDetails.displayNumber) {
            toast.error('Enter Display Number')
        }
        else if (!dispatchDetails.turbineNumber) {
            toast.error('Enter Turbine Number')
        }
        else if (todateformat > fromdateformat) {
            toast.error("Please select valid date");
        }
        else if (!dispatchDetails.hardwareV) {
            toast.error("Enter Hardware Version")
        }
        else if (!dispatchDetails.softwareV) {
            toast.error("Enter Software Veresion")
        }
        else if (!dispatchDetails.qaDoneBy) {
            toast.error('Enter QA Name')
        }
        else if (!dispatchDetails.dataEnterBy) {
            toast.error('Enter Data Enter Name')
        }
        else if (!dispatchDetails.testingDoneBy) {
            toast.error('Enter Testing Done By')
        }
        else if (!dispatchDetails.partsIssuedBy) {
            toast.error('Enter Parts Issued By')
        }
        else if (!dispatchDetails.productType === 'Select Product Type') {
            toast.error('Select Product Type')
        }
        else if (dispatchDetails.deviceId && dispatchDetails.qaDoneBy && dispatchDetails.dataEnterBy && dispatchDetails.partsIssuedBy && dispatchDetails.testingDoneBy && dispatchDetails.productType && dispatchDetails.serialNumber && dispatchDetails.batchNumber && dispatchDetails.manufacturingDate && dispatchDetails.simNumber) {
            dispatch(putProductionDataAction({
                deviceId: dispatchDetails.deviceId,
                productType: dispatchDetails.productType,
                batchNumber: dispatchDetails.batchNumber,
                manufacturingDate: dispatchDetails.manufacturingDate,
                serialNumber: dispatchDetails.serialNumber,
                qaDoneBy: dispatchDetails.qaDoneBy,
                dataEnteredBy: dispatchDetails.dataEnterBy,
                testingDoneBy: dispatchDetails.testingDoneBy,
                partsIssuedBy: dispatchDetails.partsIssuedBy,
                simNumber: dispatchDetails.simNumber,
                hw_version: dispatchDetails.hardwareV,
                sw_version: dispatchDetails.softwareV,
                turbineNumber: dispatchDetails.turbineNumber,
                displayNumber: dispatchDetails.displayNumber,
            }))
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }


    const [pdfUrl, setPdfUrl] = useState('');
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const generateDhrFile = async (e) => {
        e.preventDefault()
        setdhrSelect(true)
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        else if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        var flag = 'DHR-FILE';
        var deviceID = dispatchDetails.deviceId;
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/production/upload-production-file/${deviceID}/${flag}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded DHR File')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };
    return (
        <>
            {/* <Navbar /> */}
            <NavBarForAll />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: '100%' }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} loading='lazy' style={{ width: "3rem", }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Production<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Edit</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                                <input list='borow' type="text" onChange={(e) =>
                                    setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })}
                                    value={dispatchDetails.deviceId} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                                <datalist id='borow'>
                                    {deviceIdData && deviceIdData.map((item) => {
                                        return (
                                            <option value={item.deviceId}>{item.deviceId}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            <div>
                                <label for="product" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Product Type</label>
                                <select id="product" onChange={(e) => setDispatchDetails({ ...dispatchDetails, productType: e.target.value })}
                                    value={dispatchDetails.productType} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <option>Agva Pro</option>
                                    <option>Insulin</option>
                                    <option>Suction</option>
                                </select>
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, serialNumber: e.target.value })}
                                    value={dispatchDetails.serialNumber} readOnly id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Batch Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, batchNumber: e.target.value })}
                                    value={dispatchDetails.batchNumber} id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Batch Number" required />
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">QA Done By</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, qaDoneBy: e.target.value })}
                                    value={dispatchDetails.qaDoneBy} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter QA Name" required />
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Data Entered By</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, dataEnterBy: e.target.value })}
                                    value={dispatchDetails.dataEnterBy} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Data Entereed By" required />
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Testing Done By</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, testingDoneBy: e.target.value })}
                                    value={dispatchDetails.testingDoneBy} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Testing Done By" required />
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Parts Issued By</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, partsIssuedBy: e.target.value })}
                                    value={dispatchDetails.partsIssuedBy} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Parts Issued By" required />
                            </div>
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Manufacturing Date</label>
                                <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, manufacturingDate: e.target.value })}
                                    value={dispatchDetails.manufacturingDate} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="hardwareV" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Turbine Number</label>
                                <form class="flex items-center">
                                    <div class="relative w-full">
                                        <input onChange={(e) => setDispatchDetails({ ...dispatchDetails, turbineNumber: e.target.value })}
                                            value={dispatchDetails.turbineNumber} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " placeholder='Enter Turbine Number' required />
                                    </div>
                                </form>
                            </div>
                            <div>
                                <label for="number" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Sim Number</label>
                                <input type="text" id="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, simNumber: e.target.value })}
                                    value={dispatchDetails.simNumber} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Sim Number" required />
                            </div>
                            <div>
                                <label for="softwareV" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Display Number</label>
                                <form class="flex items-center">
                                    <div class="relative w-full">
                                        <input type="text" id="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, displayNumber: e.target.value })}
                                            value={dispatchDetails.displayNumber} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Display Number" required />
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* software hardware */}
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="hardwareV" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hardware Version</label>
                                <form class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <h6 style={{ paddingLeft: '13px', fontSize: '0.9rem' }}>
                                                Version-
                                            </h6>
                                        </div>
                                        <input style={{ paddingLeft: '4.7rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, hardwareV: e.target.value })}
                                            value={dispatchDetails.hardwareV} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " placeholder='Enter Hardware Version' required />
                                    </div>
                                </form>
                            </div>
                            <div>
                                <label for="softwareV" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Software Version</label>
                                <form class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <h6 style={{ paddingLeft: '13px', fontSize: '0.9rem' }}>
                                                Version-
                                            </h6>
                                        </div>
                                        <input style={{ paddingLeft: '4.7rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, softwareV: e.target.value })}
                                            value={dispatchDetails.softwareV} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " placeholder='Enter Software Version' required />
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div class="mb-6" style={{ textAlign: 'start' }}>
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 :text-white">DHR File</label>
                            <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                <input type="file" onChange={handleImageSelect} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                                <button style={{ width: '20%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generateDhrFile} >
                                    {loadinState && <h6 style={{ fontSize: '0.9rem' }}>Uploading...</h6>}
                                    {!loadinState && <h6>Upload</h6>}
                                </button>
                            </div>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'rgb(152, 0, 76)' }} onClick={dispatchHandler} class="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
                    </form>
                    <div>
                        <p class="text-2xl font-bold text-gray-900  text-start mb-2">Edit File Change</p>
                        <EditDataSaveFile serialNo={serialNumber} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProductionData