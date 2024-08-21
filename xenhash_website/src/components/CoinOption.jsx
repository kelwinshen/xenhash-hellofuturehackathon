import { motion } from "framer-motion";
import { HBARcoin } from "../assets";

function CoinOption() {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="textHead-lg"
      >
        Crypto Option
      </motion.h2>
      <div className="flex flex-col sm:justify-center gap-8 px-[30px] mt-[100px]  ">
        <div className="flex justify-center ">
          <motion.img
            className="md:w-[60%] lg:w-[50%] drop-shadow-[0_4px_200px_rgba(255,255,255,0.15)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            src={HBARcoin}
          />
        </div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white text-[24px] text-center font-bold"
        >
          HBAR
        </motion.h3>

        {/* <div className="flex flex-col gap-8">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                src={eth_Coin} className="drop-shadow-[0_4px_200px_rgba(255,255,255,0.15)]" />
                <motion.h3 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="text-white text-[24px] text-center font-bold">ETH</motion.h3>
            </div>

            <div className="flex flex-col gap-8">
                <motion.img 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                src={usdt_Coin} className="drop-shadow-[0_4px_200px_rgba(255,255,255,0.15)]" />
                <motion.h3 
                initial={{opacity: 0}}
                whileInView={{opacity:1}}
                transition={{duration: 1, delay:1}}
                viewport={{ once: true }}
                className="text-white text-[24px] text-center font-bold">USDT</motion.h3>
            </div> */}
      </div>
    </div>
  );
}

export default CoinOption;
