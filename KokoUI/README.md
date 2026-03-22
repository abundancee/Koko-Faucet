# Koko Faucet UI

Koko Faucet UI is a React + Vite frontend for an ERC20 faucet contract.
It lets users connect a wallet, claim test tokens with cooldown protection,
transfer tokens, and lets the contract owner mint tokens.

## Project Description

This app is built for a production-style faucet flow on EVM networks.
It reads live on-chain token and faucet data, then provides a dashboard with:

- Faucet balance, claim amount, and wallet balance
- Cooldown-aware claim button and countdown
- Transfer form for connected users
- Owner-only mint form
- Recent claim transactions and aggregate stats

Core stack:

- React 19 + TypeScript
- Vite
- wagmi + Reown AppKit (wallet connect)
- ethers v6
- TanStack Query

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a .env file in the project root and add:

```bash
VITE_RPC_URL=https://your-rpc-url
VITE_CONTRACT_ADDRESS=0xYourFaucetContractAddress

# Optional (defaults shown)
VITE_CHAIN_ID=11155111
VITE_CHAIN_NAME=Sepolia
VITE_EXPLORER_URL=https://sepolia.etherscan.io
VITE_WALLETCONNECT_PROJECT_ID=demo
```

3. Start development server:

```bash
npm run dev
```

## Steps To Use

1. Open the app in your browser.
2. Connect your wallet.
3. If prompted, switch to the configured network.
4. Claim tokens from the faucet card.
5. Wait for cooldown before claiming again.
6. Optionally transfer tokens from your wallet.
7. If your wallet is the contract owner, use Owner Mint.

## Token Details

The app reads token information directly from the faucet contract at runtime.

- Standard: ERC20
- Contract address: from VITE_CONTRACT_ADDRESS
- Name: name()
- Symbol: symbol()
- Decimals: decimals()
- Total supply: totalSupply()
- Max supply: MAX_SUPPLY()
- Claim amount: CLAIM_AMOUNT()
- Claim cooldown: CLAIM_INTERVAL()
- Owner: owner()

Related write actions used by the UI:

- Claim faucet: requestToken()
- Transfer token: transfer(address to, uint256 value)
- Owner mint: mint(address to, uint256 amount)

## Scripts

- npm run dev: start local dev server
- npm run build: type-check and production build
- npm run preview: preview production build
- npm run lint: run ESLint
