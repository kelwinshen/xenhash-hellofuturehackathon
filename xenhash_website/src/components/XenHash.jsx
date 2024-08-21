import { motion } from "framer-motion"
import ButtonPrimary from "./ButtonPrimary"


function XenHash() {
  return (
    <div className="flex flex-col gap-[52px] md:mx-10">
        <motion.h2
        initial={{opacity: 0}}
        whileInView={{opacity:1}}
        transition={{duration: 0.7, delay:0.1}}
        viewport={{ once: true }} 
        className="textHead-lg"
        >XenHash Building the Path to Real World Utility</motion.h2>
        
        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity:1}}
        transition={{duration: 0.7, delay:0.2}}
        viewport={{ once: true }}
        className="flex flex-col gap-8 sm:flex-row">
            <p 
            className="textParagraph"
            >XenHash connect the gap between Web3 ecosystem with real world utility.
With the increasing adoption of QRIS, there is currently a gap in facilitating direct payments from Web3 users to real-world merchants in Indonesia. Users often have to withdraw their funds or engage in peer-to-peer transactions to convert their crypto into fiat, leading to inefficient steps for making micro payments.</p>
            <p
            className="textParagraph"
            >The vision of Bitcoin and other cryptocurrencies as a payment method has faced challenges in various regions, including Indonesia. Rather than circumventing regulations, we align with government policies by introducing HIDR, our stablecoin backed by Indonesian Rupiah fiat. XenHash will comply with regulations and engage in discussions with the government to establish legal frameworks, enabling broader adoption and can be used for direct payments to real-world merchants, effectively bridging the gap for Web3 users and simplifying micro transactions in Indonesia.</p>
        </motion.div>

        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity:1}}
        transition={{duration: 0.7, delay:0.3}}
        viewport={{ once: true }}
        className="flex justify-start sm:justify-center">
            <a href="https://drive.google.com/file/d/1yz1XvAMelrjvBtJJDAGKWTXBPYLyLRFK/view?usp=sharing" target="_blank">
            < ButtonPrimary _buttonText={`Read our Litepaper`} />
            </a>
        </motion.div>
    </div>
  )
}

export default XenHash