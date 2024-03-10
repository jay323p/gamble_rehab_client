import React, { useEffect, useState, } from 'react';
import { motion } from 'framer-motion';
import logoRowData from '../../data/logoRowData';
import { news } from '../../data/news';
import { houseEdges } from '../../data/houseEdges';

const newsIndexer = [0, 1, 2, 3, 4]

const LogoRow = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [rules, setRules] = useState('');
    const [intro, setIntro] = useState('');
    const [types, setTypes] = useState();
    const [game, setGame] = useState('');
    const [newsArticle, setNewsArticle] = useState(news[0])
    const [counter, setCounter] = useState(0)

    const changeNews = (spot) => {
        console.log(spot)
        setCounter(spot)
        setNewsArticle(news[spot])
    }

    const setLearnMoreText = (e) => {
        let gameName = e.target.textContent;
        // setGame(content);
        const desiredGame = houseEdges.filter((item) => item.name === gameName);
        setGame(desiredGame[0].name);
        setRules(desiredGame[0].rules);
        setTypes(desiredGame[0].types);
        setIntro(desiredGame[0].intro)
    };

    useEffect(() => {
        const handleWindowResize = () => {
            const logoRow = document.getElementById('logo-row');
            const width = logoRow.getBoundingClientRect().width;

            setWindowWidth(width);
        };

        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('load', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <>
            <div className="h-screen flex flex-col overflow-x-hidden">
                <motion.div
                    animate={{
                        x: [
                            0,
                            windowWidth ? -(windowWidth * 0.2) : -500,
                            windowWidth ? -(windowWidth * 0.4) : -1000,
                            windowWidth ? -(windowWidth * 0.6) : -1500,
                            windowWidth ? -(windowWidth * 0.8) : -2000,
                        ],
                    }}
                    transition={{ repeatDelay: 2, repeat: Infinity, duration: 24 }}
                >
                    <div
                        className={`h-20 flex items-center relative xxl:gap-28 z-[10] w-[500vw] overflow-y-hidden`}
                        id="logo-row"
                    >
                        {logoRowData.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className={`flex justify-center items-center h-[140px] w-full text-white box-shadow-3d`}
                                >
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="h-[150px] w-[150px] object-cover "
                                    />
                                    <p>
                                        <strong className="font-bold text-lossRed text-[16px]">
                                            House-Edge:
                                        </strong>{' '}
                                        <i className="font-thin text-[14px]">{item.text}</i>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
                <span className="h-1/6 w-1/4 darkerGreen_gradient absolute bottom-0 left-[-15%] z-[1]  "></span>

                <div className="flex flex-col md:flex-row items-center gap-[1rem] md:bg-dark md:mt-[3%] px-[0.5rem] md:px-[1rem] md:pb-[10px] h-[14%] tall:h-[34%] pt-[1rem] overflow-y-scroll md:h-48 md:w-[94%] ml-auto mr-auto">
                    <motion.div
                        className="flex flex-col shadow3 h-[100%] lg:h-[80%] w-full bg-dark"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 5 }}
                    >
                        <h3 className="text-brilliantGreen brightness-125 text-center font-semibold shadow2">
                            You Can't Beat The System
                        </h3>
                        <p className="text-[12px] lg:text-[14px] px-[10px] text-heroBorder brightness-125 overflow-y-scroll">
                            Lottery agencies and casinos design all their games around
                            house-edge - they use math to ensure, as well as insure, their
                            games! If they didn't, their businesses would bankrupt!
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col shadow3 h-[100%] lg:h-[80%] w-full bg-dark"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 5 }}
                    >
                        <h3 className="text-brilliantGreen brightness-125 text-center font-semibold shadow2">
                            The Laws Of Statistics Are Solid
                        </h3>
                        <p className="text-[12px] lg:text-[14px] px-[10px] text-heroBorder brightness-125 overflow-y-scroll">
                            As you use this site, you will learn the statistical unfairness
                            behind your favorite gambling games. In essence, you will start to
                            realize them as taxes you must pay to play the game. You like
                            paying taxes?
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col shadow3 h-[100%] lg:h-[80%] w-full bg-dark"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 5 }}
                    >
                        <h3 className="text-brilliantGreen brightness-125 text-center font-semibold shadow2">
                            The Law Of Large Numbers
                        </h3>
                        <p className="text-[12px] lg:text-[14px] px-[10px] text-heroBorder brightness-125 overflow-y-scroll">
                            House-edges (HE) always become realized over the long-term. Some
                            players may win big early on, off-setting HE, but that off-set
                            will be equalized with the losses of all other players. Are you
                            lucky enough to be an outlier?
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-[4px] md:bg-dark  md:mb-[3%] h-56 md:h-full lg:max-h-[60%] lg:overflow-y-hidden w-full pt-[0.6rem] px-[8px] md:px-[1rem] md:w-[94%] ml-auto mr-auto">
                    {/* spacer */}
                    <motion.div
                        className="flex flex-col w-full h-full pb-[1rem] xl:pb-[0.35rem]"
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <div className="pb-[5px] md:pb-[8px] lg:pb-[12px]">
                            <h3 className="text-lightGreen pl-[1rem]">Learn More</h3>
                            <div className="underline2"></div>
                        </div>

                        <div className="w-full h-full flex bg-white">
                            <div className="h-full w-1/4 flex flex-col bg-heroBorder overflow-y-scroll gap-[4px] p-[4px]">
                                {houseEdges.map((item) => {
                                    return (
                                        <div
                                            className="text-center p-[2px] w-full bg-heroGreen text-heroBorderLight z-[100]"
                                            key={item.name}
                                        >
                                            <motion.div
                                                whileHover={{
                                                    background:
                                                        'linear-gradient(45deg, #0D9B5C, #000, #000, #000, #0D9B5C)',
                                                    opacity: 1,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <span
                                                    className="brightness-200"
                                                    onClick={(e) => setLearnMoreText(e)}
                                                >
                                                    {item.name}
                                                </span>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="max-h-full w-3/4 bg-heroBorder p-[5px]">
                                <div className="h-full w-full bg-lightGreen shadow4 flex flex-col gap-[4px] p-[5px]">
                                    <div className="bg-heroBorder w-full h-[50%] flex flex-col overflow-y-scroll gap-[4%] pb-[8px]">
                                        <div className='flex flex-col items-center'>

                                            <h4 className="text-center text-lightGreen font-semibold">
                                                {game ? game : ''}
                                            </h4>
                                            <p className="text-[12px] px-[8px] ">
                                                {intro ? intro : ''}
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <h4 className="text-center text-lightGreen font-semibold">
                                                House Edges
                                            </h4>
                                            <div className="flex w-[90%] ml-auto mr-auto">
                                                <p className="w-full text-[12px]">
                                                    Play-Style: {types && types[0].name}
                                                </p>
                                                <p className="w-full text-[12px]">
                                                    House-Edge: {types && types[0].edge}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-heroBorder w-full h-[50%] flex flex-col overflow-y-scroll pb-[8px]">
                                        <h4 className="text-center text-lightGreen font-semibold">
                                            {'Rules'}
                                        </h4>
                                        <p className="text-[12px] px-[8px] leading-6">
                                            {rules ? rules : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="flex flex-col max-h-full w-full pt-[1.4rem] md:pt-[0rem] md:pb-[1rem] lg:pb-[2.6rem] xl:pb-[0.3rem]"
                        id='news'
                    >
                        <div className="pb-[5px] md:pb-[8px] lg:pb-[12px]">
                            <h3 className="text-brilliantGreen pl-[1rem]">Feautured News</h3>
                            <div className="underline"></div>
                        </div>

                        <div className=" w-full max-h-full flex">
                            <div className="max-h-full w-1/3 flex flex-col pl-[2px] pr-[2px] pb-[2px] bg-heroBorderLight overflow-y-scroll">
                                <img
                                    src={newsArticle.image}
                                    alt=""
                                    className="object-contain relative top-0 pt-[2px] h-full"
                                />
                                <p className="text-[11px] lg:text-[13px] h-full text-center text-dark bg-heroBorder font-semibold">
                                    {newsArticle.caption}
                                </p>
                            </div>

                            <div className="h-full w-2/3 overflow-y-scroll flex flex-col  bg-heroBorder px-[10px]">
                                <h3 className="text-center lg:text-[20px] font-semibold">
                                    {newsArticle.title}
                                </h3>
                                <p className="h-[100%] text-[12px] lg:text-[15px] px-[8px] py-[5px] news-border overflow-y-scroll">
                                    {newsArticle.text}
                                </p>
                                <div className="flex justify-evenly items-end bg-heroBorder w-full h-[10%] py-[4px]">
                                    {newsIndexer.map((num) => {
                                        return <div key={num} className={`${counter === num ? 'bg-white text-white' : 'bg-heroGreen text-heroGreen'} h-[10px] overflow-hidden rounded w-[10px] cursor-pointer`} onClick={() => changeNews(num)}>
                                            {num}
                                        </div>
                                    })}
                                </div>
                                <div className="underline2 h-[1px] w-full"></div>
                            </div>
                        </div>

                        {/* spacer */}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

// put all of those boxes in a parent, or with current parent, add styles to create 3d void affect similar to the top 3 boxes but enoconpmassing all 5 boxes call it void of knowledge

export default LogoRow;
