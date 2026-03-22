import { BrowserProvider, Contract, parseUnits } from 'ethers'
import { useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { KokoAbi } from '../abi/KokoAbi'
import { type TxStatus } from '../types/faucet'
import { appConfig, hasValidContractAddress } from '../utils/env'

interface WriteResult {
  hash: string
}

// This hook centralizes contract write functions for transfer and owner mint.
export function useTokenActions(tokenDecimals: number, ownerAddress?: string) {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()

  const [transferStatus, setTransferStatus] = useState<TxStatus>('idle')
  const [mintStatus, setMintStatus] = useState<TxStatus>('idle')
  const [transferHash, setTransferHash] = useState('')
  const [mintHash, setMintHash] = useState('')
  const [transferError, setTransferError] = useState('')
  const [mintError, setMintError] = useState('')

  async function getWriteContract() {
    if (!hasValidContractAddress) {
      throw new Error('Contract address is missing or invalid.')
    }

    if (!walletClient || !address) {
      throw new Error('Connect wallet to continue.')
    }

    const provider = new BrowserProvider(walletClient.transport)
    const signer = await provider.getSigner(address)
    return new Contract(appConfig.contractAddress, KokoAbi, signer)
  }

  async function transferTokens(to: string, amount: string): Promise<WriteResult> {
    setTransferStatus('pending')
    setTransferHash('')
    setTransferError('')

    try {
      const contract = await getWriteContract()
      const txResponse = await contract.transfer(to, parseUnits(amount, tokenDecimals))
      setTransferHash(txResponse.hash)
      await txResponse.wait()
      setTransferStatus('success')
      return { hash: txResponse.hash }
    } catch (error) {
      setTransferStatus('error')
      setTransferError(error instanceof Error ? error.message : 'Transfer failed.')
      throw error
    }
  }

  async function mintTokens(to: string, amount: string): Promise<WriteResult> {
    setMintStatus('pending')
    setMintHash('')
    setMintError('')

    try {
      if (!address || !ownerAddress || address.toLowerCase() !== ownerAddress.toLowerCase()) {
        throw new Error('Only the contract owner can mint tokens.')
      }

      const contract = await getWriteContract()
      const txResponse = await contract.mint(to, parseUnits(amount, tokenDecimals))
      setMintHash(txResponse.hash)
      await txResponse.wait()
      setMintStatus('success')
      return { hash: txResponse.hash }
    } catch (error) {
      setMintStatus('error')
      setMintError(error instanceof Error ? error.message : 'Mint failed.')
      throw error
    }
  }

  return {
    transferTokens,
    mintTokens,
    transferStatus,
    mintStatus,
    transferHash,
    mintHash,
    transferError,
    mintError,
  }
}
