import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_GAME_TICKET,
    SET_SCRATCHED_ALREADY,
    selectScratchedAlready,
    selectScratchersMoneyStats,
} from '../../../../redux/features/games/scratchersSlice';
import { motion } from 'framer-motion';

const payoutMapper = [
    {
        payout: 500,
        odds: '1 in 1000',
        barWidth: 0.1,
    },
    {
        payout: 200,
        odds: '1 in 400',
        barWidth: 0.25,
    },
    {
        payout: 100,
        odds: '1 in 200',
        barWidth: 0.5,
    },
    {
        payout: 50,
        odds: '1 in 100',
        barWidth: 1,
    },
    {
        payout: 20,
        odds: '1 in 25',
        barWidth: 4,
    },
    {
        payout: 10,
        odds: '1 in 1.06',
        barWidth: 94.15,
    },
];

const ScratchersStartBox = () => {
    const dispatch = useDispatch();

    const generateTicket = () => {
        dispatch(SET_SCRATCHED_ALREADY(false));
        let winningNums = [];
        let numsToMatch = [];
        let matches = 0;
        let payout = 0;
        let prizesArray = [10, 20, 50, 100, 200, 500];
        let scratchOffArea = [];
        let isWinner = false;
        const payoutDeterminer = Math.random();

        while (winningNums.length < 3) {
            const randomNum = Math.floor(Math.random() * 29) + 1;

            if (!winningNums.includes(randomNum)) {
                winningNums.push(randomNum);
            }
        }

        while (numsToMatch.length < 12) {
            const randomNum = Math.floor(Math.random() * 29) + 1;

            if (!numsToMatch.includes(randomNum)) {
                numsToMatch.push(randomNum);
            }
        }

        for (let i = 0; i < winningNums.length; i++) {
            if (numsToMatch.includes(winningNums[i])) {
                matches += 1;
            }
        }

        if (payoutDeterminer > 0.04 && matches > 0) {
            payout = 10;
        }
        if (payoutDeterminer < 0.04 && matches > 0) {
            payout = 20;
        }
        if (payoutDeterminer < 0.01 && matches > 0) {
            payout = 50;
        }
        if (payoutDeterminer < 0.005 && matches > 0) {
            payout = 100;
        }
        if (payoutDeterminer < 0.0025 && matches > 0) {
            payout = 200;
        }
        if (payoutDeterminer < 0.001 && matches > 0) {
            payout = 500;
        }

        for (let i = 0; i < numsToMatch.length; i++) {
            if (winningNums.includes(numsToMatch[i])) {
                let fixedPayout = payout / matches;
                fixedPayout.toFixed(2);
                let scratchObject = {
                    number: numsToMatch[i],
                    prize: fixedPayout,
                };
                scratchOffArea.push(scratchObject);
            } else {
                let randomNum = Math.floor(Math.random() * 5);
                let randomPrize = prizesArray[randomNum];
                let scratchObject = {
                    number: numsToMatch[i],
                    prize: randomPrize,
                };
                scratchOffArea.push(scratchObject);
            }
        }

        if (matches > 0) {
            isWinner = true;
        }

        const gameTicket = {
            winningNums,
            scratchOffArea,
            payout,
            matches,
            isWinner,
            id: Date.now(),
        };

        dispatch(SET_GAME_TICKET(gameTicket));

        return gameTicket;
    };

    useEffect(() => {
        dispatch(SET_GAME_TICKET({}));
    }, []);
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-1/5 w-full shadow2 flex justify-center items-center">
                <div className="font-serif font-extrabold text-lightGreen">
                    Win Up To $500
                </div>
            </div>
            <div className="h-3/5 w-full shadow3 flex justify-center items-center px-[14px]">
                <motion.button
                    initial={{
                        background: 'linear-gradient(45deg, #234e3e, #5fb495)',
                        color: '#105035',
                    }}
                    whileHover={{
                        background: 'linear-gradient(45deg, #030806, #234E3E)',
                        color: '#5fb495',
                        transition: { duration: 0.3 },
                    }}
                    animate={{
                        background: 'linear-gradient(45deg, #5fb495, #234E3E)',
                        color: '#105035',
                    }}
                    transition={{ duration: 4.8, repeat: Infinity }}
                    className="w-[50%] h-[55%] rounded-lg text-[12px] md:text-[14px] lg:text-[20px]"
                    onClick={() => generateTicket()}
                >
                    Generate Ticket
                </motion.button>
                <div className="w-[50%] h-full flex flex-col py-[5px]">
                    {payoutMapper.map((payout, i) => {
                        return (
                            <div
                                key={`${payout.payout}`}
                                className="h-1/6 w-full flex items-center justify-end text-[10px] lg:text-[12px]"
                            >
                                <div className="w-[15%] text-lightGreen">${payout.payout}</div>
                                <div className="w-[50%] text-brilliantGreen text-end">
                                    {payout.odds}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="h-1/5 w-full shadow2 flex justify-center items-center"></div>
        </div>
    );
};

export default ScratchersStartBox;
