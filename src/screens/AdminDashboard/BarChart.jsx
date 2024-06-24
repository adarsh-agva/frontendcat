import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'

function BarChart({chartData}) {
  return (
    <Doughnut data={chartData}/>
  )
}

export default BarChart

