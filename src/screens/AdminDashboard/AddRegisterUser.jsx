import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllHospitalData } from "../../store/action/StoreSystem";
import {
  adminRegister,
  adminRegisterForOtherRoles,
  allStateData,
} from "../../store/action/AdminAction";
import { Country, State, City } from "country-state-city";
import back from "../../assets/images/back.png";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { toast, Toaster } from "react-hot-toast";
function AddRegisterUser() {
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    countryName: "",
    stateName: "",
    employeeId: "",
    email: "",
    userType: "",
    passwordHash: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setshowConfirmPwd] = useState(false);

  let getAllCountryData = Country.getAllCountries();

  const allStateReducer = useSelector((state) => state.allStateReducer);
  const { data: allStatesData } = allStateReducer;
  const stateData = allStatesData && allStatesData.data;
  const name = newUserData.countryName;
  const stateChange = (e) => {
    e.preventDefault();
    setNewUserData({
      ...newUserData,
      stateName: e.target.value,
    });
    dispatch(allStateData(name));
  };
  const countryChange = (e) => {
    // setStatesData(e.target.value)
    setNewUserData({
      ...newUserData,
      countryName: e.target.value,
    });
  };

  const serviceTypeValid = "select-user-type";
  const handleSubmitUser = (e) => {
    if (!newUserData.firstName) {
      toast.error("Enter first name");
    } else if (!newUserData.lastName) {
      toast.error("Enter last name");
    } else if (!newUserData.stateName) {
      toast.error("Enter state name");
    } else if (!newUserData.countryName) {
      toast.error("Enter country name");
    } else if (!newUserData.employeeId) {
      toast.error("Enter employee id");
    } else if (!newUserData.email) {
      toast.error("Enter email");
    } else if (!newUserData.userType) {
      toast.error("Enter user type");
    } else if (newUserData.userType === serviceTypeValid) {
      toast.error("Enter user type");
    } else if (!newUserData.passwordHash) {
      toast.error("Enter password");
    } else if (newUserData.passwordHash != newUserData.confirmPassword) {
      toast.error("Password and confirm password didnt match ");
    } else if (
      newUserData.firstName &&
      newUserData.lastName &&
      newUserData.stateName &&
      newUserData.countryName &&
      newUserData.employeeId &&
      newUserData.email &&
      newUserData.passwordHash &&
      newUserData.userType
    ) {
      dispatch(
        adminRegisterForOtherRoles(
          newUserData.firstName,
          newUserData.lastName,
          newUserData.stateName,
          newUserData.countryName,
          newUserData.employeeId,
          newUserData.email,
          newUserData.userType,
          newUserData.passwordHash
        )
      );
    }
  };

  useEffect(() => {
    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        handleSubmitUser();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <div>
      <div>
        <Toaster />
        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                First name
              </label>
              <input
                onChange={(e) =>
                  setNewUserData({ ...newUserData, firstName: e.target.value })
                }
                value={newUserData.firstName}
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Last name
              </label>
              <input
                onChange={(e) =>
                  setNewUserData({ ...newUserData, lastName: e.target.value })
                }
                value={newUserData.lastName}
                type="text"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div>
              <label
                for="country"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Country
              </label>
              <input
                list="countryName"
                onChange={(e) => countryChange(e)}
                type="text"
                id="company"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Country Name"
                required
              />
              {/* <input list="countryName" onChange={(e) => countryChange(e)} placeholder='Enter Name' /> */}
              <datalist id="countryName" onChange={(e) => countryChange(e)}>
                {getAllCountryData &&
                  getAllCountryData.map((item) => {
                    return <option>{item.name}</option>;
                  })}
              </datalist>
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                State
              </label>
              <input
                list="stateName"
                onChange={(e) => stateChange(e)}
                type="text"
                id="state"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter State Name"
                required
              />
              <datalist
                id="stateName"
                style={{ padding: "4px", border: "0px", width: "100%" }}
                onClick={(e) => stateChange(e)}
              >
                {stateData &&
                  stateData.map((item) => {
                    return (
                      <option
                        style={{ padding: "4px", border: "0px", width: "100%" }}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </datalist>
            </div>
            <div>
              <label
                for="website"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Employee Id
              </label>
              <input
                list="data"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, employeeId: e.target.value })
                }
                value={newUserData.employeeId}
                type="text"
                id="employeeId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Employee Id"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email address
              </label>
              <input
                onChange={(e) =>
                  setNewUserData({ ...newUserData, email: e.target.value })
                }
                value={newUserData.email}
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="userType"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              User Type
            </label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={(e) =>
                setNewUserData({ ...newUserData, userType: e.target.value })
              }
            >
              <option value="select-user-type">Select user type</option>
              <option value="Dispatch">Dispatch</option>
              <option value="Accounts">Accounts</option>
              <option value="Production">Production</option>
              <option value="Support">Support</option>
              <option value="Service-Engineer">Service Engineer</option>
            </select>
          </div>

          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            {/* <input onChange={(e) => setNewUserData({ ...newUserData, passwordHash: e.target.value })} value={newUserData.passwordHash} type='password' id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required /> */}
            <div class="relative w-full">
              <input
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    passwordHash: e.target.value,
                  })
                }
                value={newUserData.passwordHash}
                type={showPassword ? "text" : "password"}
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="•••••••••"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <img
                  style={{ width: "1.2rem", opacity: "59%" }}
                  src={showPassword ? HidePassword : ShowPassword}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </button>
            </div>
          </div>
          <div class="mb-6">
            <label
              for="confirm_password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm password
            </label>
            {/* <input onChange={(e) => setNewUserData({ ...newUserData, passwordHash: e.target.value })} value={newUserData.passwordHash} type='password' id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required /> */}
            <div class="relative w-full">
              <input
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    confirmPassword: e.target.value,
                  })
                }
                value={newUserData.confirmPassword}
                type={showConfirmPwd ? "text" : "password"}
                id="confirm_password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="•••••••••"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <img
                  style={{ width: "1.2rem", opacity: "59%" }}
                  src={showConfirmPwd ? HidePassword : ShowPassword}
                  onClick={() => {
                    setshowConfirmPwd(!showConfirmPwd);
                  }}
                />
              </button>
            </div>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the
              <Link
                class="text-blue-600 hover:underline dark:text-blue-500"
                data-modal-target="defaultModal"
                data-modal-toggle="popup-modal"
              >
                terms and conditions
              </Link>
              .
            </label>
            {/* <!-- Main modal --> */}
            <div
              id="popup-modal"
              aria-hidden="true"
              tabindex="-1"
              class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 ">
                      Terms of Service
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-6 space-y-6">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      With less than a month to go before the European Union
                      enacts new consumer privacy laws for its citizens,
                      companies around the world are updating their terms of
                      service agreements to comply.
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      The European Union’s General Data Protection Regulation
                      (G.D.P.R.) goes into effect on May 25 and is meant to
                      ensure a common set of data rights in the European Union.
                      It requires organizations to notify users as soon as
                      possible of high-risk data breaches that could personally
                      affect them.
                    </p>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      data-modal-hide="defaultModal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      I accept
                    </button>
                    <button
                      data-modal-hide="defaultModal"
                      type="button"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            style={{ backgroundColor: "rgb(152, 0, 76)" }}
            onClick={handleSubmitUser}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRegisterUser;
