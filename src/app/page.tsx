"use client";
//import type { APIPrefecture, APIPopulation } from "@/api";
import styles from "./page.module.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
const data = [
    {
        year: 2000,
        hokkaido: 1000,
        aomori: 2200,
    },
    {
        year: 2010,
        hokkaido: 4000,
        aomori: 2400,
    },
    {
        year: 2020,
        hokkaido: 4200,
        aomori: 2100,
    },
    {
        year: 2030,
        hokkaido: 1200,
        aomori: 2200,
    },
];

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1>人口推移</h1>
            </div>
            <div className={styles.grid}>
                <h3>都道府県</h3>
            </div>
            <div className={styles.grid}>
                <div>
                    <input
                        type="checkbox"
                        name="prefecture"
                        value="hokkaido"
                        id="hokkaido"
                    />
                    <label htmlFor="hokkaido">北海道</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="prefecture"
                        value="aomori"
                        id="aomori"
                    />
                    <label htmlFor="aomori">青森</label>
                </div>
            </div>

            <div className={styles.center}>
                <h3>総人口</h3>
            </div>
            <div className={styles.center}>
                <LineChart
                    width={1000}
                    height={700}
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        width={100}
                        wrapperStyle={{
                            top: 40,
                            right: 20,
                            border: "1px solid #d5d5d5",
                            borderRadius: 3,
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="hokkaido"
                        stroke="#8884d8"
                        name="北海道"
                    />
                    <Line
                        type="monotone"
                        dataKey="aomori"
                        stroke="#82ca9d"
                        name="青森"
                    />
                </LineChart>
            </div>
        </main>
    );
}
