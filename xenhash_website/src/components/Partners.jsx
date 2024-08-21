import { motion } from "framer-motion";
import {
  Technelogy,
} from "../assets";

function Partners() {
  return (
    <div className="flex flex-col gap-28 sm:gap-52">
      {/* <div className="flex flex-col gap-8">
        <motion.h2 
        initial={{opacity: 0}}
        whileInView={{opacity:1}}
        transition={{duration: 1, delay:1}}
        viewport={{ once: true }}
        className="textHead-lg">Goverment Audit</motion.h2>
        <div className="flex flex-col justify-center gap-16 mx-16 sm:flex-row sm:items-center md:flex-nowrap sm:flex-wrap">
            <motion.img 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:1}}
            viewport={{ once: true }}
            src={govermentAudit1} className="md:w-[200px] lg:w-[200px] xl:w-[350px]" alt="" />
            <motion.img 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:1}}
            viewport={{ once: true }}
            src={govermentAudit2} className="md:w-[200px] lg:w-[200px] xl:w-[350px]" alt="" />
            <motion.img 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:1}}
            viewport={{ once: true }}
            src={govermentAudit3} className="md:w-[200px] lg:w-[200px] xl:w-[350px]" alt="" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <motion.h2 
        initial={{opacity: 0}}
        whileInView={{opacity:1}}
        transition={{duration: 1, delay:1}}
        viewport={{ once: true }}
        className="textHead-lg">Protocol Audit</motion.h2>
        <div className="flex flex-col justify-center gap-16 mx-16 sm:flex-row sm:items-center">
            <motion.img 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:1}}
            viewport={{ once: true }}
            src={ProtocolAudit} className="w-[200px] lg:w-[200px] xl:w-[350px]" alt="" />
        </div>
      </div> */}

      <div className="flex flex-col gap-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="textHead-lg"
        >
          Technology
        </motion.h2>
        <div className="flex flex-col justify-center gap-16 mx-16 sm:flex-row sm:items-center">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            src={Technelogy}
            className="w-[200px] lg:w-[200px] xl:w-[350px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Partners;
