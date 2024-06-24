// /* eslint-disable */
// import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
// import {
//   faCaretDown,
//   faDatabase,
//   faDownload,
//   faSortDown,
//   faSortUp,
// } from '@fortawesome/free-solid-svg-icons';
// // import { useNavigate } from "react-router-dom";
// import { Container, Row, Col,Button} from 'react-bootstrap';
// import Style from '../../css/device.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch, useSelector } from 'react-redux';
// import LogICon from '../../assets/icons/log.png';
// import AlarmIcon from '../../assets/images/AlarmIcon.png';
// import SpinnerCustom from '../../container/SpinnerCustom';
// import TableCard from '../../container/TableCard';
// import { deviceAction } from '../../store/action/DeviceAction';
// import { Navbar } from '../../utils/NavBar';
// import SideBar from '../../utils/Sidebar';
// import { ThemeContext } from '../../utils/ThemeContext';
// import { deviceDataReducer } from './store/Reducer';
// import EditDetailsModal from './model/EditDetailsModal';
// import {
//   ALL_ROW_SELECTED,
//   DATE_DROPDOWN,
//   DIFF_DATE,
//   SEARCH_FIELD,
//   SORT_ICONS,
// } from './store/Types';
// import Pagination from '../../common/Pagination';

// export default function DeviceTable(){
//   const { theme } = React.useContext(ThemeContext);

  
//   const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
//   const { data: projectType } = getModelCodeReducer;
//   // console.log('firstget',getModelCodeReducer)

//   const deviceReducer = useSelector((state) =>state.deviceReducer);
//   console.log("first",deviceReducer)
//   const {loading,data} = deviceReducer;
//   console.log(loading)
//   console.log(data)

//   const dispatch = useDispatch();

//   const initialState = {
//     tableDataState :{},
//     disableButton: false,
//     dateDropDown: false,
//     showTableField: false,

//     record: localStorage.getItem('selected_record')
//     ? JSON.parse(localStorage.getItem('selected_record'))
//     : 25,

//     projectCode: localStorage.getItem('project_type')
//     ? JSON.parse(localStorage.getItem('project_type')).typeCode
//     : projectType &&
//       projectType.modelList[0] &&
//       projectType.modelList[0].typeCode,

//     searchField: '',
//  /**
//      * @objectKey DI: Device Id,
//      * @objectKey LOC: Device Location-------------,
//      * @objectKey St: Error Type--------------,
//      */
//     sortIcons: {
//       DI: false,
//       LOC: false,
//       St: false,
//     },
//     singleRowSelect: false,
//     allRowSelect: false,
//   };
//   // let navigate = useNavigate(); 
//   // const routeChange = () =>{ 
//   //   let path = `/DeviceData?code=${code}&name=${projectName}`; 
//   //   navigate(path);
//   // }

//   const [currentStateDevices,dispatchDeviceData] = useReducer(
//     deviceDataReducer,
//     initialState
//   );

//   const [currentPage,setCurrentPage] = useState(1); //current page set to 1
//   const[isCheckAll,setIsCheckAll] = useState(false);
//   const[isCheck,setIsCheck] = useState([]);
//   const [checkedLogs,setCheckedLogs] = useState([]);
//   const [modalShow,setModalShow] = useState(false);
//   const [modalData,setModalData] = useState(null);


//   const handleSelectAll = (e) =>{
//     setIsCheckAll(!isCheckAll);
//     setIsCheck(data?.data?.data.map((data)=>data._id));
//     setCheckedLogs(data?.data?.data);
//     if(isCheckAll){
//       setIsCheck([]);
//       setCheckedLogs([]);
//     }
//   };
// // console.log((data?.data?.data.map((data)=>data._id)))

// const handleClick = e => {
//   const { id, checked, name } = e.target;
//   setIsCheck([...isCheck, id]);
//   setCheckedLogs([...checkedLogs, JSON.parse(name)]);
//   if (!checked) {
//     setIsCheck(isCheck.filter((item) => item !== id));
//     setCheckedLogs(
//       checkedLogs.filter((item) => {
//         return item._id !== id;
//       })
//     );
//   }
// };

// useMemo(()=>{
//   const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
//   const lastPageIndex = firstPageIndex + currentStateDevices.record;
//   return(
//     data && data.data && data.data.data.slice(firstPageIndex,lastPageIndex)
//   );
// },[currentPage]);


// const ref = useRef();

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const code = urlParams.get('code');
// const projectName = urlParams.get('name');

// // const DateFilter = () => {
// //   dispatchDeviceData({
// //     type: DATE_DROPDOWN,
// //     data: !currentStateDevices.dateDropDown,
// //   });
// // };
//  //Navigation bar ==================================
// const navigation_details = {
//   name: projectName,
//   dashName: projectName,
//   link1: {
//     iconName: faDatabase,
//     linkName: 'Logs',
//     link: `/log_table?code=${code}&name=${projectName}`,
//   },
//   link2: {
//     iconName: faDatabase,
//     linkName: 'Settings',
//   },
//   link3:{
//     iconName:faDatabase,
//     linkName:"Alarms"
//   },
//   link4:{
//     iconName:faDatabase,
//     linkName:"Events"
//   }
// };

// const sidebar_details = {
//   name: projectName,
//   dashName: projectName,
//   link1: {
//     iconName: LogICon,
//     linkName: 'Logs',
//     link: `/log_table?code=${code}&name=${projectName}`,
//   },
//   link2: {
//     iconName: AlarmIcon,
//     linkName: 'Settings',
//     link: `/settings?code=${code}&name=${projectName}`,
//   },
//   link3: {
//     iconName: AlarmIcon,
//     linkName: 'alarm',
//     link: `/alarm?code=${code}&name=${projectName}`,
//   },
//   link4: {
//     iconName: `/assets/images/AlarmIcon.png`,
//     linkName: "Events",
//     link: `/events?code=${code}&name=${projectName}`, //to do   
//   },
// };

//  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
//  const handleSearchFunc = (event) => {
//   dispatchDeviceData({
//     type: SEARCH_FIELD,
//     data: event.target.value,
//   });
// };
// let deviceFilter = data && data.data && data.data.data;
// console.log('df',deviceFilter)
// // console.log('data',data.data.data)
// // console.log(typeof(deviceFilter));

// let search =
//     (currentStateDevices.searchField &&
//       currentStateDevices.searchField.trim() &&
//       currentStateDevices.searchField.trim().toLowerCase()) ||
//     '';

//   // if (search.length > 0) {
//   //   deviceFilter = deviceFilter.filter((item) => {
//   //     return (
//   //       item.did.toLowerCase().includes(search) ||
//   //       item.ack.msg.toLowerCase().includes(search) ||
//   //       item.createdAt.toLowerCase().includes(search)
//   //     );
//   //   });
//   // }
//   const callbackfnDispatchGetAllData = (sortType) => {
//     dispatch(
//       deviceAction(
//         code,
//         localStorage.getItem('project_type') &&
//           JSON.parse(localStorage.getItem('project_type')).typeCode,
//         currentStateDevices.diffDate,
//         currentStateDevices.page,
//         currentStateDevices.record,
//         sortType
//       )
//     );
//   };
//   // SORTING FUNCTION
//   // multple dispatch function for sorting
//   const multpleDispatchSort = (type, data) => {
//     return dispatchDeviceData({
//       type: type,
//       data: data,
//     });
//   };
//   const sortTableFnDI = (callbackDispatchAllData) => {
//     //Device Id Sorting
//     if (currentStateDevices.sortIcons.DI) {
//       return callbackDispatchAllData('-did');
//     } else if (!currentStateDevices.sortIcons.DI) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: true,
//         LOC: false,
//         St: false,
//       });
      
//       return callbackDispatchAllData('did');
//     }
//   };
//   const sortTableFnLOC = (callbackDispatchAllData) => {
//     // Device Location
//     if (currentStateDevices.sortIcons.LOC) {
//       return callbackDispatchAllData('-ack.code');
//     } else if (!currentStateDevices.sortIcons.LOC) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: false,
//         LOC: true,
//         St: false,
//       });
//       return callbackDispatchAllData('ack.code');
//     }
//   };
  
//   const sortTableFnSt = (callbackDispatchAllData) => {
//     // Device Status
//     if (currentStateDevices.sortIcons.St) {
//       return callbackDispatchAllData('-ack.msg');
//     } else if (!currentStateDevices.sortIcons.St) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: false,
//         LOC:false,
//         St: true,
//       });
//       return callbackDispatchAllData('ack.msg');
//     }
//   };


// useEffect(()=>{
//   dispatch(
//     deviceAction(
//       code,
//       currentStateDevices.projectCode
//     )
//   );
// },([dispatch,currentStateDevices.projectCode]))



// return (
//   <div>
//     <Row className="rowSection">
//       <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
//         <SideBar
//           sidebar_details={sidebar_details}
//           className={Style.SideBarColume}
//         />
//       </Col>
//       <Col
//         xl={10}
//         lg={10}
//         md={10}
//         sm={10}
//         className={`${Style.NavbarColumn} colSection`}
//       >
//         <Navbar navigation_details={navigation_details} />
//         <h1 className=" darkModeColor">Device Summary</h1>
//         <Container style={{marginTop:'0px'}}>
//         {/* <Button 
//                      style={{ backgroundColor: "#1a83ff", marginLeft: "87%",marginTop:"5%",marginBottom:"0%", position:'relative'} }          
//                     >
//                       <section
//                       onClick={()=>setModalShow(true)}
//                       >
//                         Register New Device
//                       </section>
//                     </Button>
//                     <AddDeviceModal
//                     show={modalShow}
//                     onHide={()=>setModalShow(false)}
//                     /> */}
        
//           {/* Events  */}
//           <Row className="mt-0">
//             <Col>
//               <TableCard borderRadius="10px">
//                 {data && data.data && data.data.data.length > 0 && (
//                   <>
//                     <section className={`${Style.OuterTable} `}>
//                       <section className={Style.searchSection}>
//                         <input
//                           type="text"
//                           placeholder="Search..."
//                           value={currentStateDevices.searchField}
//                           onChange={handleSearchFunc}
//                         />
//                         <section
//                           id="download_button"
//                           disabled={checkedLogs?.length ? null : 'disabled'}
//                           style={{
//                             border: 'none',
//                             opacity: checkedLogs?.length ? '100%' : '40%',
//                           }}
//                           onClick={() =>
//                             downloadCSVFun({
//                               data: checkedLogs,
//                               fileName: `${code}-${
//                                 new Date().getDay() +
//                                 '-' +
//                                 new Date().getMonth() +
//                                 '-' +
//                                 new Date().getFullYear()
//                               }.csv`,
//                               fileType: 'text/csv;charset=utf-8;',
//                             })
//                           }
//                         >
//                           <section className={Style.filterGraphFirstSection}>
//                             <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={faDownload}
//                             />
//                           </section>
//                         </section>
//                       </section>

//                       {/* TABLE HERE */}

//                       <section className={Style.alertTable}>
//                         <section className={Style.tableHeader}>
//                           <section
//                             style={{
//                               color: theme == 'light-theme' ? '#000' : '#fff',
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               onChange={handleSelectAll}
//                               checked={isCheckAll}
//                               id="selectAll"
                            
//                             />
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Device Id
//                             </p>
//                             <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' ,display:'none'}}
//                               icon={
//                                 currentStateDevices.sortIcons.DI
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     DI: !currentStateDevices.sortIcons.DI,
//                                   },
//                                 });
//                                 sortTableFnDI(callbackfnDispatchGetAllData);
//                               }}
//                             />
//                           </section>
        
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Alias Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>

//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Hospital Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Doctor Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Ward Number
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>

//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               IMEI Number
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
                          
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Ventilator Operator
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="rgb(152, 0, 76)"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Action
//                             </p>
//                           </section>
//                         </section>          
//                       <div>
//                         {deviceFilter && deviceFilter
//                         .filter((item,index)=>
//                         deviceFilter.findIndex(obj => obj.did === item.did)===index)
//                         .map((item,_id) => {
//                           // console.log('item',deviceFilter)
//                           // console.log(item)
            


//                           // console.log(`Index: ${index}`);
//                           // console.log('item',index.toString())
//                         // const result = deviceFilter.filter(item,index);
//                         // console.log(item.did)
//                         // console.log(
//                         //   deviceFilter.filter((item,index)=>
//                         //   deviceFilter.indexOf(item)
//                         //   )
//                         // )
//                         // function result(item){
//                         //   return deviceFilter.filter(deviceFilter.indexof(item));
//                         // }
//                         // const result = deviceFilter.filter((item,index)=>deviceFilter.indexOf(item));
//                         // console.log(result)
//                         // console.log(item._id)
//                         // console.log(deviceFilter)

//                           return (
//                             <React.Fragment key={_id}>
//                               {/* {console.log(item)} */}
//                               <section className={Style.tableBody}>
                                
//                                 <section>
//                                   <input
//                                     type="checkbox"
//                                     id={item._id}
//                                     name={JSON.stringify(item)}
//                                     onChange={handleClick}
//                                     checked={isCheck.includes(item._id)}
//                                   />
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
                                      
//                                   }}
//                                 >
//                                 {item.did}
//                                 {/* {console.log(item)} */}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.AliasName}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Hospital_Name}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Doctor_Name}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Ward_No}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.IMEI_NO}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Ventilator_Operator}
//                                 </section>

//                                  {/* <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   <Button
//                                   onClick={()=>setModalShow(true)}
//                                   >Edit
//                                   </Button>
//                                   <EditDetailsModal 
//                                   show={modalShow}
//                                   onHide={()=>setModalShow(false)}
//                                   />
//                                 </section> */}
//                                 <section>
//                                   <Button
//                                   onClick={()=>{
//                                     setModalShow(true);
//                                     // setModalData(item);
//                                     {item}
//                                     // console.log(item)
//                                     console.log({...item})
//                                   }
//                                   }
//                                   >
//                                     Edit
//                                   </Button>
//                                   <EditDetailsModal 
//                                   show={modalShow}
//                                   onHide={()=>setModalShow(false)}
//                                   {...item}
                                  
//                                   />
//                                 </section>
//                               </section>
//                             </React.Fragment>
//                           );
//                         })}
//                         </div>
          
//                       </section>
//                     </section>
//                     <section className="p-2">
//                       <Pagination
//                         code={code}
//                         projectType={currentStateDevices.projectCode}
//                         currentPage={currentPage}
//                         totalCount={data?.data?.count ? data?.data?.count : 0}
//                         pageSize={currentStateDevices.record}
//                         onPageChange={(page) => setCurrentPage(page)}
//                       />
//                     </section>
//                   </>
//                 )}
//                 {data && data.data && data.data.data.length == 0 && (
//                   <section className={Style.noDataFound}>
//                     <p
//                       style={{
//                         color: theme == 'light-theme' ? `#000` : `#fff`,
//                       }}                     
//                     >
//                       No Data Found
//                     </p>
//                   </section>
//                 )}
//                 {loading && <SpinnerCustom />}
//               </TableCard>
//             </Col>
//           </Row>
//         </Container>
//       </Col>
//     </Row>
//   </div>
// );


// }