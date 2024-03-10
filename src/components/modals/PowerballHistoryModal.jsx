import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectPowerballHistory,
} from '../../redux/features/games/powerballSlice';

const PowerballHistoryModal = () => {
    const powerballHistoryRedux = useSelector(selectPowerballHistory);
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-[96%] w-[96%] bg-dark flex flex-col  overflow-y-scroll">
                {powerballHistoryRedux &&
                    powerballHistoryRedux.length > 0 &&
                    powerballHistoryRedux.map((game, i) => {
                        return (
                            <div
                                key={i}
                                className={`${game.payout > 0
                                        ? 'greenUnderline text-brilliantGreen'
                                        : 'redUnderline text-red-500'
                                    } flex items-center justify-evenly`}
                            >
                                <div className="pl-[4px] text-[14px] w-[20%] font-thin font-mono">
                                    #{i}
                                </div>

                                <div className="text-[14px] w-[30%] font-thin font-mono flex items-center justify-evenly text-start">
                                    {game.userNumbers.map((num, i) => {
                                        return (
                                            <div
                                                key={`user-${num}-${i}`}
                                                className={`${game.payout > 0 ? 'text-green-200' : 'text-red-200'
                                                    }`}
                                            >
                                                {num}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="pl-[12px] text-[14px] w-[30%] font-thin font-mono flex items-center justify-evenly text-end">
                                    {game.winningNumbers.map((num, i) => {
                                        return (
                                            <div
                                                key={`winner-${num}-${i}`}
                                                className={`${game.payout > 0 ? 'text-green-400' : 'text-red-400'
                                                    }`}
                                            >
                                                {num}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="text-[14px] w-[20%] font-thin font-mono text-end pr-[4px]">
                                    ${game.payout}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default PowerballHistoryModal;
