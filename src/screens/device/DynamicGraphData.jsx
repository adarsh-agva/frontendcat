import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dpsPressure = []; //dataPoints.
var dpsVolume = []; //dataPoints.
var dpsFlow = []; //dataPoints.
var fifoLimit = new Array(10);
// var yVal = 15;
var xVal = 0;
var width = 900;
var updateInterval = 30;
var isFirstTime = false;
var color = "#FFFFFF"

class DynamicLineChart extends Component {
    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
        // this.timer = null;
    }
    componentDidMount() {
        // this.updateChart
        if (this.timer == null)
            this.timer = setTimeout(this.updateChart, updateInterval);
    }

    updateChart(data) {
        if (this.chart) {
            
            var data = this.props.data
            var pressure = parseFloat(data.split(",")[1])
            var volume = parseFloat(data.split(",")[3])
            var flow = parseFloat(data.split(",")[2])
            if (!isFirstTime) {
                dpsPressure.push({ x: xVal, y: pressure });
                dpsVolume.push({ x: xVal, y: volume });
                dpsFlow.push({ x: xVal, y: flow });
            }
            else {
                dpsPressure[xVal] = ({ x: xVal, y: pressure });
                dpsVolume[xVal] = ({ x: xVal, y: volume });
                dpsFlow[xVal] = ({ x: xVal, y: flow });

                for (let index = 0; index < 350; index++) {
                    if (fifoLimit.includes(index)) {
                        dpsPressure[index].lineColor = "#000000"
                        dpsVolume[index].lineColor = "#000000"
                        dpsFlow[index].lineColor = "#000000"
                    } else {
                        dpsPressure[index].lineColor = "#FFFFFF"
                        dpsVolume[index].lineColor = "#FFFFFF"
                        dpsFlow[index].lineColor = "#FFFFFF"
                    }
                }
            }

            xVal++
            if (xVal == 350) {
                isFirstTime = true
                xVal = 0
            }

            this.chart.render();
            setTimeout(this.updateChart, updateInterval);

            if (isFirstTime) {
                for (let i = 0; i < 12; i++) {
                    if (i < 6) {
                        if ((xVal - (6 - i)) < 0) {
                            fifoLimit[i] = 350 + (xVal - (6 - i))
                        }
                        else {
                            fifoLimit[i] = (xVal - (6 - i))
                        }
                    } else {
                        fifoLimit[i] = (xVal + (i - 6))
                    }
                }
            }
        }
    }

    render() {

        const options = {

            backgroundColor: "#000000",

            axisX: {
                viewportMaximum: 350,
                viewportMinimum: 0,
                // reversed:true,
                lineThickness: 0,
                tickThickness: 0
            },
            legends: {
                fontColor: "#FFFFFF"
            },
            width: width,
            height: 150,
            axisY: {
                viewportMaximum: 30,
                lineThickness: 0,
                gridThickness: 0,
                tickLength: 0
            },
            toolTip: {
                content: "Pressure: {y}",
            },

            data: [{
                markerType: "none",
                type: "line",
                lineColor: color,
                dataPoints: dpsPressure
            }]
        }

        const optionsVolume = {

            backgroundColor: "#000000",

            axisX: {
                viewportMaximum: 350,
                viewportMinimum: 0,
                // reversed:true,
                lineThickness: 0,
                tickThickness: 0

            },
            legends: {
                fontColor: "#FFFFFF"
            },
            toolTip: {
                content: "Volume: {y}",
            },

            width: width,
            height: 150,
            axisY: {
                viewportMaximum: 500,
                lineThickness: 0,
                gridThickness: 0,
                tickLength: 0
            },

            data: [{
                markerType: "none",
                type: "line",
                lineColor: color,
                dataPoints: dpsVolume
            }]
        }

        const optionsFlow = {
            backgroundColor: "#000000",
            axisX: {
                viewportMaximum: 350,
                viewportMinimum: 0,
                // reversed:true,
                lineThickness: 0,
                tickThickness: 0
            },
            legends: {
                fontColor: "#FFFFFF"
            },
            toolTip: {
                content: "Flow: {y}",
            },

            width: width,
            height: 150,
            axisY: {
                viewportMaximum: 50,
                lineThickness: 0,
                gridThickness: 0,
                tickLength: 0
            },

            data: [{
                markerType: "none",
                type: "line",
                lineColor: color,
                dataPoints: dpsFlow
            }]
        }
        return (
            <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                {/*  */}
                <div className='topDiv'>
                <div style={{ textAlign: 'end' }}><p style={{color:'white'}}>Pressure(cmH20)</p></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='outerGraphDiv' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <p style={{color:'white'}}>30</p>
                        <p style={{color:'white'}}>0</p>
                    </div>
                    <CanvasJSChart options={options}
                        onRef={ref => this.chart = ref}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                    <p style={{color:'white'}}>12</p>
                </div>
                </div>
                {/*  */}
                <div className='middleDiv'>
                <div style={{textAlign:'end'}}><p style={{color:'white'}}>Volume(mL)</p></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='outerGraphDiv' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <p style={{color:'white'}}>500</p>
                        <p style={{color:'white'}}>0</p>
                    </div>
                    <CanvasJSChart options={optionsVolume}
                        onRef={ref => this.chart = ref}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                    <p style={{color:'white'}}>12</p>
                </div>
                </div>
                {/*  */}
                <div className='bottomDiv'>
                <div style={{ textAlign: 'end' }}><p style={{color:'white'}}>Flow(L/min)</p></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='outerGraphDiv' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <p style={{color:'white'}}>50</p>
                        <p style={{color:'white'}}>-50</p>
                    </div>
                    <CanvasJSChart options={optionsFlow}
                        onRef={ref => this.chart = ref}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                    <p style={{color:'white'}}>12</p>
                </div>
                </div>
            </div>
        );
    }
}
export default DynamicLineChart;