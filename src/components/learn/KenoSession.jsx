import React from 'react'

const KenoSession = ({ session }) => {
    return (
        <div className="h-[100%] w-full bg-heroBorder shadow3Darker flex flex-col gap-[1px] px-[3px] py-[3px] overflow-y-scroll">
            {session &&
                session.history.length > 0 &&
                session.history.map((game, i) => {
                    return (
                        <div key={`keno-${i}-${Math.random()}`} className="w-full bg-dark flex justify-evenly items-center py-[4px]">
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
                                    game.recentWinningNums.map((num, i) => {
                                        return (
                                            <div key={`keno-win-${num}-${i}-${Math.random()}`}
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
    )
}

export default KenoSession