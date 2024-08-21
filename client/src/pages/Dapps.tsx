import {  bitcoin, downloadCoin, hbarIcon, hCoinEth, hidrIcon, qrCoin, swapCoin, xsHbarIcon } from "../assets";
import { Icon } from "@iconify/react";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { useEffect, useState } from "react";
import axios from 'axios';
import { appConfig } from "../config";
import { AccountId } from "@hashgraph/sdk";
import Swal from "sweetalert2";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";




// -------Styles-------
const Style = {
  // Any
  textHead: "text-white text-[32px] md:text-[52px] font-bold",
  textParagraph: "text-white text-base",
  textBalance: "text-white text-[42px] font-medium",
  textHIDR: "text-white text-[32px] font-medium",
  textRealPrice: "text-white/50 text-[16px] font-semibold",
  textRealGlobalPrice: "text-white text-[14px] md:text-[16px]",

  // Box
  boxContainer:
    "flex flex-col justify-center gap-6 w-full md:max-w-[80%] lg:max-w-[60%] md:mx-auto",
  boxContent:
    "flex flex-col gap-3 px-4 py-6 border-[0.1px] rounded-[15px] bg-black/10",
  boxContentButton:
    "flex flex-col gap-5 px-4 py-6 border-[0.1px] rounded-[15px] bg-black/10",
  buttonConnect:
    "py-3 rounded-[15px] bg-white/50 text-white text-[24px] font-medium hover:bg-white/60",


  // Swap
  textSwapMini : "text-sm text-white/50 md:text-[16px]",
  inputPrice: "w-[60%] md:w-[75%] xl:w-[80%]  text-white text-[28px] lg:text-[42px] md no-spinners bg-transparent focus:outline-none md:placeholder:text-[28px] lg:placeholder:text-[32px] placeholder:text-[22px] placeholder:text-white/50 py-2",
  
};

// -------Component-------
// GasFee 
// eslint-disable-next-line react/prop-types

interface GasFeeProps {
    _gasFee: string;
  }

  const GasFee: React.FC<GasFeeProps> = ({  _gasFee }) => {
    return <>
          <div className={`${Style.textRealPrice} flex gap-1 items-center`}>
              <Icon icon="mdi:gas-station-in-use" />
              <span>Rp {_gasFee}</span>
          </div>
      </>;

}

// Primary Button
// eslint-disable-next-line react/prop-types

interface ButtonLinkProps {
    _buttonText: string;
  }
  
const ButtonLink: React.FC<ButtonLinkProps> = ({  _buttonText }) => {
  return (
      <button className={`z-[-50] py-3 px-6 border-[0.1px]  hover:bg-white/100 text-black bg-white/80 backdrop-blur-lg border-black/50 hover:border-white/50 font-normal rounded-[10px] text-[14px] sm:text-[16px] ease-in-out duration-500`}>{_buttonText}</button> 
  )
}

// SWAP
interface SwapFormProps {
    _swapMode: boolean;
    _setSwapMode: (value: boolean) => void;
    _swapAmount: number;
    _setSwapAmount: (value:  number) => void;
    _convertionRate: number;
    _setConvertionRate: (value:  number) => void;
    _hbarBalance: number;
    _hidrBalance: number;
    _accountAddress: string;
    _swapError: string;
    _setSwapError: (value:  string) => void;

  }
  
  
  const SwapForm: React.FC<SwapFormProps> = ({
    _swapMode,
    _setSwapMode,
    _swapAmount,
    _setSwapAmount,
    _convertionRate,
    _hbarBalance,
    _hidrBalance,
    _accountAddress,
    _swapError,
    _setSwapError
  }) => {
    const [receiveAmount, setReceiveAmount] = useState<number>(0);
  
    const calculateReceiveAmount = (amount: number) => {
      // Ensure _convertionRate is defined and non-zero
      const conversionRate = _convertionRate || 1;
      const newAmount = _swapMode ? amount * conversionRate : amount / conversionRate;
      setReceiveAmount(newAmount);
    };
  
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      _setSwapError("")
      const value = event.target.value;
      const amount = parseFloat(value) || 0; // Use parseFloat for decimal amounts
    
      if (  _swapMode == true && amount > _hbarBalance && _accountAddress != "" ){
        _setSwapError("Insufficient Balance")
      } else if( _swapMode == false && amount > _hidrBalance&& _accountAddress != ""){
        _setSwapError("Insufficient Balance")

      }
      _setSwapAmount(amount);
      calculateReceiveAmount(amount);
    };

  
    const handleSwapModeToggle = () => {
        setReceiveAmount(_swapAmount);
        _setSwapAmount(receiveAmount);
      _setSwapMode(!_swapMode);
      if (  _swapMode == false && _swapAmount > _hbarBalance && _accountAddress != ""){
        _setSwapError("Insufficient Balance")
      } else if( _swapMode == true && _swapAmount > _hidrBalance&& _accountAddress != ""){
        _setSwapError("Insufficient Balance")
      } else {
        _setSwapError("")
      }
    };

   

  
    // Update receiveAmount when _swapAmount or _swapMode changes
    useEffect(() => {
      calculateReceiveAmount(_swapAmount);

    }, [_swapAmount, _swapMode]);
  
    return (
      <form action="" className="z-[0] relative flex flex-col gap-2">
        {/* You Pay */}
        <div className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-col gap-2">
          <div className="text-sm text-white/50 md:text-[16px]">You Pay</div>
          <div className="flex flex-row items-center justify-between">
            <input 
              type="number" 
              className="w-[60%] md:w-[75%] xl:w-[80%] text-white text-[28px] lg:text-[42px] md no-spinners bg-transparent focus:outline-none md:placeholder:text-[28px] lg:placeholder:text-[32px] placeholder:text-[22px] placeholder:text-white/50 py-2" 
              min={0}
              onWheel={(event) => event.currentTarget.blur()}
              onChange={handleAmountChange}
              value={_swapAmount}
            />
            <div className="flex flex-row items-center justify-between border sm:rounded-[15px] rounded-[8px] px-1 sm:px-2 py-1 gap-1">
              <img className="  sm:w-[54px] sm:h-[54px] w-[24px] h-[24px] " src={_swapMode ? hbarIcon : hidrIcon} />
              <span className="font-medium text-white text-[16px]"> {_swapMode ? 'HBAR' : 'HIDR'}</span>
            </div>
            
          </div>
          <div className={`${Style.textRealGlobalPrice}`}>
          Balance: {_accountAddress == "" ? "0" :  (_hidrBalance == -0.01 && _swapMode == false) ? "Associate first to show balance of" : (_swapMode ?   _hbarBalance : _hidrBalance)  } { _swapMode ? "HBAR" : "HIDR"}
                  </div>
        </div>
  
        {/* Button Swap */}
        <div className="relative flex items-center justify-center">
          <div className="absolute cursor-pointer">
            <Icon onClick={handleSwapModeToggle} className="hover:text-[#212529] sm:w-10 sm:h-10 w-8 h-8 text-white bg-[#212529] hover:bg-white/70 rounded-md" icon="gg:swap-vertical" />
          </div>
        </div>
  
        {/* You Receive */}
        <div className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-col gap-2">
          <div className="text-sm text-white/50 md:text-[16px]">You Receive</div>
          <div className="flex flex-row items-center justify-between">
            <input 
              disabled={true} 
              type="number" 
              className="w-[60%] md:w-[75%] xl:w-[80%] text-white text-[28px] lg:text-[42px] md no-spinners bg-transparent focus:outline-none md:placeholder:text-[28px] lg:placeholder:text-[32px] placeholder:text-[22px] placeholder:text-white/50 py-2" 
            
              value={receiveAmount != 0 ? receiveAmount.toFixed(2) : receiveAmount } // Convert to string for display
            />
            <div className="flex flex-row items-center justify-between border sm:rounded-[15px] rounded-[8px] px-1 sm:px-2 py-1 gap-1">
              <img className="sm:w-[54px] sm:h-[54px] w-[24px] h-[24px]" src={_swapMode ? hidrIcon : hbarIcon} />
              <span className="font-medium text-white text-[16px]"> {_swapMode ? 'HIDR' : 'HBAR'}</span>
            </div>
          </div>
          <div className={`${Style.textRealGlobalPrice}`}>
          Balance: {_accountAddress == "" ? "0" : (_hidrBalance == -0.01 && _swapMode == true) ? "Associate first to show balance of" : (_swapMode ? _hidrBalance : _hbarBalance)  } { _swapMode ? "HIDR" : "HBAR"}
                  </div>
        </div>
      {_accountAddress != "" && _hidrBalance == -0.01 && _swapMode == true &&  <span className={` text-red-700 font-medium`}>{_swapError}</span>}  
      {_accountAddress != "" && _hidrBalance != -0.01 &&  <span className={` text-red-700 font-medium`}>{_swapError}</span>}  
      </form>
    );
  };
  
  interface SendFormProps {
    _sendMode: boolean;
    _setSendMode: (value: boolean) => void;
    _sendAmount: number;
    _setSendAmount: (value:  number) => void;
    _setSendToAddress: (value: string) => void;
    _sendToAddress: string;
    _sendError: string;
    _setSendError : (value: string) => void;
    _sendSuccess: boolean;
    _setSendSuccess: (value: boolean) => void;
    _hbarBalance: number,
    _hidrBalance : number,
    _accountAddress: string,
    _convertionRate: number
    
    
  }
  
  
  const SendForm: React.FC<SendFormProps> = ({
    _sendMode,
    _setSendMode,
    _sendAmount,
    _setSendAmount,
    _setSendToAddress,
    // _sendToAddress,
    _sendError,
    _setSendError,
    // _sendSuccess,
    // _setSendSuccess,
    _hidrBalance,
    _hbarBalance,
    _accountAddress,
    _convertionRate
    
   
  }) => {
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      _setSendError("");
      const value = event.target.value;
      const amount = parseFloat(value) || 0; // Use parseFloat for decimal amounts
      if (  _sendMode == true && amount > _hbarBalance && _accountAddress != ""){
        _setSendError("Insufficient Balance")
      } else if( _sendMode == false && amount > _hidrBalance&& _accountAddress != ""){
        _setSendError("Insufficient Balance")
      }
      _setSendAmount(amount);
    };




    const handleSendToAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const toAddress = event.target.value;
      _setSendError("");
      _setSendToAddress(toAddress);
      
     
    };

    const handleModeChange = () =>{
      _setSendMode(!_sendMode);
      if (  _sendMode == false && _sendAmount > _hbarBalance && _accountAddress != ""){
        _setSendError("Insufficient Balance")
      } else if( _sendMode == true && _sendAmount > _hidrBalance&& _accountAddress != ""){
        _setSendError("Insufficient Balance")
      } else {
        _setSendError("")
      }
    }

   
  return (
    <form action="" className="relative flex flex-col gap-2 z-0">
      {/* Price Input */}
      <div className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-col gap-2">
        <div className={`${Style.textSwapMini}`}>You Sending</div>
        <div className="flex flex-row items-center justify-center gap-1">
          
        <input 
            className={` w-full text-right  text-white text-[28px]  lg:text-[42px] no-spinners bg-transparent focus:outline-none md:placeholder:text-[28px] lg:placeholder:text-[32px] placeholder:text-[22px] placeholder:text-white/50 py-2`} 
            type="number" 
            placeholder="0"
            min="0"
            value={_sendAmount.toString()}
            onWheel={(event) => event.currentTarget.blur()}
            onChange={handleAmountChange}
          />

          <span className="w-[100%] font-medium text-white text-[16px]">{_sendMode ?'HBAR' : 'HIDR'}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className={`${Style.textSwapMini}`}>Rp {_sendMode? (_sendAmount * _convertionRate).toFixed(0) : _sendAmount}</span>
          {/* <span className={`${Style.textSwapMini} text-red-700 font-medium`}>Insuffcient Funds</span> */}
        </div>
      </div>
      {/* Token Select */}
      <div onClick={()=>{handleModeChange()}} className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-row justify-between items-center hover:bg-white/50 cursor-pointer">
        <div className="flex flex-row items-center gap-2">
          <img className="sm:w-[54px] sm:h-[54px] w-[24px] h-[24px]" src={_sendMode ? hbarIcon : hidrIcon}  />
          <span className="text-white text-[16px] sm:text-[24px] font-medium">{_sendMode ?'HBAR' : 'HIDR'}</span>
        </div>

        <div> 
          <Icon className="w-10 h-10 rotate-90  text-white sm:w-14 sm:h-14" icon="gg:swap-vertical" />
        </div>
      </div>
      {/* Wallet Address */}
      <div className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-col gap-2">
        <span className={`${Style.textSwapMini}`}>Send to</span>
        <input type="text"
        placeholder="Hedera Account ID or EVM Address"
        onChange={handleSendToAddressChange}
        className="w-full  text-white text-[14px] md:text-[28px] no-spinners bg-transparent focus:outline-none md:placeholder:text-[28px] lg:placeholder:text-[24px] placeholder:text-[14px] placeholder:text-white/50"  />
     
      </div>
      <div className={`${Style.textRealGlobalPrice}`}>
          Balance: {_accountAddress == "" ? "0" : (_hidrBalance == -0.01 && _sendMode == false) ? "Associate first to show balance of" : (_sendMode ?  _hbarBalance : _hidrBalance )  } { _sendMode ?  "HBAR"  : "HIDR"}
                  </div>
                  {_accountAddress != "" && _hidrBalance == -0.01 && _sendMode == true &&  <span className={` text-red-700 font-medium`}>{_sendError}</span>}  
                  {_accountAddress != "" && _hidrBalance != -0.01  &&  <span className={` text-red-700 font-medium`}>{_sendError}</span>}  
    </form>
  )
}
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text to clipboard:', err);
  }
};


interface DepositFormProps {
  _hidrBalance: number;
  _hbarBalance: number;
  _depositMode: boolean;
  _setDepositMode: (value: boolean) => void;
  _accountAddress: string;


}


const DepositForm: React.FC<DepositFormProps> = ({
  _hidrBalance,
  _hbarBalance,
  _depositMode,
  _setDepositMode,
  _accountAddress,


}) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopy = () => {
    copyToClipboard(_accountAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
  };

  return (
  
    <> 
      <div className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-col gap-2">
        <div className={`${Style.textSwapMini}`}>
          
          { _depositMode ? 'Your HIDR Balance' : 'Your HBAR Balance'}
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-white text-[16px] md:text-[28px] font-medium">
         

            {_accountAddress == "" ? "0" : (_hidrBalance == -0.01 && _depositMode) ? "Associate first to show balance of "  : (_depositMode ? _hidrBalance : _hbarBalance )}  { _depositMode ? " HIDR" : " HBAR"}
          </span>
          <div onClick={() => { _setDepositMode(!_depositMode) }} className="hover:bg-white/20  cursor-pointer flex flex-row items-center justify-between border sm:rounded-[15px] rounded-[8px] px-1 sm:px-2 py-1 gap-1">
            <img className="sm:w-[54px] sm:h-[54px] w-[24px] h-[24px]" src={ _depositMode ? hidrIcon : hbarIcon } />
            <span className="font-medium text-white text-[16px]">
              { _depositMode ? "HIDR" : "HBAR" }
            </span>
            <div>
            <Icon className="w-10 h-10 rotate-90  text-white sm:w-14 sm:h-14" icon="gg:swap-vertical" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-white/25 rounded-[15px] flex flex-col gap-2">
        <div className={`${Style.textSwapMini}`}>Deposit Address</div>
 {_accountAddress == "" ? <div className="flex justify-center pt-6 pb-10">
          <div  className="flex flex-row items-center gap-1 cursor-pointer justify-normal">
            <span className="text-white text-[16px] md:text-[28px] font-medium">
              { "Account Address Unavailable" }
            </span>
           
          </div>
        </div> :    <div className="flex justify-center pt-6 pb-10">
          <div onClick={handleCopy} className="flex flex-row items-center gap-1 cursor-pointer justify-normal">
            <span className="text-white text-[20px] md:text-[18px] font-medium">
              {_accountAddress.includes(".") ?  _accountAddress :formatAddress(_accountAddress) }
            </span>
            <Icon className="text-white" icon="clarity:copy-line" />
          </div>
        </div>
       }  
        {copySuccess && (
            <div className="text-center text-green-500 font-medium">
              Address copied to clipboard!
            </div>) }
      </div>


     

      <div className={`${Style.textSwapMini}`}>
        *Make sure you are using Hedera Network
      </div>
    </>  


  );
};


interface AssetWalletProps {
  _hidrBalance: number;
  _hbarBalance: number;
  _accountAddress: string;
  _conversionRate: number;
  _setWalletOpen: (value: boolean) => void;
  _associateToHidr: Function;


}



const AssetWallet: React.FC<AssetWalletProps> = ({
  _hidrBalance,
  _hbarBalance,
  _accountAddress,
  _conversionRate,
  _setWalletOpen,
  _associateToHidr,
  


}) => {


  
  return (
  
    <div className={`${Style.boxContent} gap-8`}> 
    {_accountAddress != ""  ?
       <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
              <img className="w-8 h-8 md:w-12 md:h-12" src={hbarIcon} />
              <div className="flex flex-col gap-0">
                  <span className="text-white text-[16px] md:text-[28px] font-medium">HBAR</span>
                  <span className={`${Style.textSwapMini}`}>Hedera</span>
              </div>
          </div>

          <div className="flex flex-col flex-wrap items-end gap-0">
            <span className="text-white text-[18px] md:text-[24px] font-medium">{_hbarBalance} HBAR</span>
            <span className={`${Style.textSwapMini}`}>Rp {(_hbarBalance*_conversionRate).toFixed(0)}</span>
          </div>
        </div>
        <br></br>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
              <img className="w-8 h-8 md:w-12 md:h-12" src={hidrIcon} />
              <div className="flex flex-col gap-0">
                  <span className="text-white text-[16px] md:text-[28px] font-medium">HIDR</span>
                  <span className={`${Style.textSwapMini}`}>XenHash IDR</span>
              </div>
          </div>

          <div className="flex flex-col flex-wrap items-end gap-0">
            { _hidrBalance != -0.01 ?
          <>
          <span className="text-white text-[18px] md:text-[24px] font-medium">{_hidrBalance} HIDR</span>
          <span className={`${Style.textSwapMini}`}>Rp {_hidrBalance}</span>
          </> :   <> <div className="h-2"></div>  <button onClick={()=>{_associateToHidr();}}  className={`px-2 h-8 md:h-12 rounded-[15px] bg-white/50 text-white text-[16px] font-medium hover:bg-white/60`}>Associate</button> </>}
          </div>
        </div>

        
</div>
      :   <div className={`justify-center items-center h-[300px] flex flex-col`}>

<div className="text-white text-[18px] md:text-[24px] font-medium">Connect wallet to track your asset on XenHash</div> 
<br></br>

<button onClick={()=>{_setWalletOpen(true)}}  className={` ${Style.buttonConnect} w-[60%]`}>Connect Wallet</button>

      </div> 
      
      
      }

        
      </div>
    
  )
}


interface Transaction {
  id: string;
  type: 'transfer' | 'swap'; 
  token_id?: string;
  from: string;
  to: string;
  amount: number;
  consensus_timestamp: string;
  transfers: Transfer[];
}


interface Transfer {
  account: string;
  amount: number;
  is_approval: boolean;
}

type TransactionType =
  | 'send_hbar'
  | 'receive_hbar'
  | 'send_hidr'
  | 'receive_hidr'
  | 'swap_hbar_to_hidr'
  | 'swap_hidr_to_hbar';

  interface FilteredTransaction {
    type: TransactionType;
    transaction: Transaction;
  }
  


  const filterTransactions = (transactions: Transaction[], accountId: string): FilteredTransaction[] => {
    if (!Array.isArray(transactions)) {
      console.error("Expected an array of transactions, but got:", transactions);
      return [];
    }
  
    return transactions.flatMap(transaction => {
      const result: FilteredTransaction[] = [];
   
      for (let index = 0; index < transaction.transfers.length; index++) {
        const transfer = transaction.transfers[index];

        if(transfer.account == accountId && transaction.token_id == appConfig.constants.HIDR_TOKEN_ID ){
          result.push({
            type:  `${transfer.amount < 0 ? "send_" : "receive_"}${"hidr"}`,
            transaction: {
              ...transaction,
              from: transfer.account,
              to: accountId,
              amount:  Math.abs(transfer.amount),
            },
          });
        
        } else   if(transfer.account == accountId && !transaction.token_id ){
          result.push({
            type:  `${transfer.amount < 0 ? "send_" : "receive_"}${"hbar"}`,
            transaction: {
              ...transaction,
              from: transfer.account,
              to: accountId,
              amount:  parseFloat((Math.abs(transfer.amount)/10**8).toPrecision(2))
            },
          });
        
        }
      
      }
     
  
      return result;
    });
  };
  
  const formatAddress = (data: string) => {
    if (data.length > 10) {
        return data.slice(0, 5) + '...' + data.slice(-5);
    } else {
        return data; // if the length is not sufficient, return the data as is
    }
};



  interface HistoryWalletProps {
   
    _accountAddress: string;
    _setWalletOpen: (value: boolean) => void;
    _transactions: FilteredTransaction[]
  
  }

const HistoryWallet: React.FC<HistoryWalletProps> = ({

  _accountAddress,
  _setWalletOpen,
  _transactions
  
}) => {
  


  const getIconForTransaction = (type: TransactionType) => {
    switch (type) {
      case 'send_hbar':
      case 'receive_hbar':
        return 'gg:swap-vertical';
      case 'swap_hbar_to_hidr':
      case 'swap_hidr_to_hbar':
        return 'gg:swap-vertical';
      default:
        return 'mdi:alert-circle-outline';
    }
  };

  function TransactionTimestamp({ timestamp }: { timestamp: string }) {
    // Convert the Unix timestamp string to a Date object
    const date = new Date(parseFloat(timestamp)*1000);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return <div className="text-white text-[14px] md:text-[16px]">Invalid Date</div>;
    }

    // Define options for date formatting
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' ,  };

    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <div className="text-white text-[14px] md:text-[16px]">
            {formattedDate}
        </div>
    );
}

  return (
    <div className={`${Style.boxContent}`}>
      {_accountAddress ? (
        <div className="flex flex-col gap-6 md:gap-10">
          {_transactions.map((filteredTx, index) => (
            
            <div className="flex flex-col" key={index}>
              <div className="text-white text-[14px] md:text-[16px]">
              <TransactionTimestamp timestamp={ filteredTx.transaction.consensus_timestamp} />
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3 md:gap-6">
                <IconHistory _iconSelect={getIconForTransaction(filteredTx.type)} />
                  <div className="flex flex-col gap-0">
                    <span className="text-white text-[14px] md:text-[18px] font-medium">
                      {filteredTx.type.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className={`${Style.textSwapMini}`}>{filteredTx.transaction.token_id == appConfig.constants.HIDR_TOKEN_ID ? "HIDR" : "HBAR"}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap items-end gap-0">
                  <span className="text-white text-[14px] md:text-[24px] font-medium">
                    
                    {filteredTx.type.includes('send') ? '-' : '+'} {filteredTx.transaction.amount} {filteredTx.type.includes('hidr') ? 'HIDR' : 'HBAR'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="justify-center items-center h-[300px] flex flex-col">
          <div className="text-white text-[18px] md:text-[24px] font-medium">
            Connect wallet to track your transactions on XenHash
          </div>
          <br />
          <button onClick={() => _setWalletOpen(true)} className={`${Style.buttonConnect} w-[60%]`}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};


interface IconHistoryProps {
    _iconSelect: string;
  }
  
  const IconHistory: React.FC<IconHistoryProps> = ({ _iconSelect }) => {
    return (
      <div className="z-[-50] relative w-8 h-8 text-white rounded-lg md:w-12 md:h-12 bg-white/25">
        <Icon className="w-full h-full" icon={_iconSelect} />
        <img 
          src={xsHbarIcon} 
          alt="xsHbar Icon"
          className="absolute right-[-8px] w-4 h-4 md:w-5 md:h-5 bottom-[-4px]" 
        />
      </div>
    );
  };


  

  interface DappsProps {
    
   
    _setWalletOpen: (value: boolean) => void;
  }
  
  const Dapps: React.FC<DappsProps> = ({ _setWalletOpen }) => {    
    
  
    const { accountId, walletInterface } = useWalletInterface();

  
    const [selectedMode, setMode] = useState(1);
    const [swapMode, setSwapMode] = useState(true);
    const [swapAmount, setSwapAmount] = useState(0);
    const [conversionRate, setConversionRate] = useState(0);
    const [hbarBalance, setHbarBalance] = useState(0);
    const [hidrBalance, setHidrBalance] = useState(0);
    const [sendAmount, setSendAmount] = useState(0);
    const [sendMode, setSendMode] = useState(true);
    const [sendToAddress,setSendtoAddress] = useState("");
    const [sendError, setSendError] = useState("");
    const [sendSuccess, setSendSuccess] = useState(false);
    const [depositMode, setDepositMode] = useState(true);
    const [swapError, setSwapError] = useState("");
    const [trackMode, setTrackMode] = useState(1);
    const [transactions, setTransactions] = useState<FilteredTransaction[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [gasFee, setGasFee] = useState(0);


    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
    


    useEffect(() => {
        if (accountId) {
            getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID)
                .then(({ hbarBalance, tokenBalance }) => {
                    setHbarBalance(hbarBalance);
                    setHidrBalance(tokenBalance);
                })
                .catch(error => {
                    console.error('Failed to fetch balances:', error);
                });
                fetchTransactions(accountId, appConfig.constants.HIDR_TOKEN_ID).then(({transactions}) => {
                 setTransactions(transactions);
              })
              .catch(error => {
                  console.error('Failed to fetch balances:', error);
              });

              getPriceFeed() .then(({ convertionRateValue }) => {setConversionRate(convertionRateValue);})  .catch(error => {
              fetchGasFee() .then(({ gasFee }) => {setGasFee(gasFee);})  .catch(error => {
              
                  console.error('Failed to fetch gasFee:', error);
              });
                console.error('Failed to fetch convertionRateValue:', error);
            });
           
            const intervalId = setInterval(() => {
              getPriceFeed() .then(({ convertionRateValue }) => {setConversionRate(convertionRateValue);})  .catch(error => {
              
                console.error('Failed to fetch convertionRateValue:', error);
            });
            fetchGasFee() .then(({ gasFee }) => {setGasFee(gasFee);})  .catch(error => {
              console.error('Failed to fetch gasFee:', error);
          });
          }, 3000); 

          return () => clearInterval(intervalId);     
        }
    }, [accountId]);

    //API of pricefeed that get from oracle save in the database for show to user in web
  
    const getPriceFeed = async (): Promise<{ convertionRateValue: number }> => {
      const apiUrl = `${appConfig.constants.PRICE_FEED_URL}/hbar-to-idr`;
  
      try {
         
          const response = await axios.get(apiUrl);
          const data = response.data;
  
          
          if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0].Data) || data[0].Data.length === 0) {
              throw new Error('Invalid data format');
          }
  
          const value = data[0].Data[0].valueNow;

          return { convertionRateValue: value };
  
      } catch (error) {
          // console.error('Error fetching price feed:', error);
  
          // Handle errors or return a default value
          return { convertionRateValue: 0 };
      }
  };
    
    
  

    const getAccountBalances = async (accountId: string, tokenId: string): Promise<{ hbarBalance: number; tokenBalance: number }> => {
        try {
            const response = await axios.get(`${appConfig.constants.API_BASE_URL}/accounts/${accountId}`);
            const tokens = response.data.balance.tokens as Array<{ token_id: string; balance: number }>;

            const hbarBalance =  parseFloat((response.data.balance.balance/10**8).toFixed(2));
            console.log(hbarBalance);
            var tokenBalance =  tokens.find(token => token.token_id === tokenId)?.balance ?? -1;
            tokenBalance =  parseFloat((tokenBalance/10**2).toPrecision(2));
            
            console.log(hbarBalance);
            return { hbarBalance, tokenBalance };
        } catch (error) {
            console.error('Error fetching account balances:', error);
            return { hbarBalance: 0, tokenBalance: -1 };
        }
    };

    

    const fetchTransactions =async (_accountId: string, _tokenId: string): Promise<{ transactions: FilteredTransaction[]; }> => {
      try {
        var apiUrl = "";
        if(_accountId.includes(".")){
          apiUrl = `/transactions/?account.id=${_accountId}`
        } else {
          apiUrl = `/accounts/${_accountId}`
        }
        const response = await fetch(`${appConfig.constants.API_BASE_URL}${apiUrl}`);
      
        const data = await response.json();

        const accountId = _accountId.includes(".") ?  _accountId : data.account;

        // Debugging: Log the response to see the structure
        // console.log("API Response:", data);

        const filteredTransactions = filterTransactions(data.transactions, accountId);
        console.log(filteredTransactions);
        setTransactions(filteredTransactions);
        return { transactions: filteredTransactions };

      } catch (error) {
        console.error('Error fetching transactions:', error);
        return {transactions: []}
      }
    };

    const fetchGasFee = async (): Promise<{ gasFee: number }> => {
      try {
        const response = await axios.get(`${appConfig.constants.API_BASE_URL}/network/fees`);
        
        
        const data = response.data;
          
        const gasFee = (data.fees[2].gas / 10**8)

      console.log(gasFee);
    
        return { gasFee: gasFee };
      } catch (error) {
        console.error('Failed to fetch gas fee data:', error);
        return { gasFee: 0 }; // Return a default value in case of error
      }
    };
    
    const refresh = async(_accountId: string, _tokenId: string) => {
      setIsRefreshing(true);
      if (accountId) {
       await  getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID)
            .then(({ hbarBalance, tokenBalance }) => {
                setHbarBalance(hbarBalance);
                setHidrBalance(tokenBalance);
            })
            .catch(error => {
                console.error('Failed to fetch balances:', error);
            });
          await  fetchTransactions(accountId, appConfig.constants.HIDR_TOKEN_ID).then(({transactions}) => {
             setTransactions(transactions);
          })
          .catch(error => {
              console.error('Failed to fetch balances:', error);
          });

          await getPriceFeed() .then(({ convertionRateValue }) => {setConversionRate(convertionRateValue);})  .catch(error => {
              
            console.error('Failed to fetch convertionRateValue:', error);
        });

        await fetchGasFee() .then(({ gasFee }) => {setGasFee(gasFee);})  .catch(error => {
              
          console.error('Failed to fetch gasFee:', error);
      });
    }
      setIsRefreshing(false);
     
    }


    const isTokenAssociated = async (accountId: string, tokenId: string): Promise<boolean> => {
      try {
          const response = await axios.get(`${appConfig.constants.API_BASE_URL}/${accountId}/tokens`);
          const tokens = response.data.tokens as Array<{ token_id: string }>;
  
          // Check if the tokenId exists in the tokens array
          const isAssociated = tokens.some(token => token.token_id === tokenId);
  
          return isAssociated;
      } catch (error) {
          console.error('Error checking token association:', error);
          return false; // Return false if there's an error
      }
  };
  


    const associateAccountToHIDR = async () => {
        if (!walletInterface) return;
        try {
          Swal.fire({
        
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#5D6064",
            title: 'Confirm the transaction in your wallet\n&\n Wait for the processing.\n',
            customClass: { title: "text-white"},
            showConfirmButton: true,
            allowOutsideClick: true,
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
                
            }
        });
            const txId = await walletInterface.associateHIDR();

            if(txId != null){
              Swal.fire({
                background: "#212529",
                iconColor: "#ffffff",
                confirmButtonColor: "#5D6064",
                title: `Check your transaction in the blockchain!`,
                customClass: { title: "text-white" },
                icon: "success",
                confirmButtonText: "Check in HashScan",
                preConfirm: () => {
                    // Action to perform when the button is clicked
                    // For example, redirect to the transaction URL
                    window.open(`https://hashscan.io/testnet/transaction/${txId}`);
                }
            });
            }  else{
              Swal.close();
            }


            getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID)
            .then(({ hbarBalance, tokenBalance }) => {
                setHbarBalance(hbarBalance);
                setHidrBalance(tokenBalance);
            })
            .catch(error => {
                console.error('Failed to fetch balances:', error);
            });
          console.log("Associate account to HIDR successful, TxID:", txId);
        } catch (error) {
          console.error("Associate account to HIDR failed:", error);
        }
      };


      const handleSwapHbarToHIDR = async () => {
        if (!walletInterface) return;
  
            try {
                Swal.fire({
                    background: "#212529",
                    iconColor: "#ffffff",
                    confirmButtonColor: "#5D6064",
                    title: 'Confirm the transaction in your wallet\n&\n Wait for the processing.\n',
                    customClass: { title: "text-white" },
                    showConfirmButton: true,
                    allowOutsideClick: true,
                    didOpen: () => {
                        Swal.showLoading(); // Show the loading spinner
                    }
                });
    
                // Create the parameter builder
                const functionParameters = new ContractFunctionParameterBuilder()
                    .addParam({ type: "uint256", name: "swapAmount", value: swapAmount})
    
                // Call the swap function
                const txId = await walletInterface.swapHIDRtoHBAR(functionParameters, appConfig.constants.METAMASK_GAS_LIMIT_SWAP);
    
                if (txId != null) {
                    Swal.fire({
                        background: "#212529",
                        iconColor: "#ffffff",
                        confirmButtonColor: "#5D6064",
                        title: `Check your transaction in the blockchain!`,
                        customClass: { title: "text-white" },
                        icon: "success",
                        confirmButtonText: "Check in HashScan",
                        preConfirm: () => {
                            window.open(`https://hashscan.io/testnet/transaction/${txId}`);
                        }
                    });
                } else {
                    Swal.close();
                }
            } catch (error) {
                console.error("HIDR Transfer failed:", error);
            }
       
    };




    const handleSwapHIDRToHbar = async () => {
      if (!walletInterface) return;
  
   
          try {
              Swal.fire({
                  background: "#212529",
                  iconColor: "#ffffff",
                  confirmButtonColor: "#5D6064",
                  title: 'Confirm the transaction in your wallet\n&\n Wait for the processing.\n',
                  customClass: { title: "text-white" },
                  showConfirmButton: true,
                  allowOutsideClick: true,
                  didOpen: () => {
                      Swal.showLoading(); // Show the loading spinner
                  }
              });
  
              // Create the parameter builder
              const functionParameters = new ContractFunctionParameterBuilder()
                  .addParam({ type: "uint256", name: "swapAmount", value: swapAmount })
  
              // Call the swap function
              const txId = await walletInterface.swapHIDRtoHBAR(functionParameters, appConfig.constants.METAMASK_GAS_LIMIT_SWAP);
  
              if (txId != null) {
                  Swal.fire({
                      background: "#212529",
                      iconColor: "#ffffff",
                      confirmButtonColor: "#5D6064",
                      title: `Check your transaction in the blockchain!`,
                      customClass: { title: "text-white" },
                      icon: "success",
                      confirmButtonText: "Check in HashScan",
                      preConfirm: () => {
                          window.open(`https://hashscan.io/testnet/transaction/${txId}`);
                      }
                  });
              } else {
                  Swal.close();
              }
          } catch (error) {
              console.error("HIDR Transfer failed:", error);
          }
     
  };
  
    



  const handleTransferHBAR = async () => {
    if (!walletInterface) return;
    if(isValidAccountId(sendToAddress)){
      try {
        Swal.fire({
        
          background: "#212529",
          iconColor: "#ffffff",
          confirmButtonColor: "#5D6064",
          title: 'Confirm the transaction in your wallet\n&\n Wait for the processing.\n',
          customClass: { title: "text-white"},
          showConfirmButton: true,
          allowOutsideClick: true,
          didOpen: () => {
              Swal.showLoading(); // Show the loading spinner
              
          }
      });
        
        const txId = await walletInterface.transferHBAR(AccountId.fromString(sendToAddress), sendAmount);
        
        if(txId != null){
          Swal.fire({
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#5D6064",
            title: `Check your transaction in the blockchain!`,
            customClass: { title: "text-white" },
            icon: "success",
            confirmButtonText: "Check in HashScan",
            preConfirm: () => {
                // Action to perform when the button is clicked
                // For example, redirect to the transaction URL
                window.open(`https://hashscan.io/testnet/transaction/${txId}`);
            }
        });
        }  else{
          Swal.close();
        }
      } catch (error) {
        console.error("HIDR Transfer failed:", error);
      }
    } else{
      setSendError("The address you send is not a valid address!");
    }
  
  };

  const handleTransferHIDR = async () => {
    if (!walletInterface) return;
    if(isValidAccountId(sendToAddress)){
      try {
        const accountAssociatedStatus = await isTokenAssociated(sendToAddress , appConfig.constants.HIDR_TOKEN_ID);
        if(accountAssociatedStatus ) {
          Swal.fire({
        
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#5D6064",
            title: 'Confirm the transaction in your wallet\n&\n Wait for the processing.\n',
            customClass: { title: "text-white"},
            showConfirmButton: true,
            allowOutsideClick: true,
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
                
            }
        });
          const txId = await walletInterface.transferHIDR(AccountId.fromString(sendToAddress), sendAmount);
          if(txId != null){
            Swal.fire({
              background: "#212529",
              iconColor: "#ffffff",
              confirmButtonColor: "#5D6064",
              title: `Check your transaction in the blockchain!`,
              customClass: { title: "text-white" },
              icon: "success",
              confirmButtonText: "Check in HashScan",
              preConfirm: () => {
                  // Action to perform when the button is clicked
                  // For example, redirect to the transaction URL
                  window.open(`https://hashscan.io/testnet/transaction/${txId}`);
              }
          });
          }  else{
            Swal.close();
          }
        } else {
          setSendError("The address you send to not associate yet to HIDR!");
        }
       
      } catch (error) {
        console.error("HIDR Transfer failed:", error);
      }
    } else{
      setSendError("The address you send is not a valid address!");
    }
  
  };


const isValidAccountId = (accountId: string): boolean => {
  try {
      // Try to parse the accountId using AccountId.fromString()
      const parsedAccountId = AccountId.fromString(accountId);

      // If the parsing succeeds, return true
      return !!parsedAccountId;
  } catch (error) {
      // If an error is thrown, return false indicating invalid accountId
      console.error('Invalid AccountId:', error);
      return false;
  }
};

const payQRISHandle = () => {

    Swal.fire({
     background: "#212529",
     iconColor: "#ffffff",
     confirmButtonColor: "#5D6064",
      title: "Coming Soon!\nLaunch on Mainnet",
      customClass: {title: "text-white"},
      icon: "info",
      confirmButtonText: "Okay",
    });
}



const handleGoingOutsideWeb = (externalLink: string, titleLink: string) => {
  Swal.fire({
      background: "#212529",
      iconColor: "#ffffff",
      confirmButtonColor: "#5D6064",
      title: `${titleLink}`,
      text: "You are going to visit an external web of XenHash",
      customClass: {
          title: "text-white",
      },
      icon: "question",
      confirmButtonText: "Open",
      preConfirm: () => {
          // Action to perform when the button is clicked
          // For example, redirect to the transaction URL
          window.open(`${externalLink}`);
      }
  });
}


  return (
    <>
      {/* Navigation Menus */}

     
      {/* Pay with HIDR */}
      <section id="Pay" className="mx-4 lg:container lg:mx-auto ">
        <div className="flex flex-col h-[900px] md:h-[1200px] lg:h-[900px] gap-8 justify-center">
          <h2 className={`${Style.textHead} text-center`}>
            Pay with HIDR on Any QRIS Merchant
          </h2>

          {/* Box */}
          <div className={`${Style.boxContainer}`}>
            
           
         
 {(walletInterface !== null && hidrBalance != -0.01)?


            ( 
            <div className={`${Style.boxContent}`}>
              
              <div className="text-white text-[16px] font-semibold">
                Your HIDR Balance
              </div>
              <div className="flex flex-col gap-1 md:py-16 lg:py-6 xl:py-3">
                <div className="flex flex-row items-end justify-center gap-2">
                  <h3 className={`${Style.textBalance}`}>{hidrBalance}</h3>
                  <span className={`${Style.textHIDR}`}>HIDR</span>
                </div>
                <span className={`${Style.textRealPrice} text-center`}>
                  Rp {hidrBalance}
                </span>
              </div>
            </div> )  : (walletInterface !== null && hidrBalance == -0.01) ? 
           <div className={`${Style.boxContent}`}>
              
           <div className="text-white text-[16px] font-semibold">
             Your HIDR Balance
           </div>
           <div className="flex flex-col gap-1 md:py-16 lg:py-6 xl:py-3">
             <div className="flex flex-row items-end justify-center gap-2">
               <h3 className={`${Style.textBalance} font-`}>Associate HIDR to Show Balance</h3>
             </div>
             
           </div>
         </div> : <div></div>
} 

           {(walletInterface !== null && hidrBalance != -0.01) ?
            (
           <div>
            {/* HIDR Button */}
            <div className={`${Style.boxContentButton}`}>
              <button  onClick={()=>{
                payQRISHandle();
              }} className={`${Style.buttonConnect}`}>Pay Now</button>

              <div className="flex flex-row justify-between">
                <div className={`${Style.textRealGlobalPrice}`}>
                  1 HIDR = 1 IDR
                </div>
                <GasFee _gasFee={`${(gasFee*conversionRate).toPrecision(2)}`} />
              </div>
            </div>

            <p className="text-base text-center text-white">
              *Use mobile phone to scan QRIS Merchant
            </p>
            </div>) : (walletInterface !== null && hidrBalance == -0.01) ? <div>

            <div className={`${Style.boxContentButton}`}>
              <button onClick={()=>{associateAccountToHIDR()}}  className={`${Style.buttonConnect}`}>Associate</button>

              <div className="flex flex-row justify-between">
               
              </div> 
            </div>

            </div> :  <div>

<div className={`${Style.boxContentButton}`}>
  <button onClick={()=>{_setWalletOpen(true)}}  className={`${Style.buttonConnect}`}>Connect Wallet</button>

  <div className="flex flex-row justify-between">
   
  </div> 
</div>

</div> }




          </div>
        </div>
      </section>

      {/* How to Use */}
      <section id="HowToUse" className="mx-4 lg:container lg:mx-auto">
        <div className="flex flex-col justify-center gap-8 md:gap-20 lg:mx-6 xl:mx-0">
          <h2 className={`${Style.textHead} text-center`}>
            Learn How to Use XenHash Clearly
          </h2>
          
          {/* Row Content */}
          <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between lg:mx-">
              <img className="h-auto w-full md:w-[40%] 2xl:w-[30%] flex items-center justify-center" src={downloadCoin}  />
              <div className="flex flex-col gap-8">
                <h4 className="text-white text-[16px] md:text-[24px] font-normal">Deposit HBAR using the Hedera network into your Web3 wallet.</h4>
                <div onClick={()=>{setMode(3); scrollToSection("Swap-Send-Deposit-Section"); }} className="flex flex-start"><ButtonLink _buttonText={`Try Deposit`}/></div> 
              </div>
          </div>

          {/* Row Content Reverse */}
          <div className="flex flex-col gap-16 md:flex-row-reverse md:items-center md:justify-between lg:mx-">
          <img className="h-auto w-full md:w-[50%] 2xl:w-[40%] flex items-center justify-center" src={hCoinEth}  />
              <div className="flex flex-col gap-8">
                <h4 className="text-white text-[16px] md:text-[24px] font-normal">If you have HBAR on the other network, you can bridge it using Hashport.</h4>
                <div className="flex flex-start" onClick={()=>{handleGoingOutsideWeb("https://app.hashport.network/?from=0x14ab470682Bc045336B1df6262d538cB6c35eA2A-1&to=HBAR-295", "Hashport")}}><  ButtonLink _buttonText={`Bridge Now`}/></div> 
              </div>
          </div>

          {/* Row Content */}
          <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between lg:mx-">
          <img className="h-auto w-full md:w-[40%] 2xl:w-[30%] flex items-center justify-center" src={bitcoin}  />
              <div className="flex flex-col gap-8">
                <h4 className="text-white text-[16px] md:text-[24px] font-normal">If you have other assets on the Hedera network, and want to swap them for HBAR using SaucerSwap.</h4>
                
               <div className="flex flex-start" onClick={()=>{handleGoingOutsideWeb( "https://www.saucerswap.finance/swap/0.0.1055472/HBAR", "SaucerSwap")}}><ButtonLink _buttonText={`Swap Now`}/></div> 
              </div>
          </div>

          {/* Row Content Reverse */}
          <div className="flex flex-col gap-16 md:flex-row-reverse md:items-center md:justify-between lg:mx-">
          <img className="h-auto w-full md:w-[50%] 2xl:w-[40%] flex items-center justify-center" src={swapCoin}  />
              <div className="flex flex-col gap-8">
                <h4 className="text-white text-[16px] md:text-[24px] font-normal">You can swap your HBAR for HIDR to make payments via QRIS.
                </h4>
                <div onClick={()=>{setMode(1); scrollToSection("Swap-Send-Deposit-Section"); }} className="flex flex-start"><ButtonLink _buttonText={`Swap $HIDR`}/></div>
              </div>
          </div>

          {/* Row Content */}
          <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between lg:mx-">
          <img className="h-auto w-full md:w-[40%] 2xl:w-[30%] flex items-center justify-center" src={qrCoin}  />
              <div className="flex flex-col gap-8">
                <h4 className="text-white text-[16px] md:text-[24px] font-normal">Scan the QRIS code to complete your payment, and ensure you have enough HIDR.</h4>
                <div onClick={()=>{scrollToSection("Pay");}} className="flex flex-start"><ButtonLink _buttonText={`Pay Now`}/></div>
              </div>
          </div>

          
        </div>
      </section>

      {/* Swap & Send & Deposit setence*/}
      <section id="Swap-Send-Deposit-Section" className="mx-4 lg:container lg:mx-auto mt-[100px]">
        <div className="flex flex-col justify-center gap-8 md:gap-20 lg:mx-6 xl:mx-0">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            
            
          
            <h2 className={`${Style.textHead}`}>
          {selectedMode == 1 ?   "Swap HBAR" : selectedMode ==2 ? "Easy to Send HBAR & HIDR" : "Deposit with Hedera Account ID or EVM Address"}
           </h2>

           { selectedMode == 1 ?
            <Icon className="z-[-10] rotate-90 lg:rotate-0" color="#fff" width={`60px`} height={`60px`} icon="gg:swap" />  : null}
            
            { selectedMode == 1 ? 
            <h2 className={`${Style.textHead}`}>
            HIDR Seamlessly
            </h2>  : null  }
           
          </div>

          {/* Box Swap, send, deposit */}
          <div className={`${Style.boxContainer}`}>
            <div className={`${Style.boxContent}`}>
                {/* Swap, Send, Deposit */}
                <div className="flex justify-between  items-center w-full">

  <div className="flex flex-row gap-3 px-1 py-1 border-[0.1px] rounded-full w-full sm:w-auto">
    <span
      onClick={() => {
        setMode(1);
      }}
      className={`text-white text-[14px] md:text-[16px] hover:bg-white/25 py-2 px-1 ${
        selectedMode == 1 ? "bg-white/25" : ""
      } rounded-full sm:w-[100px] w-full text-center`}
    >
      Swap
    </span>
    <span
      onClick={() => {
        setMode(2);
      }}
      className={`text-white text-[14px] md:text-[16px] hover:bg-white/25 py-2 px-1 ${
        selectedMode == 2 ? "bg-white/25" : ""
      } rounded-full sm:w-[100px] w-full text-center`}
    >
      Send
    </span>
    <span
      onClick={() => {
        setMode(3);
      }}
      className={`text-white text-[14px] md:text-[16px] hover:bg-white/25 py-2 px-1 ${
        selectedMode == 3 ? "bg-white/25" : ""
      } rounded-full sm:w-[100px] w-full text-center`}
    >
      Deposit
    </span>
  </div>
  <span
    className="px-5 py-2 justify-center"
    
  > <button onClick={() => {
    refresh(accountId ? accountId : "", appConfig.constants.HIDR_TOKEN_ID);
  }}> 
<Icon className={`md:text-[30px] text-[20px] text-white ${isRefreshing ? "animate-spin" : ""}`}
                    icon="solar:refresh-line-duotone"
                />

  </button>
 
  </span>
</div>

                

                {/* Swap, Send, Deposit FORM */}
                {selectedMode == 1 ?  <SwapForm  _swapError={swapError} _setSwapError={setSwapError} _accountAddress={accountId ? accountId : ""} _setSwapMode={setSwapMode} _swapMode={swapMode}  _swapAmount={swapAmount} _setSwapAmount={setSwapAmount} _convertionRate={conversionRate} _setConvertionRate={setConversionRate} _hbarBalance={hbarBalance} _hidrBalance={hidrBalance}/> : selectedMode == 2 ?   <SendForm   _convertionRate={conversionRate} _accountAddress={accountId ? accountId : ""} _hidrBalance={hidrBalance} _hbarBalance={hbarBalance} _sendAmount={sendAmount} _sendMode={sendMode} _setSendAmount={setSendAmount} _setSendMode={setSendMode}  _sendToAddress={sendToAddress} _setSendToAddress={setSendtoAddress} _setSendError={setSendError} _sendError={sendError} _sendSuccess={sendSuccess} _setSendSuccess={setSendSuccess}/> :
                <DepositForm _depositMode={depositMode} _setDepositMode={setDepositMode} _hbarBalance={hbarBalance} _hidrBalance={hidrBalance} _accountAddress={accountId ? accountId : ""}/>}
               
               
            </div>
           
         { walletInterface !== null  && ( selectedMode == 1 && hidrBalance != -0.01?
            <div className={`${Style.boxContentButton}`}>
                <button  onClick={()=>{swapMode? handleSwapHbarToHIDR() : handleSwapHIDRToHbar();}} className={`${Style.buttonConnect}`}>Swap</button>

                <div className="flex flex-row justify-between">
                  <div className={`${Style.textRealGlobalPrice}`}>
                    1 HIDR = 1 IDR
                  </div>
                  <GasFee _gasFee={`${(gasFee*conversionRate).toPrecision(2)}`} />
                </div>
              </div> :  selectedMode == 2 ? <div className={`${Style.boxContentButton}`}>

                {hidrBalance == -0.01 && !sendMode ?   <button onClick={()=>{associateAccountToHIDR();}} className={`${Style.buttonConnect}`}>Associate</button> : 
                  <button onClick={sendMode == true ? handleTransferHBAR : handleTransferHIDR} className={`${Style.buttonConnect}`}>Send</button>
                    }
              
                <div className="flex flex-row justify-between">
                  <div className={`${Style.textRealGlobalPrice}`}>
                    1 HIDR = 1 IDR
                  </div>
                  <GasFee _gasFee={`${(gasFee*conversionRate).toPrecision(2)}`} />
                </div>
              </div>  : (hidrBalance == -0.01 && depositMode == true) ? <div className={`${Style.boxContentButton}`}>
                <button onClick={()=>{associateAccountToHIDR();}} className={`${Style.buttonConnect}`}>Associate</button>

               
              </div> : null  )
  } 
  
  {

    walletInterface == null ?
  <div>
  <div className={`${Style.boxContentButton}`}>
    <button onClick={()=>{_setWalletOpen(true)}}  className={`${Style.buttonConnect}`}>Connect Wallet</button>
    <div className="flex flex-row justify-between">
    </div> 
  </div>
  
  </div> : null}


          </div> 
          
        </div>
      </section>

      {/* Assets */}
      <section id="Assets" className="mx-4 lg:container lg:mx-auto mt-[100px]">
        <div className="flex flex-col justify-center gap-8 md:gap-20 lg:mx-6 xl:mx-0">
        <h2 className={`${Style.textHead} text-center`}>
          Track Your Asset and Spending Easily
          </h2>
        </div>

        <div className={`${Style.boxContainer} mt-10 md:mt-24`}>
            <div className={`${Style.boxContent}`}>
                {/* Asset & History Button */}
                <div className="flex justify-center">
                  <div className="flex flex-row gap-3 px-1 py-1 border-[0.1px] rounded-full w-full justify-between">
                    <span  onClick={()=>{setTrackMode(1); getAccountBalances(accountId ? accountId : "", appConfig.constants.HIDR_TOKEN_ID);}} className={`text-white text-[14px] md:text-[16px] hover:bg-white/25   ${trackMode == 1 ? "bg-white/25" : "" } py-2 px-1 rounded-full  w-full text-center`}>Asset</span>
                    <span  onClick={()=>{setTrackMode(2); fetchTransactions(accountId ? accountId : "", appConfig.constants.HIDR_TOKEN_ID);}} className={`text-white text-[14px] md:text-[16px] hover:bg-white/25  ${trackMode == 2 ? "bg-white/25" : "" } py-2 px-1 rounded-full  w-full text-center`}>History</span>
                  </div>
                </div> 

              {  walletInterface  != null }

                {trackMode == 1 ?   < AssetWallet  _associateToHidr={associateAccountToHIDR} _setWalletOpen={_setWalletOpen} _accountAddress={accountId ? accountId : ""} _conversionRate={conversionRate} _hbarBalance={hbarBalance} _hidrBalance={hidrBalance}/> :  <HistoryWallet _transactions={transactions} _setWalletOpen={_setWalletOpen} _accountAddress={accountId ? accountId : ""} />}
                
            </div>
        </div>
      </section>
      
   
    </>
  );
}

export default Dapps;