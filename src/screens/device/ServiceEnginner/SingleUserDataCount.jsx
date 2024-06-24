import React, { useEffect } from 'react'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import { Link } from 'react-router-dom'
import { getAllUserCountDataAction } from '../../../store/action/ServiceEngAction'
import { useDispatch, useSelector } from 'react-redux'

function SingleUserDataCount() {
    const dispatch = useDispatch();

    const getAllUserCountReducer = useSelector((state) => state.getAllUserCountReducer);
    const { data } = getAllUserCountReducer;
    console.log('data11', data)
    useEffect(() => {
        dispatch(getAllUserCountDataAction())
    }, [])
    return (
        <div>
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
            <div className='p-3' style={{ marginTop: '5rem' }}>
                <h5 style={{ fontSize: '5vw' }}>User Data</h5>
                <div style={{ marginTop: "1rem", display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder='Search user...' class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                    <button className='px-2' style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }}>
                        Search
                    </button>
                </div>
                <div className='mt-3'>
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Demo Done
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Sold Done
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Expense Recived
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Expense Pending
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Expense Decline
                                </th>
                            </tr>
                        </thead>
                        {data?.map((item) => {
                            return (
                                <tbody>
                                    <tr class="bg-white border-b :bg-gray-800">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.firstName?item?.firstName:'--'}
                                        </th>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <br />
                                            {item?.targetDemoDone?item?.targetDemoDone:'--'}
                                        </td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.targetSoldDone?item?.targetSoldDone:'--'}
                                        </td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.expenseAmount?.Received}
                                        </td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.expenseAmount?.Pending}
                                        </td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item?.expenseAmount?.Declined}
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SingleUserDataCount