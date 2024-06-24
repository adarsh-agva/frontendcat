import React, { useEffect, useState } from 'react'
import back from "../../../assets/images/back.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";
import NavBarForAll from '../../../utils/NavBarForAll';
import { getSingleProductionDataAction } from '../../../store/action/DeviceAction';
import { updateDeviceId } from '../../../store/action/DispatchDetailsAction';

function DispatchModel() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const serialNumber = urlParams.get("serialNo");

  const getSingleProductionDataReducer = useSelector((state) => state.getSingleProductionDataReducer)
  const { loading, data } = getSingleProductionDataReducer
  const deviceAssignData = data
  const deviceServiceData = data && data.servicesData
  const batchNo = deviceAssignData && deviceAssignData.batchNumber
  const deviceid = deviceAssignData && deviceAssignData.deviceId
  const dod = deviceAssignData && deviceAssignData.dispatchDate
  const dom = deviceAssignData && deviceAssignData.manufacturingDate
  const hospitalName = deviceAssignData && deviceAssignData.hospitalName
  const purpose = deviceAssignData && deviceAssignData.purpose
  const seiralNo = deviceAssignData && deviceAssignData.serialNumber
  const concernedPerson = deviceAssignData && deviceAssignData.concerned_person
  const productType = deviceAssignData && deviceAssignData.productType
  const Address = deviceAssignData && deviceAssignData.address
  const PhoneNumber = deviceAssignData && deviceAssignData.phone_number
  const simNo = deviceAssignData && deviceAssignData.simNumber
  const pincode = deviceAssignData && deviceAssignData.pincode
  const distributorName = deviceAssignData && deviceAssignData.distributor_name
  const distributorNumber = deviceAssignData && deviceAssignData.distributor_contact
  const ewayFile = deviceAssignData && deviceAssignData.ewayBillPdf
  const invoiceFile = deviceAssignData && deviceAssignData.invoiceBillPdf
  const shipmentFile = deviceAssignData && deviceAssignData.shippingInvoicePdf
  const poFile = deviceAssignData && deviceAssignData.poPdf;
  const document_no = deviceAssignData && deviceAssignData.document_no;
  const ewaybillNo = deviceAssignData && deviceAssignData.ewaybillNo;
  const billedTo = deviceAssignData && deviceAssignData.accountsData && deviceAssignData.accountsData.billedTo;
  const shipperDetails = deviceAssignData && deviceAssignData.markAsShippedData;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleProductionDataAction(serialNumber))
  }, [])
  const csvData = [
    ["Device Id", "Serial No", "Batch No", "Date Of Delivery", "Date Of Manuf.", "Hospital Name", "Purpose", "Serial No", "Concerned Person", "Phone Number", "Product Type", "Address", "SIM No", "PIN Code", "Distributor Name", "Distributor Contact", "Invoice Number", "E-way Number", "Builled To", "Shipped Through", "Shipper Name", "Shipper Contact", "Vehicle Number", "Tracking Number", "Comments"],
    [deviceid, seiralNo, billedTo, batchNo, dod, dom, hospitalName, purpose, seiralNo, concernedPerson, PhoneNumber, productType, Address, simNo, pincode, distributorName, distributorNumber, document_no, ewaybillNo, billedTo],
  ];
  const history = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault()
    history(`/dispatchEditDetailsForm?deviceId=${deviceid}&serialNO=${seiralNo}`)
  }
  const [changeDeviceIda, setChangeDeviceId] = useState(false)
  const [deviceIdChnage, setDeviceIdChange] = useState();
  const changeDeviceId = () => {
    setChangeDeviceId(true)
  }
  const handleSubmitDeviceId = (e) => {
    e.preventDefault()
    dispatch(updateDeviceId({ 
      deviceId: deviceid , newDeviceId: deviceIdChnage 
    }))
  }
  var activeTab=localStorage.getItem('activeTab')

  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "6rem", left: "3rem", width: "100%" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#707070" }}
          >
            <button onClick={()=>history(`/dispatchDashboardModule?activeTab=${activeTab}`)}>
              <img src={back} style={{ width: "3rem" }} />
            </button>
            <h1 class="text-2xl font-extrabold">Dispatch<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Data</small></h1>
            <div style={{ display: 'flex', gap: '16rem', alignItems: 'center' }}>
              <CSVLink data={csvData}>
                <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "rgb(152, 0, 76)", height: "23px" }} />
              </CSVLink>
                <button style={{ width: '5vw', padding: '0.5rem', backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '5px' }} onClick={handleEdit}>Add</button>
            </div>
          </div>
          {/* Details */}
          <div className='mainContainer' style={{ display: 'flex', gap: '7rem', width: '100%' }}>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ width: '40%' }}>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50" style={{ height: 'fit-content' }}>
                  <tr>
                    <th scope="row" class="px-6 py-3">
                      Device Id
                    </th>
                    {changeDeviceIda === false ?
                      <td class="px-6">
                        {deviceid ? deviceid : "- - -"}
                      </td>
                      :
                      <td class="px-6">
                        <div style={{border:'1px solid black',width:'65%',borderRadius:'8px',backgroundColor:'white'}}>
                        <input type="text" onChange={(e) => { setDeviceIdChange(e.target.value) }} style={{border:'0px',width:'100%'}} />
                        </div>
                      </td>
                    }
                    {deviceIdChnage && deviceIdChnage.length > 0 ?
                      <button onClick={handleSubmitDeviceId} style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '8px',marginTop:'6px' }}>Update</button>
                      :
                      changeDeviceIda === true ?
                      <button  style={{ color:'#fff',padding: '10px', borderRadius: '8px' }}>Update</button>
                        :
                        <button onClick={changeDeviceId} style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '8px',marginTop:'6px' }}>Edit</button>
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-900 ">
                    <th scope="col" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Batch Number
                    </th>
                    <td class="px-6">
                      {batchNo ? batchNo : '- - -'}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Document Number
                    </th>
                    <td class="px-6">
                      {document_no ? document_no : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      E-way Bill Number
                    </th>
                    <td class="px-6">
                      {ewaybillNo ? ewaybillNo : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Billed To
                    </th>
                    <td class="px-6">
                      {billedTo ? billedTo : "- - -"}
                    </td>
                  </tr>
                  <tr class="border-b bg-gray-50 ">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Date Of Dispatch
                    </th>
                    <td class="px-6">
                      {dod ? dod : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b ">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Date Of Manufacturing
                    </th>
                    <td class="px-6">
                      {dom ? dom : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Hospital Name
                    </th>
                    <td class="px-6">
                      {hospitalName ? hospitalName : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Purpose
                    </th>
                    <td class="px-6">
                      {purpose ? purpose : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Serial No
                    </th>
                    <td class="px-6">
                      {seiralNo ? seiralNo : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Concerned Person Name
                    </th>
                    <td class="px-6">
                      {concernedPerson ? concernedPerson : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Concerned Person Number
                    </th>
                    <td class="px-6">
                      {PhoneNumber ? PhoneNumber : "- - -"}
                    </td>
                  </tr>

                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Product Type
                    </th>
                    <td class="px-6">
                      {productType && productType.length > 0 ? productType : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Address
                    </th>
                    <td class="px-6">
                      {Address ? Address : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Sim Number
                    </th>
                    <td class="px-6">
                      {simNo ? simNo : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      PIN Code
                    </th>
                    <td class="px-6">
                      {pincode && pincode.length > 0 ? pincode : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Distributor Name
                    </th>
                    <td class="px-6">
                      {distributorName ? distributorName : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Distributor Contact
                    </th>
                    <td class="px-6">
                      {distributorNumber ? distributorNumber : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Shipped Through
                    </th>
                    <td class="px-6">
                      {shipperDetails && shipperDetails[0] && shipperDetails[0].shippedThrough}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Shipper Name
                    </th>
                    <td class="px-6">
                      {shipperDetails && shipperDetails[0] && shipperDetails[0].shipperName}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Shipper Contact
                    </th>
                    <td class="px-6">
                      {shipperDetails && shipperDetails[0] && shipperDetails[0].shipperContact}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Vehicle Number
                    </th>
                    <td class="px-6">
                      {shipperDetails && shipperDetails[0] && shipperDetails[0].vehicleNo}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Tracking Number
                    </th>
                    <td class="px-6">
                      {shipperDetails && shipperDetails[0] && shipperDetails[0].trackingNo}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Comments
                    </th>
                    <td class="px-6">
                      {shipperDetails && shipperDetails[0] && shipperDetails[0].comments}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ width: '40%' }}>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>

                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Invoice File
                    </th>
                    <td class="px-6">
                      <Link to={invoiceFile} style={{ color: 'black', padding: '10px', borderRadius: '8px' }}>
                        View Invoice File
                      </Link>
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Shipment File
                    </th>
                    <td class="px-6">
                      <Link to={shipmentFile} style={{ color: 'black', padding: '10px', borderRadius: '8px' }}>
                        View Shipment File
                      </Link>
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      SO File
                    </th>
                    <td class="px-6">
                      <Link to={poFile} style={{ color: 'black', padding: '10px', borderRadius: '8px' }}>
                        View SO File
                      </Link>
                    </td>
                  </tr>

                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      E-Way Bill
                    </th>
                    <td class="px-6">
                      <Link to={ewayFile} style={{ color: 'black', padding: '10px', borderRadius: '8px' }}>
                        View E-way Bill
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="container" style={{ marginLeft: '0%', width: "100%", top: '0%', height: '82%', display: "flex", flexDirection: "column", gap: "3rem", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "2rem" }}>
                <div className="d-flex" style={{ gap: "2rem", flexDirection: "row", color: "#4B4B4B" }}>
                  <h5 style={{ fontSize: "0.9rem", width: "100%", fontWeight: "bold" }}>Service Date</h5>
                  <h5 style={{ fontSize: "0.9rem", width: "100%", fontWeight: 'bold' }}>Message</h5>
                </div>
                {deviceServiceData && deviceServiceData.length > 0 ?
                  <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", textAlign: "START", color: "#4B4B4B" }}>
                    {deviceServiceData && deviceServiceData.length > 0 ? deviceServiceData && deviceServiceData.map((item, id) => (
                      <div key={id} style={{ display: 'flex' }}>
                        <h5 style={{ fontSize: "0.9rem", width: "100%" }}>{item.date.split(' ')[0]}</h5>
                        <h5 style={{ fontSize: "0.9rem", width: "100%" }}>{item.message}</h5>
                      </div>
                    )) :
                      <div style={{ display: 'flex', justifyContent: 'center', textAlign: "center", marginTop: "30%" }}>No Data Available</div>
                    }
                  </div>
                  :
                  <section style={{ width: '100%', height: '100%', marginTop: '30%', marginBottom: '40%', textAlign: 'center' }}>
                    {deviceServiceData && deviceServiceData.length === 0 && (
                      <span>
                        No Data Found
                      </span>
                    )}
                    {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
                  </section>
                }
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DispatchModel