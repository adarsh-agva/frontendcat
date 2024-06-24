
import React, { useEffect, useState } from 'react'
import Style from "../../css/Production.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../assets/images/back.png";
import { useDispatch } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import { postPatientDiagnose } from '../../store/action/DeviceAction';
import ServiceModuleNavBar from './ServiceEnginner/ServiceModuleNavBar';
function NurseAddDiagnoseData() {
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
        uhid: uhid,
      }))
      toast.success('Diagnose Add Success')
    }
  }
  return (
    <div>
      <Toaster />
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 :bg-gray-800 :border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
          <div class="flex items-center justify-between">
            <div class="contents items-center justify-start">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" style={{ color: 'white' }}>
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
                <span style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap :text-white">AgVa Healthcare</span>
              <div class="flex items-center">
                <div class="flex items-center ml-3">
                </div>
                <div class="flex items-center ml-3">
                  <ServiceModuleNavBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={Style.mainContainer}>
        <div className={Style.dispatchContainer}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                <Link onClick={goBack}>
                  <img src={back} style={{ width: "3rem" }} />
                </Link>
                <h1 class="flex items-center text-5xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">Diagnose</span></h1>
              </div>
            </div>
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

export default NurseAddDiagnoseData