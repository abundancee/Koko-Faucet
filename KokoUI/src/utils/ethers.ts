import { Contract, JsonRpcProvider } from 'ethers'
import { KokoAbi } from '../abi/KokoAbi'
import { appConfig } from './env'

let providerInstance: JsonRpcProvider | null = null

export function getRpcProvider(): JsonRpcProvider {
  if (providerInstance) {
    return providerInstance
  }

  if (!appConfig.rpcUrl) {
    throw new Error('Missing VITE_RPC_URL in environment variables.')
  }

  providerInstance = new JsonRpcProvider(appConfig.rpcUrl)
  return providerInstance
}

export function getReadContract(): Contract {
  return new Contract(appConfig.contractAddress, KokoAbi, getRpcProvider())
}
