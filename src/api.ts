import { APIPrefecture, APIPopulation, APIRequestPopulation } from "./api.d";

export async function getPrefectures() {
    try {
        const headers: HeadersInit = new Headers();
        headers.set("X-API-KEY", process.env.RESAS_API_KEY || "");
        const response = await fetch(
            "https://opendata.resas-portal.go.jp/api/v1/prefectures",
            {
                method: "GET",
                headers: headers,
            }
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = (await response.json()) as { result: APIPrefecture[] };
        return data.result;
    } catch (error) {
        console.error("API error: ", error);
        return [] as APIPrefecture[];
    }
}

export async function getPopulationComposition(request: APIRequestPopulation) {
    try {
        const headers: HeadersInit = new Headers();
        headers.set("X-API-KEY", process.env.RESAS_API_KEY || "");
        const response = await fetch(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=${request.cityCode}&prefCode=${request.prefCode}`,
            {
                method: "GET",
                headers: headers,
            }
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = (await response.json()) as { result: APIPopulation };
        return data.result;
    } catch (error) {
        console.error("API error: ", error);
        return {} as APIPopulation;
    }
}

export function convertPopulationCompositionToChartDataset(
    populationCompositions: APIPopulation[],
    prefectures: APIPrefecture[]
) {
    var datasets: { [key: string]: any } = {};
    if (!populationCompositions || !prefectures) {
        return datasets;
    } else if (populationCompositions.length !== prefectures.length) {
        throw new Error(
            "The length of populationCompositions and prefectures must be the same."
        );
    }
    for (const i in populationCompositions) {
        const prefName = prefectures[i].name;

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
