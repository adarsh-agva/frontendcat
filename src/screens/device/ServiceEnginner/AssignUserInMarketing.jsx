import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import installation from "../../../assets/icons/installation.png";
import { useDispatch, useSelector } from 'react-redux';
import { getMarketingUserDetailsAction, postMilestoneAddDataUserAction } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';

function AssignUserInMarketing() {


    const getMarketingUserReduser = useSelector((state) => state.getMarketingUserReduser);
    const { data } = getMarketingUserReduser;
    const [assignData, setAssignData] = useState({
        user: '',
        demo: '',
        sale: '',
        startDate: '',
        endDate: ''
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMarketingUserDetailsAction())
    }, [])

    const [userID,setUserId]=useState()
    const handelAssign=(e)=>{ 
        e.preventDefault();
if(!assignData?.user){
    toast.error('Enter use id')
}
else if(!assignData?.demo){
    toast.error('Enter Demo')
}
else if(!assignData?.sale){
    toast.error('Enter Sale')
}
else if(!assignData?.startDate){
    toast.error('Enter Start Date')
}
else if(!assignData?.endDate){
    toast.error('Enter End Date')
}
else if(assignData?.user && assignData?.demo&&assignData?.sale && assignData?.startDate ){
dispatch(postMilestoneAddDataUserAction({
    userId:assignData?.user,
    targetDemo:assignData?.demo,
    targetSales:assignData?.sale,
    startDate:assignData?.startDate,
    endDate:assignData?.endDate,
}))
}
    }
    return (
        <div>
            <Toaster/>
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div
                    class="px-3 py-3 lg:px-5 lg:pl-3"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start">
                            <Link
                                to="/marketing_head_screen"
                                class="flex ml-2 md:mr-24"
                                style={{ textDecoration: "none" }}
                            >
                                <span
                                    style={{ color: "white" }}
                                    class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
                                >
                                    AgVa Healthcare
                                </span>
                            </Link>
                        </div>
                        <div class="flex items-center">
                            
                            <div class="flex items-center ml-3">
                                <ServiceModuleNavBar />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: '5rem' }}>
                <h1 class="flex items-center text-2xl p-2 font-extrabold" style={{ justifyContent: 'start' }}>Assign<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">target</span></h1>
            </div>
            <form class="p-3">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">User id</label>
                        <input list='borow' onChange={(e) => {
                            setAssignData({ ...assignData, user: e.target.value })
                        }} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter user id" required />
                        <datalist id='borow'>
                            {data?.data?.map((item) => {
                                return (
                                    <option value={item?._id}>{item.email}</option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Demo</label>
                        <input onChange={(e) => {
                            setAssignData({ ...assignData, demo: e.target.value })
                        }} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Set demo" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Sales</label>
                        <input onChange={(e) => {
                            setAssignData({ ...assignData, sale: e.target.value })
                        }} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Set sales" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Start Date</label>
                        <input onChange={(e) => {
                            setAssignData({ ...assignData, startDate: e.target.value })
                        }} type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"  required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">End Date</label>
                        <input onChange={(e) => {
                            setAssignData({ ...assignData, endDate: e.target.value })
                        }} type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"  required />
                    </div>
                </div>
                <div className='d-flex justify-center'>
                    <button className='d-flex rounded-lg shadow w-50' style={{padding:'14px',textAlign:'center',backgroundColor:'rgb(152, 0, 76)',color:'white',justifyContent:'center'}} onClick={handelAssign}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AssignUserInMarketing