const { ethers } = require("ethers");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

// SETTINGS
//-----------------------------------------------------------------------------------------------------------------
const storageContractAddress = "0x6C5d92E110255Eb4dD2b3Cbc8D809e995a41ca4c"; // Your deployed contract address
//-----------------------------------------------------------------------------------------------------------------

const abi = fs.readFileSync("./contracts/artifacts/ConsumerContract.abi").toString();
const rpcUrl = `https://testnet.hashio.io/api`;  
const privateKey = process.env.PRIVATE_KEY;      
const serverUrl = process.env.SERVER_URL;    

const provider = new ethers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);

// Function to fetch and submit prices
async function fetchAndSubmitPrices() {
    try {
        const myContract = new ethers.Contract(storageContractAddress, abi, signer);
        const pricePairName = ["HBAR/USD", "USD/IDR"];
        const pricePairIdx = [432, 5020];
        
        const callResult = await myContract.getPriceForMultiplePair(pricePairIdx);

        let hbarUsdPrice, usdIdrPrice;

        for (let i = 0; i < pricePairIdx.length; i++) {
            const price = callResult[i].price;
            const decimals = callResult[i].decimals;
            const formattedPrice = Number(price) * 10 ** -Number(decimals);

            if (pricePairName[i] === "HBAR/USD") {
                hbarUsdPrice = formattedPrice;
            } else if (pricePairName[i] === "USD/IDR") {
                usdIdrPrice = formattedPrice;
            }
        }

        if (hbarUsdPrice && usdIdrPrice) {
            const hbarIdrPrice = hbarUsdPrice * usdIdrPrice;
            console.log(`\n- HBAR to IDR Price: ${hbarIdrPrice}`);
            console.log(`\n===================================\n`);

            // Submit data to your server
            await axios.put(`${serverUrl}/hbar-to-idr/1`, {
             "valueNow" : hbarIdrPrice.toString()
            });
            console.log("Price data submitted to the server.");
        } else {
            console.log("\n- Failed to retrieve one or both prices.\n");
        }
    } catch (error) {
        console.error("Error fetching prices or submitting data:", error);
    }
}

// Function to run the fetch process every 10 seconds and submit to the database for api get the latest pricefeed show to the user
function startFetchingPrices() {
    fetchAndSubmitPrices();  // Initial call
    setInterval(fetchAndSubmitPrices, 10000);  // Subsequent calls every 10 seconds
}

startFetchingPrices();

