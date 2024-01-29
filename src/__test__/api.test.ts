/**
* @jest-environment jsdom　　　　
*/
import 'cross-fetch/polyfill'
import { getPrefectures, getPopulationComposition } from '../api'
import setupEnv from './setupEnv'

describe('getPrefectures', () => {
    it('should return prefectures', async () => {
        await setupEnv()
        const prefectures = await getPrefectures()
        expect(prefectures.length).toBeGreaterThan(0)
    })
})

describe('getPopulationComposition', () => {
    it('should return population composition', async () => {
        await setupEnv()
        const populationComposition = await getPopulationComposition({
            prefCode: 1,
            cityCode: '-'
        })
        console.log(populationComposition)
        console.log(populationComposition.data)
        console.log(populationComposition.data[0].data)
        expect(populationComposition.data.length).toBeGreaterThan(0)
    })
})