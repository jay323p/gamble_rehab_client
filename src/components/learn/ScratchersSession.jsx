import React from 'react'

const ScratchersSession = ({ session }) => {
    return (
        <div className='h-full w-full p-[4px] overflow-y-scroll'>
            <div className='h-full w-full flex flex-col bg-darkGreen gap-[4px] p-[2px]'>
                {session && session.history.length > 0 && session.history.map((game, i) => {
                    return <div key={`${game.id}-${Math.random()}`} className='h-1/3 w-full flex flex-col items-center bg-dark py-[6px] gap-[4px]'>
                        <div className='h-1/5 w-1/4 flex justify-center items-center gap-[8px] shadow3 rounded-sm text-[12px] font-semibold text-lightGreen'>
                            {game.winningNums && game.winningNums.map((num, i) => {
                                return <div key={`winning-${game.id}-${num}-${i}`} className=''>{num}</div>
                            })}
                        </div>
                        <div className='h-4/5 w-full scratcherGrid justify-center items-center text-[10px]'>
                            {game.scratchOffArea && game.scratchOffArea.map((area, i) => {
                                return <div key={`scratch-${game.id}-${i}-${area.num}-${area.prize}`} className={`${game.winningNums.includes(area.number) ? 'text-lightGreen greenUnderline' : 'text-red-500'} flex flex-col items-center`}>
                                    <div>{area.number}</div>
                                    <div>${area.prize.toFixed(2)}</div>
                                </div>
                            })}
                        </div>
                        <div className='relative top-1 left-[45%] text-lightGreen text-[14px]'>#{i + 1}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ScratchersSession
