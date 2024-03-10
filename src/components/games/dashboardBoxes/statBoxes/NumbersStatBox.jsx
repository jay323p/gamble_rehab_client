import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectNumbersGameMoneyStats,
    selectNumbersHistory,
    selectPreviousNumbersGame,
} from '../../../../redux/features/games/numbersSlice';

const NumbersStatBox = () => {
    const previousNumbersGameRedux = useSelector(selectPreviousNumbersGame);
    const moneyStatsRedux = useSelector(selectNumbersGameMoneyStats);
    const numbersHistoryRedux = useSelector(selectNumbersHistory);

    return (
        <div className="h-full w-[full] ml-auto mr-auto bg-heroBorder flex flex-col p-[4px]">
            <div className="h-full w-full bg-dark flex flex-col p-[4px] rounded-sm">
                <div className="h-1/4 w-full bg-darkGreen rounded-sm shadow3 flex items-center gap-[3px] px-[3px]">
                    <div className="h-[70%] w-[20%] flex justify-center items-center bg-dark text-[12px] text-lightGreen font-semibold rounded-sm">
                        {previousNumbersGameRedux &&
                            previousNumbersGameRedux.type !== '' && (
                                <h5>{previousNumbersGameRedux.type}</h5>
                            )}
                    </div>
                    <div className="h-[70%] w-[16%] flex justify-center items-center bg-dark text-[14px] text-red-500 font-semibold rounded-sm">
                        {previousNumbersGameRedux &&
                            previousNumbersGameRedux.wagered > 0 && (
                                <h5>${previousNumbersGameRedux.wagered}-Bet</h5>
                            )}
                    </div>
                    <div className="h-[70%] w-[11%] flex justify-center items-center bg-dark text-lightGreen font-semibold rounded-sm">
                        {previousNumbersGameRedux &&
                            previousNumbersGameRedux.userNumbers.length > 0 &&
                            previousNumbersGameRedux.userNumbers.map((num, index) => {
                                return <h5 key={`${num}-${index}`}>{num}</h5>;
                            })}
                    </div>
                    <div className="h-[70%] w-[20%] flex justify-center items-center bg-dark text-lightGreen font-semibold rounded-sm">
                        <h5>Winners: </h5>
                    </div>
                    <div className="h-[70%] w-[12%] flex justify-center items-center bg-dark text-lightGreen font-semibold rounded-sm">
                        {previousNumbersGameRedux &&
                            previousNumbersGameRedux.winningNums.length > 0 &&
                            previousNumbersGameRedux.winningNums.map((num, index) => {
                                return <h5 key={`${num}-${index}`}>{num}</h5>;
                            })}
                    </div>
                    <div
                        className={`h-[70%] w-[18%] flex justify-center items-center bg-dark ${previousNumbersGameRedux.payout === 0
                            ? 'text-red-500'
                            : 'text-lightGreen'
                            } font-semibold rounded-sm`}
                    >
                        {previousNumbersGameRedux && (
                            <h5 className="break-words text-[13px]">
                                {previousNumbersGameRedux.payout === 0
                                    ? `$${previousNumbersGameRedux.wagered} Loss`
                                    : `$${previousNumbersGameRedux.payout}`}{' '}
                            </h5>
                        )}
                    </div>
                </div>
                <div className="h-3/4 w-full flex flex-col bg-dark rounded-sm shadow1">
                    <div className="h-1/4 w-full flex justify-center items-center gap-[2px] font-semibold text-[14px]">
                        {moneyStatsRedux && (
                            <>
                                <h2 className="w-full bg-dark rounded-sm redShadow3 text-red-500 text-center px-[4px]">
                                    Wagered ${moneyStatsRedux.wagered}
                                </h2>
                                <h2 className="w-full bg-dark text-lightGreen rounded-sm shadow3 px-[4px]">
                                    Won ${moneyStatsRedux.won}
                                </h2>
                                <h2
                                    className={`w-full bg-dark rounded-sm ${moneyStatsRedux.profit > 0
                                        ? 'shadow3 text-lightGreen'
                                        : 'redShadow3 text-red-500'
                                        } px-[4px] text-[13px] break-words`}
                                >
                                    {moneyStatsRedux.profit >= 0
                                        ? `Profit $${moneyStatsRedux.profit}`
                                        : `${moneyStatsRedux.profit} Dollar Profit`}
                                </h2>
                            </>
                        )}
                    </div>
                    <div className="h-[70%] w-full flex flex-col overflow-y-scroll pb-[2px]">
                        {numbersHistoryRedux &&
                            numbersHistoryRedux.map((game, index) => {
                                return (
                                    <div
                                        className={`h-auto w-full flex justify-evenly items-center ${game.gameProfit > 0 ? 'greenUnderline' : 'redUnderline'
                                            }`}
                                        key={index}
                                    >
                                        <h3
                                            className={`${game.gameProfit > 0
                                                ? 'text-brilliantGreen'
                                                : 'text-red-500'
                                                }  text-[12px]`}
                                        >
                                            Game #{index}
                                        </h3>
                                        <h3
                                            className={`${game.gameProfit > 0
                                                ? 'text-brilliantGreen'
                                                : 'text-red-500'
                                                }  text-[12px]`}
                                        >
                                            {game.type} -- {game.userNumbers}
                                        </h3>
                                        <h3
                                            className={`${game.gameProfit > 0
                                                ? 'text-brilliantGreen'
                                                : 'text-red-500'
                                                }  text-[12px]`}
                                        >
                                            Winners -- {game.winningNums}
                                        </h3>
                                        <h3
                                            className={`${game.gameProfit > 0
                                                ? 'text-brilliantGreen'
                                                : 'text-red-500'
                                                }  text-[12px]`}
                                        >
                                            ${game.wagered}-Bet
                                        </h3>
                                        <h3
                                            className={`${game.gameProfit > 0
                                                ? 'text-brilliantGreen'
                                                : 'text-red-500'
                                                }  text-[12px]`}
                                        >
                                            ${game.payout}-Won
                                        </h3>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumbersStatBox;
