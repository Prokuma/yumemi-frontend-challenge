"use client";
import { APIPrefecture } from "@/api.d";
import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  label: string;
  data: { [key: string]: any };
  prefectures: APIPrefecture[];
}
interface State {}

export default class PopulationLineGraph extends Component<Props, State> {
  render() {
    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={400}
        minHeight={400}
      >
        <LineChart
          data={this.props.data[this.props.label]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          {this.props.prefectures.map((prefecture, index) => {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={prefecture.prefName}
                stroke={`hsl(${(index * 360) / this.props.prefectures.length}, 100%, 50%)`}
                dot={false}
              />
            );
          })}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
