import { motion } from "framer-motion";
import { btcCOINDAPPS, downloadCoin, hCoinEth, qrCoin, swapUSDT } from "../assets";

import {Style} from "../style";

// const transactionid = [
//     {   id: 1,
//         title: "Swap your BTC, ETH, USDT to HIDR",
//         paragraph: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//         src: swapUSDT,
//     },
//     {   id: 2,
//         title: "Scan QRIS on Merchant",
//         paragraph: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//         src: payHIDR,
//     },
//     {   id: 3,
//         title:  "Pay with HIDR",
//         paragraph: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//         src: payHIDR,
//     },
//     {   id: 4,
//         title:  "Enjoy Your Coffee ☕️",
//         paragraph: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//         src: enjoyCoffee,
//     },
// ]



function HowtoUse() {
    // const [howToUseid, sethowToUseid] = useState(1);

  return (
    // <div className="flex flex-col gap-8 sm:mx-10 sm:gap-28">
    //   <h2 className="textHead-lg">Simplyfied your transaction using XenHash</h2>

    //   <div className="flex flex-col sm:flex-row sm:justify-between">
        
    //     <div className="flex flex-col gap-4 sm:flex-initial sm:w-[453px]">
          
    //       {/* Loop here */}
    //       {transactionid.map((content)=>(
    //        <div  onClick={()=>{sethowToUseid(content.id)}}   key={content.id} className={howToUseid==content.id ? 'px-6 py-6 border-[0.1px] bg-white/5 rounded-[10px] cursor-pointer' : 'px-6 py-6 border-[0.1px] bg-white/0 rounded-[10px] cursor-pointer'}>
    //        <h4 className="text-[18px] font-bold text-white">
    //        {content.title}
    //        </h4>
           
    //        {howToUseid == content.id ? <p className={`textParagraph`}>
    //        {content.paragraph}
    //        </p> : null}
    //  </div>
    //       ))}
    //       {/* end Loop here */}

    //     </div>

    //     {/* image slide */}
    //     <div className="flex flex-row justify-center py-8 sm:flex-initial sm:w-[60%] md:items-center">
    //       <img
    //         src={transactionid[howToUseid-1].src}
    //         className="drop-shadow-[0_4px_200px_rgba(255,255,255,0.5)] w-[500px] h-fit"
    //       />
    //     </div>
    //   </div>
    // </div>
      
      <>
        <div className="flex flex-col justify-center gap-8 md:gap-20 lg:mx-6 xl:mx-0">
          <motion.h2
          initial={{opacity: 0}}
          whileInView={{opacity:1}}
          transition={{duration: 1, delay:0.1}}
          viewport={{ once: true }}
          className={`${Style.textHead} text-center`}>
            Learn How to Use XenHash Clearly
          </motion.h2>
          
          {/* Row Content */}
          <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between lg:container">
              <div className="flex justify-center md:justify-start">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:0.1}}
                viewport={{ once: true }}
                className="h-auto w-[80%] md:w-[90%] lg:w-[80%] flex items-center justify-center" src={downloadCoin} alt="" />
              </div>
              <div className="flex flex-col gap-8">
                <motion.h4 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:0.1}}
                viewport={{ once: true }}
                className="text-white text-[16px] md:text-[24px] font-normal">Deposit HBAR using the Hedera network into your Web3 wallet.</motion.h4>
                
              </div>
          </div>

          {/* Row Content Reverse */}
          <div className="flex flex-col gap-16 md:flex-row-reverse md:items-center md:justify-between">
              <div className="flex justify-center md:justify-end">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:0.1}}
                viewport={{ once: true }}
                className="h-auto w-[90%] md:w-[90%] lg:w-[80%] flex items-center justify-center" src={hCoinEth} alt="" />
              </div>
              <div className="flex flex-col gap-8 md:pl-12">
                <motion.h4 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:0.1}}
                viewport={{ once: true }}
                className="text-white text-[16px] md:text-[24px] font-normal">If you have HBAR on the other network, you can bridge it using Hashport.</motion.h4>
                
              </div>
          </div>

          {/* Row Content */}
          <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between lg:container">
              <div className="flex justify-center md:justify-start">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="h-auto w-[85%] md:w-[90%] lg:w-[90%] flex items-center justify-center" src={btcCOINDAPPS} alt=""  />
              </div>
              <div className="flex flex-col gap-8">
                <motion.h4 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="text-white text-[16px] md:text-[24px] font-normal">If you have other assets on the Hedera network, and want to swap them for HBAR using SaucerSwap.</motion.h4>
                
              </div>
          </div>

          {/* Row Content Reverse */}
          <div className="flex flex-col gap-16 md:flex-row-reverse md:items-center md:justify-between lg:container">
              <div className="flex justify-center md:justify-end">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="h-auto w-[90%] md:w-[90%] lg:w-[80%] flex items-center justify-center" src={swapUSDT} alt=""  />
              </div>
              <div className="flex flex-col gap-8 md:pl-12">
                <motion.h4 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="text-white text-[16px] md:text-[24px] font-normal">You can swap your HBAR for HIDR to make payments via QRIS.</motion.h4>
                
              </div>
          </div>

          {/* Row Content */}
          <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between lg:container">
              <div className="flex justify-center md:justify-start">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="h-auto w-[90%] md:w-[90%] lg:w-[80%] flex items-center justify-center" src={qrCoin} alt=""  />
              </div>
              <div className="flex flex-col gap-8">
                <motion.h4 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="text-white text-[16px] md:text-[24px] font-normal">Scan the QRIS code to complete your payment, and ensure you have enough HIDR.</motion.h4>
                
              </div>
          </div>

          
        </div>
      </>
    
  );
}

export default HowtoUse;
