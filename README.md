# Qrypto

Qrypto is a payment platform that enables users to pay merchants using cryptocurrency (USDC) with instant settlement and zero gas fees for everyday transactions, powered by Yellow Network's state channel technology and Malaysia's DuitNow payment rail.

## Problem We Solve

Traditional blockchain payments face three critical challenges:
- **High Costs**: Gas fees make small transactions impractical
- **Slow Settlement**: 15+ seconds per transaction creates poor user experience
- **Limited Scalability**: Traditional blockchains can't handle payment volumes

Qrypto solves these by combining Yellow Network's off-chain state channels with DuitNow's real-time payment infrastructure.

## Architecture Overview

### Yellow Network Integration (Nitrolite Protocol)

Yellow Network provides the core payment infrastructure through **state channels** - a Layer 2 scaling solution that enables:

- **Instant Transactions**: Sub-second finality (< 1 second)
- **Zero Gas Costs**: Off-chain operations incur no blockchain fees
- **Unlimited Throughput**: No blockchain consensus bottleneck
- **Blockchain Security**: Funds remain cryptographically secured

#### How State Channels Work

Think of a state channel like a bar tab:
1. **Open**: Lock USDC in custody smart contract (1 on-chain transaction)
2. **Transact**: Make unlimited payments off-chain with cryptographic signatures
3. **Close**: Final settlement to blockchain (1 on-chain transaction)

Instead of paying gas fees for every coffee, you only pay twice: when opening and closing your payment channel.

#### Three-Layer Architecture

| Layer | Purpose | Speed | Cost |
|-------|---------|-------|------|
| **Application** | Qrypto UI and business logic | — | — |
| **Off-Chain (Clearnode)** | Instant state updates via Nitro RPC | < 1 second | Zero gas |
| **On-Chain (Custody Contract)** | Fund custody, disputes, final settlement | Block time | Gas fees |

#### Fund Flow in Qrypto
```
User Wallet (EOA)
    ↓ [Deposit]
Available Balance (Custody Contract)
    ↓ [Resize Channel]
Unified Balance (Clearnode - Off-chain)
    ↓ [Payment]
Merchant Receives (Fiat via DuitNow)
    ↓ [Platform Settlement]
Platform Pool (Off-chain ↔ On-chain)
```

#### Security Guarantees

- **Fund Safety**: All USDC locked in audited Nitrolite smart contracts
- **Dispute Resolution**: Challenge period allows contesting incorrect states
- **Cryptographic Proof**: Every state transition signed by participants
- **Recovery Guarantee**: Users can always recover funds via on-chain contracts, even if Clearnode is unresponsive

### DuitNow Integration

DuitNow is Malaysia's real-time payment network that enables instant fund transfers using QR codes. Due to technical limitations for this hackathon, we implemented a simulated API to demonstrate the QR payment process. 

**Future Integration**: Partnership with DuitNow will enable:
- Real-time fiat settlement to merchants
- QR code generation and scanning
- Bank account integration for instant MYR transfers

### ENS Integration

Users can use Ethereum Name Service (ENS) domains as payment identifiers. Instead of sharing long wallet addresses, users simply share their ENS names (e.g., `alice.eth`) to receive payments. 

**How it works**:
1. User enters ENS name (e.g., `bob.eth`) as payment recipient
2. Application resolves ENS to wallet address using official ENS contracts
3. Payment is sent to resolved address via state channel

This makes the payment experience as simple as traditional payment apps like Venmo or PayPal.

## How It Works

### Payment Flow

1. **User Deposits USDC**
   - User deposits USDC into Nitrolite Custody Contract
   - Funds are locked and available for off-chain transactions via Clearnode

2. **Initiate Payment**
   - User scans merchant's DuitNow QR code or enters ENS name
   - Amount is locked in user's state channel

3. **Instant Settlement**
   - User's USDC transferred to platform's cryptocurrency pool (off-chain, zero gas)
   - Platform instantly pays merchant in MYR from fiat pool via DuitNow
   - Transaction completes in < 1 second

4. **Background Reconciliation**
   - Platform performs batch on-chain settlement when needed
   - Off-ramp USDC to MYR to replenish fiat pool
   - Users unaffected by settlement timing

### Two-Pool Liquidity System

**Cryptocurrency Pool**: Holds USDC from user payments  
**Fiat Currency Pool**: Holds MYR for instant merchant payouts

This dual-pool architecture ensures:
- Merchants receive MYR immediately (no crypto volatility risk)
- Users enjoy zero gas fees for daily payments
- Platform manages conversion and settlement asynchronously

## Tech Stack

### Frontend
- **Scaffold-ETH**: Full-stack framework for rapid Web3 development
- **Next.js**: React framework for frontend and API routes
- **RainbowKit**: Wallet connection and management
- **Wagmi**: React hooks for Ethereum

### Backend & Blockchain
- **Yellow Network SDK**: State channel management and Nitro RPC protocol
- **Nitrolite Protocol**: State channel smart contracts on Ethereum
- **ENS Contracts**: Official ENS registry and resolver contracts
- **Simulated DuitNow API**: Payment rail integration (demo)

### Infrastructure
- **Clearnode**: Yellow Network's off-chain coordination layer
- **Custody Contracts**: Nitrolite smart contracts for fund security
- **State Channels**: Off-chain payment channels between users and platform

## AI Assistance

Claude AI was utilized for:
1. Frontend page development and UI components
2. Backend API integration and smart contract interactions
3. Documentation and technical writing

## Why Qrypto?

- ✅ **Zero Gas Fees**: Pay only when depositing/withdrawing, not per transaction
- ✅ **Instant Settlement**: Payments complete in under 1 second
- ✅ **User-Friendly**: ENS names instead of addresses, QR codes like traditional payments
- ✅ **Secure**: Funds protected by battle-tested Nitrolite smart contracts
- ✅ **Merchant-Friendly**: Receive fiat (MYR) directly, no crypto complexity
- ✅ **Scalable**: Unlimited transaction throughput via state channels

## Future Roadmap

- [ ] Official DuitNow partnership and API integration
- [ ] Mobile app development (iOS and Android)
- [ ] Multi-currency support (USDT, DAI, etc.)
- [ ] Merchant dashboard for transaction management
- [ ] Cross-border remittance features
- [ ] Loyalty rewards and cashback programs

## Learn More

- [Yellow Network Documentation](https://docs.yellow.org/)
- [Nitrolite Protocol](https://docs.yellow.org/docs/protocol/introduction)
- [DuitNow Official Site](https://www.duitnow.my/)
- [ENS Documentation](https://docs.ens.domains/)
