import React, { useEffect, useState } from 'react'
import NavBarForAll from '../../../utils/NavBarForAll'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Style from "../../../css/AccountFormData.module.css"
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import back from "../../../assets/images/back.png";
import { Button, Card, Checkbox, Label, TextInput, Radio } from 'flowbite-react';
import e from 'cors';
import { getDataBySerialNumberAccountAction, postAccountDataWithFile } from '../../../store/action/DispatchDetailsAction';

function AccountFormDataModule() {
    const [accountData, setAccountData] = useState({
        billedTo: '',
        consigneName: '',
        consigneAddress: '',
        invoiceNumber: '',
        ewayNumber: '',
        document_ref_no: '',
        irnNumber: '',
        ackNumber: '',
        ackDate: ''
    })
    const [selectedImageInvoice, setSelectedImageInvoice] = useState(null);
    const [selectedImageEway, setSelectedImageEway] = useState(null);
    const dispatch = useDispatch();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serialNo = urlParams.get("serialNo");

    const [invoiceSelect, setinvoiceSelect] = useState(false)
    const [ewaybillSelect, setewaybillSelect] = useState(false)

    const getAccountDataBySerialNumberReducer = useSelector((state) => state.getAccountDataBySerialNumberReducer);
    const { loading, data } = getAccountDataBySerialNumberReducer;
    const getDispatchData = data && data.data
    useEffect(() => {
        dispatch(getDataBySerialNumberAccountAction(serialNo))
    }, [dispatch])
    const [pdfUrl, setPdfUrl] = useState('');
    const [loadinState, setLoadingState] = useState(false)

    const generateInvoiceFile = async (e) => {
        e.preventDefault()
        setinvoiceSelect(true)
        if (!selectedImageInvoice) {
            toast.error('Please select a (Invoice) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImageInvoice);
        var invoiceNumber = accountData.invoiceNumber;
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logger/upload-invoice-file/${serialNo}/${invoiceNumber}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded Invoice File')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const generateEwayFile = async (e) => {
        e.preventDefault()
        // setewaybillSelect(true)
        if (!selectedImageEway) {
            toast.error('Please select a (E-way) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImageEway);
        var ewayBill = accountData.ewayNumber;
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logger/upload-ewaybill-file/${serialNo}/${ewayBill}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setewaybillSelect(true)
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded E-way bill')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const handleSubmitData = (e) => {
        e.preventDefault();
        if (!accountData.invoiceNumber) {
            toast.error('Enter invoice / document number')
        }
        else if (invoiceSelect == false) {
            toast.error('Please upload invoice / document file')
        }
        else if (accountData.invoiceNumber) {
            dispatch(postAccountDataWithFile({
                seriallNo: serialNo,
                ewaybillNo: accountData.ewayNumber,
                billedTo: accountData.billedTo,
                consinee: accountData.consigneName,
                consigneeAddress: accountData.consigneAddress,
                invoiceNo: accountData.invoiceNumber,
                document_ref_no: accountData.document_ref_no,
                irn: accountData.irnNumber,
                ackNo: accountData.ackNumber,
                ackDate: accountData.ackDate
            }))

        }
    }
    
    const handleImageSelectInvoice = (event) => {
        setSelectedImageInvoice(event.target.files[0]);
    };
    const handleImageSelectEWay = (event) => {
        setSelectedImageEway(event.target.files[0]);
    };
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <div>
            <Toaster />
            <NavBarForAll />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Accounts<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <form>
                        <div>
                            <div
                                style={{ width: '100%' }}
                            >
                                <Card
                                >
                                    <form className='flex flex-wrap' style={{gap:'2rem'}}>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Serial Number :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{serialNo}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Person Name :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.concerned_person}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Concerned Email</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.concerned_person_email}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Consignee</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.consinee}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Consignee Address</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.consigneeAddress}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Distributor Name</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.distributor_name}</h5>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Document No. :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.document_no}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>GST No. :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.gst_number}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Marketing Lead :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.marketing_lead}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Buyer Name :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.buyerName}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Buyer Addresss :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.buyerAddress}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Distributor Number:</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.distributor_contact}</h5>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Purpose :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.purpose}</h5>
                                            </section>

                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Pin Code :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.pincode}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Country :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.country}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>State :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.state}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>City :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.city}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>District :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.district}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Distributor Gst :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.distributor_gst}</h5>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Hospital Name :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.hospital_name}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Manuf. Date:</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.manufacturingDate}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Product Type :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.product_type}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Phone Number :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.phone_number}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>Other Ref. :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.otherRef}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem', textAlign: 'start' }}>PAN Number :</span>
                                                <h5 style={{ width: '11rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.panNo}</h5>
                                            </section>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <form class="w-full">
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">IRN Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, irnNumber: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter IRN Number" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Ack Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, ackNumber: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Ack Number" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Ack Date</label>
                                                    <input type="date" onChange={(e) => {
                                                        setAccountData({ ...accountData, ackDate: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Billed To" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Billed To</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, billedTo: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Billed To" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Consignee Name</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, consigneName: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Consignee Name" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Consignee Address</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, consigneAddress: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Consignee Address" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Documment Ref. Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, document_ref_no: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Document No." required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">Invoice / Document Number <span>*</span></label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, invoiceNumber: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter invoice / document Number" required />
                                                </div>
                                            </form>
                                            <div class="mb-2" style={{ textAlign: 'start' }}>
                                                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Invoice / Document File <span>*</span></label>
                                                <div class="flex gap-2 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                                    <input type="file" onChange={handleImageSelectInvoice} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" required />
                                                    <button style={{ width: '20%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5" onClick={generateInvoiceFile} >
                                                        upload invoice file
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <form class="w-full">
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 ">E-way Bill Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, ewayNumber: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter E-way bill number" required />
                                                </div>
                                            </form>
                                            <div class="mb-2" style={{ textAlign: 'start' }}>
                                                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 :text-white">E-way Bill File</label>
                                                <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                                    <input type="file" onChange={handleImageSelectEWay} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" required />
                                                    <button style={{ width: '20%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generateEwayFile} >
                                                        Upload E-way bill
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="submit" onClick={handleSubmitData} style={{ backgroundColor: 'rgb(152, 0, 76)' }} class="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                                </Card >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountFormDataModule