"use server";
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
      },
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
      },
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
