import { line, curveCardinal, curveCardinalClosed } from 'd3';

export const Marks = ({data, yScale, xScale, xValue, yValue, tooltipValue, circleRadius}) => (
    <>
    <g className="marks">
        <path 
            d={line()
                .x(d=> xScale(xValue(d)))
                .y(d => yScale(yValue(d)))
                .curve(curveCardinal)(data)
            
            }
            fill="none"/>


     { data.map(d => (
        <circle 
        cx={xScale(xValue(d))} 
        cy={yScale(yValue(d))} 
        r={circleRadius}
        >
            <title>Temp: {tooltipValue(d)}</title>
        </circle>))} 
    </g>
    </>
)