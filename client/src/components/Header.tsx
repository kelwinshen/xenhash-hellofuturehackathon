import { useState, useEffect, useRef } from 'react';
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo.svg";
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import { WalletSelectionDialog } from './WalletSelectionDialog'
import { metamaskHedera, walletConnectHedera } from '../assets';


interface HeaderProps {
  _walletOpen: boolean
  _setWalletOpen: (value: boolean) => void;
 
}


const  Header: React.FC<HeaderProps> = ({   _walletOpen ,   _setWalletOpen}) => {
  
    const { accountId, walletInterface } = useWalletInterface();

    const handleConnect = async () => {
        if (accountId) {
            walletInterface.disconnect();
        } else {
          _setWalletOpen(true);
           
        }
    };


    const [isMenuVisible, setIsMenuVisible] = useState(false);

    
    const menuRef = useRef<HTMLDivElement | null>(null);
 
    



   

    const toggleMenuVisibility = () => {
        setIsMenuVisible((prev) => !prev);
      
    };

   

  
    const formatAddress = (data: string) => {
        if (data.length > 10) {
            return data.slice(0, 5) + '...' + data.slice(-5);
        } else {
            return data; // if the length is not sufficient, return the data as is
        }
    };

    useEffect(() => {
        if (accountId) {
          _setWalletOpen(false);
        }
    }, [accountId]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsMenuVisible(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);





    

    return (
        <>
        <div className='bg-black/10 backdrop-blur-lg fixed w-full justify-between z-50'>
          <div className="border-b-[0.1px] border-[#fff]/30 py-[30px] px-6">
            <nav className="flex container mx-auto justify-between items-center">
              <div className="">
                <img src={logo} alt="xenhash-logo" className="w-[170px] h-[50px]" />
              </div>
            
              <div className='relative flex items-center md:mr-[20px]'>
                <div className='w-[20px]'></div>
                 { accountId ? 
              <div   className="flex justify-center items-center h-[42px]  w-[42px] md:h-[50px]  md:w-[50px]  30px py-1 px-1 text-white bg-white/5 border-[0.3px] rounded-[8px] md:text-[16px] text-[12px] font-normal"
              >  <img src={ accountId?.includes(".") ? walletConnectHedera : metamaskHedera} className="sm:h-[25px] h-[20px]" /></div>
                  : null  }
                 
                
                <div className='w-[20px]'></div>
                { accountId ? (
                  <>
                    <button
                      onClick={toggleMenuVisibility}
                      className="py-3 px-6 text-white bg-white/5 border-[0.3px] rounded-[8px] md:text-[16px] text-[12px] font-normal"
                    > 
                    {   accountId.includes('.') ? accountId : formatAddress(accountId)}
                   
                    </button>
  
                   
                    {isMenuVisible && (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 w-60 backdrop-blur-lg bg-black/5 shadow-lg rounded-[8px] py-2 px-2 border-[0.3px]"
    >
    
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-white font-normal rounded-[5px] hover:bg-[white]/5"
        onClick={() => {
          console.log('Disconnect');
          handleConnect();
          setIsMenuVisible(false); // Close menu on disconnect
          
        }}
      >
        <span className="ml-3">Disconnect</span>
        <FiLogOut  size={"20px"} />
      </button>
    </div>
  )}
                  </>
                ) : (
                  <button
                    onClick={handleConnect}
                    className="py-3 px-6 text-white bg-white/5 border-[0.3px] rounded-[8px] text-[16px] font-normal"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
        
       {_walletOpen &&
          <WalletSelectionDialog  _setWalletOpen={_setWalletOpen}   />}
      
      </>
    );
}

export default Header;





