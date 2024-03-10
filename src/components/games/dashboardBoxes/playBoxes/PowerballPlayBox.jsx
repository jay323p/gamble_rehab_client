import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_POWERBALL_HISTORY,
    SET_POWERBALL_MONEY_STATS,
    SET_PREVIOUS_POWERBALL_GAME,
    SET_READY_TO_PLAY_POWERBALL,
    SET_START_POWERBALL_GAME,
    selectPowerballMoneyStats,
    selectReadyToPlayPowerball,
    selectStartPowerballGame,
} from '../../../../redux/features/games/powerballSlice';

const PowerballPlayBox = () => {
    const dispatch = useDispatch();

    const readyToPlayPowerballRedux = useSelector(selectReadyToPlayPowerball);
    const startPowerballGameRedux = useSelector(selectStartPowerballGame);
    const powerballMoneyStatsRedux = useSelector(selectPowerballMoneyStats);

    const [userNums, setUserNums] = useState([]);
    const [userNumsCheck, setUserNumsCheck] = useState({});
    const [powerBallCheck, setPowerBallCheck] = useState({});
    const [nonPowerBallChoices, setNonPowerBallChoices] = useState([]);
    const [powerBallChoices, setPowerBallChoices] = useState([]);

    const updateUserNums = (num) => {
        if (userNums.length < 5) {
            if (userNumsCheck[num]) {
                const newUserCheck = userNumsCheck;
                newUserCheck[num] = false;
                setUserNumsCheck(newUserCheck);

                const newNums = userNums.filter((userChoice) => userChoice !== num);
                setUserNums(newNums);
            } else {
                const newUserCheck = userNumsCheck;
                newUserCheck[num] = true;
                setUserNumsCheck(newUserCheck);

                setUserNums((oldNums) => [...oldNums, num]);
            }
        } else {
            const newUserCheck = userNumsCheck;
            newUserCheck[num] = false;

            const newNums = userNums.filter((userChoice) => userChoice !== num);
            const poppedNum = newNums.pop();
            newUserCheck[poppedNum] = false;
            setUserNums(newNums);
            setUserNumsCheck(newUserCheck);
            setPowerBallCheck({});
        }
    };

    const updatePowerBall = (powerBall) => {
        if (userNums.length === 5) {
            setUserNums((oldNums) => [...oldNums, powerBall]);
            const powerCheck = powerBallCheck;
            powerCheck[powerBall] = true;
            setPowerBallCheck(powerCheck);
            dispatch(SET_READY_TO_PLAY_POWERBALL(true));
        }

        if (userNums.length === 6) {
            const newNums = userNums.filter((userChoice) => userChoice !== powerBall);
            if (powerBallCheck[powerBall]) {
                setUserNums(newNums);
                setPowerBallCheck({});
                dispatch(SET_READY_TO_PLAY_POWERBALL(false));
            } else {
                newNums.pop();
                setUserNums(newNums);
                setPowerBallCheck({});
                dispatch(SET_READY_TO_PLAY_POWERBALL(false));
            }
        }

        if (userNums.length < 5) {
            toast.error(
                'Please choose 5 non-powerball numbers before choosing powerball number'
            );
        }
    };

    const startPowerballGame = () => {
        dispatch(SET_START_POWERBALL_GAME(true));

        const allNonPowerBtns = document.querySelectorAll('.nonPower');
        allNonPowerBtns.forEach((btn) => {
            btn.classList.remove('nonPowerballWinner');
        });
        const powerballBtn = document.querySelector('.powerballWinner');

        //   matches reset
        const allNonPBMatches = document.querySelectorAll('.non-pb-spot');
        allNonPBMatches.forEach((btn) => {
            btn.classList.remove('nonPowerballMatch');
        });
        const pbMatchBtn = document.querySelector('.pb-spot');
        if (pbMatchBtn) {
            pbMatchBtn.classList.remove('powerballMatch');
        }

        if (powerballBtn) {
            powerballBtn.classList.remove('powerballWinner');
        }

        //   init vars
        let winningNums = [];
        let winningNumsCheck = {};
        let userNumsCheck = {};
        let userPowerballCheck = {};
        let indexer = 0;

        for (let i = 0; i < userNums.length - 1; i++) {
            userNumsCheck[userNums[i]] = true;
        }

        userPowerballCheck[userNums[5]] = true;


        const gameInterval = setInterval(() => {
            if (indexer < 5) {
                //   non-powerball wins
                let winningNum = Math.floor(Math.random() * 69) + 1;

                if (winningNumsCheck[winningNum]) {
                    // duplicate
                    indexer -= 1;
                } else {
                    //   unique winning num
                    winningNumsCheck[winningNum] = true;
                    let winningNumBtn = document.getElementById(`${winningNum}-nonPower`);
                    winningNumBtn.classList.add('nonPowerballWinner');
                    winningNums.push(winningNum);

                    if (userNumsCheck[winningNum]) {
                        //   highlight match if winning num === user num

                        const userNumSpot = document.getElementById(`${winningNum}-spot`);
                        userNumSpot.classList.add('nonPowerballMatch');
                    }
                }
            } else if (indexer === 5) {
                // time to pick powerball
                let winningNum = Math.floor(Math.random() * 26) + 1;
                let winningPowerballBtn = document.getElementById(
                    `${winningNum}-power`
                );
                winningPowerballBtn.classList.add('powerballWinner');
                winningNums.push(winningNum);

                if (userPowerballCheck[winningNum]) {
                    //   powerball match
                    const powerballSpot = document.getElementById(
                        `${winningNum}-pb-spot`
                    );
                    powerballSpot.classList.add('powerballMatch');
                }
            } else {
                let previousWagers = powerballMoneyStatsRedux.wagered;
                let previousWins = powerballMoneyStatsRedux.won;
                let previousProfit = powerballMoneyStatsRedux.profit;
                const payout = calculatePayout(
                    userNumsCheck,
                    winningNums,
                    userPowerballCheck
                );

                let profit = payout - 2;
                previousWagers += 2;
                previousWins += payout;
                previousProfit += profit;

                const newMoneyStats = {
                    wagered: previousWagers,
                    won: previousWins,
                    profit: previousProfit,
                };

                let currentPowerballGame = {
                    userNumbers: userNums,
                    winningNumbers: winningNums,
                    payout,
                };

                dispatch(SET_PREVIOUS_POWERBALL_GAME(currentPowerballGame));
                dispatch(SET_POWERBALL_HISTORY(currentPowerballGame));
                dispatch(SET_POWERBALL_MONEY_STATS(newMoneyStats));

                // game done atp
                clearInterval(gameInterval);
                dispatch(SET_START_POWERBALL_GAME(false));
            }

            indexer += 1;
        }, 100);
    };
    const calculatePayout = (userNumsCheck, winningNums, userPowerballCheck) => {
        let counter = 0;
        let powerballMatch = false;
        let payout = 0;
        for (let i = 0; i < winningNums.length; i++) {
            if (i !== 5) {
                //   non-powerball
                if (userNumsCheck[winningNums[i]]) {
                    counter += 1;
                }
            } else {
                // powerball
                if (userPowerballCheck[winningNums[i]]) {
                    powerballMatch = true;
                }
            }
        }


        if (!powerballMatch && counter === 0) {
            payout = 0;
        } else if (powerballMatch && counter === 0) {
            payout = 4;
        } else if (powerballMatch && counter === 1) {
            payout = 4;
        } else if (powerballMatch && counter === 2) {
            payout = 7;
        } else if (!powerballMatch && counter === 3) {
            payout = 7;
        } else if (powerballMatch && counter === 3) {
            payout = 100;
        } else if (!powerballMatch && counter === 4) {
            payout = 100;
        } else if (powerballMatch && counter === 4) {
            payout = 50000;
        } else if (!powerballMatch && counter === 5) {
            payout = 1000000;
        } else if (powerballMatch && counter === 5) {
            payout = 100000000;
        }

        return payout;
    };

    useEffect(() => {
        if (nonPowerBallChoices.length === 0) {
            let array = [];
            for (let i = 1; i <= 69; i++) {
                array.push(i);
            }
            setNonPowerBallChoices(array);
        }

        if (powerBallChoices.length === 0) {
            let array = [];
            for (let i = 1; i <= 26; i++) {
                array.push(i);
            }
            setPowerBallChoices(array);
        }

        if (startPowerballGameRedux) {
            dispatch(SET_START_POWERBALL_GAME(false));
        }
        if (readyToPlayPowerballRedux) {
            dispatch(SET_READY_TO_PLAY_POWERBALL(false));
        }
    }, []);
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-[96%] w-[96%] bg-dark flex flex-col">
                <div className="h-[14%] w-full flex items-center px-[10px] gap-[2px]">
                    {userNums.map((num, i) => {
                        if (i === 5) {
                            return (
                                <motion.div
                                    initial={{ x: 2000 }}
                                    animate={{
                                        x: 0,
                                        transition: { duration: 0.6 },
                                    }}
                                    className="h-[80%] w-full rounded-sm flex items-center justify-center bg-red-500 text-[24px] font-semibold"
                                    key={`${num}-userNonPower`}
                                >
                                    {num}
                                </motion.div>
                            );
                        } else {
                            return (
                                <motion.div
                                    initial={{ x: 2000 }}
                                    animate={{
                                        x: 0,
                                        transition: { duration: 0.6 },
                                    }}
                                    className="h-[80%] w-full rounded-sm flex items-center justify-center bg-slate-300 text-[24px] font-semibold"
                                    key={`${num}-userPower`}
                                >
                                    {num}
                                </motion.div>
                            );
                        }
                    })}
                </div>
                <div className="h-[72%] w-full flex flex-col gap-[1rem] overflow-y-scroll pb-[10px]">
                    <div className="powerballGrid1 px-[4px]">
                        {nonPowerBallChoices.map((choice, i) => {
                            return (
                                <motion.div
                                    whileHover={{
                                        backgroundColor: '#CBD5E1',
                                        color: '#030806',
                                        transition: { duration: 0.01 },
                                    }}
                                    key={`${choice}-nonPower`}
                                    className={`${userNumsCheck[choice] === true
                                        ? 'rounded-lg bg-slate-300'
                                        : 'rounded-sm bg-slate-500'
                                        } text-dark font-bold cursor-pointer nonPower`}
                                    id={`${choice}-nonPower`}
                                    onClick={() => updateUserNums(choice)}
                                >
                                    {choice}
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="powerballGrid2 px-[4px]">
                        {powerBallChoices.map((choice, i) => {
                            return (
                                <motion.div
                                    whileHover={{
                                        backgroundColor: '#ae0700',
                                        color: '#030806',
                                        transition: { duration: 0.01 },
                                    }}
                                    key={`${choice}-power`}
                                    className={` ${powerBallCheck[choice] === true
                                        ? 'rounded-lg'
                                        : 'rounded-sm'
                                        } bg-red-400 brightness-150 text-dark font-bold cursor-pointer powerball`}
                                    id={`${choice}-power`}
                                    onClick={() => updatePowerBall(choice)}
                                >
                                    {choice}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                {readyToPlayPowerballRedux ? (
                    <div className="h-[14%] w-full flex items-center border-t-[1px] border-lightGreen">
                        <div className="h-full w-4/6 flex items-center justify-evenly">
                            {userNums.map((num, i) => {
                                if (i === 5) {
                                    return (
                                        <div
                                            className={`text-red-500 pb-spot`}
                                            id={`${num}-pb-spot`}
                                            key={`${num}-userPowerball`}
                                        >
                                            {num}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            className={`text-white non-pb-spot`}
                                            id={`${num}-spot`}
                                            key={`${num}-userPicks`}
                                        >
                                            {num}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div className="h-full w-2/6 flex justify-center items-center">
                            {readyToPlayPowerballRedux && (
                                <motion.button
                                    className="bg-brilliantGreen w-[80%] rounded-md font-bold glowPlayBtn"
                                    onClick={() => startPowerballGame()}
                                    disabled={startPowerballGameRedux}
                                >
                                    Play
                                </motion.button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="h-[14%] w-full flex items-center"></div>
                )}
            </div>
        </div>
    );
};

export default PowerballPlayBox;
