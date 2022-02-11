import { Token } from '@cronaswap/core-sdk'
import { ChainTokenMap } from 'app/config/tokens'

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'
interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  cronaToBurn: string
  distributionRatio: number // Range [0-1]
}
export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  raiseToken: ChainTokenMap
  offerToken: ChainTokenMap
  releaseTimestamp: number
  veCronaCheckPoint: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  description?: string
  twitterUrl?: string
  telegramUrl?: string
  version: number
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
}
