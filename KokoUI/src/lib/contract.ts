import { KokoAbi } from '../abi/KokoAbi'
import { appConfig } from '../utils/env'

export const contractConfig = {
  address: appConfig.contractAddress,
  abi: KokoAbi,
  rpcUrl: appConfig.rpcUrl,
  explorerUrl: appConfig.explorerUrl,
}

export function getTransactionUrl(hash: string): string {
  return `${contractConfig.explorerUrl}/tx/${hash}`
}
