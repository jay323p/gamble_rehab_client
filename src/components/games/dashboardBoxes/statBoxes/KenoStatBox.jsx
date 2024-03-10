import React, { useEffect, useState } from 'react';
import {
    SET_FIXED_WINNING_NUMS,
    SET_KENO_SIM_HISTORY_MODAL,
    SET_KENO_REG_HISTORY_MODAL,
    SET_REGULAR_KENO_GAME_HISTORY,
    selectKenoGame,
    selectPreviousKenoGame,
    selectReadyToChooseSpots,
    selectShowKenoSimHistoryModal,
    selectWageredKeno,
    selectWonKeno,
} from '../../../../redux/features/games/kenoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { kenoPayouts } from '../../../../data/payouts/kenoPayouts';

const KenoStatBox = () => {
    const previousKenoGameRedux = useSelector(selectPreviousKenoGame);
    const currentKenoGameRedux = useSelector(selectKenoGame);

    const wageredKenoRedux = useSelector(selectWageredKeno);
    const wonKenoRedux = useSelector(selectWonKeno);

    const dispatch = useDispatch();

    const [fixedWinningNums, setFixedWinningNums] = useState();
    const [showModal, setShowModal] = useState();
    const [showRegularHistoryModal, setShowRegularHistoryModal] = useState();

    const setSimulationHistoryModal = () => {
        dispatch(SET_KENO_SIM_HISTORY_MODAL(showModal));
        setShowModal((prev) => !prev);
    };
    const setRegularHistoryModal = () => {
        dispatch(SET_KENO_REG_HISTORY_MODAL(showRegularHistoryModal));
        setShowRegularHistoryModal((prev) => !prev);
    };

    const fixWinningNums = () => {
        const prevUserChoices = previousKenoGameRedux.userChoices;
        const prevWinningNums = previousKenoGameRedux.recentWinningNums;

        const fixedObj = {};
        let matchFound = false;

        if (prevWinningNums) {
            for (let i = 0; i < prevWinningNums.length; i++) {
                matchFound = false;
                if (prevUserChoices) {
                    for (let j = 0; j < prevUserChoices.length; j++) {
                        if (prevWinningNums[i] === prevUserChoices[j]) {
                            matchFound = true;
                            const numToPush = prevWinningNums[i];
                            fixedObj[numToPush] = true;
                            //   fixedObj.push({ [numToPush]: true });
                        }
                    }
                }
                if (!matchFound) {
                    let num = prevWinningNums[i];
                    fixedObj[num] = false;
                    // fixedObj.push({ [num]: false });
                }
            }
        }
        setFixedWinningNums(fixedObj);
        dispatch(SET_FIXED_WINNING_NUMS(fixedObj));
        if (previousKenoGameRedux.mode === 'Regular') {
            dispatch(
                SET_REGULAR_KENO_GAME_HISTORY({
                    spots:
                        previousKenoGameRedux.userChoices &&
                        previousKenoGameRedux.userChoices.length,
                    userChoices: previousKenoGameRedux.userChoices,
                    recentWinningNums: previousKenoGameRedux.recentWinningNums,
                    matches: previousKenoGameRedux.matches,
                    payout: previousKenoGameRedux.payout,
                    fixedWinningNums: fixedObj,
                })
            );
        }
    };

    useEffect(() => {
        if (
            previousKenoGameRedux.mode !== '' &&
            previousKenoGameRedux.fixedWinningNums &&
            Object.keys(previousKenoGameRedux.fixedWinningNums).length === 0
        ) {
            fixWinningNums();
        }
    }, [previousKenoGameRedux]);

    return (
        <div className="bg-heroBorder shadow3Darker h-full w-full flex flex-col pb-[8px] md:pb[2rem]">
            {/* current results */}
            <div className="h-full w-full bg-heroBorder shadow3Darker flex flex-col overflow-y-scroll">
                {previousKenoGameRedux.mode !== '' ? (
                    <div className="flex flex-col w-full h-1/2 mt-[3px]">
                        <div className="flex justify-center items-center w-full h-1/2 px-[2px] font-semibold">
                            {/* <h5 className="text-[14px]">Previous Game:</h5> */}
                            <h5 className="text-[14px] bg-dark p-[2px] mt-[8px]">
                                <span className="bg-lightGreen px-[3px] font-bold">
                                    Recent {previousKenoGameRedux.mode} Game
                                </span>{' '}
                                {previousKenoGameRedux.mode === 'Regular' ? (
                                    <span className="text-white font-semibold">
                                        {previousKenoGameRedux.matches} /{' '}
                                        {previousKenoGameRedux.spots} Matches = $
                                        {previousKenoGameRedux.payout}
                                    </span>
                                ) : (
                                    <span className="text-white font-semibold">
                                        {previousKenoGameRedux.matches} Hits /{' '}
                                        {previousKenoGameRedux.simulations} Draws = $
                                        {previousKenoGameRedux.payout}
                                    </span>
                                )}
                            </h5>
                        </div>
                        {previousKenoGameRedux.mode === 'Regular' ? (
                            <div className="w-[100vw] h-1/2 kenoStatGrid mt-[10px]">
                                {fixedWinningNums &&
                                    previousKenoGameRedux.recentWinningNums &&
                                    previousKenoGameRedux.recentWinningNums.map((num) => {
                                        return (
                                            <div
                                                className={`${fixedWinningNums[num] ? 'statGridUserMatch' : ''
                                                    } bg-dark text-brilliantGreen text-[10px] rounded-md`}
                                            >
                                                {num}
                                            </div>
                                        );
                                    })}
                            </div>
                        ) : previousKenoGameRedux.mode === 'Simulator' ? (
                            <div className="h-full w-full flex flex-col px-[8px] mt-[6px] pb-[5px]">
                                <div className="w-full kenoMatchesGrid mt-[5px] ml-auto mr-auto pb-[5px]">
                                    {previousKenoGameRedux.mappedMatches &&
                                        previousKenoGameRedux.mappedMatches.length > 0 &&
                                        previousKenoGameRedux.mappedMatches.map(
                                            (matchesMade, i) => {
                                                return (
                                                    <h5
                                                        key={i}
                                                        className="bg-dark p-[2px] text-center font-semibold"
                                                    >
                                                        <span className="bg-lightGreen text-[11px] w-full block">
                                                            {i}-Matches
                                                        </span>
                                                        <span className="bg-heroBorder text-[11px] text-slate-200 w-full block">
                                                            {matchesMade[i]} times
                                                        </span>
                                                        <span className="bg-lightGreen text-[11px] w-full block">
                                                            {i}-Hit Payout
                                                        </span>
                                                        <span className="bg-heroBorder text-[11px] text-slate-200 w-full block">
                                                            $
                                                            {
                                                                kenoPayouts[
                                                                    previousKenoGameRedux.userChoices.length
                                                                ][i].payout
                                                            }
                                                        </span>
                                                        <span className="bg-lightGreen text-[11px] w-full block">
                                                            Total Payout
                                                        </span>
                                                        <span className="bg-heroBorder text-[11px] text-slate-200 w-full block">
                                                            $
                                                            {kenoPayouts[
                                                                previousKenoGameRedux.userChoices.length
                                                            ][i].payout * matchesMade[i]}
                                                        </span>
                                                    </h5>
                                                );
                                            }
                                        )}
                                </div>

                                <div className="w-full h-full flex justify-end">
                                    <button
                                        className="w-full bg-lightGreen text-dark font-semibold px-[3px] rounded-sm"
                                        onClick={() => setSimulationHistoryModal()}
                                    >
                                        {showModal ? 'View Simulation History' : 'View Play Grid'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    //   <h1>hello</h1>
                    <div className="h-full w-full bg-heroBorder shadow3Darker flex flex-col">
                        <motion.div
                            initial={{
                                x: 20,
                            }}
                            animate={{
                                x: 0,
                                transition: { duration: 1 },
                            }}
                            className="h-full w-full"
                        >
                            {currentKenoGameRedux.matches &&
                                currentKenoGameRedux.matches >= 0 && (
                                    <div className="h-full w-full flex flex-col">
                                        <div className="h-full w-full kenoStatGrid2 pt-[6px]">
                                            {currentKenoGameRedux.winningNums &&
                                                currentKenoGameRedux.winningNums.map((num) => {
                                                    return (
                                                        <div className="text-heroGreen font-extrabold">
                                                            {num}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                        <div className="h-full w-full flex justify-center items-center">
                                            <div className="h-[60%] w-[90%] ml-auto mr-auto flex justify-center items-center bg-dark text-lightGreen">
                                                You Matched {currentKenoGameRedux.matches} Number To Win
                                                ${currentKenoGameRedux.payout}
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </motion.div>
                    </div>
                )}
            </div>
            {previousKenoGameRedux && previousKenoGameRedux.mode === 'Regular' && (
                <div className="h-[70%] w-full bg-heroBorderLight shadow3Darker flex justify-evenly items-center">
                    <div>
                        <h3 className="bg-dark text-lightRed text-[14px] px-[2px] py-[1px] rounded-md">
                            Wagered{' '}
                            <span className="bg-red-400 h-full text-dark font-semibold brightness-200 px-[1px] rounded-md">
                                ${wageredKenoRedux ? wageredKenoRedux : 0}
                            </span>
                        </h3>
                    </div>
                    <div>
                        <h3 className="bg-dark text-brilliantGreen text-[14px] px-[2px] py-[1px] rounded-md">
                            Won{' '}
                            <span className="bg-heroBorder h-full text-dark font-semibold brightness-200 px-[1px] rounded-md">
                                ${wonKenoRedux ? wonKenoRedux : 0}
                            </span>
                        </h3>
                    </div>

                    <div>
                        <button
                            className="bg-dark text-brilliantGreen font-semibold cursor-pointer px-[4px] rounded-md"
                            onClick={() => setRegularHistoryModal()}
                        >
                            {showRegularHistoryModal ? 'History' : 'Play-Grid'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KenoStatBox;
