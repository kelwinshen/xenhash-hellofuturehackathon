const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();


//CA CREATED: 0x40BCBF98B3A7968CB1F457D671CbEf1Ec87589b8
//Token ID: 0.0.4706868


// SETTINGS
const network = "testnet";
const storageContractAddress = "0x6Cd59830AAD978446e6cc7f6cc173aF7656Fb917"; //Supra SValueFeed contract address
const privateKey = process.env.PRIVATE_KEY;
const hidrTokenAddress = "0x00000000000000000000000000000000004750e0";

// Load ABI and Bytecode
const abi = fs.readFileSync("./contracts/artifacts/SwapContract.abi").toString();
const bytecode = fs.readFileSync("./contracts/artifacts/SwapContract.bin").toString();

// Set up provider and signer
const rpcUrl = `https://${network}.hashio.io/api`;
const explorerURL = `https://hashscan.io/${network}`;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);

async function main() {
    try {
        console.log(`\nSTEP 1 ===================================\n`);
        console.log(`- Deploy the smart contract...\n`);
        let gasLimit = 10000000;
        const newContract = new ethers.ContractFactory(abi, bytecode, signer);
        const contractDeployTx = await newContract.deploy(storageContractAddress, hidrTokenAddress, 432, 5020, { gasLimit: gasLimit });
        
        // Wait for the deployment transaction to be mined
        const contractDeployRx = await contractDeployTx.deployTransaction.wait();
        const contractAddress = contractDeployRx.contractAddress;
        console.log(`- Contract deployed to address: ${contractAddress} ✅`);
        console.log(`- See details in HashScan: \n ${explorerURL}/address/${contractAddress} \n `);

        console.log(`\nSTEP 2 ===================================\n`);
        console.log(`- Add liquidity to the contract...\n`);

        const myContract = new ethers.Contract(contractAddress, abi, signer);

        const hidrTokenAbi = [
            "function balanceOf(address owner) view returns (uint256)",
            "function transfer(address recipient, uint256 amount) external returns (bool)",
            "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
            "function approve(address spender, uint256 amount) external returns (bool)",
            "function allowance(address owner, address spender) view returns (uint256)",
            "event Transfer(address indexed from, address indexed to, uint256 value)",
            "event Approval(address indexed owner, address indexed spender, uint256 value)",
        ];
        const hidrToken = new ethers.Contract(hidrTokenAddress, hidrTokenAbi, signer);

        const hbarLiquidity = ethers.utils.parseUnits("50", 8); // 1 HBAR
        const hidrLiquidity = ethers.utils.parseUnits("50", 2); // 1 HIDR

        // Approve the contract to spend HIDR tokens
        console.log(`- Approving HIDR tokens...\n`);
        const approveTx = await hidrToken.functions.approve(contractAddress, 100000000000);
        await approveTx.wait();
        console.log(`- Approval of HIDR tokens successful to contract.\n`);


        console.log(`\n- Associating token to the contract...\n`);
        const associateTx = await myContract.functions.tokenAssociate(contractAddress, hidrTokenAddress, {gasLimit: gasLimit});
        await associateTx.wait();
        console.log(`- Token association transaction hash: ${associateTx}.\n`);


        // Add liquidity to the contract
        console.log(`- Adding HBAR liquidity...\n`);
        try {
            const addLiquidityTx = await myContract.addHBARLiquidity( { value: hbarLiquidity });
            await addLiquidityTx.wait();
            console.log(`- Liquidity added: ${hbarLiquidity} HBAR \n`);
        } catch (err) {
            console.error("Failed to add HBAR liquidity:", err);
        }

        console.log(`- Adding HIDR liquidity...\n`);
        try {
            const addLiquidityTx = await myContract.functions.addHIDRLiquidity(hidrLiquidity);
            await addLiquidityTx.wait();
            console.log(`- Liquidity added: ${hidrLiquidity} HIDR \n`);
        } catch (err) {
            console.error("Failed to add HIDR liquidity:", err);
        }



        console.log(`\nSTEP 3 ===================================\n`);
        console.log(`- Interact with the contract...\n`);

        try {
            const hbarIdrPrice = await myContract.getHbarIdrPrice();
            console.log(`\n- HBAR to IDR Price: ${ethers.utils.formatUnits(hbarIdrPrice, 0)}\n`);
        } catch (err) {
            console.error("Failed to get HBAR to IDR price:", err);
        }

        console.log(`\n- Swapping HBAR to HIDR...\n`);
        const hbarAmount = ethers.utils.parseUnits("1", 8); // Swap 1 HBAR
        try {
            const swapTx = await myContract.swapHbarToHidr(hbarAmount, { value: hbarAmount, gasLimit });
            await swapTx.wait();
            console.log(`- Swapped 10 HBAR to HIDR.\n`);
        } catch (err) {
            console.error("Failed to swap HBAR to HIDR:", err);
        }

        console.log(`\nSTEP 4 ===================================\n`);
        console.log(`- Swapping HIDR to HBAR...\n`);
        const hidrAmount = ethers.utils.parseUnits("1", 2); // Swap 1 HIDR
        try {
            const swapTx2 = await myContract.swapHidrToHbar(hidrAmount, { gasLimit });
            await swapTx2.wait();
            console.log(`- Swapped 100,000 HIDR to HBAR.\n`);
        } catch (err) {
            console.error("Failed to swap HIDR to HBAR:", err);
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().catch(console.error);