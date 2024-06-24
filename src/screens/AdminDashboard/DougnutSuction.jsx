import React from 'react'
import { Doughnut } from 'react-chartjs-2';

function DougnutSuction({chartData}) {
  return <Doughnut data={chartData}/>;
}

export default DougnutSuction