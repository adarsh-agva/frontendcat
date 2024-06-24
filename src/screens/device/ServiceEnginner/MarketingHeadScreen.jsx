import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import { MdAssignment } from "react-icons/md";
import { getTotalCalculationDataAction } from '../../../store/action/ServiceEngAction';
import { useDispatch, useSelector } from 'react-redux';
import NavBarForAll from '../../../utils/NavBarForAll';
function MarketingHeadScreen() {
    const dispatch = useDispatch();

    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;
    console.log('adminProfile', adminProfile)
    const getTotalCountReducer = useSelector((state) => state.getTotalCountReducer);
    const { data } = getTotalCountReducer;
    console.log('data', data)
    useEffect(() => {
        dispatch(getTotalCalculationDataAction())
    }, [])
    return (
        <div>
            <NavBarForAll />
            <div style={{ display: 'flex', marginTop: '4rem', alignItems: 'center',flexWrap:'wrap' }}>
                <Link to='/assign_user_marketing' class="block p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none" style={{ width: '350px', height: '150px', margin: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className='d-flex align-items-center'>
                        <MdAssignment size={25} color='black' />
                        <h5 class="text-2xl tracking-tight text-gray-900" style={{ marginLeft: '1rem' }}>Assign Target</h5>
                    </div>
                </Link>
                <Link to='/single_user_count' class="block p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none" style={{ width: '450px', height: '150px', margin: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div 
                     style={{ display: 'flex', flexDirection: 'column' }}
                     >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '150px' }}>
                            <h5 class="text-2xl tracking-tight text-gray-900">Demo Assigned</h5>
                            <h5>{data?.data?.[0]?.totalDemo ? data?.data?.[0]?.totalDemo : '--'}</h5>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '90px' }}>
                            <h5 class="text-2xl tracking-tight text-gray-900">Demo Completed</h5>
                            <h5>{data?.data?.[0]?.totalDemoDone ? data?.data?.[0]?.totalDemoDone : '--'}</h5>
                        </div>
                    </div>
                </Link>
                <Link to='/single_user_count' class="block p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none" style={{ width: '350px', height: '150px', margin: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' ,justifyContent:'space-between'}}>
                        <h5 style={{ marginBottom: '0.5rem' }} class=" text-2xl tracking-tight text-gray-900">Total Sold</h5>
                        <h5>{data?.data?.[0]?.totalSales ? data?.data?.[0]?.totalSales : '--'}</h5>
                </Link>
                <Link to='/single_user_count' class="block p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none" style={{ width: '350px', height: '150px', margin: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' ,justifyContent:'space-between'}}>
                        <h5 style={{ marginBottom: '0.5rem' }} class=" text-2xl tracking-tight text-gray-900">Total Expense</h5>
                        <h5>{data?.data?.[0]?.totalExpense ? data?.data?.[0]?.totalExpense : '--'}</h5>
                </Link>
            </div>
        </div>
    )
}

export default MarketingHeadScreen