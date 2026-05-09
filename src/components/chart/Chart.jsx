import React from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartContainer = styled.div`
margin: 20px;
padding: 30px;
border-radius:10px;
-webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13); 
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
`
const ChartTitle = styled.h3``


export default function Chart({ title, data, dataKey, grid }) {


    return (
        <ChartContainer>
            <ChartTitle>{title}</ChartTitle>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey={dataKey} stroke="#5550bd" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />}
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

