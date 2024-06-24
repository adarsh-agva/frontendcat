import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesDataAction } from '../../../store/action/ServiceEngAction';
import ServiceModuleNavBar from './ServiceModuleNavBar';

const SalesDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  
  const { data , loading , error } = useSelector((state) => state.getSalesDataReducer);
  
  useEffect(() => {
    dispatch(getSalesDataAction());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleClickSearch = () => {
    dispatch(getSalesDataAction(query));
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: "rgb(152, 0, 76)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/service_eng" className="flex ml-2 md:mr-24" style={{ textDecoration: "none" }}>
                <span className="self-center text-xl font-semibold sm:text-2xl text-white">
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
      <div className="p-4 mt-12" style={{marginTop:'2rem'}}>
        <div className="py-3">
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-2xl">Statement</span>
            <button
              className="border border-pink-700 text-pink-700 rounded-lg px-4 py-2"
              onClick={() => navigate('/main_demo_details')}
            >
              Add Sales
            </button>
          </div>
          <div className="mt-4 flex gap-2">
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="Search hospital..."
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleClickSearch}
              className="px-4 py-2 bg-pink-700 text-white rounded-lg"
            >
              Search
            </button>
          </div>
          <hr className="my-4" />
          {data?.data?.length>0?
          data?.data?.map((item) => (
            <div key={item.deviceId} className="py-3">
              <div className="p-4 w-full flex flex-wrap justify-between items-center shadow-lg rounded-lg">
                <div className="w-1/3 md:w-1/4">
                  <h6 className="text-lg md:text-xl">{item.deviceId}</h6>
                  <p className="text-sm md:text-base">{item.description}</p>
                </div>
                <div className="w-1/3 md:w-1/4 text-center">
                  <h6 className="text-lg md:text-xl">Priority</h6>
                  <p className="text-sm md:text-base">{item.priority}</p>
                </div>
                <div className="w-1/3 md:w-1/4 text-center">
                  <h6 className="text-lg md:text-xl">Hospital Name</h6>
                  <p className="text-sm md:text-base">{item.hospitalName}</p>
                </div>
              </div>
            </div>
          ))
        :
        <div style={{width:'100%',height:'200px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>{error}</div>
        }
        {loading && <span style={{textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</span>}
        </div>
      </div>
    </div>
  );
};

export default SalesDetails;
