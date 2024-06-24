import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { deviceDeleteAction } from '../../store/action/AdminDashboard';
import NavBarForAll from '../../utils/NavBarForAll';

function Model() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get("userId");
  localStorage.setItem("userId", userId)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(deviceDeleteAction())
  }, [dispatch])

  const deviceDeleteReducer = useSelector((state) => state.deviceDeleteReducer);
  const { data } = deviceDeleteReducer;
  const deleteData = data && data.data && data.data.Assigned_Devices
  const totalDevices = data && data.data && data.data.Assigned_Devices && data.data.Assigned_Devices.length()
  const goBack = () => {
    window.history.go(-1)
  }
  return (
    <>
    <NavBarForAll/>
      <div style={{
        position: "relative",
        top: "6rem",
        marginLeft: "2%",
        width: "96%",
      }}>

        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", justifyContent: 'space-between', marginBottom: '10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4 >Device Assign</h4>
          </div>
        </div>
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow" style={{ marginBottom: '15px' }}>
          <h5 class="mb-2 text-sxl font-400 tracking-tight text-gray-900">Total Devices Assigned</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalDevices == undefined ? '0' : totalDevices}</p>
        </div>
        <div class="relative overflow-x-auto" style={{ borderRadius: '10px' }}>
          <table class="w-full text-sm text-left text-gray-500 :text-gray-400">
            <thead class="text-xs text-gray-700 uppercase :text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Device Id</th>
                <th scope="col" class="px-6 py-3">Hospital Name</th>
                <th scope="col" class="px-6 py-3">Doctor Name</th>
                <th scope="col" class="px-6 py-3">Country</th>
                <th scope="col" class="px-6 py-3">State</th>
                <th scope="col" class="px-6 py-3">City</th>
                <th scope="col" class="px-6 py-3">Action</th>

              </tr>
              {/* TABLE HERE */}

            </thead>
            {deleteData && deleteData.length > 0 ?
              deleteData &&
              deleteData.map((item, index) => {
                return (
                  <tbody>
                    <tr class="bg-white border-b :bg-gray-800 :border-gray-700">
                      <td class="px-6 py-4">
                        {item.DeviceId}
                      </td>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                        {item.Hospital_Name}
                      </td>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                        {item.Doctor_Name}
                      </td>
                    </tr>
                  </tbody>
                );
              })
              :
              <>
                <tbody>
                  <div class="bg-white border-b :bg-gray-800 :border-gray-700" style={{ display: 'inline-block' }}>

                    <p class="px-6 py-4">
                      No Device Assigned Yet
                    </p>
                  </div>
                </tbody>
              </>
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default Model