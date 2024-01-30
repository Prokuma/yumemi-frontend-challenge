/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import setupEnv from "./setupEnv";
import "cross-fetch/polyfill";
import ResizeObserverModule from "resize-observer-polyfill";
import PopulationLineGraph from "../app/graph";
import { APIPopulation } from "../api.d";
import {
  getPrefectures,
  getPopulationComposition,
  convertPopulationCompositionToChartDataset,
} from "../api";

global.ResizeObserver = ResizeObserverModule;

describe("Rendering", () => {
  it("should render the heading", () => {
    const populationCompositions = [
      {
        boundaryYear: 2015,
        data: [
          {
            label: "総人口",
            data: [
              {
                year: 2015,
                value: 100,
              },
            ],
          },
          {
            label: "年少人口",
            data: [
              {
                year: 2015,
                value: 100,
              },
            ],
          },
        ],
      },
      {
        boundaryYear: 2015,
        data: [
          {
            label: "総人口",
            data: [
              {
                year: 2015,
                value: 100,
              },
            ],
          },
          {
            label: "年少人口",
            data: [
              {
                year: 2015,
                value: 100,
              },
            ],
          },
        ],
      },
    ];
    const prefectures = [
      {
        prefCode: 1,
        prefName: "北海道",
      },
      {
        prefCode: 2,
        prefName: "青森県",
      },
    ];
    const data = convertPopulationCompositionToChartDataset(
      populationCompositions,
      prefectures,
    );
    render(
      <PopulationLineGraph
        label="総人口"
        data={data}
        prefectures={prefectures}
      />,
    );
  });

  it("should render the heading with API", async () => {
    await setupEnv();
    let prefectures = await getPrefectures();
    prefectures = prefectures.slice(0, 4);
    var populationCompositions: APIPopulation[] = [];
    for (const prefecture of prefectures) {
      const populationComposition = await getPopulationComposition({
        prefCode: prefecture.prefCode,
        cityCode: "-",
      });
      populationCompositions.push(populationComposition);
    }
    const data = convertPopulationCompositionToChartDataset(
      populationCompositions,
      prefectures,
    );
    render(
      <PopulationLineGraph
        label="総人口"
        data={data}
        prefectures={prefectures}
      />,
    );
  });
});
