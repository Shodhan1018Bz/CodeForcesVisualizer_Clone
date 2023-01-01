
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default function Barchart(props:any) {
  return (
    <div>
      <h5>{props.label} {props.handle}</h5>
      <BarChart
      width={600}
      height={350}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
    </div>
    
  );
}
