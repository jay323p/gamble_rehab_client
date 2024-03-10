import React from 'react';
import { IconContext } from 'react-icons';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { FaPiggyBank } from 'react-icons/fa';
import { MdAccessTimeFilled } from 'react-icons/md';
import img from '../../assets/spin.png';
import { motion } from 'framer-motion';
import { useMotionValue, useTransform } from 'framer-motion';

const Hero = () => {
    const x = useMotionValue(0);

    return (
        <div className="h-[52%] xl:h-[52%] text-white flex justify-around mt-1 md:mt-10 md:h-[80%] mb-3 md:mb-[-1rem]">
            <div className="h-[100%] w-[94%] bg-heroGreen z-[50] hero-border rounded-xl flex flex-col md:flex-row overflow-y-scroll md:overflow-y-hidden">
                <div className="flex flex-col justify-start gap-6 mt-5 p-8 w-full h-full">
                    <motion.div
                        animate={{
                            x: [-100, 0],
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col font-semibold lg:translate-y-[-25%]">
                            <motion.div
                                animate={{
                                    opacity: [0, 1, 0.4, 1, 0.4, 1, 0.6, 1, 0.8, 1],
                                    color: [
                                        '#fff',
                                        '#A0BDB4',
                                        '#fff',
                                        '#A0BDB4',
                                        '#fff',
                                        '#A0BDB4',
                                        '#fff',
                                        '#A0BDB4',
                                    ],
                                }}
                                transition={{ duration: 5 }}
                            >
                                <h1 className="text-[24px] lg:text-[30px] lg:mt-[4rem]">
                                    Take Back Control -
                                </h1>
                                <h1 className="text-[24px] lg:text-[30px]">
                                    Your Money, Your Time,{' '}
                                </h1>
                                <h1 className="text-[24px] lg:text-[30px]">It Ends Here!</h1>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        animate={{
                            opacity: [1, 0, 1],
                            x: [-1000, 0],
                            scale: [1, 1, 1.2, 1, 1.2, 1, 0.6, 1.2, 1],
                        }}
                        transition={{ delay: 0, duration: 2 }}
                    >
                        <div className="lg:translate-y-[-70%]">
                            <p className="text-[13px] lg:text-[17px] text-heroText">
                                I have a goal - to educate people on the statistical unfairness
                                behind the entire gambling industry in order to cessate their
                                addiction!
                            </p>
                        </div>
                    </motion.div>
                    <div className="flex flex-col h-full items-start  lg:translate-y-[-60%] xl:translate-y-[-15%]">
                        <div className="flex h-full items-center md:mt-[-2rem] gap-10 xl:mt-[-3rem]">
                            <motion.div
                                animate={{ scale: [0, 1, 0.5, 1.5, 1], opacity: [0, 1] }}
                                transition={{ delay: 2, duration: 2 }}
                            >
                                <button className="nav-btn font-medium lg:font-bold p-1 mr-1 md:p-2 md:px-6 text-black">
                                    Let's Go!
                                </button>
                            </motion.div>
                            <IconContext.Provider
                                value={{ color: 'rgb(79, 194, 157)', size: '2rem' }}
                            >
                                <motion.div
                                    animate={{ x: [-400, 0] }}
                                    transition={{ delay: 2.5, duration: 1 }}
                                >
                                    <div className="bg-brilliantGreen p-[3px] rounded-full half">
                                        <div className="bg-white p-[2px] rounded-full btn-shadow flex items-center h-full">
                                            <BsFillPlayCircleFill />
                                        </div>
                                    </div>
                                </motion.div>
                            </IconContext.Provider>
                            <motion.div
                                animate={{ x: [-400, 0] }}
                                transition={{ delay: 2.7, duration: 1 }}
                            >
                                <h5 className="text-[14px] ml-[-16px] font-thin lg:ml-[-1.5rem]">
                                    SEE RESOURCE
                                </h5>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-full h-full relative ">
                    <motion.div
                        className="three-d"
                        // initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 1, 0.5, 1, 0.7, 1],
                            scale: [0.3, 1, 0.5, 1],
                        }}
                        transition={{ duration: 2, delay: 2 }}
                    >

                        <img
                            src={img}
                            alt=""
                            className="object-contain h-full hover:z-50"
                            draggable={false}
                        />
                    </motion.div>
                    <div className="absolute">
                        <motion.div
                            animate={{ y: [-400, 0], x: [700, 0] }}
                            transition={{ delay: 2.7, duration: 1 }}
                        >
                            <div className="absolute left-[-170px] top-[40px] bg-slate-400 opacity-80 flex items-center h-[100px] w-[300px] blur-md md:left-[-300px] md:w-[400px]"></div>
                            <div className="hero-border-bright absolute left-[-170px] top-[40px] bg-slate-400 opacity-70 text-black flex gap-4 items-center h-[100px] w-[300px] p-[5px] md:left-[-300px] md:w-[400px] font-bold z-0">
                                <IconContext.Provider
                                    value={{ size: '4rem', color: '#0D9B5C' }}
                                >
                                    <FaPiggyBank />
                                </IconContext.Provider>
                                <p className="text-[12px]">
                                    Heres the truth ... every lottery game is designed to take
                                    pennies off each dollar betted. That's right, each bet you
                                    make, you are statistically losing a percent of your money!
                                </p>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute">
                        <motion.div
                            animate={{ y: [400, 0], x: [-700, 0] }}
                            transition={{ delay: 2.7, duration: 1 }}
                        >
                            <div className="absolute top-[210px] left-[-140px] bg-slate-400 opacity-80 flex items-center h-[100px] w-[100px] blur-bg-2 md:left-[-220px] lg:left-[-150px] lg:top-[300px] rounded-lg"></div>
                            <div className="absolute top-[210px] left-[-140px] bg-slate-400 opacity-80 flex items-center h-[100px] w-[150px] blur-bg-3 md:left-[-220px] lg:left-[-150px] lg:top-[300px] rounded-lg"></div>
                            <div className="absolute top-[210px] left-[-140px] bg-slate-400 opacity-80 flex items-center h-[100px] w-[200px] blur-bg-4 md:left-[-220px] lg:left-[-150px] lg:top-[300px] rounded-lg"></div>
                            <div className="absolute top-[210px] left-[-140px] bg-slate-400 opacity-80 flex items-center h-[100px] w-[250px] blur-bg-5 md:left-[-220px] lg:left-[-150px] lg:top-[300px] rounded-lg"></div>

                            <div className="blur-sm absolute top-[200px] left-[-140px] bg-slate-400 opacity-80 flex items-center h-[100px] w-[300px] md:blur-bg-6 md:left-[-220px] lg:left-[-150px] lg:top-[300px] rounded-lg md:blur-none md:w-[400px]"></div>
                            <div className="hero-border-bright absolute top-[200px] left-[-140px]  bg-slate-400 opacity-70 text-black flex gap-4 items-center h-[100px] w-[300px] p-[5px] md:left-[-220px] lg:left-[-150px] lg:top-[300px] md:w-[400px] font-bold ">
                                <IconContext.Provider
                                    value={{ size: '4rem', color: '#0D9B5C' }}
                                >
                                    <MdAccessTimeFilled />
                                </IconContext.Provider>
                                <p className="text-[12px]">
                                    Each bet always has the player at a disadvantage. The more
                                    time you have to play, the more the disadvantage becomes
                                    obvious - just like Russian Roullete!
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
