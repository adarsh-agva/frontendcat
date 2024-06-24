/* eslint-disable */

import React,{useEffect, useState} from 'react'

const Timer = (props) => {
    const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds == 0) {
                if (minutes == 0) {
                    clearInterval(myInterval)
                    props.resetTimer()
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });
    return (
        <div>
        { minutes == 0 && seconds == 0
            ? null
            : <p style={{color:'rgb(152, 0, 76)'}}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p> 
        }
        </div>
    )
}
export default Timer
