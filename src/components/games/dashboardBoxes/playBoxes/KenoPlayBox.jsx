import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    selectReadyToChooseSpots,
    selectKenoGame,
    selectShowKenoSimHistoryModal,
    selectShowKenoRegHistoryModal,
    SET_KENO_GAME,
    SET_PREVIOUS_KENO_GAME,
    selectReplayKenoGame,
    SET_REPLAY_KENO_GAME,
    SET_KENO_SIM_STARTED,
    SET_KENO_WAGERED_AND_WON,
} from '../../../../redux/features/games/kenoSlice';
import { kenoChoicesArray } from '../../../../data/kenoChoices';
import { motion } from 'framer-motion';
import { kenoPayouts } from '../../../../data/payouts/kenoPayouts';
import KenoSimHistoryModal from '../../../modals/KenoSimHistoryModal';
import KenoRegHistoryModal from '../../../modals/KenoRegHistoryModal';
import { selectPreviousKenoGame } from '../../../../redux/features/games/kenoSlice';

const initialSimData = {
    draw: 0,
    hits: 0,
    totalHits: 0,
    payout: 0,
    totalPayout: 0,
    mappedMatches: [],
};

const KenoPlayBox = () => {
    const readyToChooseSpotsRedux = useSelector(selectReadyToChooseSpots);
    const replayKenoGameRedux = useSelector(selectReplayKenoGame);
    const kenoGameRedux = useSelector(selectKenoGame);
    const previousKenoGameRedux = useSelector(selectPreviousKenoGame);
    const showKenoSimHistoryModalRedux = useSelector(
        selectShowKenoSimHistoryModal
    );
    const showKenoRegHistoryModalRedux = useSelector(
        selectShowKenoRegHistoryModal
    );

    const [ready, setReady] = useState(false);
    const [kenoGame, setKenoGame] = useState();
    const [spots, setSpots] = useState([]);
    const [spotCounter, setSpotCounter] = useState(0);
    const [tempObject, setTempObject] = useState({});
    const [doneChoose, setDoneChoosing] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [simData, setSimData] = useState(initialSimData);

    const dispatch = useDispatch();

    const setSpotsArray = (spotsString) => {
        let stringToNum = parseFloat(spotsString);
        let spotArray = [];

        if (typeof stringToNum === 'number') {
            for (let i = 0; i < stringToNum; i++) {
                spotArray.push(0);
            }
            setSpots(spotArray);
        } else {
            toast.error('Type Cast Error: Unable To Set User Spots On Client Side');
        }
    };

    const updateSpotsArray = (e) => {
        let zeroSpotIndex = 0;

        // keep index at nearest default 0 spot
        for (let i = 0; i < spots.length; i++) {
            if (spots[i] === 0) {
                // set updated index based on spot-index-element removed
                zeroSpotIndex = i;
                break;
            }
        }

        let targetTextNum = parseFloat(e.target.innerText);

        if (
            targetTextNum in tempObject &&
            tempObject[targetTextNum] !== undefined
        ) {
            // un-select feature ----------------------------------------------------------
            setDoneChoosing(false);
            tempObject[targetTextNum] = undefined; //set to undefined to allow re-pick
            setSpotCounter((prev) => prev - 1);
            e.target.classList.remove('choice');
            // remove from spot array
            setSpots((spots) =>
                spots.map((spot) => (spot === targetTextNum ? (spot = 0) : spot))
            );
        } else {
            // select feature -------------------------------------------------------------
            if (!doneChoose) {
                tempObject[targetTextNum] = targetTextNum;
                setSpotCounter((prev) => prev + 1);
                e.target.classList.add('choice');
                setSpots((spots) =>
                    spots.map((spot, i) =>
                        i === zeroSpotIndex ? (spot = targetTextNum) : spot
                    )
                );
            }

            // chose all spots ? update states
            if (spotCounter === spots.length - 1) {
                setDoneChoosing(true);
            }
        }
    };

    const playKenoGame = async (replayFixer) => {
        if (kenoGameRedux.mode === 'Simulator' || kenoGame.mode === 'Simulator') {
            dispatch(SET_KENO_SIM_STARTED(true));
        }

        setGameStart(true);

        const winningNums = [];
        let numCheck = {};
        let matchesMapper = [];
        let matches = 0;
        let totalMatches = 0;
        let payout = 0;
        let gameDraw = 0;
        let simCounter = 0;

        // create default-mapped-elems according to user-spots
        for (let i = 0; i <= spots.length; i++) {
            let elemObj = { [i]: 0 };
            matchesMapper.push(elemObj);
        }

        // --------------------------------GAME-INTERVAL-START------------------------------
        const gameInterval = setInterval(() => {
            if (!readyToChooseSpotsRedux) {
                setReady(false);
                setKenoGame({});
                setSpots([]);
                setTempObject({});
                setDoneChoosing(false);
                setSpotCounter(0);
                setGameStart(false);
                setSimData(initialSimData);
                clearInterval(gameInterval);
            }
            let num = Math.floor(Math.random() * 80) + 1;
            let winningBtn = document.getElementById(`num${num}`); //qs for choice grid(1-80 btns) but finds single-winning one
            let winningBtnClass = document.querySelector(`.num${num}`); //qs for displayed user-choices -- if match ? defined : undefined

            if (winningBtn.classList.contains('choice')) {
                winningBtn.classList.remove('choice');
            }

            if (winningBtnClass && winningBtnClass.classList.contains('choice')) {
                winningBtnClass.classList.remove('choice');
            }

            if (num in numCheck) {
                // can only have 20 unique winning nums check
            } else {
                // unique winning num found logic
                simCounter += 1;
                numCheck[num] = true;
                winningNums.push(num);
                winningBtn.classList.add('winner');
                if (winningBtnClass) {
                    winningBtnClass.classList.add('winner-boxy'); // match found {logic}
                    matches += 1;
                    totalMatches += 1;
                    setSimData((simData) => ({
                        ...simData,
                        hits: simData.hits + 1,
                        totalHits: simData.totalHits + 1,
                    }));
                }
            }

            if (winningNums.length === 20 && kenoGame.mode === 'Regular') {
                setKenoGame({
                    ...kenoGame,
                    mode: kenoGameRedux.mode,
                    spots: kenoGameRedux.spots,
                });
                let spotsLength = !replayFixer.use
                    ? spots.length
                    : replayFixer.fixedData.userChoices.length;
                const finalPayout = kenoPayouts[spotsLength][matches];
                dispatch(
                    SET_KENO_WAGERED_AND_WON({
                        wageredKeno: 1,
                        wonKeno: finalPayout.payout,
                    })
                );

                if (replayFixer.use === true) {
                    dispatch(
                        SET_PREVIOUS_KENO_GAME({
                            mode: replayFixer.fixedData.mode,
                            spots: replayFixer.fixedData.spots,
                            userChoices: replayFixer.fixedData.userChoices,
                            recentWinningNums: winningNums,
                            matches,
                            payout: finalPayout.payout,
                            fixedWinningNums: {},
                        })
                    );
                } else {
                    dispatch(
                        SET_PREVIOUS_KENO_GAME({
                            mode: kenoGame.mode,
                            spots: kenoGame.spots,
                            userChoices: kenoGame.userChoices ? kenoGame.userChoices : spots,
                            recentWinningNums: winningNums,
                            matches,
                            payout: finalPayout.payout,
                            fixedWinningNums: {},
                        })
                    );
                }
                dispatch(
                    SET_KENO_GAME({
                        ...kenoGame,
                        mode: kenoGameRedux.mode,
                        spots: kenoGameRedux.spots,
                        matches,
                        payout: finalPayout.payout,
                    })
                );
                dispatch(SET_REPLAY_KENO_GAME(false));

                clearInterval(gameInterval);
            }

            let spotsLength = spots.length;
            let finalPayout = kenoPayouts[spotsLength][matches];
            setSimData((simData) => ({ ...simData, payout: finalPayout.payout }));

            let simGame = simCounter / 20; // each simCounter iter is a num gen, so 20 num gen = 1 game

            if (kenoGame.mode === 'Simulator' && Number.isInteger(simGame)) {

                setKenoGame({ ...kenoGame, mode: 'Simulator' });
                // draw-done ? update matchesMapperArray + reset matches + reset numCheck + update simData state + reset styles + increment draw
                matchesMapper[matches][matches] += 1;
                gameDraw += 1;

                let spotsLength = spots.length;
                const finalPayout = kenoPayouts[spotsLength][matches];
                payout += finalPayout.payout;
                matches = 0;
                numCheck = {};

                setSimData((simData) => ({
                    ...simData,
                    draw: simData.draw + 1,
                    hits: 0,
                    payout: 0,
                    totalPayout: simData.totalPayout + finalPayout.payout,
                }));

                //   reset user choices to default choice style
                spots.forEach((choice) => {
                    let userChoiceBtn = document.getElementById(`num${choice}`);
                    userChoiceBtn.classList.add('choice');
                });

                let allWinnerBtns = document.querySelectorAll('.winner');
                let allUserMatchWinnerBtns = document.querySelectorAll('.winner-boxy');
                allWinnerBtns.forEach((item) => {
                    item.classList.remove('winner');
                });
                allUserMatchWinnerBtns.forEach((item) => {
                    item.classList.remove('winner-boxy');
                    item.classList.add('choice');
                });
            }

            // STOP CONDITIONS
            if (
                (kenoGame.simulations === '10K' && gameDraw === 10000) ||
                (kenoGame.simulations === '5K' && gameDraw === 5000) ||
                (kenoGame.simulations === '2K' && gameDraw === 2000) ||
                (kenoGame.simulations === '1K' && gameDraw === 1000) ||
                (kenoGame.simulations === '100' && gameDraw === 100)
            ) {
                //   sim done ? finalize simData + clear game interval + setPreviousGameRedux
                dispatch(SET_KENO_SIM_STARTED(false));

                dispatch(SET_REPLAY_KENO_GAME(false));

                dispatch(
                    SET_PREVIOUS_KENO_GAME({
                        mode: kenoGame.mode,
                        spots: kenoGame.spots,
                        simulations: kenoGame.simulations,
                        userChoices: kenoGame.userChoices ? kenoGame.userChoices : spots,
                        recentWinningNums: winningNums,
                        matches: totalMatches,
                        payout,
                        mappedMatches: matchesMapper,
                        fixedWinningNums: {},
                    })
                );
                setSimData((simData) => ({ ...simData, mappedMatches: matchesMapper }));
                clearInterval(gameInterval);
            }
        }, 5);
        // --------------------------------GAME-INTERVAL-END------------------------------------

        setKenoGame({
            ...kenoGame,
            userChoices: spots.length > 0 ? spots : [],
            winningNums,
        });
    };

    useEffect(() => {
        if (readyToChooseSpotsRedux) {
            setReady(true);
            //   setMatches(0);
            if (!gameStart && !replayKenoGameRedux) {
                setKenoGame(kenoGameRedux);
            } else {
                setKenoGame({
                    ...kenoGame,
                    mode: previousKenoGameRedux.mode,
                    spots: previousKenoGameRedux.spots,
                });
            }
            if (replayKenoGameRedux) {
                //   reset user choices to default choice style
                previousKenoGameRedux.userChoices.forEach((choice) => {
                    let userChoiceBtn = document.getElementById(`num${choice}`);
                    userChoiceBtn.classList.add('choice');
                });
                setDoneChoosing(true);
                if (spots[0] === 0) {
                    setSpots(previousKenoGameRedux.userChoices);
                    let allWinnerBtns = document.querySelectorAll('.winner');
                    let allUserMatchWinnerBtns =
                        document.querySelectorAll('.winner-boxy');
                    allWinnerBtns.forEach((item) => {
                        item.classList.remove('winner');
                    });
                    allUserMatchWinnerBtns.forEach((item) => {
                        item.classList.remove('winner-boxy');
                        item.classList.add('choice');
                    });
                    let replayFixer = {
                        use: true,
                        fixedData: {
                            mode: previousKenoGameRedux.mode,
                            spots: previousKenoGameRedux.spots,
                            userChoices: previousKenoGameRedux.userChoices,
                        },
                    };
                    playKenoGame(replayFixer);
                    dispatch(SET_REPLAY_KENO_GAME(false));
                } else {
                    let allWinnerBtns = document.querySelectorAll('.winner');
                    let allUserMatchWinnerBtns =
                        document.querySelectorAll('.winner-boxy');
                    allWinnerBtns.forEach((item) => {
                        item.classList.remove('winner');
                    });
                    allUserMatchWinnerBtns.forEach((item) => {
                        item.classList.remove('winner-boxy');
                        item.classList.add('choice');
                    });
                    let replayFixer = {
                        use: true,
                        fixedData: {
                            mode: previousKenoGameRedux.mode,
                            spots: previousKenoGameRedux.spots,
                            userChoices: previousKenoGameRedux.userChoices,
                        },
                    };
                    playKenoGame(replayFixer);
                    dispatch(SET_REPLAY_KENO_GAME(false));
                }
                // }
            }
            if (spots.length === 0) {
                setSpotsArray(kenoGameRedux.spots);
            }
        } else {
            // RESET
            setReady(false);
            setKenoGame({});
            setSpots([]);
            setTempObject({});
            setDoneChoosing(false);
            setSpotCounter(0);
            setGameStart(false);
            setSimData(initialSimData);
        }
    }, [readyToChooseSpotsRedux, replayKenoGameRedux, gameStart]);

    return (
        <>
            {showKenoSimHistoryModalRedux ? (
                <KenoSimHistoryModal />
            ) : showKenoRegHistoryModalRedux ? (
                <KenoRegHistoryModal />
            ) : (
                <div className="h-full w-full flex flex-col ">
                    {/* User Not Done With Start Box Message */}
                    {!showKenoSimHistoryModalRedux && (
                        <div
                            className={`${ready ? 'w-[0%] h-[0%]' : 'w-full h-1/6'
                                } flex justify-center items-center`}
                        >
                            {!ready && (
                                <div className="bg-dark w-[90%] h-[80%] brightness-125 md:flex md:items-center md:justify-center">
                                    <h6 className="text-center text-[12px] md:text-[18px] font-semibold linearGradientText3 brightness-150">
                                        Please Select Your Desired Play Style And Click Play To
                                        Choose Your Numbers
                                    </h6>
                                </div>
                            )}
                        </div>
                    )}

                    {/* User Ready ? Show User Choice Boxes */}
                    <div
                        className={`${ready ? 'w-full h-full' : 'w-full h-5/6'
                            } flex justify-center items-center`}
                    >
                        <div className="bg-dark w-[98%] h-[98%] flex flex-col">
                            {ready && (
                                <>
                                    {!gameStart ? (
                                        <div className="h-[15%] w-full flex justify-evenly px-[2px] items-center gap-[2px] simBar">
                                            {spots &&
                                                spots.length > 0 &&
                                                spots.map((spot, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="w-full h-[80%] shadow2 flex justify-center items-center font-semibold text-white"
                                                        >
                                                            <h4>{spot}</h4>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    ) : //   SHOW SIMULATOR DATA BAR
                                        gameStart && kenoGame.mode === 'Simulator' ? (
                                            <div className="text-white h-[15%] w-full flex justify-evenly items-center">
                                                <div className="bg-heroBorder h-full w-full text-[12px] text-dark font-semibold px-[2px]">
                                                    Draw:{' '}
                                                    <span className="bg-brilliantGreen px-[2px]">
                                                        {simData.draw}
                                                    </span>
                                                </div>
                                                <div className="bg-heroBorder h-full w-full text-[12px] text-dark font-semibold px-[2px]">
                                                    Hits:{' '}
                                                    <span className="bg-brilliantGreen px-[2px]">
                                                        {simData.hits}
                                                    </span>
                                                </div>
                                                <div className="bg-heroBorder h-full w-full text-[12px] text-dark font-semibold px-[2px]">
                                                    All-Hits:{' '}
                                                    <span className="bg-brilliantGreen px-[2px]">
                                                        {simData.totalHits}
                                                    </span>
                                                </div>
                                                <div className="bg-heroBorder h-full w-full text-[12px] text-dark font-semibold px-[2px]">
                                                    Payout:{' '}
                                                    <span className="bg-brilliantGreen px-[2px]">
                                                        ${simData.payout}
                                                    </span>
                                                </div>
                                                <div className="bg-heroBorder h-full w-full text-[12px] text-dark font-semibold px-[2px]">
                                                    Total:{' '}
                                                    <span className="bg-brilliantGreen px-[2px]">
                                                        ${simData.totalPayout}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-[15%] w-full flex justify-evenly px-[2px] items-center gap-[2px] simBar">
                                                {spots &&
                                                    spots.length > 0 &&
                                                    spots.map((spot, i) => {
                                                        return (
                                                            <div
                                                                key={i}
                                                                className="w-full h-[80%] shadow2 flex justify-center items-center font-semibold text-white"
                                                            >
                                                                <h4>{spot}</h4>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}

                                    {/* User Ready ? Show Keno Options 1-80 */}
                                    <div className="h-full w-full bg-lightGreen flex justify-center items-center">
                                        <div className="h-full w-full bg-dark kenoChoiceGrid overflow-hidden">
                                            {kenoChoicesArray &&
                                                kenoChoicesArray.length === 80 &&
                                                kenoChoicesArray.map((choice) => {
                                                    return (
                                                        <motion.button
                                                            id={`num${choice}`}
                                                            key={choice}
                                                            initial={{ x: choice * 200, y: choice * 500 }}
                                                            animate={{
                                                                x: 0,
                                                                y: 0,
                                                                transition: { duration: 1 },
                                                            }}
                                                            whileHover={{
                                                                backgroundColor: '#0D9B5C',
                                                                color: '#030806',
                                                                transition: { duration: 0.01 },
                                                            }}
                                                            className={`shadow3 text-lightGreen font-semibold`}
                                                            onClick={(e) => updateSpotsArray(e)}
                                                            disabled={doneChoose}
                                                        >
                                                            {choice}
                                                        </motion.button>
                                                    );
                                                })}
                                        </div>
                                    </div>

                                    {/* User Maxed Out Spots ? Give Confirmation To Play With Those Nums Or Re-Choose */}
                                    {doneChoose && !gameStart ? (
                                        <div className="w-full h-[15%] flex justify-around items-center text-[14px] font-semibold">
                                            {/* clicking this btn will start keno-game-animation w/ playKenoGame() */}
                                            <motion.button
                                                whileHover={{
                                                    backgroundColor: '#0D9B5C',
                                                    color: '#030806',
                                                    transition: { duration: 0.01 },
                                                }}
                                                className="shadow3 w-[25%] h-[80%] text-lightGreen"
                                                onClick={() => playKenoGame({ use: false })}
                                            >
                                                Play
                                            </motion.button>
                                            <motion.button
                                                whileHover={{
                                                    backgroundColor: '#ae0700',
                                                    color: '#030806',
                                                    transition: { duration: 0.01 },
                                                }}
                                                className="shadowRed1 w-[25%] h-[80%] text-lightRed"
                                                onClick={() => setDoneChoosing(false)}
                                            >
                                                Re-Choose
                                            </motion.button>
                                        </div>
                                    ) : doneChoose && gameStart ? (
                                        //   User Hits Play ? Display Their Choices
                                        <div className="w-full h-[15%] flex justify-evenly items-center gap-[3px] px-[3px] text-[18px] font-semibold">
                                            {spots &&
                                                spots.length > 0 &&
                                                spots.map((spot, i) => {
                                                    return (
                                                        <motion.button
                                                            id={`num${spot}`}
                                                            key={`${spot}-${i}`}
                                                            initial={{
                                                                x: spot * 20,
                                                            }}
                                                            animate={{
                                                                x: 0,
                                                                transition: { duration: 1 },
                                                            }}
                                                            className={`num${spot} shadow3 cursor-pointer w-full px-[3px] choice keno-winner-btn text-lightGreen font-semibold`}
                                                        >
                                                            {spot}
                                                        </motion.button>
                                                    );
                                                })}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default KenoPlayBox;
