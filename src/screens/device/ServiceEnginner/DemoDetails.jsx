import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import ServiceModuleNavBar from "./ServiceModuleNavBar";
import { postDemoAddDataAction } from "../../../store/action/ServiceEngAction";
import { deviceAction } from "../../../store/action/DeviceAction";
import { getAllHospitalData } from "../../../store/action/StoreSystem";

const DemoDetails = () => {
  const [demoData, setDemoData] = useState({
    deviceId: "",
    contactNo: "",
    hospitalName: "",
    demoDuration: "",
    priority: "",
    description: "",
    serialNumber:''
  });

  const dispatch = useDispatch();
  const priorityPlaceholder = "Select priority";

  const deviceReducer = useSelector((state) => state.deviceReducer);
  const { data: deviceData } = deviceReducer;
  const deviceIdData = useMemo(() => deviceData?.data?.data || [], [deviceData]);
  const allHospitalDataReducer = useSelector((state) => state.allHospitalDataReducer);
  const { data: hospitalData } = allHospitalDataReducer;
  const hospitalList = useMemo(() => hospitalData?.data || [], [hospitalData]);

  useEffect(() => {
   const page=1;
   const limit=99000;
   const searchData=''
    dispatch(deviceAction( page, limit, searchData ));
    dispatch(getAllHospitalData());
  }, [dispatch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { deviceId,serialNumber, contactNo, hospitalName, demoDuration, priority, description } = demoData;

    // if (!deviceId) return toast.error("Enter Device ID");
    if (!contactNo) return toast.error("Enter contact number");
    if (!hospitalName) return toast.error("Enter hospital name");
    if (!demoDuration) return toast.error("Enter demo duration");
    if (!priority || priority === priorityPlaceholder) return toast.error("Select priority");
    if (!description) return toast.error("Enter description");

    dispatch(postDemoAddDataAction({ deviceId,serialNumber, contactNo, hospitalName, demoDuration, priority, description }));
  }, [demoData, dispatch]);

  return (
    <div>
      <Toaster />
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: "rgb(152, 0, 76)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/service_eng" className="flex ml-2 md:mr-24" style={{ textDecoration: "none" }}>
                <span className="self-center text-xl sm:text-2xl font-semibold text-white whitespace-nowrap">
                  AgVa Healthcare
                </span>
              </Link>
            </div>
            <div className="flex items-center ml-3">
              <ServiceModuleNavBar />
            </div>
          </div>
        </div>
      </nav>
      <div className="p-4 mt-12">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-black text-lg md:text-xl">Demo No.</p>
            <div className="flex items-center gap-4">
              <span className="text-black text-sm md:text-base font-light">AgVaPro-1231</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="px-4 text-black" />
      <form className="px-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="deviceId" className="text-sm md:text-base">Device Id</label>
          <input
            list="deviceIds"
            id="deviceId"
            value={demoData.deviceId}
            onChange={(e) => setDemoData({ ...demoData, deviceId: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Device Id"
            required
          />
          <datalist id="deviceIds">
            {deviceIdData.map((item) => (
              <option key={item.deviceId} value={item.deviceId}>{item.deviceId}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="serialNumber" className="text-sm md:text-base">Serial No</label>
          <input
            list="serialNo"
            id="serialno"
            value={demoData.serialNumber}
            onChange={(e) => setDemoData({ ...demoData, serialNumber: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Serial No"
            required
          />
          <datalist id="serialNo">
            {deviceIdData.map((item) => (
              <option key={item.serialNumber} value={item.serialNumber}>{item.serialNumber}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contactNo" className="text-sm md:text-base">Contact Number</label>
          <input
            id="contactNo"
            value={demoData.contactNo}
            onChange={(e) => setDemoData({ ...demoData, contactNo: e.target.value })}
            type="number"
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact no."
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="hospitalName" className="text-sm md:text-base">Hospital Name</label>
          <input
            list="hospitalNames"
            id="hospitalName"
            value={demoData.hospitalName}
            onChange={(e) => setDemoData({ ...demoData, hospitalName: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Hospital Name"
            required
          />
          <datalist id="hospitalNames">
            {hospitalList.map((item, index) => (
              <option key={index} value={item.Hospital_Name}>{item.Hospital_Name}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="demoDuration" className="text-sm md:text-base">Demo Duration (days)</label>
          <input
            id="demoDuration"
            value={demoData.demoDuration}
            onChange={(e) => setDemoData({ ...demoData, demoDuration: e.target.value })}
            type="number"
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter duration in days"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-sm md:text-base">Priority</label>
          <select
            id="priority"
            value={demoData.priority}
            onChange={(e) => setDemoData({ ...demoData, priority: e.target.value })}
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option>{priorityPlaceholder}</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm md:text-base">Client Requirements</label>
          <input
            id="description"
            value={demoData.description}
            onChange={(e) => setDemoData({ ...demoData, description: e.target.value })}
            type="text"
            className="block w-full p-3 pl-10 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter requirements"
            required
          />
        </div>
        <div className="py-4 flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-lg w-full md:w-1/2" style={{backgroundColor:'rgb(152, 0, 76)'}}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DemoDetails;
