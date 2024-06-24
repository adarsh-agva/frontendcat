import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addExpencesDataAction, getAllExpenceDataAction } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';
import ServiceModuleNavBar from './ServiceModuleNavBar';

const ExpencesDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [expencesData, setExpencesData] = useState({
    amount: '',
    description: '',
    time: '',
    bill: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expencesData.amount) {
      toast.error('Enter amount');
      return;
    }
    if (!expencesData.description) {
      toast.error('Enter description');
      return;
    }
    if (!expencesData.bill) {
      toast.error('Enter bill');
      return;
    }

    dispatch(
      addExpencesDataAction({
        amount: expencesData.amount,
        description: expencesData.description,
        time: expencesData.time,
      })
    );
  };

  const getExpencesDataReducer = useSelector((state) => state.getExpencesDataReducer);
  const { loading, data , error} = getExpencesDataReducer;
  const getAllData = data?.data;

  useEffect(() => {
    dispatch(getAllExpenceDataAction());
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rgb(152, 0, 76)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/service_eng" className="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}>
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap" style={{ color: 'white' }}>
                  AgVa Healthcare
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <ServiceModuleNavBar />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4" style={{ marginTop: '3rem' }}>
        <div className="px-2 py-3">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">Statement</span>
            <button
              className="bg-pink-600 text-white rounded-lg w-32 py-2"
              onClick={() => setOpenModal(true)}
            >
              Add Data
            </button>
          </div>
          {getAllData?.length>0?
          getAllData?.map((item) => (
            <div className="py-2" key={item.id}>
              <div className="p-4 flex justify-between shadow-lg rounded-lg">
                <div>
                  <h5>Description</h5>
                  <p className="text-sm">{item.description}</p>
                </div>
                <div>
                  <h5>{item.amount}</h5>
                  <p className="text-sm">{item.time}</p>
                </div>
              </div>
            </div>
          )):
          <div style={{width:'100%',height:'200px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>{error}</div>
          }
          {loading && <span>Loading...</span>}
        </div>
      </div>

      <Modal show={openModal} onHide={() => setOpenModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1">Enter Amount</label>
              <input
                type="number"
                value={expencesData.amount}
                onChange={(e) => setExpencesData({ ...expencesData, amount: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Enter Time</label>
              <input
                type="time"
                value={expencesData.time}
                onChange={(e) => setExpencesData({ ...expencesData, time: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Bill</label>
              <select
                value={expencesData.bill}
                onChange={(e) => setExpencesData({ ...expencesData, bill: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select bill</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Enter Description</label>
              <textarea
                value={expencesData.description}
                onChange={(e) => setExpencesData({ ...expencesData, description: e.target.value })}
                className="block w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-between py-4">
              <button type="submit" className="text-white rounded-lg w-40 py-2 px-3 bg-black">
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="bg-white text-pink-600 border border-pink-600 rounded-lg w-40 py-2 px-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExpencesDetails;
