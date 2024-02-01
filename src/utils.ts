import { APIPrefecture, APIPopulation } from "./api.d";

export function convertPopulationCompositionToChartDataset(
  populationCompositions: APIPopulation[],
  prefectures: APIPrefecture[],
) {
  var datasets: { [key: string]: any } = {};
  if (!populationCompositions || !prefectures) {
    return datasets;
  } else if (populationCompositions.length !== prefectures.length) {
    throw new Error(
      "populationCompositions and prefectures must have the same length",
    );
  }
  for (const i in populationCompositions) {
    const prefName = prefectures[i].prefName;

    for (const data of populationCompositions[i].data) {
      const label = data.label;
      if (!datasets[label]) {
        datasets[label] = {};
      }

      for (const value of data.data) {
        if (!datasets[label][value.year]) {
          datasets[label][value.year] = {};
          datasets[label][value.year]["year"] = value.year;
        }
        datasets[label][value.year][prefName] = value.value;
      }
    }
  }
  for (const label in datasets) {
    datasets[label] = Object.values(datasets[label]);
  }

  return datasets;
}
