# Koko-Faucet Project

This repository contains two main components:

## 1. Koko Contract
A smart contract project for the Koko Faucet, built with Foundry.

- **Location:** `Koko Contract/`
- Contains Solidity contracts, scripts, and tests for the Koko Faucet.
- Uses OpenZeppelin and Forge Standard Library as dependencies.
- Key files:
  - `src/Koko.sol`: Main contract source code
  - `test/Koko.t.sol`: Contract tests
  - `script/Koko.s.sol`: Deployment and scripting

## 2. KokoUI
A modern frontend for interacting with the Koko Faucet smart contract.

- **Location:** `KokoUI/`
- Built with React, TypeScript, Vite, and Tailwind CSS
- Contains reusable components, hooks, and utilities for web3 interaction
- Key files:
  - `src/pages/FaucetPage.tsx`: Main faucet UI
  - `src/abi/KokoAbi.ts`: Contract ABI for frontend integration
  - `src/hooks/`: Custom React hooks for contract actions

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Foundry (for smart contract development)

### Setup
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```
2. **Install frontend dependencies:**
   ```bash
   cd KokoUI
   npm install
   ```
3. **Install contract dependencies:**
   ```bash
   cd "../Koko Contract"
   forge install
   ```

## Usage
- Run the frontend:
  ```bash
  cd KokoUI
  npm run dev
  ```
- Test/deploy contracts:
  ```bash
  cd "Koko Contract"
  forge test
  # or
  forge script script/Koko.s.sol --broadcast
  ```

## License
MIT

---
For more details, see the individual README files in each subfolder.