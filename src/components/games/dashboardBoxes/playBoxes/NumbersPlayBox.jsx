import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_CURRENT_NUMBERS_GAME,
    SET_NUMBERS_GAME_MONEY_STATS,
    SET_PREVIOUS_NUMBERS_GAME,
    SET_START_NUMBERS_GAME,
    selectCurrentNumbersGame,
    selectReadyToPlayNumbers,
    selectStartNumbersGame,
    selectNumbersGameMoneyStats,
    SET_NUMBERS_HISTORY,
    SET_NUMBERS_GAME_MONEY_STATS_SIMULATOR,
} from '../../../../redux/features/games/numbersSlice';
import { toast } from 'react-toastify';
import { initialBetsState, numberChoices1, numberChoices2, numberChoices3, numberChoices4 } from '../../../../data/numbersGameNumberChoices';
import NumbersGameBetsBtns from '../../helperComponents/NumbersGameBetsBtns';

const NumbersPlayBox = () => {
    const dispatch = useDispatch();

    const currentNumbersGameRedux = useSelector(selectCurrentNumbersGame);
    const readyToPlayNumbersRedux = useSelector(selectReadyToPlayNumbers);
    const startNumbersGameRedux = useSelector(selectStartNumbersGame);
    const moneyStatsRedux = useSelector(selectNumbersGameMoneyStats);

    const [userChoices, setUserChoices] = useState([]);
    const [userBets, setUserBets] = useState(initialBetsState);
    const [betsCopy, setBetsCopy] = useState({});
    const [gamePrice, setGamePrice] = useState(0);
    const [simGamePrice, setSimGamePrice] = useState(0);
    const [readyToPlayNumbersGame, setReadyToPlayNumbersGame] = useState(false);
    const [payout, setPayout] = useState(false);

    const setSpots = (choice, index) => {
        if (index === 0) {
            if (userChoices[0]) {
                setUserChoices([]);
                setUserBets(initialBetsState);
                setReadyToPlayNumbersGame(false);
            } else {
                setUserChoices([choice]);
            }
        } else if (index === 1) {
            if (userChoices[1] || userChoices[1] === 0) {
                setUserChoices((prev) =>
                    prev.filter((userChoice, index) => index !== 1)
                );
                setUserBets({
                    ...userBets,
                    '4 Exact': false,
                    '4 Any': false,
                    '3 Exact': false,
                    '3 Any': false,
                    '2 Exact': false,
                });
            } else {
                setUserChoices((prev) => [...prev, choice]);
            }
        } else if (index === 2) {
            if (userChoices[2] || userChoices[2] === 0) {
                setUserChoices((prev) =>
                    prev.filter((userChoice, index) => index !== 2)
                );
                setUserBets({
                    ...userBets,
                    '4 Exact': false,
                    '4 Any': false,
                    '3 Exact': false,
                    '3 Any': false,
                });
            } else {
                setUserChoices((prev) => [...prev, choice]);
            }
        } else {
            if (userChoices[3] || userChoices[3] === 0) {
                setUserChoices((prev) =>
                    prev.filter((userChoice, index) => index !== 3)
                );
                setUserBets({ ...userBets, '4 Exact': false, '4 Any': false });
            } else {
                setUserChoices((prev) => [...prev, choice]);
            }
        }
    };

    const calculateGameWager = (betsMade) => {
        const betsToWageObject = {
            1: 0.5,
            2: 1,
            3: 1.5,
            4: 2,
            5: 2.5,
            6: 3,
        };

        let betsCounter = 0;

        if (betsMade > 0) {
        } else
            Object.keys(userBets).map((bet, i) => {
                if (userBets[bet]) {
                    betsCounter += 1;
                }
            });

        setGamePrice(betsToWageObject[betsCounter]);
        if (currentNumbersGameRedux.type === 'Simulator') {
            let simPrice = betsToWageObject[betsCounter] * 100;
            setSimGamePrice(simPrice);
        }
    };

    const updateBetsState = (e) => {
        if (e === 'all bets') {
            setReadyToPlayNumbersGame(true);
            let allBetsState = {
                '1 Exact': true,
                '2 Exact': true,
                '3 Exact': true,
                '4 Exact': true,
                '3 Any': true,
                '4 Any': true,
            };
            setUserBets({});
            setUserBets(allBetsState);
        } else if (e === '3-Spot QP') {
            setReadyToPlayNumbersGame(true);
            let allBetsState = {
                '1 Exact': true,
                '2 Exact': true,
                '3 Exact': true,
                '4 Exact': false,
                '3 Any': true,
                '4 Any': false,
            };
            setUserBets({});
            setUserBets(allBetsState);
        } else {
            setReadyToPlayNumbersGame(true);
            if (!userBets[e.target.innerText]) {
                setUserBets({ ...userBets, [e.target.innerText]: true });
            } else {
                setUserBets({ ...userBets, [e.target.innerText]: false });
            }
        }
        setBetsCopy(userBets);
    };

    const setPreviousNumbersGameRedux = (winningNums, highestMatch, payout) => {
        let fixedHighestMatch = highestMatch.replace(/\s+/g, '-');
        let betBtn = document.getElementById(fixedHighestMatch);
        if (betBtn) {
            betBtn.classList.add('betWinner');
        }
        let gameProfit = payout - gamePrice;
        if (!moneyStatsRedux) {
            dispatch(
                SET_NUMBERS_GAME_MONEY_STATS({
                    wagered: gamePrice,
                    won: payout,
                    profit: gameProfit,
                })
            );
        } else {
            if (currentNumbersGameRedux.type === 'Simulator') {
                dispatch(
                    SET_NUMBERS_GAME_MONEY_STATS_SIMULATOR({
                        wagered: gamePrice,
                        won: payout,
                        profit: gameProfit,
                    })
                );
            } else {
                let priorWagers = moneyStatsRedux.wagered;
                let priorWins = moneyStatsRedux.won;
                let priorProfit = moneyStatsRedux.profit;


                priorWagers += gamePrice;
                priorWins += payout;
                priorProfit += gameProfit;


                dispatch(
                    SET_NUMBERS_GAME_MONEY_STATS({
                        wagered: priorWagers,
                        won: priorWins,
                        profit: priorProfit,
                    })
                );
            }
        }
        let historyObj = {
            type: currentNumbersGameRedux.type,
            userNumbers: userChoices,
            winningNums,
            wagered: gamePrice,
            highestMatch,
            payout,
            gameProfit,
        };

        dispatch(SET_NUMBERS_HISTORY(historyObj));

        dispatch(
            SET_PREVIOUS_NUMBERS_GAME({
                ...currentNumbersGameRedux,
                wagered: gamePrice,
                bets: userBets,
                userNumbers: userChoices,
                winningNums,
                wayWon: highestMatch,
                payout: payout,
            })
        );
    };

    const playNumbersGame = () => {
        if (payout !== false) {
            setPayout(false);
        } // reset bet/payout display
        const allNumBtns = document.querySelectorAll('.winner');
        const allNumsBtnArray = [...allNumBtns];
        const betWinnerBtn = document.querySelector('.betWinner');
        allNumsBtnArray.forEach((btn) => {
            btn.classList.remove('winner');
        });
        if (betWinnerBtn) {
            betWinnerBtn.classList.remove('betWinner');
        } // reset winningNums style for upcoming new winning nums
        let indexer = 0;
        let simulations = 0;
        let simGamePayout = 0;
        dispatch(SET_START_NUMBERS_GAME(true));
        dispatch(
            SET_CURRENT_NUMBERS_GAME({ userNumbers: userChoices, bets: userBets })
        ); // game start dispatching

        let userNums = userChoices; //   init vars setup ----------------------
        let userNumsObj = {};
        userNums.map((num, i) => {
            userNumsObj[i] = num;
        });
        let winningNums = [];
        let winNumsObj = {};
        let winAnyNumsObj = {};
        //   TEST VARS
        // let winNumsObj = { 0: 1, 1: 2, 2: 3, 3: 4 };
        // let winAnyNumsObj = { 1: true, 2: true, 3: true, 4: true };
        let winningNumsTest = [1, 2, 3, 4];
        let highestMatch = 'None'; //   init vars setup ----------------------

        if (currentNumbersGameRedux.type === 'Simulator') {
            toast.success('Please refresh window to stop simulation if desired!');
        }
        const gameInterval = setInterval(() => {
            if (indexer === 3 && currentNumbersGameRedux.type !== 'Simulator') {
                clearInterval(gameInterval);
            } // STOP CONDITION

            const winningNum = Math.floor(Math.random() * 10); // random num gen
            let winningNumBtn = document.getElementById(`${indexer}num${winningNum}`); // update winning num style

            winningNumBtn.classList.add('winner');

            winNumsObj[indexer] = winningNum; // TO TEST, COMMENT OUT THIS
            winningNums.push(winningNum); // TO TEST, COMMENT OUT THIS
            winAnyNumsObj[winningNum] = true; // TO TEST, COMMENT OUT THIS

            if (indexer === 3) {
                //   EXACT MATCH ORDER FINDER
                if (
                    // 4-EXACT
                    currentNumbersGameRedux.bets['4 Exact'] &&
                    winNumsObj[0] === userNumsObj[0] &&
                    winNumsObj[1] === userNumsObj[1] &&
                    winNumsObj[2] === userNumsObj[2] &&
                    winNumsObj[3] === userNumsObj[3]
                ) {
                    highestMatch = '4 Exact';
                    setPayout(2000);
                    simGamePayout = 2000;
                    if (currentNumbersGameRedux.type !== 'Simulator') {
                        setPreviousNumbersGameRedux(winningNums, highestMatch, 2000);
                        dispatch(SET_START_NUMBERS_GAME(false));
                        return;
                    }
                } else if (
                    // 3-EXACT
                    (currentNumbersGameRedux.bets['3 Exact'] &&
                        winNumsObj[0] === userNumsObj[0] &&
                        winNumsObj[1] === userNumsObj[1] &&
                        winNumsObj[2] === userNumsObj[2]) ||
                    (currentNumbersGameRedux.bets['3 Exact'] &&
                        winNumsObj[3] === userNumsObj[3] &&
                        winNumsObj[2] === userNumsObj[2] &&
                        winNumsObj[1] === userNumsObj[1])
                ) {
                    highestMatch = '3 Exact';
                    setPayout(200);
                    simGamePayout = 200;

                    if (currentNumbersGameRedux.type !== 'Simulator') {
                        setPreviousNumbersGameRedux(winningNums, highestMatch, 200);
                        dispatch(SET_START_NUMBERS_GAME(false));
                        return;
                    }
                } else if (
                    // 2-EXACT
                    (currentNumbersGameRedux.bets['2 Exact'] &&
                        winNumsObj[0] === userNumsObj[0] &&
                        winNumsObj[1] === userNumsObj[1]) ||
                    (currentNumbersGameRedux.bets['2 Exact'] &&
                        winNumsObj[1] === userNumsObj[1] &&
                        winNumsObj[2] === userNumsObj[2]) ||
                    (currentNumbersGameRedux.bets['2 Exact'] &&
                        winNumsObj[2] === userNumsObj[2] &&
                        winNumsObj[3] === userNumsObj[3])
                ) {
                    highestMatch = '2 Exact';
                } else if (
                    // 1-EXACT
                    (currentNumbersGameRedux.bets['1 Exact'] &&
                        winNumsObj[0] === userNumsObj[0]) ||
                    (currentNumbersGameRedux.bets['1 Exact'] &&
                        winNumsObj[1] === userNumsObj[1]) ||
                    (currentNumbersGameRedux.bets['1 Exact'] &&
                        winNumsObj[2] === userNumsObj[2]) ||
                    (currentNumbersGameRedux.bets['1 Exact'] &&
                        winNumsObj[3] === userNumsObj[3])
                ) {
                    highestMatch = '1 Exact';
                }

                //   4 ANY FINDER ---------------------
                for (let i = 0; i < userNums.length; i++) {
                    if (winAnyNumsObj[userNums[i]]) {
                        winAnyNumsObj[userNums[i]] = 0;
                    }
                }

                let fourAnyCounter = 4;
                Object.keys(winAnyNumsObj).map((num, numIndex) => {
                    if (winAnyNumsObj[num] === 0) {
                        fourAnyCounter -= 1;
                    }
                });

                if (fourAnyCounter === 0 && currentNumbersGameRedux.bets['4 Any']) {
                    highestMatch = '4 Any';
                    setPayout(150);
                    simGamePayout = 150;

                    if (currentNumbersGameRedux.type !== 'Simulator') {
                        setPreviousNumbersGameRedux(winningNums, highestMatch, 150);
                        dispatch(SET_START_NUMBERS_GAME(false));
                        return;
                    }
                }
                //   4 ANY FINDER ---------------------

                //   3 ANY FINDER ---------------------
                const winNumsObjCopy = Object.assign({}, winNumsObj);
                for (let i = 0; i < userNums.length; i++) {
                    let chain = false;
                    let chainCounter = 0;
                    let nextI = i + 1;
                    let nextnextI = i + 2;

                    if (nextI < userNums.length && nextnextI < userNums.length) {
                        if (
                            winNumsObj[i] === userNums[i] ||
                            winNumsObj[nextI] === userNums[i] ||
                            winNumsObj[nextnextI] === userNums[i]
                        ) {
                            Object.keys(winNumsObj).map((indexKey) => {
                                if (winNumsObj[indexKey] === userNums[i]) {
                                    winNumsObj[indexKey] = false;
                                }
                            });
                            chain = true;
                            chainCounter += 1;

                            if (
                                winNumsObj[i] === userNums[nextI] ||
                                winNumsObj[nextI] === userNums[nextI] ||
                                winNumsObj[nextnextI] === userNums[nextI]
                            ) {
                                Object.keys(winNumsObj).map((indexKey) => {
                                    if (winNumsObj[indexKey] === userNums[nextI]) {
                                        winNumsObj[indexKey] = false;
                                    }
                                });
                                chain = true;
                                chainCounter += 1;

                                if (
                                    winNumsObj[i] === userNums[nextnextI] ||
                                    winNumsObj[nextI] === userNums[nextnextI] ||
                                    winNumsObj[nextnextI] === userNums[nextnextI]
                                ) {
                                    Object.keys(winNumsObj).map((indexKey) => {
                                        if (winNumsObj[indexKey] === userNums[nextnextI]) {
                                            winNumsObj[indexKey] = false;
                                        }
                                    });
                                    chain = true;
                                    chainCounter += 1;
                                } else {
                                    winNumsObj = winNumsObjCopy;
                                }
                            } else {
                                winNumsObj = winNumsObjCopy;
                            }
                        } else {
                            winNumsObj = winNumsObjCopy;
                        }

                        if (chainCounter === 3 && currentNumbersGameRedux.bets['3 Any']) {
                            highestMatch = '3 Any';
                            setPayout(65);
                            simGamePayout = 65;

                            if (currentNumbersGameRedux.type !== 'Simulator') {
                                setPreviousNumbersGameRedux(winningNums, highestMatch, 65);
                                dispatch(SET_START_NUMBERS_GAME(false));
                                return;
                            }
                        }
                        // 3 ANY FINDER ---------------------

                        // RETURN REMAINING MATCHES
                        if (highestMatch === '2 Exact') {
                            setPayout(30);
                            simGamePayout = 30;

                            if (currentNumbersGameRedux.type !== 'Simulator') {
                                setPreviousNumbersGameRedux(winningNums, highestMatch, 30);
                                dispatch(SET_START_NUMBERS_GAME(false));
                                return;
                            }
                        } else if (highestMatch === '1 Exact') {
                            setPayout(4);
                            simGamePayout = 4;

                            if (currentNumbersGameRedux.type !== 'Simulator') {
                                setPreviousNumbersGameRedux(winningNums, highestMatch, 4);
                                dispatch(SET_START_NUMBERS_GAME(false));
                                return;
                            }
                        } else {
                            setPayout(0);
                            simGamePayout = 0;
                            if (currentNumbersGameRedux.type !== 'Simulator') {
                                setPreviousNumbersGameRedux(winningNums, highestMatch, 0);
                                dispatch(SET_START_NUMBERS_GAME(false));
                                return;
                            }
                        }
                    }
                }

                if (currentNumbersGameRedux.type === 'Simulator') {
                    setPreviousNumbersGameRedux(winningNums, highestMatch, simGamePayout);
                }

                simGamePayout = 0;
                setPayout(0);
                simulations += 1;
                indexer = -1;
                winningNums = [];
                winNumsObj = {};
                winAnyNumsObj = {};
                highestMatch = 'None';

                const allNumBtns1 = document.querySelectorAll('.winner');
                const allNumsBtnArray1 = [...allNumBtns1];
                const betWinnerBtn1 = document.querySelector('.betWinner');
                allNumsBtnArray1.forEach((btn) => {
                    btn.classList.remove('winner');
                });
                if (betWinnerBtn1) {
                    betWinnerBtn1.classList.remove('betWinner');
                }

                if (simulations === 100) {
                    clearInterval(gameInterval);
                    dispatch(SET_START_NUMBERS_GAME(false));
                    return;
                }
            }
            indexer += 1;
        }, 300);
    };

    const removePlayIfNoBets = () => {
        let trueFound = false;

        Object.keys(userBets).map((bet, i) => {
            if (userBets[bet]) {
                trueFound = true;
            }
            return bet;
        });

        if (trueFound) {
            return;
        } else {
            setReadyToPlayNumbersGame(false);
        }
    };

    useEffect(() => {
        removePlayIfNoBets();

        if (Object.keys(betsCopy).length >= 0) {
            calculateGameWager();
        }

        if (payout !== false) {
            setPayout(false);
        }
    }, [startNumbersGameRedux, betsCopy]);

    useEffect(() => {
        if (
            currentNumbersGameRedux.type === '4-Spot QP' ||
            currentNumbersGameRedux.type === '3-Spot QP'
        ) {
            setPayout(false);
            setUserChoices([]);
            setUserBets(initialBetsState);
            let userNums = [];
            if (currentNumbersGameRedux.type === '4-Spot QP') {
                for (let i = 0; i < 4; i++) {
                    const randomPick = Math.floor(Math.random() * 10);
                    userNums.push(randomPick);
                }
                setUserChoices(userNums);
                updateBetsState('all bets');
                calculateGameWager();
            } else {
                for (let i = 0; i < 3; i++) {
                    const randomPick = Math.floor(Math.random() * 10);
                    userNums.push(randomPick);
                }
                setUserChoices(userNums);
                updateBetsState('3-Spot QP');
                calculateGameWager();
            }
        }
    }, [currentNumbersGameRedux.type]);

    return (
        <div className="h-full w-full flex justify-center items-center bg-dark p-[4px]">
            <div className="h-full w-full bg-heroBorder flex flex-col">
                <div className="h-3/5 w-full flex flex-col p-[10px]">
                    <div className="h-[25%] w-full flex justify-evenly items-center gap-[3px] px-[5px] bg-dark">
                        {readyToPlayNumbersRedux &&
                            numberChoices1.map((choice) => {
                                return (
                                    <button
                                        key={choice.key}
                                        id={`0num${choice.number}`}
                                        className={`0num${choice.number
                                            } shadow3 numBtn w-full h-[75%] text-lightGreen ${userChoices[0] === choice.number ? 'numberChosen' : ''
                                            }`}
                                        onClick={() => setSpots(choice.number, 0)}
                                    >
                                        {choice.number}
                                    </button>
                                );
                            })}
                    </div>

                    <div className="h-[25%] w-full flex justify-evenly items-center gap-[3px] px-[5px] bg-dark">
                        {readyToPlayNumbersRedux &&
                            numberChoices2.map((choice) => {
                                return (
                                    <button
                                        key={choice.key}
                                        id={`1num${choice.number}`}
                                        className={`1num${choice.number
                                            } shadow3 numBtn w-full h-[75%] text-lightGreen ${userChoices[1] === choice.number ? 'numberChosen' : ''
                                            }`}
                                        onClick={() => setSpots(choice.number, 1)}
                                    >
                                        {choice.number}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="h-[25%] w-full flex justify-evenly items-center gap-[3px] px-[5px] bg-dark">
                        {readyToPlayNumbersRedux &&
                            numberChoices3.map((choice) => {
                                return (
                                    <button
                                        key={choice.key}
                                        id={`2num${choice.number}`}
                                        className={`2num${choice.number
                                            } shadow3 numBtn w-full h-[75%] text-lightGreen ${userChoices[2] === choice.number ? 'numberChosen' : ''
                                            }`}
                                        onClick={() => setSpots(choice.number, 2)}
                                    >
                                        {choice.number}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="h-[25%] w-full flex justify-evenly items-center gap-[3px] px-[5px] bg-dark">
                        {readyToPlayNumbersRedux &&
                            numberChoices4.map((choice) => {
                                return (
                                    <button
                                        key={choice.key}
                                        id={`3num${choice.number}`}
                                        className={`3num${choice.number
                                            } shadow3 numBtn w-full h-[75%] text-lightGreen ${userChoices[3] === choice.number ? 'numberChosen' : ''
                                            }`}
                                        onClick={() => setSpots(choice.number, 3)}
                                    >
                                        {choice.number}
                                    </button>
                                );
                            })}
                    </div>
                </div>
                {/* Bets Box */}
                <div className="h-1/5 w-full px-[10px]">
                    <div className="h-full w-full bg-dark flex justify-evenly items-center gap-[2px] px-[3px] text-white">
                        <NumbersGameBetsBtns readyToPlayNumbersRedux={readyToPlayNumbersRedux} userChoices={userChoices} updateBetsState={updateBetsState} />
                    </div>
                </div>
                {/* Confirm Game Box */}
                <div className="h-1/5 w-full px-[10px] pb-[10px]">
                    <div className="h-full w-full bg-lightGreen flex justify-start items-center gap-[2px] text-white">
                        <div className="h-full w-1/3 userNumbersBetGrid text-center">
                            {readyToPlayNumbersRedux &&
                                Object.keys(userBets).map((bet, i) => {
                                    if (userBets[bet]) {
                                        return (
                                            <h1
                                                className="bg-dark text-[14px] text-lightGreen brightness-75 font-semibold lg:text-[18px]"
                                                key={`${bet}-${i}`}
                                            >
                                                {bet}
                                            </h1>
                                        );
                                    }
                                })}
                        </div>
                        <div className="h-full w-1/3 p-[3px] bg-dark">
                            <div className="h-full w-full bg-lightGreen p-[2px]">
                                <div className="h-full w-full bg-dark p-[2px] flex justify-center items-center">
                                    {readyToPlayNumbersRedux && !payout ? (
                                        <h1 className="text-[20px] lg:text-[30px] font-semibold text-red-500">
                                            {currentNumbersGameRedux.type === 'Simulator' &&
                                                simGamePrice
                                                ? `$${simGamePrice} BET`
                                                : currentNumbersGameRedux.type !== 'Simulator' &&
                                                    gamePrice
                                                    ? `$${gamePrice} BET`
                                                    : ''}
                                        </h1>
                                    ) : readyToPlayNumbersRedux && payout >= 0 ? (
                                        <h1 className="text-[20px] font-semibold text-lightGreen">
                                            {payout < 1 ? `Lost $${gamePrice}` : `$${payout} WON`}
                                        </h1>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-1/3 flex flex-col">
                            <div className="h-1/2 w-full flex bg-dark items-center p-[2px]">
                                {readyToPlayNumbersRedux &&
                                    userChoices &&
                                    userChoices.length > 0 &&
                                    userChoices.map((choice, index) => {
                                        return (
                                            <h3
                                                className={` w-full h-full text-center text-[14px] lg:text-[30px] tall:leading-8 tall:text-[16px] text-dark font-semibold bg-lightGreen`}
                                                key={`${choice}-${index}`}
                                            >
                                                {choice}
                                            </h3>
                                        );
                                    })}
                            </div>
                            <div className="h-1/2 w-full bg-dark flex justify-center items-center px-[4px] rounded-sm">
                                {readyToPlayNumbersRedux && readyToPlayNumbersGame && (
                                    <motion.button
                                        className="bg-lightGreen text-[14px] w-full rounded-md font-semibold"
                                        onClick={() => playNumbersGame()}
                                        disabled={startNumbersGameRedux}
                                        initial={{ backgroundColor: '#0D9B5C', color: '#000000' }}
                                        whileHover={{
                                            backgroundColor: '#234E3E',
                                            color: '#0D9B5C',
                                            transition: { duration: 0.3 },
                                        }}
                                        animate={{ backgroundColor: '#234E3E', color: '#5FB495' }}
                                        transition={{ duration: 2.8, repeat: Infinity }}
                                    >
                                        Play
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumbersPlayBox;
