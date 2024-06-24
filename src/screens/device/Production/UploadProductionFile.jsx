import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
function UploadProductionFile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [serialNumber, setSerialNumber] = useState('')
    const [pdfUrl, setPdfUrl] = useState('');
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceID = urlParams.get('deviceId');
    const generatePdfAndUploadToS3 = async () => {
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        var flag='DHR-FILE'
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/production/upload-production-file/${deviceID}/${flag}`, formData,
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
    return (
        <div className='d-flex'>
            <Toaster />
            <div class="p-3 d-flex" style={{gap:'1rem'}}>
                <input onChange={handleImageSelect} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />
                <button onClick={generatePdfAndUploadToS3} style={{ backgroundColor: 'rgb(152, 0, 76)' , borderRadius:'10px',height:'2.1rem'}} class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-1 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Upload</button>
            </div>
            <div class="p-3" style={{ display: 'flex', justifyContent: 'center',alignItems:'end' }}>
            </div>
        </div>
    )
}

export default UploadProductionFile