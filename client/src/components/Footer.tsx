import { Discord, Logo, Telegram, Twitter } from "../assets";

export default function Footer() {
  return (
    <section className="mx-4 py-[60px] lg:container sm:mx-auto ">
    <div className="flex flex-col gap-10 md:gap-24">
    <hr className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />

    <div className="flex flex-col gap-8 md:flex-row md:justify-evenly items-center justify-center">
      <div>
        <img src={Logo}  />
      </div>

  

      <div className="lg:flex flex-col gap-8 hidden">
       
        <div className="flex flex-row gap-4 justify-center">
        <a  href="https://x.com/xenhash">   <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
            <img src={Twitter} alt=""  />   
          </div> </a>

          <a href="https://t.me/xenhashfinance">
          <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
            <img src={Telegram} alt=""  />
          </div> </a>


          <a href="https://discord.com/invite/nTYur53H">  
          <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
            <img src={Discord} alt=""  />
          </div> </a>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-8">
    <hr className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />

      <div className="flex flex-col gap-8 lg:hidden">
        <h4 className="text-white text-[18px] font-semibold text-center">Contact Us</h4>
        <div className="flex flex-row gap-4 justify-center">
        <a  href="https://x.com/xenhash">   <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
            <img src={Twitter} alt=""  />
          </div></a>
          
          <a href="https://t.me/xenhashfinance">
          <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 hover:bg-white/25">
            <img src={Telegram} alt=""  /></div>
            </a>

            <a href="https://discord.com/invite/nTYur53H">  
          <div className="bg-black/5 border-[0.1px] border-white/50 rounded-full p-4 ">  
            <img src={Discord} alt=""  />
          </div></a>
        </div>
      </div>

      <div className="flex flex-col-reverse text-center text-white gap-8 lg:flex-row lg:justify-between lg:mx-10 xl:mx-1 xl:justify-between">
        ©xenhash.finance All rights reserved.
        <div className="flex flex-row gap-3 justify-center text-white">
          {/* <a href="#">Term and Conditions</a>
          <a href="#">Privacy policy</a> */}
        </div>
      </div>
    </div>
  </div>
  </section>
  );
}