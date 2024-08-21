# Price Feed Oracle API

This documentation provides details on implementing a price feed oracle for HBAR/IDR, designed to offer users nearly accurate price data without incurring fees. While users can access this data freely, it's important to note that actual price execution during swaps or transactions on the blockchain will occur via the smart contract, ensuring security and precision.

## Overview

The price feed oracle API serves as a web-accessible interface for users to view HBAR/IDR prices. Direct interaction with the Supra Oracle for price data typically involves a fee. To mitigate this, a publicly accessible HBAR/IDR feed is provided. This feed mirrors the Supra Oracle's accuracy and is intended solely for information purposes. Actual transactions will be executed on-chain to ensure the integrity of the price used in swaps and other financial activities.

## Step-by-Step Implementation Guide

### 1. Smart Contract Setup

1. **Navigate to Remix IDE:**
   - Go to [Remix Ethereum](https://remix.ethereum.org).
   
2. **Upload Smart Contract Files:**
   - Upload the necessary smart contract files into the IDE.

3. **Compile Contracts:**
   - Compile each contract step-by-step to ensure compatibility between related contracts.
   
### 2. ABI and Bytecode Integration

1. **Copy ABI and Bytecode:**
   - After successful compilation, copy the generated ABI and bytecode.
   
2. **Artifact Directory:**
   - Place the copied ABI and bytecode into the designated `artifacts` directory in your project.

### 3. Environment Configuration

1. **Install Dotenv:**
   - Ensure the `dotenv` package is installed by running the following command:

 --------------------------------
   npm install dotenv
 --------------------------------  

2. Set Up Environment Variables:
Rename .env.sample to .env.
Update the .env file with your private key and wallet address.
If you need a Hedera testnet account, register at Hedera Portal.


### 4.Testing the Oracle Smart Contract

1. Run Test Script:

Execute the following command to test the smart contract:
-----------------------------
node main.js
-----------------------------


2. Verify Deployment:

Ensure the smart contract is correctly deployed and capable of retrieving accurate data from the Supra Oracle.
Record the deployed contract address and the funding account address for future use.

### 5. Database Setup
Create a Database:
Establish a simple database in your cloud/hosting environment to store the HBAR/IDR values.

### 6.Automated Price Retrieval
Duplicate and Modify Script:

Copy main.js to a new file named getLatestPrice.js.
Remove the smart contract deployment section.
Replace the smart contract address with the one obtained in Step 4.
Post API Integration:

Add a POST API within getLatestPrice.js to submit new HBAR/IDR values to your database.

### 7. Deployment and API Access
Deploy Script to Server:

Deploy getLatestPrice.js to your server and run it to continually update the latest price.
Create Access API:

Develop an API to retrieve the latest HBAR/IDR price. This API will be utilized within your dApp for accurate pricing information.


# Acknowledgements
- Thanks to Supra Oracles for providing the reliable oracle services used in this project. The price feeds from Supra Oracles allow us to accurately calculate the HBAR/IDR exchange rate by using HBAR/USD and USD/IDR pairs.
- Remix IDE - The online Solidity IDE used to write and deploy the smart contract.