import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function ButtonPrimary({_buttonText}) {
    
  return (
    <>
        <motion.button 
        whileTap={{scale: 0.9}}
        transition={{ease: "easeOut", duration: 0}}
        className={`py-3 px-6 border-[0.1px]  hover:bg-white/100 text-black bg-white/80 backdrop-blur-lg border-black/50 hover:border-white/50 font-normal rounded-[10px] text-[14px] sm:text-[16px] ease-in-out duration-500`}>{_buttonText}</motion.button>
        
        
        
    </>
  )
}

export default ButtonPrimary

