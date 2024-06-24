import React from 'react'
import { Doughnut } from 'react-chartjs-2';

function Doughnuts({chartData}) {
    return (
        <Doughnut data={chartData}/>
    )
    ;
}

export default Doughnuts
