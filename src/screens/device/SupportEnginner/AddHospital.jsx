import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/Production.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { Country, State, City } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux'
import { allStateData } from '../../../store/action/AdminAction'
import { feedbackDataAction, getNewHospitalData } from '../../../store/action/StoreSystem'
import { Toaster, toast } from 'react-hot-toast'
import { getPincodeData } from "../../../store/action/DispatchDetailsAction"
import GeoLocation from './GeoLocation'
import NavBarForAll from '../../../utils/NavBarForAll'
function AddHospital() {
    const [hospitalData, setHospitalData] = useState({
        countryName: '',
        pincode: '',
        hospitalName: '',
        address: '',
    })
    const dispatch = useDispatch()
    let getAllCountryData = Country.getAllCountries()
    // state reducer
    const allStateReducer = useSelector((state) => state.allStateReducer);
    const { data: allStatesData } = allStateReducer;
    const stateData = allStatesData && allStatesData.data


    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0]

    console.log('getPincodeAllData', getPincodeAllData)

    useEffect(() => {
        dispatch(getPincodeData())
    }, [])

    const goBack = () => {
        window.history.go(-1)
    }
    const history=useNavigate();
    const name = hospitalData.countryName
    const stateChange = (e) => {
        e.preventDefault()
        setHospitalData({
            ...hospitalData,
            pincode: e.target.value,
        })
        dispatch(allStateData(name))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!hospitalData.countryName) {
            toast.error('Please Enter Country Name')
        }
        else if (!hospitalData.pincode) {
            toast.error('Please Enter State Name')
        }
        else if (!hospitalData.hospitalName) {
            toast.error('Please Enter Hospital Name')
        }
        else if (!hospitalData.address) {
            toast.error('Please Enter Address')
        }
        else if (hospitalData.countryName && hospitalData.pincode && hospitalData.hospitalName && hospitalData.address) {
            dispatch(getNewHospitalData({
                Hospital_Name: hospitalData.hospitalName.trim(),
                Hospital_Address: hospitalData.address,
                Country: hospitalData.countryName,
                Pincode: hospitalData.pincode,
                State: getPincodeAllData.state,
                District: getPincodeAllData.district,
                City: getPincodeAllData.city,
            }))
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            toast.success('Hospital Added')
        }
    }



    return (
        <div>
            <NavBarForAll />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 className="text-2xl font-extrabold">Add<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Hospital</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div className={Style.formItem}>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Country</label>
                                    <input list="countryData" onChange={(e) => setHospitalData({ ...hospitalData, countryName: e.target.value })} value={hospitalData.countryName}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Country Name" required />
                                    <datalist id='countryData' onChange={(e) => setHospitalData({ ...hospitalData, countryName: e.target.value })} >
                                        {getAllCountryData && getAllCountryData.map((item) => {
                                            return (
                                                <option>{item.name}</option>
                                            )
                                        })}

                                    </datalist>
                                </div>
                                <div>
                                    <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">District</label>
                                    <div style={(getPincodeAllData && getPincodeAllData.district && getPincodeAllData.district.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {getPincodeAllData && getPincodeAllData.district}
                                    </div>
                                </div>
                                <div>
                                    <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">State</label>
                                    <div style={(getPincodeAllData && getPincodeAllData.state && getPincodeAllData.state.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {getPincodeAllData && getPincodeAllData.state}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                                    <textarea list="nameList" onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })} value={hospitalData.address}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Address" required />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <div>
                                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                    <input type="number" onChange={(e) => {
                                        setHospitalData({ ...hospitalData, pincode: e.target.value })
                                        const pincode = e.target.value
                                        dispatch(getPincodeData(pincode))
                                    }
                                    } value={hospitalData.pincode} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Pin Code' required />

                                </div>
                                <div>
                                    <label for="city" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">City</label>
                                    <div style={(getPincodeAllData && getPincodeAllData.city && getPincodeAllData.city.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {getPincodeAllData && getPincodeAllData.city}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name / Consignee Name</label>
                                    <input onChange={(e) => setHospitalData({ ...hospitalData, hospitalName: e.target.value })} value={hospitalData.hospitalName}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name or Consignee Name" required />
                                </div>

                            </div>
                        </div>
                    </form>
                    <div>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer} >
                            <button onClick={handleSubmit} className={Style.continuebtn} >Submit</button>
                        </div>
                    </div>
                    {/* <GeoLocation /> */}
                </div>
                
            </div>

        </div>
    )
}

export default AddHospital