import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { numbersPayouts } from '../../../../data/payouts/numbersPayouts';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_CANCEL_SIMULATION,
    SET_CURRENT_NUMBERS_GAME,
    SET_READY_TO_PLAY_NUMBERS,
    SET_RESET_NUMBERS_HISTORY,
    SET_START_NUMBERS_GAME,
    selectCurrentNumbersGame,
    selectNumbersGameMoneyStats,
    selectNumbersHistory,
    selectReadyToPlayNumbers,
    selectStartNumbersGame,
} from '../../../../redux/features/games/numbersSlice';
import { saveGame } from '../../../../services/gameService';
import {
    SET_GAME_HISTORY_UPDATED,
    selectUser,
} from '../../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const NumbersStartBox = () => {
    const dispatch = useDispatch();
    const readyToPlayNumbersRedux = useSelector(selectReadyToPlayNumbers);
    const startNumbersGameRedux = useSelector(selectStartNumbersGame);
    const currentNumbersGameRedux = useSelector(selectCurrentNumbersGame);
    const numbersGameHistoryRedux = useSelector(selectNumbersHistory);
    const numbersGameMoneyStatsRedux = useSelector(selectNumbersGameMoneyStats);
    const userRedux = useSelector(selectUser);

    const [gameType, setGameType] = useState('');
    const [showPlay, setShowPlay] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);

    const showPlayBtn = (typeChosen) => {
        if (currentNumbersGameRedux.type === '') {
            dispatch(SET_CURRENT_NUMBERS_GAME({ type: typeChosen }));
        } else {
            dispatch(SET_CURRENT_NUMBERS_GAME({ type: '' }));
        }
        setShowPlay((prev) => !prev);
        setGameType((prev) => (prev === '' ? typeChosen : ''));
    };

    const setReadyToPlayNumbersRedux = () => {
        dispatch(SET_READY_TO_PLAY_NUMBERS(true));
    };

    const cancelReadyToPlayNumbersRedux = () => {
        dispatch(SET_READY_TO_PLAY_NUMBERS(false));
        dispatch(SET_START_NUMBERS_GAME(false));
        if (currentNumbersGameRedux.type === 'Simulator') {
            dispatch(SET_CANCEL_SIMULATION(true));
        }
    };

    const resetNumbersHistory = async () => {
        if (numbersGameHistoryRedux.length > 0) {
            const gameSave = {
                game: 'Numbers',
                history: numbersGameHistoryRedux,
                moneyStats: numbersGameMoneyStatsRedux,
                userEmail: userRedux.email,
            };

            await saveGame(gameSave);
            dispatch(SET_GAME_HISTORY_UPDATED(true));
            dispatch(SET_RESET_NUMBERS_HISTORY(true));
            setConfirmReset(false);
        } else {
            toast.error('Please generate play-history prior to reset!');
            setConfirmReset(false);
        }
    };

    useEffect(() => {
        if (readyToPlayNumbersRedux) {
            setShowPlay(true);
            setGameType(currentNumbersGameRedux.type);
        } else {
            setShowPlay(false);
            setGameType('');
            dispatch(SET_CURRENT_NUMBERS_GAME({ type: '' }));
        }
    }, [readyToPlayNumbersRedux]);

    useEffect(() => {
        dispatch(SET_READY_TO_PLAY_NUMBERS(false));
        dispatch(SET_START_NUMBERS_GAME(false));
    }, []);
    return (
        <div className="h-full w-full flex flex-col px-[4px] pt-[4px]">
            {/* btns row [4 qp, 3 qp, choose, play] */}
            <div className="h-1/4 w-full flex justify-evenly items-center shadow3">
                {!readyToPlayNumbersRedux && (
                    <>
                        <button
                            className={`${gameType === 'Choose' ? 'hidden' : ''
                                } text-lightGreen font-semibold shadow2 text-[12px] lg:text-[22px] px-[3px] rounded-sm`}
                            onClick={() => showPlayBtn('Choose')}
                        >
                            Choose
                        </button>
                        <button
                            className={`${gameType === '4-Spot QP' ? 'hidden' : ''
                                } text-lightGreen font-semibold shadow2 text-[12px] lg:text-[22px] px-[3px] rounded-sm`}
                            onClick={() => showPlayBtn('4-Spot QP')}
                        >
                            4-Spot QP
                        </button>
                        <button
                            className={`${gameType === '3-Spot QP' ? 'hidden' : ''
                                } text-lightGreen font-semibold shadow2 text-[12px] lg:text-[22px] px-[3px] rounded-sm`}
                            onClick={() => showPlayBtn('3-Spot QP')}
                        >
                            3-Spot QP
                        </button>
                        <button
                            className={`${gameType === 'Simulator' ? 'hidden' : ''
                                } text-lightGreen font-semibold shadow2 text-[12px] lg:text-[22px] px-[3px] rounded-sm`}
                            onClick={() => showPlayBtn('Simulator')}
                        >
                            Simulator
                        </button>
                    </>
                )}
                {showPlay && (
                    <h3 className="linearGradientText1 font-bold text-[14px] lg:text-[22px]">
                        {gameType === 'Simulator' ? '100 Simulations' : gameType}
                    </h3>
                )}
                {showPlay && !readyToPlayNumbersRedux && (
                    <motion.button
                        initial={{ backgroundColor: '#0D9B5C', scale: 1 }}
                        whileHover={{
                            backgroundColor: '#030806',
                            color: '#0D9B5C',
                            transition: { duration: 0.3 },
                        }}
                        animate={{ backgroundColor: '#030806', scaleX: 1.2 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-lightGreen font-semibold shadow2 text-[14px] lg:text-[22px] px-[3px] rounded-sm"
                        onClick={() => setReadyToPlayNumbersRedux()}
                    >
                        Play
                    </motion.button>
                )}
                {readyToPlayNumbersRedux && !startNumbersGameRedux && (
                    <>
                        {!confirmReset ? (
                            <button
                                className="shadowRed1 text-red-500 px-[4px] rounded-sm text-[14px] lg:text-[22px]"
                                onClick={() => cancelReadyToPlayNumbersRedux()}
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                className="shadowRed1 text-red-500 px-[4px] rounded-sm text-[14px] lg:text-[22px]"
                                onClick={() => resetNumbersHistory()}
                            >
                                Confirm Reset
                            </button>
                        )}
                        {!startNumbersGameRedux && (
                            <button
                                className="shadow3 text-lightGreen px-[4px] rounded-sm text-[14px] lg:text-[22px]"
                                onClick={() => setConfirmReset((prev) => !prev)}
                            >
                                {confirmReset ? 'Cancel Reset' : 'Reset History'}
                            </button>
                        )}
                    </>
                )}
            </div>
            {/* info on payouts */}
            <div className="h-3/4 numbersStartInfoGrid py-[4px] gap-[5px] overflow-y-scroll">
                {numbersPayouts.map((winType) => {
                    return (
                        <div
                            className="flex flex-col text-dark font-semibold"
                            key={winType.type}
                        >
                            <h3 className="text-center text-[12px] lg:text-[16px] bg-heroBorder font-extrabold">
                                {winType.type}
                            </h3>
                            <h3 className="text-center text-[12px] lg:text-[14px] bg-heroBorder">
                                {winType.type === '4 Exact' ? (
                                    <div>
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0]}
                                        </span>{' '}
                                        ---{' '}
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[1]}
                                        </span>
                                    </div>
                                ) : winType.type === '3 Exact' ? (
                                    <div>
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0].substring(0, 3)}
                                        </span>
                                        {winType.example[0][3]}
                                        ---{' '}
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0].substring(0, 3)}
                                        </span>
                                        {winType.example[1][3]}
                                    </div>
                                ) : winType.type === '2 Exact' ? (
                                    <div>
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0].substring(0, 2)}
                                        </span>
                                        {winType.example[0].substring(2, 4)}
                                        ---{' '}
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[1].substring(0, 2)}
                                        </span>
                                        {winType.example[1].substring(2, 4)}
                                    </div>
                                ) : winType.type === '1 Exact' ? (
                                    <div>
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0].substring(0, 1)}
                                        </span>
                                        {winType.example[0].substring(1, 4)}
                                        ---{' '}
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[1].substring(0, 1)}
                                        </span>
                                        {winType.example[1].substring(1, 4)}
                                    </div>
                                ) : winType.type === '4 Any' ? (
                                    <div>
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0]}
                                        </span>
                                        ---{' '}
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[1]}
                                        </span>
                                    </div>
                                ) : winType.type === '3 Any' ? (
                                    <div>
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[0].substring(0, 3)}
                                        </span>
                                        {winType.example[0][3]}
                                        ---{' '}
                                        <span className="bg-lightGreen px-[1px]">
                                            {winType.example[1].substring(0, 3)}
                                        </span>
                                        {winType.example[1][3]}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </h3>
                            <h3 className="text-center text-[12px] bg-heroBorder"></h3>
                            <h3 className="text-center text-[12px] font-bold bg-heroBorder">
                                {winType.probability}
                            </h3>
                            <h3 className="text-center text-[12px] font-bold text-brilliantGreen bg-heroBorder">
                                ${winType.payout}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NumbersStartBox;
