import { motion } from "framer-motion"

// const Journey = [
//     {
//         id: "home",
//         title: "Home",
//         content: ["Testmne"]
//     },
//     {
//         id: "about",
//         title: "About",
//     },
//     {
//         id: "documentations",
//         title: "Documentations",
//     },
//     {
//         id: "developer",
//         title: "Developer",
//     },
//     {
//         id: "litepaper",
//         title: "Litepaper",
//     },
    
// ];

function JourneyPlan() {
  return (
    <div>
        <div className="flex flex-col gap-8">
            <motion.h2 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:0.1}}
            viewport={{ once: true }}
            className="textHead-lg">XenHash Roadmap</motion.h2>
            <motion.p 
            initial={{opacity: 0}}
            whileInView={{opacity:1}}
            transition={{duration: 1, delay:0.1}}
            viewport={{ once: true }}
            className="text-center textParagraph">XenHash roadmap is strategically designed to drive technical innovation, foster community growth, ensure regulatory compliance, and achieve widespread adoption.</motion.p>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-10 md:grid-cols-2 lg:grid-cols-4 md:mx-10 ">   
            <motion.div 
            initial={{
                opacity: 0,
                translateX: -50,
            }}
            whileInView={{
                opacity:1,
                translateX: 0,
            }}
            transition={{duration: 1, delay:0.1}}
            viewport={{ once: true }}
            className="flex flex-col gap-8 sm:gap-[129px] border-[0.1px] rounded-[10px] px-8 py-10 bg-white/5 border-white/50 ">
                <div>
                    <h3 className="text-white text-[18px] font-semibold uppercase sm:text-[24px]">HASH 1 - Q4 2024</h3>
                </div>

                <div className="flex flex-col gap-3">
                    
                    <ul className="flex flex-col gap-2">
                        <li className="font-light text-white list-disc list-outside">Testnet Initiatives</li>
                        <li className="font-light text-white list-disc list-outside">Community Building</li>
                        <li className="font-light text-white list-disc list-outside">Government Relations</li>
                    </ul>
                    
                </div>
            </motion.div>

            <motion.div 
            initial={{
                opacity: 0,
                translateX: -50,
            }}
            whileInView={{
                opacity:1,
                translateX: 0,
            }}
            transition={{duration: 1, delay:0.2}}
            viewport={{ once: true }}
            className="flex flex-col gap-8 sm:gap-[129px] border-[0.1px] rounded-[10px] px-8 py-10 bg-white/5 border-white/50">
                <div>
                    <h3 className="text-white text-[18px] font-semibold uppercase sm:text-[24px]">HASH 2 - Q1 2025</h3>
                </div>

                <div className="flex flex-col gap-3">
                    
                    <ul className="flex flex-col gap-2">
                        <li className="font-light text-white list-disc list-outside">Development & Feedback Loop</li>
                        <li className="font-light text-white list-disc list-outside">Community Expansions</li>
                        <li className="font-light text-white list-disc list-outside">Regulatory Alignment</li>
                    </ul>
                    
                </div>
            </motion.div>

            <motion.div 
            initial={{
                opacity: 0,
                translateX: -50,
            }}
            whileInView={{
                opacity:1,
                translateX: 0,
            }}
            transition={{duration: 1, delay:0.3}}
            viewport={{ once: true }}
            className="flex flex-col gap-8 sm:gap-[129px] border-[0.1px] rounded-[10px] px-8 py-10 bg-white/5 border-white/50">
                <div>
                    <h3 className="text-white text-[18px] font-semibold uppercase sm:text-[24px]">HASH 3 - Q2 2025</h3>
                </div>

                <div className="flex flex-col gap-3">
                    
                    <ul className="flex flex-col gap-2">
                        <li className="font-light text-white list-disc list-outside">Mainnet Launch</li>
                        <li className="font-light text-white list-disc list-outside">Ecosystem Collaborations</li>
                        <li className="font-light text-white list-disc list-outside">Launching Campaign</li>
                    </ul>
                    
                </div>
            </motion.div>

            <motion.div 
            initial={{
                opacity: 0,
                translateX: -50,
            }}
            whileInView={{
                opacity:1,
                translateX: 0,
            }}
            transition={{duration: 1, delay:0.4}}
            viewport={{ once: true }}
            className="flex flex-col gap-8 sm:gap-[129px] border-[0.1px] rounded-[10px] px-8 py-10 bg-white/5 border-white/50">
                <div>
                    <h3 className="text-white text-[18px] font-semibold uppercase sm:text-[24px]">HASH 4 - Q3 2025</h3>
                </div>

                <div className="flex flex-col gap-3">
                    
                    <ul className="flex flex-col gap-2">
                        <li className="font-light text-white list-disc list-outside">Massive Adoption Campaign</li>
                        <li className="font-light text-white list-disc list-outside">Adding New Supported Token</li>
                        <li className="font-light text-white list-disc list-outside">CSR Initiatives</li>
                    </ul>
                    
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default JourneyPlan