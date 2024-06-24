import React, { useState, useEffect } from "react";
import "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CreateProject from "./screens/projects/CreateProject";
import LogTable from "./screens/logs/LogTable";
import Analytics from "./screens/analytics/Analytics";
import NotFound from "./screens/NotFound";
import Login from "./screens/auth/Login";
import ResetPassword from "./screens/auth/ResetPassword";
import ForgetPassword from "./screens/auth/ForgetPassword";
import Protected from "./utils/Protected";
import { useSelector } from "react-redux";
import UpdateProfile from "./screens/user/UpdateProfile";
import Register from "./screens/auth/Register";
import AlarmNew from "./screens/alerts/AlertsNew";
import Event from "./screens/events/Event";
import Device from "./screens/device/Device"
import ddLoader from "../src/assets/images/ddLoader.gif";
import "./css/Theme.css"
import DeviceLogs from "./screens/device/DeviceLogs";
import Alarms from "./screens/device/components/table/Alarms";
import DeviceAnalytics from "./screens/deviceAnalytics/DeviceAnalytics";
import AllDashComponent from "../src/screens/dashboard/AllDashComponent"
import DeviceOverview from "./screens/device/DeviceOverview";
import About from "./screens/device/About";
import Services from "./screens/device/Services";
import PrivacyPolicy from "./utils/PrivacyPolicy";
import TermsOfServices from "./utils/TermsOfServices";
import { Navbar } from "./utils/NavBar";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";
import Live from "./screens/device/Live";
import TermsAndCondition from "./screens/auth/TermsAndCondition";
import ChangePassword from "../src/screens/auth/ChangePassword";
import DeviceAssign from "./screens/AdminDashboard/DeviceAssign";
import Dispatch from "./screens/AdminDashboard/DispatchDetails/Dispatch";
import DispatchDataModule from "./screens/AdminDashboard/DispatchDetails/DispatchDataModule";
import DispatchModel from "./screens/AdminDashboard/DispatchDetails/DispatchModel";
import History from "./utils/History";
import Production from "./screens/device/Production/Production";
import ProductionModel from "./screens/device/Production/ProductionModel";
import ProductionDataModule from "./screens/device/Production/ProductionDataModel";
import Support from "./screens/device/SupportEnginner/Support";
import SupportEngForm from "./screens/device/SupportEnginner/SupportEngForm"
import ServiceEnginner from "./screens/device/ServiceEnginner/ServiceEnginner";
import ServiceModuleData from "./screens/device/ServiceEnginner/ServiceModuleData";
import SupportEngDataModule from "./screens/device/SupportEnginner/SupportEngDataModule.jsx";
import AddRegisterUser from "./screens/AdminDashboard/AddRegisterUser";
import InstallationRecords from "./screens/device/ServiceEnginner/InstallationRecords";
import AddHospital from "./screens/device/SupportEnginner/AddHospital";
import FeedbackForm from "./screens/device/ServiceEnginner/FeedbackForm";
import TicketDetails from "./screens/device/SupportEnginner/TicketDetails";
import PatientDetails from "./screens/device/components/table/PatientDetails";
import AddDiagnose from "./screens/device/components/table/AddDiagnose";
import NurseModule from "./screens/device/NurseModule";
import NurseModuleData from "./screens/device/NurseModuleData";
import NurseAddDiagnose from "./screens/device/NurseAddDiagnose";
import NurseAddDiagnoseData from "./screens/device/NurseAddDiagnoseData";
import AddNewPatientDetails from "./screens/device/AddNewPatientDetails";
import DispatchEditDetailsForm from "./screens/AdminDashboard/DispatchDetails/DispatchEditDetailsForm";
import SingleDispatchDataModule from "./screens/AdminDashboard/DispatchDetails/SingleDispatchDataModule";
import Notification from "./utils/Notification";
import SingleServicesData from "./utils/SingleServicesData";
import Model from "./screens/AdminDashboard/Model";
import HospitalAdminScreen from "./screens/HospitalAdminDasboard/HospitalAdminScreen";
import HospitalAdminUser from "./screens/HospitalAdminDasboard/HospitalAdminUser";
import DeviceAssignToUserModel from "./screens/device/DeviceAssignToUser/DeviceAssignToUserModel";
import AssignedUsers from "./screens/device/DeviceAssignToUser/AssignedUsers";
import AddUser from "./screens/device/DeviceAssignToUser/AddUser";
import HospitalAdminUserRequest from "./utils/HospitalAdminNotify/HospitalAdminUserRequest";
import ReportDatForProduction from "./screens/device/Production/ReportDatForProduction";
import ManageAdminUserModel from "./screens/AdminDashboard/ManageUserModule/ManageAdminUserModel";
import UserDevice from "./screens/device/UserDevice";
import UpdateProfiileWithExperience from "./screens/user/UpdateProfiileWithExperience";
import NavBarForAll from "./utils/NavBarForAll";
import AccountDashboard from "./screens/AdminDashboard/AccountModule/AccountDashboard";
import AccountAllDataModule from "./screens/AdminDashboard/AccountModule/AccountAllDataModule";
import AccountFormDataModule from "./screens/AdminDashboard/AccountModule/AccountFormDataModule";
import DispatchDashboardModule from "./screens/AdminDashboard/DispatchDetails/DispatchDashboardModule";
import ShipmentDetails from "./screens/AdminDashboard/DispatchDetails/ShipmentDetails";
import SingleProductionDataWithEdit from "./screens/device/Production/SingleProductionDataWithEdit";
import EditProductionData from "./screens/device/Production/EditProductionData";
import SingleAccountDataModel from "./screens/AdminDashboard/AccountModule/SingleAccountDataModel";
import ReturnFormModule from "./screens/AdminDashboard/DispatchDetails/ReturnFormModule";
import PreviousHistoryData from "./screens/AdminDashboard/DispatchDetails/PreviousHistoryData";
import PreviousHistoryModalData from "./screens/AdminDashboard/DispatchDetails/PreviousHistoryModalData";
import AccountEditDetails from "./screens/AdminDashboard/AccountModule/AccountEditDetails";
import AssociationRequestModule from "./utils/AssociationReqest/AssociationRequestModule";
import HospitalAdminRemoveDoctors from "./utils/HospitalAdminNotify/HospitalAdminRemoveDoctors";
import DeviceNew from "./screens/device/DeviceNew";
import DeviceLogsNew from "./screens/device/DeviceLogsNew";
import MarketingModel from "./screens/device/MarketingModel/MarketingModel";
import DemoDetails from "./screens/device/ServiceEnginner/DemoDetails";
import ExpencesDetails from "./screens/device/ServiceEnginner/ExpencesDetails";
import SalesDetails from "./screens/device/ServiceEnginner/SalesDetails";
import MainDemoDetails from "./screens/device/ServiceEnginner/MainDemoDetails";
import MarketingHeadScreen from "./screens/device/ServiceEnginner/MarketingHeadScreen";
import AssignUserInMarketing from "./screens/device/ServiceEnginner/AssignUserInMarketing";
import SingleUserDataCount from "./screens/device/ServiceEnginner/SingleUserDataCount";
import AllAccessDeviceToDoctor from "./screens/HospitalAdminDasboard/StatusOfUsres/AllAccessDeviceToDoctor";
function App() {
  const [splash, setSplash] = useState(true);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const {adminInfo } = adminLoginReducer;

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 300);
  }, [splash]);
  return (
    <>
      {splash ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "300px", height: "300px", alignContent: "center" }}
            src={ddLoader}
            loading="lazy"
            alt="loading..."
          />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            {/* <Route exact path="/register" element={<Register />} /> */}
            <Route exact path="/resetpassword" element={<ResetPassword />} />
            <Route exact path="/forgetPassword" element={<ForgetPassword />} />
            <Route exact path="/changePassword" element={<ChangePassword />} />
            <Route exact path="/tersAndCondition" element={<TermsAndCondition />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/live" element={<Live />} />

            {/* Protected Route */}
            <Route element={<Protected />}>
              <Route exact path="/home" element={<AllDashComponent />} />
              <Route exact path="/navBarForAll" element={<NavBarForAll />} />
              {/* Hospital Admin */}
              <Route exact path="/hospitalAdminScreen" element={<HospitalAdminScreen />} />
              <Route exact path="/deviceAssignToUserModel" element={<DeviceAssignToUserModel />} />
              <Route exact path="/hospitalAdminUserRequest" element={<HospitalAdminUserRequest />} />
              <Route exact path="/hospitalAdmoinRemoveDoctor" element={<HospitalAdminRemoveDoctors />} />
              <Route exact path="/allAccessDeviceToUser" element={<AllAccessDeviceToDoctor />} />


              <Route exact path="/addUser" element={<AddUser />} />
              <Route exact path="/AssignedUser" element={<AssignedUsers />} />

              <Route exact path="/hospitalAdminUser" element={<HospitalAdminUser />} />

              {/* Account Details */}
              <Route exact path="/accountDasboard" element={<AccountDashboard />} />
              <Route exact path="/accountFormModule" element={<AccountFormDataModule />} />
              <Route exact path="/accountAllDataModule" element={<AccountAllDataModule />} />
              <Route exact path="/singleAccountData" element={<SingleAccountDataModel />} />
              <Route exact path="/AccountEditDetails" element={<AccountEditDetails />} />
              {/* Production */}
              <Route exact path="/production" element={<Production />} />
              <Route exact path="/editProductionData" element={<EditProductionData />} />

              <Route exact path="/singleProductionDataWithEdit" element={<SingleProductionDataWithEdit />} />
              <Route exact path="/productionDataModel" element={<ProductionDataModule />} />
              <Route exact path="/reportDataForProduction" element={<ReportDatForProduction />} />

              {/* Support */}
              <Route exact path="/support" element={<Support />} />
              <Route exact path="/assignDeviceToUserModel" element={<Model />} />
              <Route exact path="/supportForm" element={<SupportEngForm />} />
              <Route exact path="/singleServicesData" element={<SingleServicesData />} />
              <Route exact path="/add_hospital" element={<AddHospital />} />
              <Route exact path="/Support_eng_data_module" element={<SupportEngDataModule />} />
              <Route exact path="/Ticket_details" element={<TicketDetails />} />
              {/* service-Eng */}
              <Route exact path="/service_eng" element={<ServiceEnginner />} />
              <Route exact path="/demo_details" element={<MainDemoDetails />} />
              <Route exact path="/single_user_count" element={<SingleUserDataCount/>} />
              <Route exact path="/main_demo_details" element={<DemoDetails/>} />
              <Route exact path="/expences_details" element={<ExpencesDetails />} />
              <Route exact path="/marketing_head_screen" element={<MarketingHeadScreen />} />
              <Route exact path="/assign_user_marketing" element={<AssignUserInMarketing />} />

              <Route exact path="/sales_details" element={<SalesDetails />} />
              <Route exact path="/service_feedback" element={<FeedbackForm />} />
              <Route exact path="/service_eng_module" element={<ServiceModuleData />} />
              <Route exact path="/service_eng_installation" element={<InstallationRecords />} />

              {/* marketing data */}
              <Route exact path="/marketing_model" element={<MarketingModel />} />

              {/* Nurse */}
              <Route exact path="/nurse_module" element={<NurseModule />} />
              <Route exact path="/association_request_module" element={<AssociationRequestModule />} />

              <Route exact path="/nurse_module_data" element={<NurseModuleData />} />
              <Route exact path="/nurse_add_diagnose" element={<NurseAddDiagnose />} />
              <Route exact path="/add_diagnose_data" element={<NurseAddDiagnoseData />} />
              <Route exact path="/add_new_patient_details" element={<AddNewPatientDetails />} />
              {/* Register User */}
              <Route exact path="/log_table" element={<LogTable />} />
              <Route exact path="/user_device" element={<UserDevice />} />
              <Route exact path="/add_register_user" element={<AddRegisterUser />} />
              <Route exact path="/notificationHandle" element={<Notification />} />
              <Route exact path="/analytics" element={<Analytics />} />
              <Route exact path="/update" element={<UpdateProfile />} />
              <Route exact path="/update_profile_details" element={<UpdateProfiileWithExperience />} />
              {/* <Route exact path="/update_profile_with_experience" element={<UserProfileDataWithExp />} /> */}
              <Route exact path="/alarm" element={<AlarmNew />} />
              <Route exact path="/events" element={<Event />} />
              <Route exact path="/device" element={<Device />} />
              <Route exact path="/newDevice" element={<DeviceNew />} />
              <Route exact path="/deviceOverview" element={<DeviceOverview />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/service" element={<Services />} />
              <Route exact path="/deviceEvents" element={<DeviceLogs />} />
              <Route exact path="/newDeviceEvents" element={<DeviceLogsNew />} />
              <Route exact path="/deviceAlerts" element={<Alarms />} />
              <Route exact path="/deviceAnalytics" element={<DeviceAnalytics />} />
              <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
              <Route exact path="/termsOfServices" element={<TermsOfServices />} />
              <Route exact path="/navBar" element={<Navbar />} />
              {/* <Route exact path="/live" element={<Live />} /> */}
              <Route exact path="/deviceAssign" element={<DeviceAssign />} />
              {/* <Route exact path="/deleteAssignDevice" element={<DeleteAssignDevice />} /> */}

              {/* dispatch */}
              <Route exact path="/dispatchDashboardModule" element={<DispatchDashboardModule />} />
              <Route exact path="/dispatchEditDetailsForm" element={<DispatchEditDetailsForm />} />
              <Route exact path="/singleDispatchDataModule" element={<SingleDispatchDataModule />} />
              <Route exact path="/dispatchDevice" element={<Dispatch />} />
              <Route exact path="/previousHistoryModalData" element={<PreviousHistoryModalData />} />

              <Route exact path="/previousHistoryData" element={<PreviousHistoryData />} />

              <Route exact path="/returnFormModule" element={<ReturnFormModule />} />

              <Route exact path="/shipment-details" element={<ShipmentDetails />} />

              <Route exact path="/allDispatchDeviceData" element={<DispatchDataModule />} />
              <Route exact path="/dispatchModel" element={<DispatchModel />} />

              {/*  */}
              <Route exact path="/history" element={<History />} />
              <Route exact path="/patientDetails" element={<PatientDetails />} />
              <Route exact path="/add_diagnose" element={<AddDiagnose />} />
              <Route exact path="/productionModel" element={<ProductionModel />} />
              {adminInfo?.data?.userType === "Super-Admin" || adminInfo?.data?.userType === "Marketing-Admin" ? (
                <>
                  <Route exact path="/adminDashboard" element={<AdminDashboard />} />
                  <Route exact path="/manageUsers" element={<ManageAdminUserModel />} />
                  {/* <Route exact path="/manageUsers" element={<ManageUsers />} /> */}

                </>
              ) : ""}
            </Route>
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
