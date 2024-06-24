
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ADMIN_LOGOUT } from "./types/AdminConstants";
import { liveDataReducer } from "./reducer/LiveDataReducer"
import {
  adminLoginReducer,
  adminRegisterReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  getOtpOnNumberReducer,
  getUserDataReducer,
  getHospitalListByAssistantReducer,
  getDeviceCountReducer,
  VerifySMSOtpNumberReducer,
  getDemoDataCountReducer,
  getActiveDevicesReducer,
  getActiveDemoReducer,
} from "./reducer/AdminReducer";
import { allhospitalNameReducer, allCountryStateReducer,getallHospitalNameReducer, allStateReducer } from "./reducer/HospitalNameReducer";
import {
  getAllProjectReducer, getAllLogByCodeReducer, createNewProjectReducer, getLogCountsReducer, getLogCountsByDateReducer, getErrorWRTOSReducer, getErrorWRTVersionReducer, getDeviceInfoReducer,
  getLogMsgOccurenceWRTDateReducer, getCrashFreeUsersReducer, getCrashAnalyticsDataReducer, getCrashFreeUsersDataReducer, getModelCodeReducer, addCrashEmailReducer, getProjectByCodeSettingReducer,
} from "./reducer/ProjectReducer";
import { passwordChangeReducer, userInfoReducer, getHistoryDataReducer , getUserProfileReducer,getSingleExperienceOfUserReducer} from "./reducer/UserProfileReducer";
import { deviceReducer, deviceAssignDataByUserId, getAllAboutByDeviceIdReducer, getAllEventsByDeviceIdReducer,getAllEventsByNewDeviceIdReducer, getRegisteredDetailsReducer,getAllAlarmsByNewDeviceIdReducer, getAllAlarmsByDeviceIdReducer, getAllTrendsByDeviceIdReducer,getAllTrendsByNewDevicesIdReducer, getCalibrationByDeviceIdReducer,getAllLogsByNewDeviceIdReducer, getAllLogsByDeviceIdReducer, getLogMsgOccurenceReducer, getDeviceCrashAnalyticsDataReducer, getDeviceLogMsgOccurenceWRTDateReducer, getAllServiceRecordsDetails, getAllSectionByDeviceId , getSingleUploadFileReducer, getDeviceIdBySerialNumberReducer,getPatientDetailsReducer,getPatientDetailsByUhidReducer,getPatientNewDetailsOfDevicesByUhidReducer,getPatientDischargeReducer,getSingleProductionDataReducer , getPatientDiagnose,getUhidsListReducer,newDeviceReducer} from "./reducer/deviceReducer";
import { alarmReducer } from "./reducer/AlarmReducer";
import {storeSystemReducer,allTicketDataReducer,allHospitalDataReducer,getHospitalFromAdding, getHospitalListByPincodeReducer} from "./reducer/StoreSystemReducer"
import { dispatchAllDetailsReducer, dispatchAllDetailsByIdReducer, productionAllDetailsReducer , productionAllDetailsByUserIdReducer ,getdhrqualityFileReducer,getPiincodeDatReducer,getDeviceIdProductionReducer,getHospitalDetailsReducer,getSingleSerialNoTrackReducer,getAccountDataReducer,getDispatchPendingDataReducer,getShipmentAwatingReducer,getAccountDataBySerialNumberReducer,getCompleteDispatchedReducer,getReturnDataToAccountReducer,getEditListDataReducer,getEditProductionDataReducer,getReadyForDispatchDataReducer,getSerialNumberListReducer} from "./reducer/DispatchDevices"
import { updateUserInfoReducer } from "./reducer/UpdateUserInfoReducer"
import { getAllDeviceLogsReducer } from "./reducer/ProjectReducer";
import { eventReducer } from "./reducer/EventReducer";
import { getAllTicketsDataReducer , getAllTicketsByIdReducer,getTicketDetailsByNumberReducer,getServiceEngDataReducer,getAllServicesDataReducer,getSalesDataReducer,getAllUserCountReducer,getTotalCountReducer,getMarketingUserReduser,getMileStoneCountReducer,getDemoDataReducer,getExpencesDataReducer,getSingleServicesDataReducer} from "./reducer/ServiceEngReducer"
import { allUsersDetailsReducer, updateAllUsersDetailReducer, dashboardDataDefault, deviceActionReducer, deviceDeleteReducer , activeUsersReducer,pendingUsersReducer,pendingRequestReducer,getHospitalAdminUserRequestReducer,getUserDataByDeviceIdReducer,getUserAccessDataReducer,getAccessReviewDataReducer,getActiveAdminReducer,getEmployeeListReducer,getInacticeUserReducer,getAllAccessDeviceToiUser,getDoctorAccessListReducer,getAssistantRequestReducer,getDemoSoldDataReducer} from "./reducer/AdminDashboardReducer"
import { verifyOtpReducer,verifyEmailReducer , deviceIdByHospitalNameReducer} from "./reducer/VerifyEmailsReducer"
const appReducer = combineReducers({
  adminLoginReducer,
  adminRegisterReducer,
  allhospitalNameReducer,
  allCountryStateReducer,
  allStateReducer,
  getallHospitalNameReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  getOtpOnNumberReducer,
  VerifySMSOtpNumberReducer,
  getUserDataReducer,
  getHospitalListByAssistantReducer,
  getDeviceCountReducer,
  getDemoDataCountReducer,
  getActiveDevicesReducer,
  getActiveDemoReducer,
  liveDataReducer,
  getAllProjectReducer,
  getSingleExperienceOfUserReducer,
  getUserProfileReducer,
  getAllLogByCodeReducer,
  createNewProjectReducer,
  getLogCountsReducer,
  getLogCountsByDateReducer,
  getModelCodeReducer,
  getDeviceIdBySerialNumberReducer,
  getPatientDetailsReducer,
  getSingleProductionDataReducer,
  getPatientDischargeReducer,
  getPatientDetailsByUhidReducer,
  getPatientNewDetailsOfDevicesByUhidReducer,
  getPatientDiagnose,
  getUhidsListReducer,
  getErrorWRTOSReducer,
  getErrorWRTVersionReducer,
  getDeviceInfoReducer,
  getEditProductionDataReducer,
  getLogMsgOccurenceWRTDateReducer,
  getEditListDataReducer,
  getReturnDataToAccountReducer,
  getCrashFreeUsersReducer,
  getCrashAnalyticsDataReducer,
  getCrashFreeUsersDataReducer,
  verifyOtpReducer,
  verifyEmailReducer,
  deviceIdByHospitalNameReducer,
  passwordChangeReducer,
  updateAllUsersDetailReducer,
  dashboardDataDefault,
  deviceActionReducer,
  activeUsersReducer,
  pendingRequestReducer,
  pendingUsersReducer,
  getHospitalAdminUserRequestReducer,
  getUserDataByDeviceIdReducer,
  getUserAccessDataReducer,
  getAccessReviewDataReducer,
  getActiveAdminReducer,
  getDemoSoldDataReducer,
  getAssistantRequestReducer,
  getInacticeUserReducer,
  getDoctorAccessListReducer,
  getAllAccessDeviceToiUser,
  getEmployeeListReducer,
  deviceDeleteReducer,
  getAllAboutByDeviceIdReducer,
  addCrashEmailReducer,
  getProjectByCodeSettingReducer,
  alarmReducer,
  deviceReducer,
  newDeviceReducer,
  storeSystemReducer,
  allHospitalDataReducer,
  allTicketDataReducer,
  getHospitalFromAdding,
  getHospitalListByPincodeReducer,
  deviceAssignDataByUserId,
  userInfoReducer,
  getHistoryDataReducer,
  updateUserInfoReducer,
  allUsersDetailsReducer,
  eventReducer,
  getAllDeviceLogsReducer,
  getAllEventsByDeviceIdReducer,
  getAllEventsByNewDeviceIdReducer,
  getAllAlarmsByDeviceIdReducer,
  getAllTrendsByDeviceIdReducer,
  getAllTrendsByNewDevicesIdReducer,
  getAllAlarmsByNewDeviceIdReducer,
  getCalibrationByDeviceIdReducer,
  getAllLogsByDeviceIdReducer,
  getRegisteredDetailsReducer,
  getAllLogsByNewDeviceIdReducer,
  getLogMsgOccurenceReducer,
  getDeviceCrashAnalyticsDataReducer,
  getDeviceLogMsgOccurenceWRTDateReducer,
  getAllServiceRecordsDetails,
  getAllSectionByDeviceId,
  getSingleUploadFileReducer,
  dispatchAllDetailsReducer,
  productionAllDetailsReducer,
  productionAllDetailsByUserIdReducer,
  getdhrqualityFileReducer,
  getPiincodeDatReducer,
  getDeviceIdProductionReducer,
  getSerialNumberListReducer,
  getHospitalDetailsReducer,
  getSingleSerialNoTrackReducer,
  getAccountDataReducer,
  getDispatchPendingDataReducer,
  dispatchAllDetailsByIdReducer,
  getShipmentAwatingReducer,
  getAccountDataBySerialNumberReducer,
  getAllTicketsDataReducer,
  getReadyForDispatchDataReducer,
  getCompleteDispatchedReducer,
  getAllTicketsByIdReducer,
  getTicketDetailsByNumberReducer,
  getServiceEngDataReducer,
  getAllServicesDataReducer,
  getSingleServicesDataReducer,
  getExpencesDataReducer,
  getDemoDataReducer,
  getMileStoneCountReducer,
  getMarketingUserReduser,
  getTotalCountReducer,
  getSalesDataReducer,
  getAllUserCountReducer
});
const persistConf = {
  key: "root",
  storage,
};

const rootReducer = (state, action) => {
  if (action.type === ADMIN_LOGOUT) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConf, rootReducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store;