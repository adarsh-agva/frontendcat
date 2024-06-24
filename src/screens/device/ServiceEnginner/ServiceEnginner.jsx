import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getAllExpenceDataAction, getAllTicketsDataAction, getMileStoneCountAction, getSalesDataAction, getServiceEngData, getServiceEngStatus, putStatusDataAction } from '../../../store/action/ServiceEngAction';
import ServiceModuleNavBar from './ServiceModuleNavBar';
import installation from '../../../assets/icons/installation.png'
import DatePicker from "react-horizontal-datepicker";
function ServiceEnginner() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // userProfileData
    const getServiceEngDataReducer = useSelector((state) => state.getServiceEngDataReducer);
    const { data: dataa } = getServiceEngDataReducer;
    const statusData = dataa && dataa.data && dataa.data.userStatus;

    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const email = adminInfo && adminInfo.data && adminInfo.data.email

    const getMileStoneCountReducer = useSelector((state) => state.getMileStoneCountReducer);
    const { data } = getMileStoneCountReducer;

    useEffect(() => {
        dispatch(getSalesDataAction())
        dispatch(getServiceEngData(email))
    }, [])

    const getSalesDataReducer = useSelector((state) => state.getSalesDataReducer);
    const { data: dataaa,loading:loadingg,error } = getSalesDataReducer;
    console.log('dataaa', dataaa)
    const newSaleData = dataaa?.data;
    useEffect(() => {
        dispatch(getMileStoneCountAction())
        dispatch(getAllExpenceDataAction())
    }, [])

    useEffect(() => {
        return (() => {
            dispatch(getAllTicketsDataAction({ searchData: query, page: '1', limit: '100' }))
        })
    }, [])

    const selectedDay = (val) => {
        console.log(val)
    };

    const handelView = (e) => {
        navigate('/demo_details')
    }

    const getExpencesDataReducer = useSelector((state) => state.getExpencesDataReducer);
    const { loading, data: expencedata } = getExpencesDataReducer;
    const getExpenceAllData = expencedata?.data;

    return (
        <>
            <div>
                <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center justify-start">
                                <Link to='/service_eng' class="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}>
                                    <span to='/service_eng' style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">AgVa Healthcare</span>
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
                <div class="p-4" style={{ marginTop: '2rem' }}>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', gap: '0.6rem' }}>
                            <p style={{ color: 'black' }}>{adminInfo?.data?.name}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: 'black', fontSize: '0.8rem', fontWeight: 'lighter' }}>{adminInfo?.data?.email}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ color: 'black' }}>Demo</p>
                                <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.targetDemo ? data?.data?.[0]?.targetDemo : '--'}/{data?.data?.[0]?.targetDemoDone ? data?.data?.[0]?.targetDemoDone : '--'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ color: 'black' }}>Sales</p>
                                <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.targetSales ? data?.data?.[0]?.targetSales : '--'}/{data?.data?.[0]?.targetSales ? data?.data?.[0]?.targetSalesDone : '--'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ color: 'black' }}>Expenses</p>
                                <span style={{ color: 'black', fontWeight: '400' }}>{data?.data2?.[0]?.totalExpenses ? data?.data2?.[0]?.totalExpenses : '--'}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Start Date</p>
                            <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.startDate ? data?.data?.[0]?.startDate : '--'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>End Date</p>
                            <span style={{ color: 'black', fontWeight: '400' }}>{data?.data?.[0]?.endDate ? data?.data?.[0]?.endDate : '--'}</span>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="px-4 py-2">
                    <DatePicker getSelectedDay={selectedDay}
                        endDate={100}
                        selectDate={new Date("2020-04-30")}
                        labelFormat={"MMMM"}
                        color={"rgb(152, 0, 76)"}
                    />
                </div>
                <div class="px-4 py-3">
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '4vw', fontWeight: '400' }}>Demo & Sales</h2>
                            <Link to='/sales_details'>
                                <h6 style={{ fontSize: '3vw' }}>View More</h6>
                            </Link>
                        </div>
                        {newSaleData?.length>0?
                        newSaleData?.map((item, index) => {
                            if (index === 0) {
                                return (<div className='py-2' key={index}>
                                    <div className='p-4 rounded-lg shadow' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h5>{item?.deviceId}</h5>
                                            <p>{item?.description}</p>
                                        </div>
                                        <div>
                                            <h5>Status</h5>
                                            <p style={{ color: '#ffbf00' }}>Pending</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                            else {
                                return null;
                            }
                        }):
                        <div style={{width:'100%',height:'200px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>{error}</div>
                    }
                    {loadingg && <span style={{textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>loading...</span>}
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '4vw', fontWeight: '400' }}>Today's Expenses</h2>
                            <Link to='/expences_details'>
                                <h6 style={{ fontSize: '3vw' }}>View More</h6>
                            </Link>
                        </div>
                        {getExpenceAllData?.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <div className='py-2'>
                                        <div className='p-4 rounded-lg shadow d-flex justify-between'>
                                            <div>
                                                <h5>Description</h5>
                                                <p>{item?.description ? item?.description : '--'}</p>
                                            </div>
                                            <div>
                                                <h5>{item?.amount ? item?.amount : '--'}</h5>
                                                <p>{item?.time ? item?.time : '--'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                            else {
                                return null;
                            }
                        })}
                    </div>
                </div>
                <div class="px-4 py-3" >
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <button style={{ padding: '10px', backgroundColor: '#ffbf00', color: 'white', borderRadius: '10px' }} onClick={handelView}>View Demo</button>
                        <button style={{ padding: '10px', backgroundColor: 'green', color: 'white', borderRadius: '10px' }} onClick={() => navigate('/sales_details')}>View Sales</button>
                        <button style={{ padding: '10px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', borderRadius: '10px' }} onClick={() => navigate('/expences_details')}>View Expenses</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceEnginner