README
# Qrypto
Qrypto is a platform that allows users to pay using cryptocurrency through DuitNow National Payment Rail.

## Front end
Supposedly a mobile app, but due to technical limitations, we decided to build a web page using Scaffold-ETH.

## Scaffold-ETH
The full-stack framework we used for development. Internally it uses Next.js for front end and web2 back end. 

## DuitNow Integration 
DuitNow is Malaysia's real-time payment network that enables instant fund transfers using QR codes. Due to technical limitations, we implemented a hardcoded API to simulate the real-life QR payment process. We plan to establish a partnership with DuitNow in the future.

## Yellow Network, Nitrolite
With the Yellow SDK and Nitrolite protocol, we built this payment app where users can make transactions without paying gas fees (except for deposit and withdrawal). Utilizing Nitrolite protocol's State Channel, we dramatically reduce gas fees compared to on-chain transactions for daily payments.

## ENS Integration
Users can register and use Ethereum Name Service (ENS) domains as their payment identifiers, making transactions more user-friendly. Instead of sharing long wallet addresses, users can receive payments through their ENS names (e.g., alice.eth), simplifying the payment experience.

## How It Works
Internally, our platform operates with two liquidity pools: a cryptocurrency pool and a fiat currency pool. Users deposit their USDC into a custody smart contract, where the funds are locked for off-chain transactions via ClearNode. During payment, the user's locked USDC is transferred to the platform's cryptocurrency pool, while the platform instantly pays the merchant from the fiat currency pool. When necessary, on-chain settlement and off-ramp conversion are performed to replenish the fiat pool.

## AI Assistance 
1. Frontend pages
2. Backend integration