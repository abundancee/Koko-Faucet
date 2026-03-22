import { BrowserProvider, Contract } from 'ethers'
import { useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { KokoAbi } from '../abi/KokoAbi'
import { appConfig, hasValidContractAddress } from '../utils/env'
import { type TxStatus } from '../types/faucet'

interface ClaimResult {
  hash: string
}

export function useFaucetClaim() {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [status, setStatus] = useState<TxStatus>('idle')
  const [txHash, setTxHash] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function claimTokens(recipientAddress?: string): Promise<ClaimResult> {
    if (!hasValidContractAddress) {
      throw new Error('Contract address is missing or invalid.')
    }

    if (!walletClient || !address) {
      throw new Error('Connect your wallet to claim tokens.')
    }

    if (recipientAddress && recipientAddress.toLowerCase() !== address.toLowerCase()) {
      throw new Error('This faucet contract only claims to the connected wallet.')
    }

    setStatus('pending')
    setErrorMessage('')
    setTxHash('')

    try {
      const provider = new BrowserProvider(walletClient.transport)
      const signer = await provider.getSigner(address)
      const contract = new Contract(appConfig.contractAddress, KokoAbi, signer)

      const txResponse = await contract.requestToken()
      setTxHash(txResponse.hash)

      await txResponse.wait()
      setStatus('success')

      return { hash: txResponse.hash }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transaction failed.'
      setStatus('error')
      setErrorMessage(message)
      throw error
    }
  }

  function resetState() {
    setStatus('idle')
    setErrorMessage('')
    setTxHash('')
  }

  return {
    claimTokens,
    status,
    txHash,
    errorMessage,
    resetState,
  }
}
