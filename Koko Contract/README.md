# Koko Token (ERC20)

A simple ERC20 token contract with faucet and minting capabilities.

## Features

- **Standard ERC20 Functions**: Full implementation including transfer, approve, and transferFrom
- **Max Supply**: Fixed at 10,000,000 KOKO tokens
- **Faucet (requestToken)**: Any user can claim 100 KOKO tokens every 24 hours
- **Owner Minting (mint)**: Only contract owner can mint tokens up to MAX_SUPPLY

## Contract Details

### Constants
- `MAX_SUPPLY`: 10,000,000 * 10^18 KOKO
- `FAUCET_AMOUNT`: 100 * 10^18 KOKO per request
- `REQUEST_COOLDOWN`: 24 hours between faucet claims

### Functions

#### requestToken()
Allows any user to claim tokens from the faucet.
- Claims 100 KOKO tokens
- Can only be called once every 24 hours per address
- Fails if total supply would exceed MAX_SUPPLY

#### mint(address to, uint256 amount)
Allows only the contract owner to mint new tokens.
- Requires `onlyOwner` modifier
- Fails if minting would exceed MAX_SUPPLY

## Testing

Run the test suite with:
```bash
forge test -v
```

The test suite includes:
- Initial state verification
- Faucet functionality (first request, cooldown, after cooldown)
- Owner-only mint verification
- Max supply enforcement
- Combined mint and faucet operations
- Standard ERC20 operations (transfer, approve, transferFrom)
- Event emission verification
