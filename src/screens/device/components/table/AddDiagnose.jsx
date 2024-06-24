import React, { useEffect, useState } from 'react'
import Style from "../../../../css/Production.module.css"
import { Link } from 'react-router-dom'
import back from "../../../../assets/images/back.png";
import { useDispatch } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import { Navbar } from '../../../../utils/NavBar';
import SideBar from '../../../../utils/Sidebar';
import { postPatientDiagnose } from '../../../../store/action/DeviceAction';
function AddDiagnose() {
    const [disgnoseData, setDisgnoseData] = useState({
        medicine: '',
        procedure: '',
        others: '',
    })
    const dispatch = useDispatch()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uhid = urlParams.get("uhId");
    const goBack = () => {
        window.history.go(-1)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!disgnoseData.medicine) {
            toast.error('Please Enter Medicine')
        }
        else if (!disgnoseData.procedure) {
            toast.error('Please Enter Procedure')
        }
        else if (!disgnoseData.others) {
            toast.error('Please Enter Other Details')
        }
        else if (disgnoseData.medicine && disgnoseData.procedure && disgnoseData.others) {
            dispatch(postPatientDiagnose({
                others: disgnoseData.others,
                medicine: disgnoseData.medicine,
                procedure: disgnoseData.procedure,
                uhid:uhid,
            }))
            toast.success('Diagnose Add Success')
        }
    }
    return (
        <div>
            <Navbar />
            <SideBar />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 className="text-2xl font-extrabold">Add<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Diagnose</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div className={Style.formItem}>
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">UHID</label>
                                    <input
                                        defaultValue={uhid} disabled
                                        type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Procedure</label>
                                    <input list="countryData" onChange={(e) => setDisgnoseData({ ...disgnoseData, procedure: e.target.value })} value={disgnoseData.procedure}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Procedure" required />
                                </div>

                            </div>
                            <div className={Style.formItem}>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Medicine</label>
                                    <input list="countryData" onChange={(e) => setDisgnoseData({ ...disgnoseData, medicine: e.target.value })} value={disgnoseData.medicine}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Medicine" required />
                                </div>
                                <div>
                                    <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Others</label>
                                    <textarea list="countryData" onChange={(e) => setDisgnoseData({ ...disgnoseData, others: e.target.value })} value={disgnoseData.others}
                                        id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Other Details" required />
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
                </div>

            </div>

        </div>
    )
}

export default AddDiagnose