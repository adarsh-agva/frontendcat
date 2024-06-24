import React, { useState } from 'react'
import NavBarForAll from '../../../utils/NavBarForAll'
import { Card } from 'flowbite-react'
import { Label, Radio } from 'flowbite-react';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { postShipmentDetailsAction } from '../../../store/action/DispatchDetailsAction';
import axios from 'axios';
function ShipmentDetails() {
    const [shipmentData, setShippmentData] = useState({
        trackingNo: '',
        vehicleNo: '',
        shipmentNo: '',
        shipperName: '',
        comments: '',
    })
    const [shipperState, setShipperState] = useState('')
    const [invoiceFile, setInvoiceFile] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadinState, setLoadingState] = useState(false)
    const [pdfUrl, setPdfUrl] = useState('');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serialNo = urlParams.get('serialNumber')

    const dispatch = useDispatch();

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const generateInvoiceFile = async (e) => {
        e.preventDefault()
        setInvoiceFile(true)
        if (!selectedImage) {
            toast.error('Please select a (Invoice) file');
            return;
        }
        else if (!serialNo) {
            toast.error("Check Serial Number")
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logger/upload-shipping-file/${serialNo}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded Shipment Invoice')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!shipmentData.trackingNo) {
            toast.error('Enter Tracking Number')
        }
        else if (!shipmentData.shipperName) {
            toast.error('Enter Shipment Name')
        }
        else if (!shipmentData.shipmentNo) {
            toast.error('Enter Shipper Number')
        }
        else if (!shipmentData.vehicleNo) {
            toast.error('Enter Vehicle Number')
        }
        else if (!shipmentData.comments) {
            toast.error('Enter Comment')
        }
        // else if (invoiceFile == false) {
        //     toast.error('Upload Shipment Invoice')
        // }
        // else if (!selectedImage) {
        //     toast.error('Select invoice File')
        // }
        else if (!shipperState) {
            toast.error('Select Shipped Through')
        }
        else if (shipmentData.trackingNo && shipmentData.vehicleNo && shipmentData.shipperName && shipmentData.comments) {
            dispatch(postShipmentDetailsAction({
                seriallNo: serialNo,
                trackingNo: shipmentData.trackingNo,
                vehicleNo: shipmentData.vehicleNo,
                shipperContact: shipmentData.shipmentNo,
                shipperName: shipmentData.shipperName,
                comments: shipmentData.comments,
                shippedThrough: shipperState,
            }))
        }
    }
    return (
        <div>
            <Toaster />
            <NavBarForAll />
            <div style={{ padding: '0rem 3rem', marginTop: '7rem' }}>
                <div
                    style={{ width: '100%' }}
                >
                    <h4 style={{ fontSize: "1.8rem", color: '#000', paddingBottom: '1.5rem' }}>Shipment Details:</h4>
                    <Card
                    >
                        <form className='flex gap-12 flex-wrap'>
                            <div className="w-full flex flex-col gap-4">
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '11rem' }}>Shipped Through :</span>
                                    <fieldset className="flex max-w-md flex-row gap-4">
                                        <div className="flex items-center gap-2">
                                            <input type='radio' id="Car" name="countries" value="Car" onChange={e => setShipperState(e.target.value)} />
                                            <lable htmlFor="Car">Car</lable>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type='radio' id="Truck" name="countries" value="Truck" onChange={e => setShipperState(e.target.value)} />
                                            <lable htmlFor="Truck">Truck</lable>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type='radio' id="Train" name="countries" value="Train" onChange={e => setShipperState(e.target.value)} />
                                            <lable htmlFor="Train">Train</lable>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type='radio' id="Air" name="countries" value="Air" onChange={e => setShipperState(e.target.value)} />
                                            <lable htmlFor="Air">Air</lable>
                                        </div>
                                    </fieldset>
                                </section>
                                <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '11rem' }}>Tracking No. :</span>
                                    <input type="text" onChange={(e) => setShippmentData({ ...shipmentData, trackingNo: e.target.value })} value={shipmentData.trackingNo} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Tracking number" required />
                                </section>
                                {shipperState === 'Car' || shipperState === 'Truck' || shipperState === '' ?
                                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ width: '11rem' }}>Vehicle No. :</span>
                                        <input type="text" onChange={(e) => setShippmentData({ ...shipmentData, vehicleNo: e.target.value })} value={shipmentData.vehicleNo} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Vehicle number" required />
                                    </section>
                                    :
                                    shipperState === 'Train' ?
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '11rem' }}>Train No. :</span>
                                            <input type="text" onChange={(e) => setShippmentData({ ...shipmentData, vehicleNo: e.target.value })} value={shipmentData.vehicleNo} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Train number" required />
                                        </section>
                                        :
                                        shipperState === 'Air' ?
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '11rem' }}>Courier No. :</span>
                                                <input type="text" onChange={(e) => setShippmentData({ ...shipmentData, vehicleNo: e.target.value })} value={shipmentData.vehicleNo} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Courier number" required />
                                            </section>
                                            : ''
                                }
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '11rem' }}>Shipment Invoice:</span>
                                    <input type="file" onChange={handleImageSelect} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" required />
                                    <button onClick={generateInvoiceFile} style={{ backgroundColor: 'white', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', color: 'rgb(152, 0, 76)', padding: '13px', borderRadius: '10px' }}>
                                        {loadinState && <h6 style={{ fontSize: '0.9rem' }}>Uploading...</h6>}
                                        {!loadinState && <h6 style={{ fontSize: '0.9rem' }}>Upload</h6>}
                                    </button>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '11rem' }}>Shipper Name :</span>
                                    <input type="text" onChange={(e) => setShippmentData({ ...shipmentData, shipperName: e.target.value })} value={shipmentData.shipperName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Shipper Name' required />
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '11rem' }}>Shipper Contact No. :</span>
                                    <input type="number" onChange={(e) => setShippmentData({ ...shipmentData, shipmentNo: e.target.value })} value={shipmentData.shipmentNo} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Shipper Contact Number' required />
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '11rem' }}>Comments :</span>
                                    <textarea type="text" onChange={e => setShippmentData({ ...shipmentData, comments: e.target.value })} value={shipmentData.comments} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Comments...' required />
                                </section>
                                <section style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <button onClick={handleSubmit} style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '10px', borderRadius: '5px' }}>Mark Shipped</button>
                                </section>
                            </div>
                        </form>
                    </Card >
                </div>
            </div>
        </div>
    )
}

export default ShipmentDetails