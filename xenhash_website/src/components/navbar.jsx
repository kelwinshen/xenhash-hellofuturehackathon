/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { logo, menu } from "../assets";
import { ButtonPrimary } from "../components";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

// content sementara
const listMenu = [
  {
    id: "home",
    title: "Home",
    link: "https://xenhash.finance/"
    
  },
  {
    id: "brand",
    title: "Brand",
    link:"https://drive.google.com/file/d/1ZlZ8YtOtP1vt06PcWmXVI9xZjGTaXPlh/view?usp=sharing"
  },
  {
    id: "litepaper",
    title: "Litepaper",
    link: "https://drive.google.com/file/d/1yz1XvAMelrjvBtJJDAGKWTXBPYLyLRFK/view?usp=sharing"
  },
  {
    id: "developer",
    title: "Developer",
    link:"https://spreebucks.com/"
  },
];

function navbar() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.div
      initial={{
        opacity: 0,
        top: -50
      }}
      whileInView={{
        opacity:1,
        top:0
      }}
      transition={{duration: 1, delay:0.2}} 
      viewport={{ once: true }}
      className={`fixed w-full backdrop-blur-lg bg-black/5 z-40`}>
        <div className="border-b-[0.1px] border-[#fff]/30 py-[30px] px-6">
          <nav className="container flex items-center justify-between mx-auto">
            <div className="">
              <a href="https://xenhash.finance/">
                <img
                  src={logo}
                  alt="xenhash-logo"
                  className="w-[170px] h-[50px]"
                />
              </a>
            </div>

            <div className="hidden lg:block">
              <ul className="flex gap-8">
                {listMenu.map((menu) => (
                  <li key={menu.id} className="text-white text-[16px] cursor-pointer">
                    <a target="_blank" href={menu.link}>{menu.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block">
            <a href="https://dapp.xenhash.finance/" target="_blank">
              <ButtonPrimary _buttonText={`Open dApp`} />
              </a>
            </div>

            <div
              className="cursor-pointer lg:hidden"
              onClick={() => setToggle(!toggle)}
            >
              <img src={menu} />
            </div>
          </nav>
        </div>

        <motion.div
        initial={{ 
          opacity: 0,
          
         }}
        whileInView={{ 
          
          opacity: 1,
          
        
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className={`justify-center h-screen ${!toggle ? "hidden" : "flex"} `}>
          <ul className="flex flex-col w-full gap-0">
            {listMenu.map((menu) => (
              <li
              
              
                onClick={() => {
                  navigate(`/${menu.link}`);
                }}
                key={menu.id}
                className="text-white text-[16px] font-normal text-center py-[22px] hover:bg-black/5 hover:border-y-[0.1px] cursor-pointer">
                {menu.title}
              </li>
            ))}
            <li>
              <div className="flex justify-center mt-3">
              <a href="https://dapp.xenhash.finance/"target="_blank">
              <button 
              className={`py-3 px-6 border-[0.1px]  hover:bg-white/100 text-black bg-white/80 backdrop-blur-lg border-black/50 hover:border-white/50 font-normal rounded-[10px] text-[14px] sm:text-[16px] ease-in-out duration-500`}>Open dApp</button></a>
              </div>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </>
  );
}

export default navbar;
