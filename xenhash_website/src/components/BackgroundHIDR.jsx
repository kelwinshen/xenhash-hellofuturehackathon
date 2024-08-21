import { motion } from "framer-motion";
import { HIDR } from "../assets";


function bgHIDR() {
  return (
    <>
      <div className="fixed top-0 z-50 flex items-center w-screen h-screen overflow-hidden">
        <div>
          <motion.img 
          src={HIDR} className="w-full h-full " />            
        </div>
      </div>
    </>
  )
}

export default bgHIDR       