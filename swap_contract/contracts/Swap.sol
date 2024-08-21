// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./ISupraSValueFeed.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./HederaTokenService.sol";
import "./HederaResponsesCodes.sol";

contract SwapContract is Ownable, HederaTokenService {
    ISupraSValueFeed internal sValueFeed;

    receive() external payable {}

    fallback() external payable {}
    
    // Liquidity pools
    uint256 public hbarLiquidity;
    uint256 public hidrLiquidity;

    // ERC-20 token for HIDR
    IERC20 public hidrToken;

    // Configuration IDs for HBAR and HIDR prices
    uint256 public hbarPriceId;
    uint256 public hidrPriceId;

    constructor(
        address _sValueFeed,
        address _hidrToken,
        uint256 _hbarPriceId,
        uint256 _hidrPriceId
    ) Ownable(msg.sender) {
        sValueFeed = ISupraSValueFeed(_sValueFeed);
        hidrToken = IERC20(_hidrToken);
        hbarPriceId = _hbarPriceId;
        hidrPriceId = _hidrPriceId;
    }



     function tokenAssociate(address contractAddress, address tokenAddress) external {
        int response = HederaTokenService.associateToken(contractAddress, tokenAddress);

        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Associate Failed");
        }
    }

    function tokenTransfer(address tokenId, address fromAccountId , address toAccountId , int64 tokenAmount) external {
        int response = HederaTokenService.transferToken(tokenId, fromAccountId, toAccountId, tokenAmount);

        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Transfer Failed");
        }
    }

    function tokenDissociate(address sender, address tokenAddress) external {
        int response = HederaTokenService.dissociateToken(sender, tokenAddress);

        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Dissociate Failed");
        }
    }

    // Update the Supra oracle feed address
    function updateSupraSvalueFeed(address _newSValueFeed) external onlyOwner {
        sValueFeed = ISupraSValueFeed(_newSValueFeed);
    }

    // Update HIDR token address
    function updateHidrToken(address _newHidrToken) external onlyOwner {
        hidrToken = IERC20(_newHidrToken);
    }

    // Update price IDs
    function updatePriceIds(uint256 _newHbarPriceId, uint256 _newHidrPriceId) external onlyOwner {
        hbarPriceId = _newHbarPriceId;
        hidrPriceId = _newHidrPriceId;
    }

    // Swap HBAR to HIDR
    function swapHbarToHidr(uint256 _hbarAmount) external payable {
        require(msg.value == _hbarAmount, "HBAR amount mismatch with sent value");
        require(_hbarAmount <= hbarLiquidity, "Insufficient HBAR liquidity");

        // Fetch HBAR/USD and USD/IDR prices
        ISupraSValueFeed.priceFeed memory hbarUsd = sValueFeed.getSvalue(hbarPriceId); // HBAR/USD
        ISupraSValueFeed.priceFeed memory usdIdr = sValueFeed.getSvalue(hidrPriceId); // USD/IDR

        // Calculate HBAR/IDR price
        uint256 hbarIdrPrice = (hbarUsd.price * usdIdr.price) / (10 ** 6 * 10 ** 2); // Adjusted for decimals

        // Calculate HIDR amount to transfer (considering 2 decimal places for HIDR)
        uint256 hidrAmount = (_hbarAmount * hbarIdrPrice) / (10 ** 8 * 10 ** 2); // Adjusted for HIDR 2 decimals

        require(hidrAmount <= hidrLiquidity, "Insufficient HIDR liquidity");

        // Update liquidity
        hbarLiquidity -= _hbarAmount;
        hidrLiquidity -= hidrAmount;

        // Transfer HIDR to the user
        hidrToken.transfer(msg.sender, hidrAmount);
    }

    // Swap HIDR to HBAR
    function swapHidrToHbar(uint256 _hidrAmount) external {
        require(_hidrAmount <= hidrLiquidity, "Insufficient HIDR liquidity");

        // Fetch HBAR/USD and USD/IDR prices
        ISupraSValueFeed.priceFeed memory hbarUsd = sValueFeed.getSvalue(hbarPriceId); // HBAR/USD
        ISupraSValueFeed.priceFeed memory usdIdr = sValueFeed.getSvalue(hidrPriceId); // USD/IDR

        // Calculate HIDR/HBAR price
        uint256 hbarIdrPrice = (hbarUsd.price * usdIdr.price) / (10 ** 6 * 10 ** 2); // Adjusted for decimals

        // Calculate HBAR amount to transfer (considering 2 decimal places for HIDR)
        uint256 hbarAmount = (_hidrAmount * (10 ** 8 * 10 ** 2)) / hbarIdrPrice; // Adjusted for HIDR 2 decimals

        require(hbarAmount <= hbarLiquidity, "Insufficient HBAR liquidity");

        // Update liquidity
        hidrLiquidity -= _hidrAmount;
        hbarLiquidity -= hbarAmount;

        // Transfer HBAR to the user
        payable(msg.sender).transfer(hbarAmount);
    }

    // Withdraw liquidity (only for the owner)
    function withdrawLiquidity(uint256 _hbarAmount, uint256 _hidrAmount) external onlyOwner {
        require(_hbarAmount <= hbarLiquidity, "Insufficient HBAR liquidity");
        require(_hidrAmount <= hidrLiquidity, "Insufficient HIDR liquidity");

        hbarLiquidity -= _hbarAmount;
        hidrLiquidity -= _hidrAmount;

        payable(msg.sender).transfer(_hbarAmount);
        // Transfer HIDR tokens to the owner
        hidrToken.transfer(msg.sender, _hidrAmount);
    }

    // Get the current HBAR/IDR price
    function getHbarIdrPrice() public view returns (uint256) {
        ISupraSValueFeed.priceFeed memory hbarUsd = sValueFeed.getSvalue(hbarPriceId); // HBAR/USD
        ISupraSValueFeed.priceFeed memory usdIdr = sValueFeed.getSvalue(hidrPriceId); // USD/IDR
        return (hbarUsd.price * usdIdr.price) / (10 ** 6 * 10 ** 2);
    }

    // Get the current HBAR price ID
    function getHbarPriceId() public view returns (uint256) {
        return hbarPriceId;
    }

    // Get the current HIDR price ID
    function getHidrPriceId() public view returns (uint256) {
        return hidrPriceId;
    }

    // Add HBAR liquidity only
    function addHBARLiquidity() external payable onlyOwner {
        hbarLiquidity += msg.value;
    }

    // Add HIDR liquidity only
    function addHIDRLiquidity(uint256 _hidrAmount) external onlyOwner {
        hidrToken.transferFrom(msg.sender, address(this), _hidrAmount);
        hidrLiquidity += _hidrAmount;
    }
}
