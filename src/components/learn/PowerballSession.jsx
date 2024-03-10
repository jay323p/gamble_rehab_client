import React from 'react'

const PowerballSession = ({ session }) => {
    return (
        <div className='h-full w-full overflow-y-scroll flex justify-center items-center bg-darkGreen p-[5px]'>
            <div className='h-full w-full bg-dark flex flex-col'>
                {session && session.history.length > 0 && session.history.map((game, index) => {
                    return <div key={`powerball-${index}`} className='max-h-14 w-full flex items-center gap-[12px] p-[4px] text-[12px] greenUnderline bg-dark'>
                        <div className='h-full w-[10%] bg-lightRed text-white font-semibold text-center rounded-lg'>#{index + 1}</div>
                        <div className='h-full w-[33%] flex items-center gap-[10px]'>
                            <div className='h-full w-[25%] text-lightGreen text-center'>Pick</div>
                            <div className='h-full w-[75%] flex justify-evenly items-center gap-[2px]'>{game.userNumbers && game.userNumbers.map((num, i) => {
                                if (i === 5) {
                                    return <span key={`userNum-pb-${num}-${i}`} className='rounded-full text-center w-1/6 h-full bg-lightRed text-white text-[11px] p-[1px]'>{num}</span>
                                } else {
                                    return <span key={`userNum-notpb-${num}-${i}`} className='rounded-full text-center w-1/6 h-full bg-white text-[11px] p-[1px]'>{num}</span>
                                }
                            })}</div>
                        </div>
                        <div className='h-full w-[33%] flex items-center gap-[10px]'>
                            <div className='h-full w-[25%] text-lightGreen text-center'>Win</div>
                            <div className='h-full w-[75%] flex justify-evenly items-center gap-[2px]'>{game.winningNumbers && game.winningNumbers.map((num, i) => {
                                if (i === 5) {
                                    return <span key={`win-pb-${i}-${num}`} className='rounded-full text-center w-1/6 h-full bg-lightRed text-white text-[11px] p-[1px]'>{num}</span>
                                } else {
                                    return <span key={`win-notpb-${i}-${num}`} className='rounded-full text-center w-1/6 h-full bg-white text-[11px] p-[1px]'>{num}</span>
                                }
                            })}</div>
                        </div>
                        <div className={`${game.payout > 0 ? "text-lightGreen" : "text-lightRed"} h-full w-[24%] shadow3 flex justify-end items-center font-semibold`}>${game.payout}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default PowerballSession