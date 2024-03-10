import React from 'react'
import cherry from '../../assets/cherry.png';
import singleBar from '../../assets/singleBar.png';
import doubleBar from '../../assets/doubleBar.png';
import tripleBar from '../../assets/tripleBar.png';
import seven from '../../assets/seven.png';
import fiftyChip from '../../assets/fiftyChip.png';

const imgGuide = {
    cherry,
    singleBar,
    doubleBar,
    tripleBar,
    seven,
    fiftyChip,
}

const imgNumAssign = {
    0: 'cherry',
    1: 'singleBar',
    2: 'doubleBar',
    3: 'tripleBar',
    4: 'seven',
    5: 'fiftyChip',
}

const SlotsSession = ({ session }) => {
    return (
        <div className='h-full w-full flex justify-center items-center p-[4px] overflow-y-scroll'>
            <div className='h-full w-full flex flex-col bg-dark text-lightGreen'>
                {session && session.history.length > 0 && session.history.map((game, i) => {
                    return <div className={`${game.matches && game.matches[0] !== 'none' ? "shadow3" : "redShadow3"} h-1/4 w-full min-h-[93px] flex items-center bg-dark p-[4px]`}>
                        <div className='h-full w-2/3 flex items-center'>
                            {game.matches && game.matches.length > 0 && game.matches.map((match, i) => {
                                if (match === 'none') {
                                    return <div className='h-full max-w-[33%] flex items-center'>
                                        <img src={imgGuide[imgNumAssign[i]]} alt="" className='h-full w-full object-cover' />
                                        <img src={imgGuide[imgNumAssign[i + 1]]} alt="" className='h-full w-full object-cover' />
                                        <img src={imgGuide[imgNumAssign[i + 2]]} alt="" className='h-full w-full object-cover' />
                                    </div>
                                } else if (match !== 'none' && game.matches.length === 1) {
                                    return <div className='h-full max-w-[33%] flex items-center'>
                                        <img src={imgGuide[game.matches[0]]} alt="" className='h-full w-full object-cover' />
                                        <img src={imgGuide[game.matches[0]]} alt="" className='h-full w-full object-cover' />
                                        <img src={imgGuide[game.matches[0]]} alt="" className='h-full w-full object-cover' />
                                    </div>
                                } else {
                                    return <div className='h-full max-w-[33%] flex items-center'>
                                        <img src={imgGuide[game.matches[i]]} alt="" className='h-full w-full object-cover' />
                                    </div>

                                }
                            })}
                        </div>
                        <div className={`${game.matches && game.matches[0] !== 'none' ? "shadow3 bg-green-200" : "redShadow3 bg-red-300"} h-full w-1/3 flex flex-col font-semibold text-dark text-[14px] p-[8px]`}>
                            <div className='h-1/3 w-full flex items-center justify-evenly'>
                                <div className='w-1/2'>Wagered</div>
                                <div className='w-1/2 text-end'>${game.wagered}</div>
                            </div>
                            <div className='h-1/3 w-full flex items-center justify-evenly'>
                                <div className='w-1/2'>Won</div>
                                <div className='w-1/2 text-end'>${game.payout}</div>
                            </div>
                            <div className='h-1/3 w-full flex items-center justify-evenly'>
                                <div className='w-1/2'>Profit</div>
                                <div className='w-1/2 text-end'>${game.profit}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default SlotsSession