import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_READY_TO_CHOOSE_SPOTS,
    SET_KENO_GAME,
    SET_KENO_REG_HISTORY_MODAL,
    SET_REPLAY_KENO_GAME,
    selectPreviousKenoGame,
    selectKenoGame,
    selectKenoSimStarted,
    selectShowKenoRegHistoryModal,
    selectShowKenoSimHistoryModal,
} from '../../../../redux/features/games/kenoSlice';

const spotsBtnArray = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
];

const simulationsBtnArray = ['100', '1K', '2K', '5K', '10K'];

const KenoStartBox = () => {
    const [mode, setMode] = useState('');
    const [spotChoice, setSpotChoice] = useState('');
    const [simulations, setSimulations] = useState('');
    const [readyToChoose, setReadyToChoose] = useState(false);

    const kenoGameRedux = useSelector(selectKenoGame);
    const kenoSimStartedRedux = useSelector(selectKenoSimStarted);
    const previousKenoGameRedux = useSelector(selectPreviousKenoGame);
    const showKenoRegHistoryRedux = useSelector(selectShowKenoRegHistoryModal);
    const showKenoSimHistoryRedux = useSelector(selectShowKenoSimHistoryModal);

    const dispatch = useDispatch();

    const changeMode = (e) => {
        setReadyToChoose(false);
        dispatch(SET_READY_TO_CHOOSE_SPOTS(false));
        dispatch(
            SET_KENO_GAME({
                mode: '',
                spots: '',
                simulations: '',
            })
        );
        setMode(e.target.innerText);
    };

    const changeSpot = (e) => {
        setSpotChoice(e.target.innerText);
    };

    const changeSimulations = (e) => {
        setSimulations(e.target.innerText);
    };

    const changeReadyToChoose = () => {
        if (mode === 'Regular' && spotChoice !== '') {
            setReadyToChoose(true);
            dispatch(SET_READY_TO_CHOOSE_SPOTS(true));
            let kenoGame = {
                mode,
                spots: spotChoice,
                simulations,
            };
            dispatch(SET_KENO_GAME(kenoGame));
        }
        if (mode === 'Simulator' && simulations !== '') {
            setReadyToChoose(true);
            dispatch(SET_READY_TO_CHOOSE_SPOTS(true));
            let kenoGame = {
                mode,
                spots: spotChoice,
                simulations,
            };
            dispatch(SET_KENO_GAME(kenoGame));
        }
        return;
    };

    const resetKenoGame = () => {
        setReadyToChoose(false);
        setMode('');
        setSpotChoice('');
        setSimulations('');
        dispatch(SET_READY_TO_CHOOSE_SPOTS(false));
        dispatch(
            SET_KENO_GAME({
                mode: '',
                spots: '',
                simulations: '',
            })
        );
        dispatch(SET_KENO_REG_HISTORY_MODAL(false));
    };

    const replayKenoGame = () => {
        dispatch(
            SET_KENO_GAME({
                mode: previousKenoGameRedux.mode,
                spots: previousKenoGameRedux.spots,
                simulations: '',
            })
        );
        dispatch(SET_REPLAY_KENO_GAME(true));
        setMode((prev) =>
            previousKenoGameRedux.mode ? previousKenoGameRedux.mode : prev
        );
        setSpotChoice((prev) =>
            previousKenoGameRedux.spots ? previousKenoGameRedux.spots : prev
        );
    };

    useEffect(() => {
        resetKenoGame();
    }, []);

    return (
        <>
            {!readyToChoose ? (
                <div className="text-white h-full w-full flex flex-col">
                    <div className="w-full h-1/3 flex justify-evenly md:justify-start md:gap-[1rem] items-center">
                        <h2 className="text-[18px] linearGradientText1 font-semibold md:flex-2 md:text-[22px]">
                            Keno
                        </h2>
                        <motion.button
                            whileHover={{ backgroundColor: '#5FB495' }}
                            className={`${mode === 'Regular' ? 'active' : ''
                                } shadow7 text-[12px] text-lighSilver font-thin px-[3px] w-1/4 h-[80%] md:flex-1`}
                            onClick={(e) => changeMode(e)}
                        >
                            Regular
                        </motion.button>
                        <motion.button
                            whileHover={{ backgroundColor: '#5FB495' }}
                            className={`${mode === 'Simulator' ? 'active' : ''
                                } shadow7 text-[12px] text-lighSilver font-thin px-[3px] w-1/4 h-[80%] md:flex-1`}
                            onClick={(e) => changeMode(e)}
                        >
                            Simulator
                        </motion.button>
                    </div>
                    <div className="w-full h-1/3 flex gap-[2px] px-[2px] items-center">
                        <span className="linearGradientText1 font-semibold pr-[2px] pl-[4px] text-[16px] md:text-[20px] md:pr-[10px]">
                            Spots
                        </span>{' '}
                        {spotsBtnArray.map((spot) => {
                            return (
                                <motion.button
                                    whileHover={{ backgroundColor: 'rgba(95, 180, 149, 0.6)' }}
                                    key={spot}
                                    className={`${spotChoice === spot ? 'active' : ''
                                        } w-full h-[80%] shadow7 text-[12px] text-white font-semibold`}
                                    onClick={(e) => changeSpot(e)}
                                >
                                    {spot}
                                </motion.button>
                            );
                        })}
                    </div>
                    <div className="w-full h-1/3">
                        {mode === 'Regular' ? (
                            // REGULAR MODE -------------------------------------------------------------------------------
                            <div className="h-full w-full flex justify-between items-center px-[10px] md:justify-center">
                                <h3 className="w-full text-[14px] linearGradientText1 font-extrabold md:text-center md:text-[20px]">
                                    {mode} {spotChoice} Spot Keno Game
                                </h3>
                                {mode === 'Regular' && spotChoice !== '' && (
                                    <motion.button
                                        className="bg-brilliantGreen px-[10px] w-1/3 md:w-full text-dark font-extrabold md:text-[20px]"
                                        initial={{ backgroundColor: '#0D9B5C', color: '#030806' }}
                                        whileHover={{
                                            backgroundColor: '#030806',
                                            color: '#0D9B5C',
                                            transition: { duration: 0.3 },
                                        }}
                                        animate={{ backgroundColor: '#030806', color: '#0D9B5C' }}
                                        transition={{ duration: 2.4, repeat: Infinity }}
                                        onClick={() => changeReadyToChoose()}
                                    >
                                        Play
                                    </motion.button>
                                )}
                            </div>
                        ) : mode === 'Simulator' ? (
                            //   SIMULATOR MODE -------------------------------------------------------------------------------
                            <div className="h-full w-full flex justify-evenly items-center px-[3px]">
                                <h3 className="max-w-[30%] text-[10px] md:text-[16px] font-extrabold linearGradientText1">
                                    {spotChoice} spot {mode} for {simulations} runs
                                </h3>

                                {simulationsBtnArray.map((sim) => {
                                    return (
                                        <motion.button
                                            whileHover={{
                                                backgroundColor: 'rgba(95, 180, 149, 0.6)',
                                            }}
                                            key={sim}
                                            className={`${simulations === sim ? 'active2' : ''
                                                } w-[13.3%] h-[80%] shadow7 text-[10px] text-white font-semibold`}
                                            onClick={(e) => changeSimulations(e)}
                                        >
                                            {sim}
                                        </motion.button>
                                    );
                                })}

                                {mode === 'Simulator' && simulations !== '' && (
                                    <motion.button
                                        className="bg-brilliantGreen h-[80%] w-[13.3%] text-dark text-center font-extrabold"
                                        whileHover={{
                                            backgroundColor: '#030806',
                                            color: '#0D9B5C',
                                            transition: { duration: 0.3 },
                                        }}
                                        animate={{ backgroundColor: '#030806', color: '#0D9B5C' }}
                                        transition={{ duration: 2.4, repeat: Infinity }}
                                        onClick={() => changeReadyToChoose()}
                                    >
                                        Play
                                    </motion.button>
                                )}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[98%] h-[80%]  flex flex-col">
                        <div className="w-full h-[70%] flex flex-col justify-center items-center">
                            { }
                            <h3 className="text-lightGreen font-semibold text-[18px] tall:text-[22px] text-center">
                                {mode} Keno Game
                            </h3>
                            <h3 className="text-lightGreen font-semibold text-[18px] tall:text-[22px] text-center">
                                {spotChoice}-Spot ||{' '}
                                {mode === 'Regular' ? '1 Draw' : `${simulations}-DRAWS`}
                            </h3>
                        </div>
                        <div className="w-full h-[30%] flex justify-center items-center pt-[3px]">
                            {!kenoSimStartedRedux && (
                                <motion.button
                                    className="w-full h-[80%] text-[14px] text-lightRed font-semibold"
                                    whileHover={{
                                        backgroundColor: 'rgba(186, 15, 9, 0.3)',
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    onClick={() => resetKenoGame()}
                                >
                                    RESET
                                </motion.button>
                            )}
                            {previousKenoGameRedux.mode === 'Regular' &&
                                kenoGameRedux.mode === 'Regular' &&
                                !showKenoRegHistoryRedux &&
                                !showKenoSimHistoryRedux && (
                                    <motion.button
                                        className="w-full h-[80%] text-[14px] text-heroBorder font-semibold"
                                        whileHover={{
                                            backgroundColor: '#0D9B5C',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        onClick={() => replayKenoGame()}
                                    >
                                        REPLAY
                                    </motion.button>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default KenoStartBox;
