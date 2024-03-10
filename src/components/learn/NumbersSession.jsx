import React from 'react'

const NumbersSession = ({ session }) => {
    return (
        <div className='h-full w-full overflow-y-scroll flex justify-center items-center bg-darkGreen p-[5px]'>
            <div className='h-full w-full bg-dark flex flex-col'>
                {session && session.history.length > 0 && session.history.map((game, i) => {
                    return <div key={`numbers-${i}`} className='h-1/6 w-full flex items-center gap-[2px] p-[4px] greenUnderline bg-dark'>
                        <div className='h-full w-1/6 flex items-center justify-center bg-lightGreen text-[12px] font-semibold rounded-sm'>{game.type}</div>
                        <div className='h-full w-1/6 bg-darkGreen text-[12px] text-center'>User <span className='bg-dark text-lightGreen flex justify-center'>{game.userNumbers && game.userNumbers.map((num, i) => { return <span key={`user-numbers-${num}-${i}-${Math.random()}`}>{num}</span> })}</span></div>
                        <div className='h-full w-1/6 bg-darkGreen text-[12px] text-center'>Winner <span className='bg-dark text-lightGreen flex justify-center'>{game.winningNums && game.winningNums.map((num) => { return <span key={`user-numbers-win-${num}-${i}-${Math.random()}`}>{num}</span> })}</span></div>
                        <div className={`h-full w-1/6 bg-darkGreen text-[12px] text-center`}>Match <span className={`${game.highestMatch === 'None' ? 'text-lightRed' : 'text-lightGreen font-semibold'} bg-dark text-lightGreen flex justify-center`}>{`${game.highestMatch}`}</span></div>
                        <div className='h-full w-2/6 flex flex-col text-[10px]'>
                            <div className={`h-1/3 w-full flex justify-evenly items-center text-lightRed redUnderline`}>
                                <div>Wagered</div>
                                <div>${game.wagered}</div>
                            </div>
                            <div className={`${game.payout > 0 ? 'text-lightGreen greenUnderline' : 'text-lightRed redUnderline'} h-1/3 w-full flex justify-evenly items-center`}>
                                <div>Won</div>
                                <div>${game.payout}</div>
                            </div>
                            <div className={`${game.gameProfit > 0 ? 'text-lightGreen greenUnderline' : 'text-lightRed redUnderline'} h-1/3 w-full flex justify-evenly items-center`}>
                                <div>Profit</div>
                                <div>${game.gameProfit}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default NumbersSession
