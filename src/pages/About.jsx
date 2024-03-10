import React, { useEffect, useState } from 'react';
import Navbar from '../components/landing/Navbar';
import { motion } from 'framer-motion';
import Graph from '../components/graphs/Graph';
import { tempLineData } from '../data/graphData';
import { tempBarData } from '../data/graphData';
import { tempPieData } from '../data/graphData';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_GAME_DATA,
    SET_GAME_HISTORY_UPDATED,
    SET_PAGE,
    selectGameData,
    selectGameHistoryUpdated,
    selectIsLoggedIn,
    selectUser,
} from '../redux/features/auth/authSlice';
import { getGameData } from '../services/gameService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const games = ['Keno', 'Numbers', 'Powerball', 'Scratchers', 'Slots'];
const graphs = ['Line', 'Pie', 'Bar'];

const About = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const isLoggedInRedux = useSelector(selectIsLoggedIn);
    const gameHistoryUpdatedRedux = useSelector(selectGameHistoryUpdated);
    const gameDataRedux = useSelector(selectGameData);
    const userRedux = useSelector(selectUser);

    const [gameChosen, setGameChosen] = useState('Keno');
    const [graphChosen, setGraphChosen] = useState('Line');
    const [gameRespectiveLineData, setGameRespectiveLineData] = useState([]);
    const [lineDataChosen, setLineDataChosen] = useState([]);
    const [activeLineData, setActiveLineData] = useState(0);
    const [lineDataMerged, setLineDataMerged] = useState(false);
    const [pieData, setPieData] = useState(tempPieData);
    const [barData, setBarData] = useState(tempBarData)

    const [removeGridLines, setRemoveGridLines] = useState(false);

    const getNewGameData = async () => {
        const userEmail = { email: userRedux.email }

        try {
            const newGameData = await getGameData(userEmail);

            if (newGameData) {
                dispatch(SET_GAME_DATA(newGameData));
                dispatch(SET_GAME_HISTORY_UPDATED(false));
            }
        } catch (error) {
            navigate("/games")
            toast.error("Please ensure you have saved game data before accessing the about page!");
            dispatch(SET_PAGE("Games"))
        }
    };

    const updateLineData = () => {
        if (Object.keys(gameDataRedux).length === 3) {
            const filteredLineData = gameDataRedux.savedGraphs.line.filter(
                (data) => data.game === gameChosen
            );
            let allLineDataArr = [];
            for (let i = 0; i < filteredLineData.length; i++) {
                let dataArr = [];
                let dataObj = {
                    id: filteredLineData[i].id,
                    data: filteredLineData[i].lineData,
                    color: filteredLineData[i].color,
                };
                dataArr.push(dataObj);
                allLineDataArr.push(dataArr);
            }
            setGameRespectiveLineData(allLineDataArr);

            if (allLineDataArr.length > 0) {
                setLineDataChosen(allLineDataArr[0]);
                setActiveLineData(0);
            } else {
                toast.error(
                    `No game history for ${gameChosen}: showing default line data! Please please ${gameChosen} and reset history if you wish to track your gamblind data!`
                );
                setLineDataChosen(tempLineData);
            }
        }
    };

    const updatePieData = () => {
        if (Object.keys(gameDataRedux).length === 3) {
            const pieDataRedux = gameDataRedux.savedGraphs.pie[0];
            setPieData(pieDataRedux);
        }
    };

    const updateBarData = () => {
        if (Object.keys(gameDataRedux).length === 3) {
            const barDataRedux = gameDataRedux.savedGraphs.bar
            const desiredBarData = barDataRedux.filter((data) => data[0].gameType === gameChosen)
            if (desiredBarData.length === 0) {
                setBarData(tempBarData)
            } else {
                setBarData(desiredBarData[0])
            }
        }
    }

    const changeLineGraph = (i) => {
        const newLineData = gameRespectiveLineData[i];
        if (lineDataMerged) {
            setLineDataMerged(false);
        }
        setLineDataChosen(newLineData);
        setActiveLineData(i);
    };

    const mergeLineData = () => {
        if (!lineDataMerged) {
            let mergedLineData = [];

            for (let i = 0; i < gameRespectiveLineData.length; i++) {
                let lineDataObj = gameRespectiveLineData[i][0];
                mergedLineData.push(lineDataObj);
            }
            setLineDataChosen(mergedLineData);
            setLineDataMerged(true);
        } else {
            setLineDataMerged(false);
            setGameChosen('Keno');
        }
    };

    useEffect(() => {
        if (Object.keys(gameDataRedux).length === 0 && isLoggedInRedux) {
            console.log('no game data')
            getNewGameData()
        }
        if (Object.keys(gameDataRedux).length > 0 && isLoggedInRedux && gameHistoryUpdatedRedux) {
            getNewGameData()
            dispatch(SET_GAME_HISTORY_UPDATED(false))
        }
        if (!isLoggedInRedux) {
            navigate("/login")
            dispatch(SET_PAGE("Home"))
            toast.error('Please sign-in to view your gambling history', {
                toastId: 'err-auth'
            })
        }
    }, [gameDataRedux])

    useEffect(() => {
        if (graphChosen === 'Line' && gameChosen !== '') {
            updateLineData();
        } else if (graphChosen === 'Pie' && gameChosen !== '' && gameDataRedux.savedGraphs.pie[0]) {
            updatePieData();
        } else if (graphChosen === 'Bar' && gameChosen !== '') {
            updateBarData()
        }
        setLineDataMerged(false)
        setRemoveGridLines(false)
    }, [graphChosen, gameChosen]);

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col overflow-x-hidden overflow-y-hidden px-[16px]">
            <Navbar />
            {/* AboutSelectBox COMPONENT START */}
            <div className="h-[15%] w-full flex flex-col center shadow3 py-[4px] mt-[1rem] mb-[5px] md:p-[1rem]">
                <div className="h-[25%] w-full text-center">
                    <h2 className="h-full w-full linearGradientText1 font-semibold lg:text-[18px]">
                        Learn About Your Gambling History
                    </h2>
                </div>
                <div className="h-[75%] w-full flex flex-col">
                    <div className="h-[50%] w-full flex justify-evenly items-center gap-[4px] p-[4px] ">
                        {games.map((game, i) => {
                            return (
                                <motion.button
                                    key={game}
                                    whileHover={{
                                        backgroundColor: '#5FB495',
                                        color: '#000',
                                        transition: { duration: 0.3 },
                                    }}
                                    className={`h-full w-1/5 ${gameChosen === game ? 'shadow2' : 'text-lightGreen'
                                        } text-[12px] tall:text-[14px] font-semibold rounded-sm z-50`}
                                    onClick={(e) => setGameChosen(e.target.innerText)}
                                >
                                    {game}
                                </motion.button>
                            );
                        })}
                    </div>
                    <div className="h-[50%] w-full flex justify-evenly items-center gap-[4px] p-[6px]">
                        {graphs.map((graph, i) => {
                            return (
                                <motion.button
                                    key={graph}
                                    whileHover={{
                                        backgroundColor: '#5FB495',
                                        color: '#000',
                                        transition: { duration: 0.3 },
                                    }}
                                    className={`h-full w-1/5 ${graphChosen === graph ? 'shadow2' : 'text-lightGreen'
                                        } text-[12px] tall:text-[14px] font-semibold rounded-sm z-50`}
                                    onClick={(e) => setGraphChosen(e.target.innerText)}
                                >
                                    {graph}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* AboutSelectBox COMPONENT END */}
            {/* AboutGraphBox COMPONENT START */}
            <div className="h-[50%] w-full shadow3 mb-[4px]">
                <Graph
                    type={graphChosen}
                    data={
                        graphChosen === 'Line'
                            ? lineDataChosen
                            : graphChosen === 'Bar'
                                ? barData
                                : pieData
                    }
                    removeGridLines={removeGridLines}
                />
            </div>
            {/* AboutGraphBox COMPONENT END */}
            {/* NEW COMPONENT START */}
            <div className="h-[20%] w-full shadow3 mb-[8px]">
                {graphChosen === 'Line' ? (
                    <div className="h-full w-full flex items-center p-[]">
                        {/* Choose line data box */}
                        <div className="h-full w-[75%] lineGraphGrid overflow-y-scroll p-[4px]">
                            {gameRespectiveLineData.length > 0 &&
                                gameRespectiveLineData.map((choice, i) => {
                                    return (
                                        <button
                                            className={`${i === activeLineData
                                                ? 'bg-brilliantGreen text-dark'
                                                : 'shadow3 text-lightGreen'
                                                } h-[50%] font-semibold text-[8px] md:text-[14px] rounded-sm z-[50]`}
                                            onClick={() => changeLineGraph(i)}
                                        >{`Game ${i + 1}`}</button>
                                    );
                                })}
                        </div>
                        {/* merge btn and other box */}
                        <div className="h-full w-[25%] flex flex-col">
                            <div className="h-[50%] w-full flex items-center p-[4px] gap-[6px]">
                                <button
                                    className={`${lineDataMerged
                                        ? 'bg-lightGreen text-dark'
                                        : 'shadow3 text-lightGreen'
                                        } w-1/2 h-full text-center text-[10px] md:text-[16px] font-semibold rounded-md`}
                                    onClick={() => mergeLineData()}
                                >
                                    {lineDataMerged ? 'Un-Merge' : 'Merge'}
                                </button>
                                <button
                                    className={`${removeGridLines
                                        ? 'bg-lightGreen text-dark'
                                        : 'shadow3 text-lightGreen'
                                        } w-1/2 h-full text-center text-[10px] md:text-[16px] font-semibold rounded-md`}
                                    onClick={() => setRemoveGridLines((prev) => !prev)}
                                >
                                    {removeGridLines ? 'Show Grid' : 'Remove Grid'}
                                </button>
                            </div>
                            <div className='h-[50%] w-full flex flex-col p-[4px] text-[12px] md:text-[16px]'>
                                <div className='h-[33%] w-full flex items-center justify-between text-lightRed'>
                                    <div>Wagered</div>
                                    <div>{gameDataRedux.cumulativeMoneyStats && `$${gameDataRedux.cumulativeMoneyStats.wagered}`}</div>
                                </div>
                                <div className='h-[33%] w-full flex items-center justify-between text-lightGreen'>
                                    <div>Won</div>
                                    <div>{gameDataRedux.cumulativeMoneyStats && `$${gameDataRedux.cumulativeMoneyStats.won}`}</div>
                                </div>
                                <div className={`${gameDataRedux?.cumulativeMoneyStats?.profit > 0 ? 'text-lightGreen' : 'text-lightRed'} h-[33%] w-full flex items-center justify-between `}>
                                    <div>Profit</div>
                                    <div>{gameDataRedux?.cumulativeMoneyStats && `$${gameDataRedux?.cumulativeMoneyStats?.profit}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='h-full w-full flex py-[4px]'>
                        <div className='h-full w-1/2 flex flex-col overflow-y-scroll'>
                            <div className='h-1/5 w-full flex justify-evenly items-center text-[12px] md:text-[14px] text-lightGreen font-semibold'>
                                <div className='greenUnderline px-[2px] text-center w-[25%]'>Game</div>
                                <div className='greenUnderline px-[2px] text-center w-[30%] '>Wagered</div>
                                <div className='greenUnderline px-[2px] text-center w-[22.5%] '>Won</div>
                                <div className='greenUnderline px-[2px] text-center w-[22.5%] '>Profit</div>
                            </div>
                            {gameDataRedux.savedGames.length > 0 && gameDataRedux.savedGames.map((game, i) => {
                                return <div className='h-1/5 w-full flex justify-evenly items-center text-[12px] md:text-[14px]'>
                                    <div className='px-[2px] text-center w-[25%] text-brilliantGreen'>{game.game}</div>
                                    <div className='px-[2px] text-center w-[30%] text-lightRed'>${game.moneyStats.wagered}</div>
                                    <div className='px-[2px] text-center w-[22.5%] text-lightGreen'>${game.moneyStats.won}</div>
                                    <div className={`${game.moneyStats.profit > 0 ? 'text-lightGreen' : 'text-lightRed'} px-[2px] text-center w-[22.5%]`}>${game.moneyStats.profit}</div>
                                </div>
                            })}
                        </div>
                        <div className='h-full w-[50%] flex flex-col p-[1rem]'>
                            <div className='h-[33%] w-full flex items-center justify-center gap-[1rem] text-[12px] md:text-[16px] text-lightRed redUnderline'>
                                <div>Wagered</div>
                                <div>{gameDataRedux.cumulativeMoneyStats && `$${gameDataRedux.cumulativeMoneyStats.wagered}`}</div>
                            </div>
                            <div className='h-[33%] w-full flex items-center justify-center gap-[1rem] text-[12px] md:text-[16px] text-lightGreen greenUnderline'>
                                <div>Won</div>
                                <div>{gameDataRedux.cumulativeMoneyStats && `$${gameDataRedux.cumulativeMoneyStats.won}`}</div>
                            </div>
                            <div className={`${gameDataRedux.cumulativeMoneyStats.profit > 0 ? 'text-lightGreen greenUnderline' : 'text-lightRed redUnderline'} h-[33%] w-full flex items-center justify-center gap-[1rem] text-[12px] md:text-[16px] `}>
                                <div>Profit</div>
                                <div>{gameDataRedux.cumulativeMoneyStats && `$${gameDataRedux.cumulativeMoneyStats.profit}`}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* NEW COMPONENT END */}
        </div>
    );
};

export default About;


