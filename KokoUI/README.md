# Koko ERC20 Faucet Frontend

Modern ERC20 faucet interface built with React + Vite, RainbowKit, wagmi, and ethers.

## Features

- RainbowKit wallet connection
- Wrong-network warning and wallet-aware action guards
- Claim flow with user-specific 24h cooldown and live retry timer
- Transfer token flow from connected wallet
- Owner-only mint interface with supply guards
- Faucet stats dashboard
- Recent transactions feed
- Contract/network information section
- Toast notifications, skeleton loaders, copy-to-clipboard
- Brown-themed responsive UI with light/dark toggle

## Environment

Copy `.env.example` to `.env` and set values:

```bash
cp .env.example .env
```

Required:

- `VITE_RPC_URL`
- `VITE_CONTRACT_ADDRESS`

Recommended:

- `VITE_CHAIN_ID`
- `VITE_CHAIN_NAME`
- `VITE_EXPLORER_URL`
- `VITE_WALLETCONNECT_PROJECT_ID`

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
