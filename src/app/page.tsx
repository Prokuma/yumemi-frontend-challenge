"use client";
import { getPrefectures, getPopulationComposition } from "../api";
import PrefecturesCheckBoxes from "./checkboxes";
import PopulationLineGraph from "./graph";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { APIPopulation, APIPrefecture } from "@/api.d";
import { convertPopulationCompositionToChartDataset } from "@/utils";
import DataTypeSelector from "./typeselector";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [allPrefectures, setAllPrefectures] = useState<APIPrefecture[]>([]);
  const [alreadyFetchedPrefectures, setAlreadyFetchedPrefectures] = useState<
    APIPrefecture[]
  >([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    APIPrefecture[]
  >([]);
  const [selectedPopulationCompositions, setSelectedPopulationCompositions] =
    useState<APIPopulation[]>([]);
  const [populationCompositions, setPopulationCompositions] = useState<
    APIPopulation[]
  >([]);
  const [selectedDataType, setSelectedDataType] = useState<string>("総人口");

  const labels = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  const selectedPrefecturesChanged = (checkedPrefectures: APIPrefecture[]) => {
    setSelectedPrefectures(checkedPrefectures);
    if (checkedPrefectures.length === 0) {
      return;
    }
    for (const checkedPrefecture of checkedPrefectures) {
      if (alreadyFetchedPrefectures.includes(checkedPrefecture)) {
        continue;
      }
      getPopulationComposition({
        prefCode: checkedPrefecture.prefCode,
        cityCode: "-",
      }).then((populationComposition) => {
        setPopulationCompositions([
          ...populationCompositions,
          populationComposition,
        ]);
        setAlreadyFetchedPrefectures([
          ...alreadyFetchedPrefectures,
          checkedPrefecture,
        ]);
      });
    }
    const newSelectedPopulationCompositions = [];
    for (const i in alreadyFetchedPrefectures) {
      for (const checkedPrefecture of checkedPrefectures) {
        if (
          alreadyFetchedPrefectures[i].prefCode === checkedPrefecture.prefCode
        ) {
          newSelectedPopulationCompositions.push(populationCompositions[i]);
        }
      }
    }
    setSelectedPopulationCompositions(newSelectedPopulationCompositions);
  };

  useEffect(() => {
    if (!loading) {
      return;
    }
    getPrefectures().then((prefecturesList) => {
      setAllPrefectures(prefecturesList);
      setLoading(false);
    });
  }, [allPrefectures, loading]);

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>人口推移</h1>
      </div>
      <div className={styles.grid}>
        <h3>都道府県</h3>
      </div>
      <div className={styles.grid}>
        {allPrefectures.length > 0 ? (
          <PrefecturesCheckBoxes
            prefectures={allPrefectures}
            onChange={selectedPrefecturesChanged}
          />
        ) : (
          <p>都道府県を取得中</p>
        )}
      </div>
      <div className={styles.center}>
        <DataTypeSelector
          labels={labels}
          onChange={(label) => setSelectedDataType(label)}
        />
      </div>
      <div className={styles.center}>
        {populationCompositions.length > 0 ? (
          <PopulationLineGraph
            label={selectedDataType}
            data={convertPopulationCompositionToChartDataset(
              selectedPopulationCompositions,
              selectedPrefectures,
            )}
            prefectures={selectedPrefectures}
          />
        ) : (
          <p>都道府県を選択してください</p>
        )}
      </div>
    </main>
  );
}
