import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import installation from "../../../assets/icons/installation.png";
import { useDispatch, useSelector } from 'react-redux';
import { getDemoDataAction, postStatusDataAction } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';

function MainDemoDetails() {

    const getDemoDataReducer = useSelector((state) => state.getDemoDataReducer);
    const { loading, data, error } = getDemoDataReducer;
    console.log('data', data, error)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getDemoDataAction())
    }, [])

    const [query, setQuery] = useState("");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };


    const handleClickSearch = () => {
        dispatch(
            getDemoDataAction(
                query,
            )
        );
    };
    return (
        <div>
            <Toaster />
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div
                    class="px-3 py-3 lg:px-5 lg:pl-3"
                    style={{ backgroundColor: "rgb(152, 0, 76)" }}
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start">
                            <Link
                                to="/service_eng"
                                class="flex ml-2 md:mr-24"
                                style={{ textDecoration: "none" }}
                            >
                                <span
                                    to="/service_eng"
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
            <div class="p-4" style={{ marginTop: "3rem" }}>
                <div class="px-2 py-3">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ padding: '4px', fontSize: '6vw' }}>Statement</span>
                        <button style={{ padding: '10px', border: '1px solid rgb(152, 0, 76)', color: 'rgb(152, 0, 76)', borderRadius: '12px', width: '8rem' }} onClick={() => navigate('/main_demo_details')}>Add Demo</button>
                    </div>
                    <div style={{ marginTop: "1rem", display: 'flex', gap: '10px' }}>
                        <input onChange={handleSearchChange} type="text" placeholder='Search hospital...' class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                        <button onClick={handleClickSearch} className='px-2' style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }}>
                            Search
                        </button>
                    </div>
                    <div>
                        <hr />
                    </div>
                    {data?.data?.length > 0 ?
                        data?.data?.map((item, index) => {
                            console.log('index', index)
                            return (
                                <div className="py-2">
                                    <div className="p-4 flex justify-between shadow-lg rounded-lg">
                                        <div>
                                            <h5 className="text-lg md:text-2xl lg:text-3xl">{item?.deviceId}</h5>
                                            <p className="text-md md:text-lg lg:text-xl">{item?.hospitalName}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-md md:text-lg lg:text-xl">Status</h5>
                                            <select
                                                onChange={(e) => {
                                                    dispatch(postStatusDataAction({ _id: item?._id, status: e.target.value }));
                                                }}
                                                className="border-0 text-md md:text-lg lg:text-xl"
                                            >
                                                {item?.status === "Ongoing" ? (
                                                    <>
                                                        <option>On Going</option>
                                                        <option value="Sold">Sold</option>
                                                        <option value="Closed">Closed</option>
                                                    </>
                                                ) : item?.status === "Closed" ? (
                                                    <>
                                                        <option>{item?.status}</option>
                                                        <option value="Sold">Sold</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option>{item?.status}</option>
                                                        <option value="Closed">Closed</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            )
                        }) :
                        <div style={{ width: '100%', height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>{error}</span>
                        </div>
                    }
                    {loading && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</span>}
                </div>
            </div>
        </div>
    )
}

export default MainDemoDetails