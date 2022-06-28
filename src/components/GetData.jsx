import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
export const GetData = (irisUrl) => {

    const [data, setData] = useState(null)
    useEffect(() => {
        const row = d => {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp);
            return d;
        };
        csv(irisUrl, row).then(setData);
    
    }, []);
    return data;

}
