import React, { useEffect, useState } from 'react'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai';
import { feedbackDataAction, getTicketNumberByEmail, postFeedbackData } from '../../../store/action/StoreSystem'

function FeedbackForm() {
    const [feedbackData, setFeedbackData] = useState({
        name: '',
        email: '',
        phoneNumber:'',
        message: '',
        ticket_Name: ''
    })
    const [ratingStart, setRatingStart] = useState(null)
    const [hover, setHover] = useState(null)
    const dispatch = useDispatch()
    const allTicketDataReducer = useSelector((state) => state.allTicketDataReducer);
    const { data } = allTicketDataReducer;

    useEffect(() => {
        dispatch(getTicketNumberByEmail())
    }, [])

    const handleSubmitFeedback = (e) => {
        e.preventDefault()
        if (!feedbackData && feedbackData.name) {
            toast.error('Please Enter Name')
        }
        else if (!feedbackData && feedbackData.email) {
            toast.error('Please Enter Email')
        }
        else if (!feedbackData && feedbackData.message) {
            toast.error('Please Enter Message')
        }
        else if (!ratingStart) {
            toast.error('Please Select Rating')
        }
        else if (!feedbackData && feedbackData.phoneNumber) {
            toast.error('Please Enter Phone Number')
        }
        else if (feedbackData.name && feedbackData.email && feedbackData.message && ratingStart && feedbackData.phoneNumber) {
            const ratingData = ratingStart.toString()
            dispatch(feedbackDataAction({
                name: feedbackData.name,
                email: feedbackData.email,
                concerned_p_contact:feedbackData.phoneNumber,
                ticket_number: feedbackData.ticket_Name,
                message: feedbackData.message,
                ratings: ratingData
            }))
        }
    }
    return (
        <>
            <div>
                <Toaster />
                <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        <div class="flex items-center justify-center">
                            <div class="flex items-center justify-center">
                                <span style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">AgVa Healthcare</span>
                            </div>
                        </div>
                    </div>
                </nav>
                <form class="p-6 mt-14">
                    <div class="mb-6">
                        <h1 class="flex items-center text-5xl font-extrabold dark:text-white">Feedback<span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">by Customer</span></h1>
                    </div>
                    <div class="mb-6">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Name</label>
                        <input onChange={(e) => { setFeedbackData({ ...feedbackData, name: e.target.value }) }} value={feedbackData.name} type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Name" required />
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Follow Up Email</label>
                        <input onChange={(e) => {
                            setFeedbackData({ ...feedbackData, email: e.target.value })
                            const email = e.target.value;
                            dispatch(getTicketNumberByEmail(email))
                        }}
                            value={feedbackData.email}
                            type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Registered Email" required />
                    </div>
                    <div class="mb-6">
                        <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Number</label>
                        <input onChange={(e) => { setFeedbackData({ ...feedbackData, phoneNumber: e.target.value }) }} value={feedbackData.phoneNumber} type="phoneNumber" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Number" required />
                    </div>
                    <div class="mb-6">
                        <label for="ticket" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Number</label>
                        <select onChange={(e) => setFeedbackData({ ...feedbackData, ticket_Name: e.target.value })}
                            value={feedbackData.ticket_Name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                            <option>Select Tickets</option>
                            {data && data.map((item) => {
                                return (
                                    <option value={item.ticket_number}>
                                        {item.ticket_number}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea onChange={(e) => { setFeedbackData({ ...feedbackData, message: e.target.value }) }} value={feedbackData.message} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <div className='d-flex mb-6'>
                        {[...Array(5)].map((start, index) => {
                            const currentRating = index + 1;
                            return (
                                <label>
                                    <input
                                        onClick={() => { setRatingStart(currentRating) }}
                                        value={currentRating}
                                        type='radio' name='rating'
                                        style={{ display: 'none' }}
                                    />
                                    <AiFillStar
                                        size={50}
                                        style={{ cursor: 'pointer' }}
                                        color={currentRating <= (hover || ratingStart) ? '#ffc107' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            )
                        })}
                    </div>
                    <button onClick={handleSubmitFeedback} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

            </div>
        </>
    )
}

export default FeedbackForm