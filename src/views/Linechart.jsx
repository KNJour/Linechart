import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ scaleLinear, scaleTime, timeFormat, extent }from 'd3';
import { GetData } from '../components/GetData';
import { AxisX, AxisY } from '../components/AxisXY';
import { Marks } from '../components/Marks';


const url = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';
const width = 960;
const height = 500;
const margin = {
    top: 20,
    right: 20,
    left: 120,
    bottom: 60
};


const Linechart = () => {

    const data = GetData(url);
    if(!data) {
        return <pre>Loading</pre>
    } else {

        const innerHeight = height - margin.top - margin.bottom;

        const innerWidth = width - margin.left - margin.right;

        // LABELS AND DATA
    const yValue = d => d.temperature;
    const yLabel = "Temperature"
    const xValue = d => d.timestamp;
    const xLabel = "Time (day of week)";

    const circleRadius = 3;
    const tooltipValue = d => d.temperature;
    const yAxisLabelOffset = -50;
    const xAxisLabelOffset = 50;
    //time formatting 
    const xAxisTickFormat = timeFormat('%a');
    
    //SCALETIME is used
    const xScale = scaleTime()
    .domain(extent(data, xValue)) 
    .range([0, innerWidth])
    .nice();


    const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

    return (
        <>
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                
                <AxisX xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
                <AxisY yScale={yScale} innerWidth={innerWidth}/>
                <Marks 
                data={data} 
                yScale={yScale} 
                xScale={xScale}
                xValue={xValue}
                yValue={yValue}
                tooltipValue={tooltipValue}
                circleRadius={circleRadius}
                />
                {/* X axis label  */}
                    <text 
                        className="axisLabel"
                        x={innerWidth / 2} 
                        textAnchor="middle"  
                        y={innerHeight + xAxisLabelOffset}>
                            {xLabel}
                    </text>
                                    {/* Y axis label  */}
                    <text 
                        className="axisLabel"
                        textAnchor="middle"
                        transform={`translate(${yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
                            {yLabel}
                    </text>
            </g>
        </svg>
    
        </>
    
        )};

}
export default Linechart;