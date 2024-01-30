/**
 * @jest-environment jsdom
 */
import "cross-fetch/polyfill";
import {
  getPrefectures,
  getPopulationComposition,
  convertPopulationCompositionToChartDataset,
} from "../api";
import setupEnv from "./setupEnv";

describe("getPrefectures", () => {
  it("should return prefectures", async () => {
    await setupEnv();
    const prefectures = await getPrefectures();
    expect(prefectures.length).toBeGreaterThan(0);
  });
});

describe("getPopulationComposition", () => {
  it("should return population composition", async () => {
    await setupEnv();
    const populationComposition = await getPopulationComposition({
      prefCode: 1,
      cityCode: "-",
    });
    expect(populationComposition.data.length).toBeGreaterThan(0);
    expect(populationComposition.data[0].data.length).toBeGreaterThan(0);
  });
});

describe("convertPopulationCompositionToChartDataset", () => {
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
  it("should return chart dataset", () => {
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
    const datasets = convertPopulationCompositionToChartDataset(
      populationCompositions,
      prefectures,
    );
    expect(datasets).toEqual({
      総人口: [
        {
          year: 2015,
          北海道: 100,
          青森県: 100,
        },
      ],
      年少人口: [
        {
          year: 2015,
          北海道: 100,
          青森県: 100,
        },
      ],
    });
  });
  it("should throw an error", () => {
    const prefectures = [
      {
        prefCode: 1,
        prefName: "北海道",
      },
    ];
    expect(() => {
      convertPopulationCompositionToChartDataset(
        populationCompositions,
        prefectures,
      );
    }).toThrowError(
      "The length of populationCompositions and prefectures must be the same.",
    );
  });
});
