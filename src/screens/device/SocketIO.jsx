// // SocketIO.js
// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const serverUrl = 'http://192.168.2.1:8000/'; // Replace with your server address
// const socket = io.connect(serverUrl,()=>{
//   console.log("hello world")
// })
// export const useSocket = () => {
//   const [dataArray, setDataArray] = useState([]);
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const deviceId = urlParams.get('DeviceId')
//   console.log("deviceId111",deviceId)
//   useEffect(() => {
//     const connectToServer = async () => {
//       try {
//         await io.connect();
//         console.log('Connected to server');
//         checkServerStatus();
//       } catch (error) {
//         console.error('Error connecting to server:', error);
//       }
//     };

//     // connectToServer();

//     socket.emit('ReactStartUp',deviceId)
//     socket.on('DataReceivingReact',data=>{
//       var value = data.split("^")[0];
//       if(value == deviceId){
//         console.log(data.split("^")[1])
//       }
//     })

//     socket.on('ReceiverVentilatorDisconnected',data=>{
//       var value = data.split(",")[0];
//       if(value == deviceId){
//         alert("Ventilator Disconnected")
//       }
//     })

//     socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//       setDataArray([]);
//     });

//     var newDeviceId=deviceId
//    var supernewDeviceid=JSON.stringify(newDeviceId)
//     console.log("supernewDeviceid1",supernewDeviceid)
//     socket.on(supernewDeviceid, (data) => {
//       console.log('Received data:', data);
//       console.log("supernewDeviceid2",supernewDeviceid)
//       // setDataArray(data);
//     });

//   var newDeviceId=deviceId
//   var supernewDeviceid=JSON.stringify(newDeviceId)
//   const checkServerStatus = () => {
//     console.log("123123",supernewDeviceid)
//   };
// },[])
//   return dataArray;
// };