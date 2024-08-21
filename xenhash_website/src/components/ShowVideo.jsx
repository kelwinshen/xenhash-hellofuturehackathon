import { motion } from "framer-motion";
import ButtonLink from "./ButtonLink";

function ShowVideo() {
  return (
    <div>
         <div className="flex flex-col gap-8">
            <motion.h2 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:0.1}}
            viewport={{ once: true }}
            className="textHead-lg">Join the Testnet Journey</motion.h2>
            <motion.p 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:0.1}}
            viewport={{ once: true }}
            className="text-center textParagraph">Be one of the first to experience it and enjoy exclusive early bird benefits!</motion.p>
        </div>

        <div className="flex flex-col gap-8 mt-[60px] ">
            <div className="flex justify-center">
              <motion.iframe 
              initial={{opacity: 0}}
              whileInView={{opacity:1}}
              transition={{duration: 1, delay:0.1}}
              viewport={{ once: true }}
              width="1440" height="619" src="https://www.youtube.com/embed/4VsB3FIkRJk" title="XenHash dApp Guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></motion.iframe>
            </div>

            

        </div>

        <div className="flex justify-center mt-[60px]">
            <motion.a 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:0.1}}
            viewport={{ once: true }}
            href="https://forms.gle/VadUaUq5rgnFT1JY6" target="_blank">
                <ButtonLink _buttonText={`Feedback Form`} />
            </motion.a>
        </div>
    </div>
  )
}

export default ShowVideo