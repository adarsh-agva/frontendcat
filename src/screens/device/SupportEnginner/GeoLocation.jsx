// import React, { useEffect, useState } from 'react'
// import MapComponent from './MapComponent';

// function GeoLocation() {
//     const [ipAddress, seytIpAddress] = useState('');
//     const [geoInfo, setGeoInfo] = useState('')
//     // latitude
//     const [getlatitude, setGetLatitude] = useState('')
//     console.log('getlatitude', getlatitude)
//     const [getlangitude, setGetLangitude] = useState('')
//     console.log('getlangitude', getlangitude)
//     useEffect(() => {
//         getVisitorIP()
//     }, [])

//     const getVisitorIP = async () => {
//         try {
//             const responce = await fetch(`http://ip-api.com/json/`);
//             const data = await responce.text();
//             // Store IP Addrss
//             seytIpAddress(data);
//         }
//         catch (error) {
//             console.log('Failed to fetch IP:', error)
//         }
//     }
//     const handleText = (e) => {
//         seytIpAddress(e.target.value)
//     }
//     const fetchIPInfo = async () => {
//         try {
//             const responce = await fetch(`http://ip-api.com/json/${ipAddress}`);
//             const data = await responce.json();
//             setGeoInfo(data)
//             console.log('11', geoInfo && geoInfo.coords)

//         } catch (error) {
//             console.log('Failed to fetch IP:', error)
//         }
//     }

//     function gotLocation(position) {
//         setGetLatitude(position && position.coords && position.coords.latitude)
//         setGetLangitude(position && position.coords && position.coords.longitude)
//     }
//     function failedToGet() {
//         console.log('There is an Issue')
//     }

//     const getLocationClick = async () => {
//         // useEffect(()=>{
//             navigator.geolocation.getCurrentPosition(gotLocation)
//             console.log('090',getlatitude)
//         // })
//     }
//     useEffect(async () => {
//         navigator.geolocation.getCurrentPosition(gotLocation)
//     }, [])

//     // useEffect(() => {
//         // const ifameData = document.getElementById("iframeId")
//         const lat = getlatitude;
//         const lon = getlangitude;
//     // })

//     return (
//         <div>
//             <h3>IP Address:</h3>
//             <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
//                 <input type='text' value={ipAddress} onChange={handleText} />
//                 <button onClick={fetchIPInfo} style={{ color: 'white', backgroundColor: 'black', padding: '8px', borderRadius: '10px' }}>Submit</button>
//             </div>

//             <div>
//                 <MapComponent latitude={getlatitude} longitude={getlangitude} />

//                 <button onClick={getLocationClick}>Get Location</button>
//             </div>
//             <div>
//                 <iframe src={`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`} id="iframeId" height="500px" width="100%" title='map'/>
//             </div>
//         </div>
//     )
// }

// export default GeoLocation