import { isAddress } from 'ethers'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { FaucetDashboardSection } from '../components/faucet/FaucetDashboardSection'
import { AppFooter } from '../components/layout/AppFooter'
import { HeroSection } from '../components/layout/HeroSection'
import { TopNavbar } from '../components/layout/TopNavbar'
import { useCountdown } from '../hooks/useCountdown'
import { useFaucetClaim } from '../hooks/useFaucetClaim'
import { useFaucetData } from '../hooks/useFaucetData'
import { useTokenActions } from '../hooks/useTokenActions'
import { SUPPORTED_CHAIN_NAME } from '../constants/network'
import { appConfig, hasValidContractAddress } from '../utils/env'

export function FaucetPage() {
	const { address, isConnected } = useAccount()
	const activeChainId = useChainId()
	const { switchChainAsync, isPending: isSwitchingNetwork } = useSwitchChain()
	const [recipientAddress] = useState('')
	const [transferRecipient, setTransferRecipient] = useState('')
	const [transferAmount, setTransferAmount] = useState('')
	const [mintRecipient, setMintRecipient] = useState('')
	const [mintAmount, setMintAmount] = useState('')
	const [isAddingToken, setIsAddingToken] = useState(false)

	// Remove forced dark mode, theme is now controlled by TopNavbar

	const {
		data: faucetData,
		isLoading,
		isFetching,
		isError,
		error,
		refetch,
	} = useFaucetData()

	const { claimTokens, status } = useFaucetClaim()
	const {
		transferTokens,
		mintTokens,
		transferStatus,
		mintStatus,
		transferHash,
		mintHash,
		transferError,
		mintError,
	} = useTokenActions(faucetData?.tokenDecimals ?? 18, faucetData?.ownerAddress)

	const isWrongNetwork = isConnected && activeChainId !== appConfig.chainId
	const isOwner = Boolean(
		address && faucetData?.ownerAddress && address.toLowerCase() === faucetData.ownerAddress.toLowerCase(),
	)
	const countdownSeconds = useCountdown(faucetData?.nextClaimTime ?? 0)

	const claimDisabledReason = useMemo(() => {
		if (!isConnected) {
			return 'Connect wallet first'
		}

		if (isWrongNetwork) {
			return `Switch to ${SUPPORTED_CHAIN_NAME}`
		}

		if (!hasValidContractAddress) {
			return 'Missing contract configuration'
		}

		if (countdownSeconds > 0) {
			return 'Cooldown active'
		}

		return ''
	}, [countdownSeconds, isConnected, isWrongNetwork])

	const eligibilityText = !isConnected
		? 'Connect wallet to check claim status'
		: isWrongNetwork
			? `Switch to ${SUPPORTED_CHAIN_NAME}`
			: countdownSeconds > 0
				? 'Cooldown active'
				: 'Eligible to claim now'

	async function handleClaim(event: FormEvent) {
		event.preventDefault()

		const trimmedRecipient = recipientAddress.trim()

		if (trimmedRecipient && !isAddress(trimmedRecipient)) {
			toast.error('Recipient address is not valid.')
			return
		}

		if (trimmedRecipient && address && trimmedRecipient.toLowerCase() !== address.toLowerCase()) {
			toast.error('This faucet claims only to the connected wallet.')
			return
		}

		try {
			const result = await toast.promise(claimTokens(trimmedRecipient || address), {
				loading: 'Submitting claim transaction...',
				success: 'Claim confirmed onchain.',
				error: 'Claim failed. Please check wallet and network.',
			})

			if (result.hash) {
				await refetch()
			}
		} catch {
			// Toast and hook handle error state.
		}
	}

	async function handleSwitchNetwork() {
		try {
			await switchChainAsync({ chainId: appConfig.chainId })
			toast.success(`Switched to ${SUPPORTED_CHAIN_NAME}`)
		} catch {
			toast.error('Network switch was rejected or failed.')
		}
	}

	async function handleAddToken() {
		type EthereumProvider = {
			request: (args: { method: string; params?: unknown }) => Promise<unknown>
		}

		const provider = (window as Window & { ethereum?: EthereumProvider }).ethereum

		if (!faucetData) {
			toast.error('Token details are still loading.')
			return
		}

		if (!hasValidContractAddress) {
			toast.error('Contract address is not configured correctly.')
			return
		}

		if (typeof window === 'undefined' || !provider) {
			toast.error('No wallet provider found in this browser.')
			return
		}

		setIsAddingToken(true)

		try {
			const result = await provider.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: appConfig.contractAddress,
						symbol: faucetData.tokenSymbol,
						decimals: faucetData.tokenDecimals,
					},
				},
			})

			if (result) {
				toast.success('Token added to wallet.')
			} else {
				toast('Token add request was canceled.')
			}
		} catch {
			toast.error('Failed to add token to wallet.')
		} finally {
			setIsAddingToken(false)
		}
	}

	async function handleTransfer(event: FormEvent) {
		event.preventDefault()

		const trimmedRecipient = transferRecipient.trim()
		const trimmedAmount = transferAmount.trim()

		if (!isAddress(trimmedRecipient)) {
			toast.error('Transfer recipient address is not valid.')
			return
		}

		if (!trimmedAmount || Number(trimmedAmount) <= 0) {
			toast.error('Transfer amount must be greater than zero.')
			return
		}

		try {
			const result = await toast.promise(transferTokens(trimmedRecipient, trimmedAmount), {
				loading: 'Submitting transfer transaction...',
				success: 'Transfer confirmed onchain.',
				error: 'Transfer failed. Please check wallet and network.',
			})

			if (result.hash) {
				setTransferAmount('')
				await refetch()
			}
		} catch {
			// Toast and hook handle error state.
		}
	}

	async function handleMint(event: FormEvent) {
		event.preventDefault()

		if (!isOwner) {
			toast.error('Only the contract owner can mint tokens.')
			return
		}

		const trimmedRecipient = mintRecipient.trim()
		const trimmedAmount = mintAmount.trim()

		if (!isAddress(trimmedRecipient)) {
			toast.error('Mint recipient address is not valid.')
			return
		}

		if (!trimmedAmount || Number(trimmedAmount) <= 0) {
			toast.error('Mint amount must be greater than zero.')
			return
		}

		try {
			const result = await toast.promise(mintTokens(trimmedRecipient, trimmedAmount), {
				loading: 'Submitting mint transaction...',
				success: 'Mint confirmed onchain.',
				error: 'Mint failed. Please check wallet and network.',
			})

			if (result.hash) {
				setMintAmount('')
				await refetch()
			}
		} catch {
			// Toast and hook handle error state.
		}
	}

	function handleClaimScroll() {
		const target = document.getElementById('faucet-dashboard')
		target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<TopNavbar
				isWrongNetwork={isWrongNetwork}
				onSwitchNetwork={handleSwitchNetwork}
				isSwitchingNetwork={isSwitchingNetwork}
				supportedChainName={SUPPORTED_CHAIN_NAME}
			/>

			<HeroSection onClaimClick={handleClaimScroll} faucetData={faucetData} />

			<FaucetDashboardSection
				faucetData={faucetData}
				isLoading={isLoading}
				isFetching={isFetching}
				status={status}
				countdownSeconds={countdownSeconds}
				claimDisabledReason={claimDisabledReason}
				onClaim={handleClaim}
				onAddToken={handleAddToken}
				onTransfer={handleTransfer}
				onMint={handleMint}
				transferRecipient={transferRecipient}
				setTransferRecipient={setTransferRecipient}
				transferAmount={transferAmount}
				setTransferAmount={setTransferAmount}
				mintRecipient={mintRecipient}
				setMintRecipient={setMintRecipient}
				mintAmount={mintAmount}
				setMintAmount={setMintAmount}
				address={address}
				isConnected={isConnected}
				isOwner={isOwner}
				isWrongNetwork={isWrongNetwork}
				isAddingToken={isAddingToken}
				eligibilityText={eligibilityText}
				transferStatus={transferStatus}
				mintStatus={mintStatus}
				transferHash={transferHash}
				mintHash={mintHash}
				transferError={transferError}
				mintError={mintError}
				isError={isError}
				runtimeError={error?.message}
				hasValidContractAddress={hasValidContractAddress}
				explorerUrl={appConfig.explorerUrl}
			/>

			<AppFooter />
		</main>
	)
}
