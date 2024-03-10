import React from 'react';
import { motion } from 'framer-motion';

const Facts = () => {
    return (
        <div className="h-full overflow-y-scroll w-full mb-[1rem]  flex flex-col md:flex-row justify-center items-center px-[18px]  pt-[5rem] gap-[10px] md:gap-[2rem] md:px-[2rem] md:mt-[-5rem] lg:px-[2.4rem] xl:px-[4rem] tall:mt-[-4rem]">
            <motion.div
                // variants={Variants}
                animate={{ x: [-1600, 0] }}
                transition={{ duration: 1, delay: 3.2 }}
            >
                <motion.div
                    whileHover={{
                        background:
                            'linear-gradient(45deg, #0D9B5C, #000, #000, #000, #0D9B5C)',
                        borderRadius: '10px',
                        opacity: 1,
                        cursor: 'pointer',
                    }}
                >
                    <div className="flex flex-col w-[100%] h-full md:h-[270px] lg:h-[230px] xl:h-[180px] px-[2px] py-[1px] rounded-lg fact-border opacity-75 md:p-[1.4rem] lg:p-[1.8rem]">
                        <h1 className="text-[26px] text-center text-white">
                            $60 Billion In
                        </h1>
                        <p className="text-[13px] text-slate-400 px-10 ">
                            Commercial gross gambling revenue for the US gambling industry as
                            of the most-recent completed year, 2022 ... gross indeed!
                        </p>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                animate={{ x: [-1600, 0] }}
                transition={{ duration: 1, delay: 3.2 }}
            >
                <motion.div
                    whileHover={{
                        background:
                            'linear-gradient(45deg, #0D9B5C, #000, #000, #000, #0D9B5C)',
                        borderRadius: '10px',
                        opacity: 1,
                        cursor: 'pointer',
                    }}
                >
                    <div className="flex flex-col w-[100%] h-full md:h-[270px] lg:h-[230px] xl:h-[180px] px-[2px] py-[1px] rounded-lg fact-border opacity-75 md:p-[1.4rem] lg:p-[1.8rem]">
                        <h1 className="text-[26px] text-center text-white">50% Gamblers</h1>
                        <p className="text-[13px] text-slate-400 px-10 pb-3">
                            Have experienced a mood disorder; 41.3% have experienced anxiety,
                            and 60.8% have experienced a personality disorder.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                animate={{ x: [1600, 0] }}
                transition={{ duration: 1, delay: 3.2 }}
            >
                <motion.div
                    whileHover={{
                        background:
                            'linear-gradient(45deg, #0D9B5C, #000, #000, #000, #0D9B5C)',
                        borderRadius: '10px',
                        opacity: 1,
                        cursor: 'pointer',
                    }}
                >
                    <div className="flex flex-col w-[100%] h-full md:h-[270px] lg:h-[230px] xl:h-[180px] px-[2px] py-[1px] rounded-lg fact-border opacity-75 md:p-[1.4rem] lg:p-[1.8rem]">
                        <h1 className="text-[26px] text-center text-white">$55K - $90K</h1>
                        <p className="text-[13px] text-slate-400 px-10 pb-3">
                            Average lifetime debt/loss for male gambler ... $15k for female
                            gamblers. I suppose females are better at gambling huh?
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Facts;
