import { motion } from "framer-motion";
import { Discord, logo, Telegram, Twitter } from "../assets";

function Copyright() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: 100,
      }}
      whileInView={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-10 md:gap-24"
    >
      <hr className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />

      <div className="flex flex-col gap-8 md:flex-row md:justify-evenly sm:items-start">
        <div>
        <a href="https://xenhash.finance/">
          <img src={logo} />
        </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[60px] sm:flex-row sm:justify-center ">
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-[18px]">Protocol</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-white font-normal text-[16px]">
                <a href="https://drive.google.com/file/d/1yz1XvAMelrjvBtJJDAGKWTXBPYLyLRFK/view?usp=sharing" target="_blank">Litepaper</a>
              </li>
              <li className="text-white font-normal text-[16px]">
                <a href="https://drive.google.com/file/d/1ZlZ8YtOtP1vt06PcWmXVI9xZjGTaXPlh/view?usp=sharing" target="_blank">Brand</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-[18px]">Testnet</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-white font-normal text-[16px]">
                <a href="https://dapp.xenhash.finance/" target="_blank">Open dApp</a>
              </li>
              <li className="text-white font-normal text-[16px]">
                <a href="#" target="_blank">Tutorial</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-[18px]">Shortcut</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-white font-normal text-[16px]">
                <a href="https://xenhash.finance/">Home</a>
              </li>
              <li className="text-white font-normal text-[16px]">
                <a href="https://spreebucks.com/" target="_blank">Developer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-col hidden gap-8 lg:flex">
          <h4 className="text-white text-[18px] font-semibold text-center">
            Contact Us
          </h4>
          <div className="flex flex-row justify-center gap-4">
          <a href="https://x.com/xenhash?t=Q6rEzAE9B93pUPn7ZaMBCA&s=09" target="_blank">
              <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
                <img src={Twitter} alt="" />
              </div>
            </a>

            <a href="https://t.me/xenhashfinance" target="_blank">
              <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
                <img src={Telegram} alt="" />
              </div>
            </a>

            <a href="https://discord.com/invite/nTYur53H" target="_blank">
              <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
                <img src={Discord} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <hr className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />

        <div className="flex flex-col gap-8 lg:hidden">
          <h4 className="text-white text-[18px] font-semibold text-center">
            Contact Us
          </h4>
          <div className="flex flex-row justify-center gap-4">
            <a href="https://x.com/xenhash?t=Q6rEzAE9B93pUPn7ZaMBCA&s=09" target="_blank">
              <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4">
                <img src={Twitter} alt="" />
              </div>
            </a>

            <a href="https://t.me/xenhashfinance" target="_blank">
              <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4">
                <img src={Telegram} alt="" />
              </div>
            </a>

            <a href="https://discord.com/invite/nTYur53H" target="_blank">
              {" "}
              <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4">
                <img src={Discord} alt="" />
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-8 text-center text-white lg:flex-row lg:justify-between lg:mx-10 xl:mx-1 xl:justify-between">
          ©xenhash.finance All rights reserved.
          {/* <div className="flex flex-row justify-center gap-3 text-white">
            <a href="#">Term and Conditions</a>
            <a href="#">Privacy policy</a>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Copyright;
