import React,{memo} from 'react';
import { Dropdown } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { adminLogout } from '../../../store/action/AdminAction';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import { FaUserCircle } from "react-icons/fa";

function ServiceModuleNavBar() {
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const userProfileData=adminInfo && adminInfo.data
    const dispatch =useDispatch()
    let navigate = useNavigate();
    const handlelogout = (e) => {
        e.preventDefault();
        dispatch(adminLogout(navigate));
      };
      console.log('hello rohan')
    return (
        <Dropdown
            dismissOnClick={false}
            arrowIcon={false}
            inline
            label={<FaUserCircle color="white" style={{width:'2rem',height:'2rem'}}/>}
        >
            <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 ">{userProfileData.name}</span>
                <span class="block text-sm  text-gray-500 truncate ">{userProfileData.email}</span>
            </div>
            <ul class="py-2 px-2" aria-labelledby="user-menu-button">
                <li>
                <button onClick={(e)=>handlelogout(e)} style={{backgroundColor:'rgb(152, 0, 76)'}} class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Logout</button></li>
            </ul>
        </Dropdown>
    )
}

export default memo(ServiceModuleNavBar)