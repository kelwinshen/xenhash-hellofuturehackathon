import ButtonPrimary from "./ButtonPrimary";
import {motion} from "framer-motion";

function Hero() {
  return (
    <motion.div 
    initial={{opacity: 0}}
    whileInView={{opacity:1}}
    transition={{duration: 1, delay:1}}
    viewport={{ once: true }}
    className="flex flex-col gap-8 justify-center h-[800px] lg:h-[900px]">
      <motion.h2
      initial={{opacity: 0}}
      whileInView={{opacity:1}}
      transition={{duration: 1, delay:1.2}}
      viewport={{ once: true }}
      className="textHead-lg">
        Real Crypto Micro Payment on
        <br className="hidden lg:block" /> the Real World Merchant
      </motion.h2>
      <motion.p
      initial={{opacity: 0}}
      whileInView={{opacity:1}}
      transition={{duration: 1, delay:1.3}}
      viewport={{ once: true }}
      className="text-center textParagraph">
        Without withdrawal or peer to peer. The real crypto micro payment
        straight to <br className="hidden sm:block" /> real world merchant in
        indonesia
      </motion.p>
      <motion.div 
      initial={{opacity: 0}}
      whileInView={{opacity:1}}
      transition={{duration: 1, delay:1.4}}
      viewport={{ once: true }}
      className="flex justify-center">
        <a href="https://dapp.xenhash.finance/"target="_blank">
          <ButtonPrimary _buttonText={`Open dApp`} />
        </a>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
