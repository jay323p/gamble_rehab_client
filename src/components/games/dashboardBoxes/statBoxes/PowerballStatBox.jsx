import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_RESET_POWERBALL_HISTORY,
    SET_VIEW_POWERBALL_HISTORY,
    selectPowerballHistory,
    selectPowerballMoneyStats,
    selectPreviousPowerballGame,
    selectViewPowerballHistory,
} from '../../../../redux/features/games/powerballSlice';
import { motion } from 'framer-motion';
import {
    SET_GAME_HISTORY_UPDATED,
    selectUser,
} from '../../../../redux/features/auth/authSlice';
import { saveGame } from '../../../../services/gameService';
import { toast } from 'react-toastify';

const PowerballStatBox = () => {
    const dispatch = useDispatch();

    const previousPowerballGameRedux = useSelector(selectPreviousPowerballGame);
    const powerballMoneyStatsRedux = useSelector(selectPowerballMoneyStats);
    const viewPowerballHistoryRedux = useSelector(selectViewPowerballHistory);
    const powerballHistoryRedux = useSelector(selectPowerballHistory);
    const userRedux = useSelector(selectUser);

    const [confirmReset, setConfirmReset] = useState(false);

    const resetPowerballHistory = async () => {
        if (powerballHistoryRedux.length > 0) {
            const gameSave = {
                game: 'Powerball',
                history: powerballHistoryRedux,
                moneyStats: powerballMoneyStatsRedux,
                userEmail: userRedux.email,
            };

            const savedGameData = await saveGame(gameSave);
            dispatch(SET_GAME_HISTORY_UPDATED(true));
            dispatch(SET_RESET_POWERBALL_HISTORY(true));
            setConfirmReset(false);
        } else {
            toast.error('Please generate play-history prior to reset!');
            setConfirmReset(false);
        }
    };

    const toggleHistoryViewing = () => {
        if (viewPowerballHistoryRedux) {
            dispatch(SET_VIEW_POWERBALL_HISTORY(false));
        } else {
            dispatch(SET_VIEW_POWERBALL_HISTORY(true));
        }
    };

    return (
        <div className="h-full w-full flex flex-col p-[4px]">
            <div className="h-1/5 w-full flex">
                <div className="bg-lightGreen h-full w-1/5 font-bold flex justify-center items-center rounded-tl-sm rounded-bl-sm">
                    <div>Previous</div>
                </div>
                <div className="bg-lightGreen opacity-50 h-full w-[30%] text-[14px] font-bold flex gap-[1px] justify-evenly items-center ">
                    {previousPowerballGameRedux &&
                        previousPowerballGameRedux.userNumbers.map((num, i) => {
                            if (i === 5) {
                                return (
                                    <div className="text-red-500" key={`${num}-user-pb`}>
                                        {num}
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="brightness-125" key={`${num}-user-non-pb`}>
                                        {num}
                                    </div>
                                );
                            }
                        })}
                </div>
                <div className="bg-lightGreen h-full w-1/5 font-bold flex justify-center items-center">
                    <div>Winners</div>
                </div>
                <div className="bg-lightGreen opacity-50 h-full w-[30%] text-[14px] font-bold flex justify-evenly items-center rounded-tr-sm rounded-br-sm px-[2px]">
                    {previousPowerballGameRedux &&
                        previousPowerballGameRedux.winningNumbers.map((num, i) => {
                            if (i === 5) {
                                return (
                                    <div className="text-red-500" key={`${num}-win-pb`}>
                                        {num}
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="" key={`${num}-win-non-pb`}>
                                        {num}
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
            <div className="h-1/5 w-full flex justify-center items-center">
                <div
                    className={`w-[99%] text-center text-[16px] font-bold redUnderline ${previousPowerballGameRedux &&
                            previousPowerballGameRedux.payout === 0
                            ? 'text-red-500'
                            : 'text-brilliantGreen'
                        }`}
                >
                    {previousPowerballGameRedux &&
                        `$${previousPowerballGameRedux.payout}`}
                </div>
            </div>
            <div className="h-3/5 w-full flex justify-between items-center">
                <div className="h-full w-3/5 flex items-center gap-[1rem] text-center font-bold">
                    <div className={`w-full rounded-lg `}>
                        <div className="h-full rounded-lg  text-red-500 text-[12px]">
                            {powerballMoneyStatsRedux &&
                                `$${powerballMoneyStatsRedux.wagered} wager`}
                        </div>
                    </div>
                    <div
                        className={`w-full  ${powerballMoneyStatsRedux.won > 0
                                ? ' text-brilliantGreen'
                                : ' text-red-500'
                            } rounded-lg `}
                    >
                        <div className="h-full rounded-lg  text-[12px]">
                            {powerballMoneyStatsRedux &&
                                `$${powerballMoneyStatsRedux.won} in wins`}
                        </div>
                    </div>
                    <div
                        className={`w-full  ${powerballMoneyStatsRedux.profit > 0
                                ? 'text-brilliantGreen'
                                : 'text-red-500'
                            } rounded-lg `}
                    >
                        <div className="h-full rounded-lg  text-[12px]">
                            {powerballMoneyStatsRedux.profit <= 0
                                ? `${powerballMoneyStatsRedux.profit} profit `
                                : ``}
                        </div>
                    </div>
                </div>
                <div className="h-full w-2/5 flex justify-evenly items-center px-[3px] gap-[3px]">
                    {!confirmReset ? (
                        <motion.button
                            whileHover={{
                                backgroundColor: 'rgb(239, 68, 68)',
                                color: '#030806',
                                transition: { duration: 0.01 },
                            }}
                            className="rounded-lg text-red-500 cursor-pointer w-[40%] border-2 border-red-500"
                            onClick={() => setConfirmReset((prev) => !prev)}
                        >
                            Reset
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{
                                backgroundColor: 'rgb(239, 68, 68)',
                                color: '#030806',
                                transition: { duration: 0.01 },
                            }}
                            className="rounded-lg text-red-500 cursor-pointer w-[40%] border-2 border-red-500"
                            onClick={() => setConfirmReset((prev) => !prev)}
                        >
                            Cancel
                        </motion.button>
                    )}
                    {!confirmReset ? (
                        <motion.button
                            whileHover={{
                                backgroundColor: 'rgb(13, 155, 92)',
                                color: '#030806',
                                transition: { duration: 0.01 },
                            }}
                            className="rounded-lg text-brilliantGreen cursor-pointer w-[40%] border-2 border-brilliantGreen"
                            onClick={() => toggleHistoryViewing()}
                        >
                            {viewPowerballHistoryRedux ? 'Close' : 'History'}
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{
                                backgroundColor: 'rgb(13, 155, 92)',
                                color: '#030806',
                                transition: { duration: 0.01 },
                            }}
                            className="rounded-lg text-brilliantGreen cursor-pointer w-[40%] border-2 border-brilliantGreen"
                            onClick={() => resetPowerballHistory()}
                        >
                            Confirm
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PowerballStatBox;
