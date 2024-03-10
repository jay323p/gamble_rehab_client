import React, { useState } from 'react';
import {
    SET_KENO_REG_HISTORY_MODAL,
    SET_KENO_WAGERED_AND_WON,
    SET_REGULAR_KENO_GAME_HISTORY,
    selectRegularKenoGameHistory,
    selectWageredKeno,
    selectWonKeno,
} from '../../redux/features/games/kenoSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_GAME_HISTORY_UPDATED,
    selectUser,
} from '../../redux/features/auth/authSlice';
import { saveGame } from '../../services/gameService';

const KenoRegHistoryModal = () => {
    const dispatch = useDispatch();
    const regularKenoGameHistoryRedux = useSelector(selectRegularKenoGameHistory);
    const wageredKenoRedux = useSelector(selectWageredKeno);
    const wonKenoRedux = useSelector(selectWonKeno);
    const userRedux = useSelector(selectUser);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const deleteRegularKenoGameHistory = async () => {
        const netProfit = wonKenoRedux - wageredKenoRedux;
        const kenoMoneyStats = {
            wagered: wageredKenoRedux,
            won: wonKenoRedux,
            profit: netProfit,
        };
        const gameSave = {
            game: 'Keno',
            history: regularKenoGameHistoryRedux,
            moneyStats: kenoMoneyStats,
            userEmail: userRedux.email,
        };

        await saveGame(gameSave);
        dispatch(SET_GAME_HISTORY_UPDATED(true));
        dispatch(SET_REGULAR_KENO_GAME_HISTORY([]));
        dispatch(SET_KENO_REG_HISTORY_MODAL(false));
        dispatch(SET_KENO_WAGERED_AND_WON({ wageredKeno: 0, wonKeno: 0 }));
        setConfirmDelete(false);
    };
    return (
        <div className="h-full w-full bg-heroBorder shadow3Darker flex flex-col gap-[1px] px-[3px] py-[3px] overflow-y-scroll">
            {regularKenoGameHistoryRedux &&
                regularKenoGameHistoryRedux.length > 0 &&
                regularKenoGameHistoryRedux.map((game, i) => {
                    if (i === 0) {
                        return (
                            <div
                                key={`${regularKenoGameHistoryRedux[i].spots}-${i}`}
                                className="w-full bg-dark flex justify-center gap-[1rem] items-center"
                            >
                                {confirmDelete ? (
                                    <>
                                        <button
                                            className="bg-red-500 h-[86%] rounded-md px-[2px] text-[14px] font-semibold"
                                            onClick={() => deleteRegularKenoGameHistory()}
                                        >
                                            Confirm Delete
                                        </button>
                                        <button
                                            className="bg-yellow-400 h-[86%] rounded-md px-[2px] text-[14px] font-semibold"
                                            onClick={() => setConfirmDelete(false)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="bg-red-500 h-[86%] rounded-md px-[2px] text-[14px] font-semibold"
                                        onClick={() => setConfirmDelete(true)}
                                    >
                                        Delete History
                                    </button>
                                )}
                            </div>
                        );
                    }
                    return (
                        <div className="w-full bg-dark flex justify-evenly items-center py-[4px]">
                            <h3 className="text-dark text-[12px] h-full font-semibold bg-lightGreen rounded-sm p-[2px]">
                                <span className="bg-dark text-lightGreen px-[1px]">#{i}</span>{' '}
                                <span className="bg-heroBorder px-[1px]">
                                    {game.spots}-Spot-Game
                                </span>{' '}
                                <span className="bg-heroBorder px-[1px]">
                                    {game.matches}
                                    -Matches
                                </span>{' '}
                                <span className="bg-brilliantGreen px-[1px]">
                                    ${game.payout} Payout
                                </span>
                            </h3>

                            <div className="w-1/2 h-full kenoStatGrid">
                                {game.fixedWinningNums &&
                                    game.recentWinningNums &&
                                    game.recentWinningNums.map((num) => {
                                        return (
                                            <div
                                                className={`${game.fixedWinningNums[num] ? 'statGridUserMatch' : ''
                                                    } bg-dark text-brilliantGreen text-[10px] rounded-sm`}
                                            >
                                                {num}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default KenoRegHistoryModal;
