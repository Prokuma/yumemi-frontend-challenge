"use client";
import { getPrefectures, getPopulationComposition } from "../api";
import PrefecturesCheckBoxes from "./checkboxes";
import PopulationLineGraph from "./graph";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { APIPopulation, APIPrefecture } from "@/api.d";
import { convertPopulationCompositionToChartDataset } from "../utils";
import DataTypeSelector from "./typeselector";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [allPrefectures, setAllPrefectures] = useState<APIPrefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    APIPrefecture[]
  >([]);
  const [convertedDataset, setConvertedDataset] = useState<any>({});
  const [selectedDataType, setSelectedDataType] = useState<string>("総人口");

  var alreadyFetchedPrefectures: APIPrefecture[] = [];
  var populationCompositions: APIPopulation[] = [];

  const labels = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  const selectedPrefecturesChanged = async (
    checkedPrefectures: APIPrefecture[],
  ) => {
    if (checkedPrefectures.length === 0) {
      return;
    }

    for (const checkedPrefecture of checkedPrefectures) {
      if (alreadyFetchedPrefectures.includes(checkedPrefecture)) {
        continue;
      }
      const populationComposition = await getPopulationComposition({
        prefCode: checkedPrefecture.prefCode,
        cityCode: "-",
      });
      populationCompositions.push(populationComposition);
      alreadyFetchedPrefectures.push(checkedPrefecture);
    }

    const selectedPopulationCompositions: APIPopulation[] = [];
    for (const checkedPrefecture of checkedPrefectures) {
      for (const i in alreadyFetchedPrefectures) {
        if (
          alreadyFetchedPrefectures[i].prefCode === checkedPrefecture.prefCode
        ) {
          selectedPopulationCompositions.push(populationCompositions[i]);
        }
      }
    }

    try {
      setConvertedDataset(() => {
        return convertPopulationCompositionToChartDataset(
          selectedPopulationCompositions,
          checkedPrefectures,
        );
      });
      setSelectedPrefectures(() => {
        return checkedPrefectures;
      });
    } catch (error) {
      console.error(error);
    }
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
        <h1>人口推移グラフ</h1>
      </div>
      <div className={styles.content}>
        <h3>都道府県リスト</h3>
      </div>
      <div className={styles.content}>
        {allPrefectures.length > 0 ? (
          <PrefecturesCheckBoxes
            prefectures={allPrefectures}
            onChange={selectedPrefecturesChanged}
          />
        ) : (
          <p>都道府県を取得中</p>
        )}
      </div>
      <div className={styles.content}>
        <DataTypeSelector
          labels={labels}
          onChange={(label) => setSelectedDataType(label)}
        />
      </div>
      <div className={styles.content}>
        {selectedPrefectures.length > 0 ? (
          <PopulationLineGraph
            label={selectedDataType}
            data={convertedDataset}
            prefectures={selectedPrefectures}
          />
        ) : (
          <p>都道府県を選択してください</p>
        )}
      </div>
    </main>
  );
}
