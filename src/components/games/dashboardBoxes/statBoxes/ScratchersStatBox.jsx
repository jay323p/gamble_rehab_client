import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_RESET_SCRATCHER_HISTORY,
    selectGameTicket,
    selectScratchedAlready,
    selectScratcherHistory,
    selectScratchersMoneyStats,
} from '../../../../redux/features/games/scratchersSlice';
import {
    SET_GAME_HISTORY_UPDATED,
    selectUser,
} from '../../../../redux/features/auth/authSlice';
import { saveGame } from '../../../../services/gameService';
import { toast } from 'react-toastify';

const ScratchersStatBox = () => {
    const dispatch = useDispatch();

    const gameTicketRedux = useSelector(selectGameTicket);
    const scratchedAlreadyRedux = useSelector(selectScratchedAlready);
    const scratcherHistoryRedux = useSelector(selectScratcherHistory);
    const moneyStatsRedux = useSelector(selectScratchersMoneyStats);
    const userRedux = useSelector(selectUser);

    const [confirmReset, setConfirmReset] = useState(false);

    const resetHistory = async () => {
        if (scratcherHistoryRedux.length > 0) {
            const gameSave = {
                game: 'Scratchers',
                history: scratcherHistoryRedux,
                moneyStats: moneyStatsRedux,
                userEmail: userRedux.email,
            };

            const savedGameData = await saveGame(gameSave);
            dispatch(SET_GAME_HISTORY_UPDATED(true));
            dispatch(SET_RESET_SCRATCHER_HISTORY(true));
            setConfirmReset(false);
        } else {
            toast.error('Please generate play-history prior to reset!');
            setConfirmReset(false);
        }
    };
    return (
        <div className="w-full h-full p-[4px] flex justify-evenly items-center gap-[4px]">
            <div className="w-1/2 h-full shadow3 rounded-xl p-[8px]">
                <div className="h-full w-full bg-lightGreen rounded-sm opacity-50 flex flex-col overflow-y-scroll cursor-grab text-[12px]">
                    <div className="h-[20%] w-full bg-red-400 flex justify-center items-center gap-[10%]">
                        <button
                            className={`${confirmReset ? 'w-[40%] bg-red-200' : 'w-[80%] bg-red-500'
                                } h-full text-center rounded-sm text-[10px] font-bold`}
                            onClick={() => setConfirmReset((prev) => !prev)}
                        >
                            {confirmReset ? 'CANCEL' : 'RESET'}
                        </button>
                        {confirmReset && (
                            <button
                                className={`w-[40%] h-full text-center bg-red-500 rounded-sm text-[10px] font-bold`}
                                onClick={() => resetHistory()}
                            >
                                CONFIRM
                            </button>
                        )}
                    </div>
                    {scratcherHistoryRedux &&
                        scratcherHistoryRedux.map((item, i) => {
                            return (
                                <div
                                    className={`w-full h-[20%] ${i % 2 === 0
                                            ? 'bg-lightGreen text-darkGreen'
                                            : 'bg-darkGreen text-lightGreen'
                                        } flex justify-evenly items-center`}
                                    key={`${item.id}-${i}`}
                                >
                                    <div className="">#{i}</div>
                                    <div className="">{item.matches}-matches</div>
                                    <div className="">${item.payout}-won</div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="w-1/2 h-full shadow3 rounded-xl p-[8px]">
                <div className="h-full w-full bg-lightGreen rounded-sm opacity-80 flex flex-col">
                    <div className="h-1/6 w-full shadow3 flex justify-center items-center text-[12px] font-bold">
                        Quick View
                    </div>
                    <div className="h-5/6 w-full bg-brilliantGreen overflow-y-scroll">
                        <div
                            className={`h-full w-full flex flex-col ${scratchedAlreadyRedux ? 'pt-[8px]' : 'pt-[4px]'
                                }`}
                        >
                            <div className="h-1/4 w-full flex justify-center items-center gap-[2%]">
                                {gameTicketRedux &&
                                    scratchedAlreadyRedux &&
                                    gameTicketRedux.winningNums
                                    ? gameTicketRedux.winningNums.map((num, i) => {
                                        return (
                                            <div
                                                key={`${num}-scratcher-winner`}
                                                className="w-[14%] bg-dark text-brilliantGreen font-extrabold rounded-sm text-center"
                                            >
                                                {num}
                                            </div>
                                        );
                                    })
                                    : ''}
                            </div>
                            <div
                                className={`h-3/4 w-full ${scratchedAlreadyRedux ? 'scratcherGrid h-3/4' : 'h-full'
                                    }  items-center justify-center pt-[5px]`}
                            >
                                {gameTicketRedux &&
                                    scratchedAlreadyRedux &&
                                    gameTicketRedux.winningNums ? (
                                    gameTicketRedux.scratchOffArea.map((area, i) => {
                                        return (
                                            <div
                                                key={`${area.number}-scratcher-matcher`}
                                                className={`${gameTicketRedux.winningNums.includes(area.number)
                                                        ? 'text-brilliantGreen'
                                                        : 'text-red-300'
                                                    } w-[98%] h-[80%] bg-dark flex flex-col justify-center items-center rounded-sm md:text-[14px] lg:text-[16px] pb-[2px]`}
                                            >
                                                <div className="text-[12px]">{area.number}</div>
                                                <div className="text-[8px]">
                                                    ${area.prize.toFixed(2)}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="h-full w-full flex flex-col py-[1px] gap-[2px]">
                                        <div
                                            className={`h-1/3 w-full flex justify-center items-center gap-[10px] ${moneyStatsRedux.wagered > 0 &&
                                                'bg-red-300 text-lightRed'
                                                }`}
                                        >
                                            <div className="font-extrabold">Wagered</div>
                                            <div className="font-extrabold">
                                                ${moneyStatsRedux.wagered}
                                            </div>
                                        </div>
                                        <div className="h-1/3 w-full flex justify-center items-center gap-[10px] bg-darkGreen text-brilliantGreen">
                                            <div className=" font-extrabold">Won</div>
                                            <div className=" font-extrabold">
                                                ${moneyStatsRedux.won}
                                            </div>
                                        </div>
                                        <div
                                            className={`h-1/3 w-full flex justify-center items-center gap-[10px] ${moneyStatsRedux.profit > 0
                                                    ? 'bg-brilliantGreen text-lightGreen'
                                                    : 'bg-red-300 text-lightRed'
                                                }`}
                                        >
                                            <div className="font-extrabold">Profit</div>
                                            <div className="font-extrabold">
                                                ${moneyStatsRedux.profit}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScratchersStatBox;
