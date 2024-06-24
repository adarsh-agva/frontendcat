import React, { useEffect } from 'react'
import NavBarForAll from '../../../utils/NavBarForAll'
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import Style from "../../../css/SingleProductionDataEdit.module.css";
import back from "../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProductionDataAction } from '../../../store/action/DeviceAction';

function SingleProductionDataWithEdit() {
    const getSingleProductionDataReducer = useSelector((state) => state.getSingleProductionDataReducer);
    const { loading, data } = getSingleProductionDataReducer;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serialNumber = urlParams.get('serialNo')
    const deviceId = urlParams.get('deviceId')

    const history = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleProductionDataAction(serialNumber))
    }, [])
    return (
        <div>
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
                        <Link to={'/productionDataModel'}>
                            <img src={back} style={{ width: "3rem" }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Production Single<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Data</small></h1>
                        <div style={{ display: 'flex', gap: '16rem', alignItems: 'center' }}>
                            <button onClick={() => { history(`/editProductionData?deviceId=${deviceId}&serialNo=${serialNumber}`) }} style={{ width: '5vw', padding: '0.5rem', backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '5px' }}>Edit</button>
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
                                        <td scope="col" class="px-6 font-medium text-gray-900 whitespace-nowrap ">
                                            {data && data.deviceId ? data && data.deviceId : "- - -"}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-900 ">
                                        <th scope="col" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Batch Number
                                        </th>
                                        <td class="px-6">
                                            {data && data.batchNumber ? data && data.batchNumber : '- - -'}
                                        </td>
                                    </tr>
                                    <tr class="border-b bg-gray-50 ">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Date Of Dispatch
                                        </th>
                                        <td class="px-6">
                                            {data && data.dispatchDate ? data && data.dispatchDate : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b ">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Date Of Manufacturing
                                        </th>
                                        <td class="px-6">
                                            {data && data.manufacturingDate ? data && data.manufacturingDate : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Hospital Name
                                        </th>
                                        <td class="px-6">
                                            {data && data.hospitalName ? data && data.hospitalName : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Serial No
                                        </th>
                                        <td class="px-6">
                                            {data && data.serialNumber ? data && data.serialNumber : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Display Number
                                        </th>
                                        <td class="px-6">
                                            {data && data.displayNumber ? data && data.displayNumber : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Address
                                        </th>
                                        <td class="px-6">
                                            {data && data.address ? data && data.address : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Sim Number
                                        </th>
                                        <td class="px-6">
                                            {data && data.simNumber ? data && data.simNumber : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Turbine Number
                                        </th>
                                        <td class="px-6">
                                            {data && data.turbineNumber ? data && data.turbineNumber : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Hardware Version
                                        </th>
                                        <td class="px-6">
                                            {data && data.hw_version ? data && data.hw_version : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Software Version
                                        </th>
                                        <td class="px-6">
                                            {data && data.sw_version ? data && data.sw_version : "- - -"}
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
                                            Purpose
                                        </th>
                                        <td class="px-6">
                                            {data && data.purpose ? data && data.purpose : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Part Issued By
                                        </th>
                                        <td class="px-6">
                                            {data && data.partsIssuedBy ? data && data.partsIssuedBy : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            QA Done By
                                        </th>
                                        <td class="px-6">
                                            {data && data.qaDoneBy ? data && data.qaDoneBy : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Data Entered By
                                        </th>
                                        <td class="px-6">
                                            {data && data.dataEnteredBy ? data && data.dataEnteredBy : "- - -"}
                                        </td>
                                    </tr>


                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Testing Done By
                                        </th>
                                        <td class="px-6">
                                            {data && data.testingDoneBy ? data && data.testingDoneBy : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Product Type
                                        </th>
                                        <td class="px-6">
                                            {data && data.productType ? data && data.productType : "- - -"}
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Address
                                        </th>
                                        <td class="px-6">
                                            {data && data.address ? data && data.address : "- - -"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" style={{ width: '100%', backgroundColor: 'red' }}>
                                <iframe src={data && data.DhrPdf} width="683" height="250" frameborder="0" loading='lazy'></iframe>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProductionDataWithEdit