import {motion} from "framer-motion";

function Volume() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  sm:gap-[51px] md:mx-[20%] lg:mx-[24px] xl:mx-[24px] 2xl:mx-auto">
      <motion.div 
      initial={{opacity: 0}}
      whileInView={{opacity:1}}
      transition={{duration: 0.7, delay:0.1}}
      viewport={{ once: true }}
      className="bg-white/5 py-10 px-[60px] w-full  lg:w-full text-center rounded-[10px] border-[0.1px]">
        <span className="text-white text-[32px] md:text-[42px] font-bold">
          216,229
        </span>
        <p className="text-white text-[16px]  font-semibold">QRIS Merchant</p>
      </motion.div>

      <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity:1}}
      transition={{duration: 0.7, delay:0.2}}
      viewport={{ once: true }}
      className="bg-white/5 py-10 px-[60px] w-full  lg:w-full  text-center rounded-[10px] border-[0.1px]">
        <span className="text-white text-[26px] md:text-[42px] font-bold">
          125
        </span>
        <p className="text-white text-[16px]  font-semibold">Tesnet Users</p>
      </motion.div>

      <motion.div 
      initial={{opacity: 0}}
      whileInView={{opacity:1}}
      transition={{duration: 0.7, delay:0.3}}
      viewport={{ once: true }}
      className="bg-white/5 py-10 px-[60px] w-full  lg:w-full text-center rounded-[10px] border-[0.1px]">
        <span className="text-white text-[32px] md:text-[42px] font-bold">
          0.5%
        </span>
        <p className="text-white text-[16px]  font-semibold">Flat Fee</p>
      </motion.div>
    </div>
  );
}

export default Volume;
