import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketDetailsInSupport } from '../../../store/action/ServiceEngAction'
function TicketDetails() {
    const dispatch = useDispatch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get("ticket");
    console.log('ticket', ticket)

    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { loading, data: ticketData } = getTicketDetailsByNumberReducer;
    const allTicketDataGet = ticketData && ticketData.data
    const feedbackData = ticketData && ticketData.feedback
    console.log('ticketData', ticketData)
    useEffect(() => {
        dispatch(getTicketDetailsInSupport(ticket))
    }, [])
    return (
        <>
            <div>
                <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 :bg-gray-800 :border-gray-700">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center justify-start">
                                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" style={{ color: 'white' }}>
                                    <span class="sr-only">Open sidebar</span>
                                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                                <Link to='/Support_eng_data_module' class="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}>
                                    <span style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap :text-white">AgVa Healthcare</span>
                                </Link>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center ml-3">
                                    {/* <ServiceModuleNavBar /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="p-3" style={{ marginTop: '2rem' }}>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: 'black' }}>Priority</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <h6>
                                    {allTicketDataGet && allTicketDataGet.priority === 'Critical' ?
                                        <div style={{ backgroundColor: 'red', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></div>
                                        : allTicketDataGet && allTicketDataGet.priority === "Medium" ?
                                            <div style={{ backgroundColor: "#f1c300", height: "1rem", borderRadius: "10px", width: "1rem", marginTop: "0.3rem" }}></div>
                                            :
                                            ""}
                                </h6>
                                <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.priority}</span>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: 'black' }}>Serial Number</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.serialNumber ? allTicketDataGet.serialNumber : '- - -'}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: 'black' }}>Ticket Number</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.ticket_number}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: 'black' }}>Status</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {allTicketDataGet && allTicketDataGet.status === 'Pending' ?
                                    <span style={{ color: 'black', padding: '10px', backgroundColor: '#f1c300', color: 'white' }}>{allTicketDataGet && allTicketDataGet.status}</span>
                                    :
                                    allTicketDataGet && allTicketDataGet.status === 'Completed' ?
                                        <span style={{ color: 'black', padding: '10px', backgroundColor: 'green', color: 'white' }}>{allTicketDataGet && allTicketDataGet.status}</span>
                                        :
                                        <span style={{ color: 'black', padding: '10px', backgroundColor: 'red', color: 'white' }}>{allTicketDataGet && allTicketDataGet.status}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3">

                    <h4 class="text-xl  font-bold :text-white">Ticket Details</h4>

                </div>
                <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                        <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Address : {allTicketDataGet && allTicketDataGet.address}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Concern Person Name : {allTicketDataGet && allTicketDataGet.concerned_p_name}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Concern Person Email : {allTicketDataGet && allTicketDataGet.concerned_p_email}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Concern Person Number : {allTicketDataGet && allTicketDataGet.concerned_p_contact}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Department Name : {allTicketDataGet && allTicketDataGet.dept_name}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Pin Code : {allTicketDataGet && allTicketDataGet.pincode}
                            </p>
                        </div>
                        <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Hospital Name : {allTicketDataGet && allTicketDataGet.hospital_name}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Service Engineer Email : {allTicketDataGet && allTicketDataGet.service_engineer}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Tag : {allTicketDataGet && allTicketDataGet.tag}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Ticket Owner : {allTicketDataGet && allTicketDataGet.ticket_owner}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Waranty Status : {allTicketDataGet && allTicketDataGet.waranty_status}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                TAT : {allTicketDataGet && allTicketDataGet.createdAt.split('T')[0]}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="p-3">
                    <h4 class="text-xl  font-bold :text-white">Feedback Details</h4>
                </div>
                <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                        {feedbackData ?
                            <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                                <p class="font-normal text-gray-700 :text-gray-400">
                                    Name : {feedbackData && feedbackData.name}
                                </p>
                                <p class="font-normal text-gray-700 :text-gray-400">
                                    Email : {feedbackData && feedbackData.email}
                                </p>
                                <p class="font-normal text-gray-700 :text-gray-400">
                                    Message : {feedbackData && feedbackData.message}
                                </p>
                                <p class="font-normal text-gray-700 :text-gray-400">
                                    Ticket Number : {feedbackData && feedbackData.ticket_number}
                                </p>
                                <p class="font-normal text-gray-700 :text-gray-400">
                                    Rating : {feedbackData && feedbackData.ratings}
                                </p>
                            </div>
                            :
                            <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                                <p class="font-normal text-gray-700 :text-gray-400">
                                    No Feedback Details
                                </p>
                            </div>}
                    </div>
                </div>
                <div class="p-3">
                    <h2 class="mb-2 text-lg font-semibold text-gray-900 :text-white">Issue Details:</h2>
                    <ul class="max-w-md space-y-1 text-gray-500 list-inside :text-gray-400">
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-2 text-red-500 :text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                            </svg>
                            <br />
                            {allTicketDataGet && allTicketDataGet.issues}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TicketDetails