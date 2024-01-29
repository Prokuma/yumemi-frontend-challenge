export type APIPrefecture = {
    name: string;
    code: number;
};

export type APIRequestPopulation = {
    prefCode: number;
    cityCode: string;
};

export type APIPopulation = {
    boundaryYear: number;
    data: {
        label: string;
        data: {
            year: number;
            value: number;
            rate?: number;
        }[];
    }[];
};
