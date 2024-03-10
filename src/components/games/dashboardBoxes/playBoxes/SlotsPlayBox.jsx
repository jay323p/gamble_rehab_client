import React, { useEffect, useState } from 'react';
// import img from '../../assets/spin.png';
import cherry from '../../../../assets/cherry.png';
import singleBar from '../../../../assets/singleBar.png';
import doubleBar from '../../../../assets/doubleBar.png';
import tripleBar from '../../../../assets/tripleBar.png';
import seven from '../../../../assets/seven.png';
import fiftyChip from '../../../../assets/fiftyChip.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_CALCULATE_STATS,
    SET_GUIDERS,
    SET_PAYOUT_GUIDE,
    SET_READY_TO_SPIN,
    SET_SLOTS_HISTORY,
    SET_SLOTS_MONEY_STATS,
    SET_WINNERS,
    selectCalculateStats,
    selectGuiders,
    selectPayoutGuide,
    selectReadyToSpin,
    selectSlotMoneyStats,
    selectWinners,
} from '../../../../redux/features/games/slotSlice';

const payoutGuideReset = [
    {
        img: cherry,
        id: 'cherry',
        payout: 1,
        won: false,
    },
    {
        img: singleBar,
        id: 'singleBar',
        payout: 2,
        won: false,
    },
    {
        img: doubleBar,
        id: 'doubleBar',
        payout: 4,
        won: false,
    },
    {
        img: tripleBar,
        id: 'tripleBar',
        payout: 10,
        won: false,
    },
    {
        img: fiftyChip,
        id: 'fiftyChip',
        payout: 50,
        won: false,
    },
    {
        img: seven,
        id: 'seven',
        payout: 100,
        won: false,
    },
];

const slotImagesMapper = [
    { src: cherry, id: 'cherry-1', matcher: 'cherry' },
    { src: singleBar, id: 'singleBar-1', matcher: 'singleBar' },
    { src: doubleBar, id: 'doubleBar-2', matcher: 'doubleBar' },
    { src: cherry, id: 'cherry-2', matcher: 'cherry' },
    { src: singleBar, id: 'singleBar-2', matcher: 'singleBar' },
    { src: cherry, id: 'cherry-3', matcher: 'cherry' },
    { src: singleBar, id: 'singleBar-3', matcher: 'singleBar' },
    { src: seven, id: 'seven', matcher: 'seven' },
    { src: cherry, id: 'cherry-4', matcher: 'cherry' },
    { src: doubleBar, id: 'doubleBar-1', matcher: 'doubleBar' },
    { src: tripleBar, id: 'tripleBar', matcher: 'tripleBar' },
    { src: fiftyChip, id: 'fiftyChip', matcher: 'fiftyChip' },
];

const SlotsPlayBox = () => {
    const dispatch = useDispatch();

    const readyToSpinRedux = useSelector(selectReadyToSpin);
    const guidersRedux = useSelector(selectGuiders);
    const payoutGuideRedux = useSelector(selectPayoutGuide);
    const moneyStatsRedux = useSelector(selectSlotMoneyStats);
    const calculateStatsRedux = useSelector(selectCalculateStats);
    const winnersRedux = useSelector(selectWinners);

    const [reelHeight, setReelHeight] = useState('');
    const [spinReel1, setSpinReel1] = useState(false);
    const [spinReel2, setSpinReel2] = useState(false);
    const [spinReel3, setSpinReel3] = useState(false);
    const [reel1SpinPercent, setReel1SpinPercent] = useState(0);
    const [reel2SpinPercent, setReel2SpinPercent] = useState(0);
    const [reel3SpinPercent, setReel3SpinPercent] = useState(0);
    const [payoutGuide, setPayoutGuide] = useState(payoutGuideRedux);
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    const [row3, setRow3] = useState([]);
    const [spinDone, setSpinDone] = useState(false);

    const getSlotMachineDimensions = () => {
        const slotMachine = document.getElementById('slotMachine');
        const dimensions = slotMachine.getBoundingClientRect();
        let fixedHeight = Math.floor(dimensions.height / 3);
        setReelHeight(`${fixedHeight}px`);

    };

    const animateReel1 = () => {
        setReel1SpinPercent(0);
        setRow1([]);
        setRow2([]);
        setRow3([]);
        dispatch(SET_GUIDERS(false));
        let id = 'id';
        let won = 'won';
        let reset = true;
        dispatch(SET_PAYOUT_GUIDE({ id, won, reset }));

        const reel1 = document.getElementById('reel1');
        let intervalCounter = 1;
        let stopCounter = 0;
        let reel1Stopper = Math.floor(Math.random() * 30) + 20;
        let reel1Guider = 0;

        setSpinReel1(true);

        const slotInterval = setInterval(() => {
            if (intervalCounter % 10 === 0) {
                reel1.scrollTo(0, 0);
                reel1Guider = 0;
                setReel1SpinPercent(0);
            } else {
                reel1Guider += 100;
                setReel1SpinPercent((prev) => prev + 100);
            }
            if (stopCounter === reel1Stopper) {
                dispatch(SET_GUIDERS(reel1Guider));
                animateReel2();
                clearInterval(slotInterval);
            }

            intervalCounter++;
            stopCounter++;
        }, 30);
    };

    const animateReel2 = () => {
        setReel2SpinPercent(0);
        const reel2 = document.getElementById('reel2');
        let intervalCounter = 1;
        let stopCounter = 0;
        let reel2Stopper = Math.floor(Math.random() * 30) + 20;
        let reel2Guider = 0;

        setTimeout(() => {
            setSpinReel2(true);
        }, 400);

        const slotInterval = setInterval(() => {
            if (intervalCounter % 10 === 0) {
                reel2.scrollTo(0, 0);
                setReel2SpinPercent(0);
                reel2Guider = 0;
            } else {
                reel2Guider += 100;
                setReel2SpinPercent((prev) => prev + 100);
            }
            if (stopCounter === reel2Stopper) {
                dispatch(SET_GUIDERS(reel2Guider));
                animateReel3();
                clearInterval(slotInterval);
            }

            intervalCounter++;
            stopCounter++;
        }, 30);
    };

    const animateReel3 = () => {
        setReel3SpinPercent(0);
        const reel3 = document.getElementById('reel3');
        let intervalCounter = 1;
        let stopCounter = 0;
        let reel3Stopper = Math.floor(Math.random() * 30) + 20;
        let reel3Guider = 0;

        setTimeout(() => {
            setSpinReel3(true);
        }, 800);

        const slotInterval = setInterval(() => {
            if (intervalCounter % 10 === 0) {
                reel3.scrollTo(0, 0);
                setReel3SpinPercent(0);
                reel3Guider = 0;
            } else {
                reel3Guider += 100;
                setReel3SpinPercent((prev) => prev + 100);
            }
            if (stopCounter === reel3Stopper) {
                dispatch(SET_GUIDERS(reel3Guider));
                dispatch(SET_READY_TO_SPIN(false));
                clearInterval(slotInterval);
                setSpinDone(true);
            }

            intervalCounter++;
            stopCounter++;
        }, 30);
    };

    const generateSlotScreen = () => {
        const reel1Guider = guidersRedux[0];
        const reel2Guider = guidersRedux[1];
        const reel3Guider = guidersRedux[2];

        const row1 = [reel1Guider / 100, reel2Guider / 100, reel3Guider / 100];
        const row2 = [
            (reel1Guider + 100) / 100,
            (reel2Guider + 100) / 100,
            (reel3Guider + 100) / 100,
        ];
        const row3 = [
            (reel1Guider + 200) / 100,
            (reel2Guider + 200) / 100,
            (reel3Guider + 200) / 100,
        ];

        const rowMapper = [row1, row2, row3];
        determinePayout(rowMapper);
    };

    const determinePayout = (rowMapper) => {
        let winnersFromPayoutGuide = [];
        let historyObject = {
            wagered: 0,
            payout: 0,
            profit: 0,
            matches: [],
        }
        let winner = false

        //   n = 9 elems, I'm going to brute force it here ok! I'm not bad developer I promise
        for (let i = 0; i < rowMapper.length; i++) {
            let matchesCounter = 0;
            let indexer = 0;
            let rowWinnersArray = [];
            let winnerObj = {
                img: '',
                id: '',
                payout: 0,
            };
            for (let j = 0; j < rowMapper[i].length; j++) {
                if (j === 2) {
                    if (matchesCounter < 2) {
                        for (let index = 0; index < rowMapper[i].length; index++) {
                            rowWinnersArray.push('loss');
                        }

                        if (i === 0) {
                            setRow1(rowWinnersArray);
                        } else if (i === 1) {
                            setRow2(rowWinnersArray);
                        } else {
                            setRow3(rowWinnersArray);
                        }
                    }
                    continue;
                }
                if (
                    slotImagesMapper[rowMapper[i][indexer]].matcher ===
                    slotImagesMapper[rowMapper[i][indexer + 1]].matcher &&
                    indexer < 2
                ) {
                    matchesCounter += 1;
                    indexer += 1;
                }

                if (matchesCounter === 2) {
                    winner = true
                    let rowArray = [];
                    for (let index = 0; index < rowMapper[i].length; index++) {
                        rowArray.push(rowMapper[i][index]);
                    }

                    if (i === 0) {
                        setRow1(rowArray);
                    } else if (i === 1) {
                        setRow2(rowArray);
                    } else {
                        setRow3(rowArray);
                    }

                    let id = slotImagesMapper[rowMapper[i][indexer]].matcher;

                    let filteredWinner = payoutGuide.filter((item) => item.id === id);
                    winnerObj = {
                        img: filteredWinner[0].img,
                        id: filteredWinner[0].id,
                        payout: filteredWinner[0].payout,
                    };
                    historyObject.matches.push(id)
                    historyObject.wagered = 1
                    historyObject.payout += filteredWinner[0].payout
                    historyObject.profit += filteredWinner[0].payout

                    winnersFromPayoutGuide.push(winnerObj);

                    setPayoutGuide(
                        payoutGuide.map((item) => {
                            if (item.id === id) {
                                return { ...item, won: true };
                            } else {
                                return item;
                            }
                        })
                    );
                }
            }

        }
        if (!winner) {
            historyObject.matches.push('none')
            historyObject.wagered = 1
            historyObject.payout = 0
            historyObject.profit = -1

        } else {
            historyObject.profit -= 1
        }
        dispatch(SET_SLOTS_HISTORY(historyObject))
        dispatch(SET_WINNERS(winnersFromPayoutGuide));
        setSpinDone(false);
    };

    const startSlotGame = () => {
        animateReel1();
    };

    const updateMoneyStats = (won) => {

        if (won) {
            let prevWagered = moneyStatsRedux.wagered;
            let prevWon = moneyStatsRedux.won;
            let prevProfit = moneyStatsRedux.profit;

            prevWagered += 1;

            for (let i = 0; i < winnersRedux.length; i++) {
                prevWon += winnersRedux[i].payout;
            }

            let newProfit = prevWon - prevWagered;
            prevProfit = newProfit;

            dispatch(
                SET_SLOTS_MONEY_STATS({
                    wagered: prevWagered,
                    won: prevWon,
                    profit: prevProfit,
                })
            );
        } else {
            let prevWagered = moneyStatsRedux.wagered;
            let prevProfit = moneyStatsRedux.profit;
            prevWagered += 1;
            prevProfit -= 1;
            dispatch(
                SET_SLOTS_MONEY_STATS({
                    wagered: prevWagered,
                    won: moneyStatsRedux.won,
                    profit: prevProfit,
                })
            );
        }

        dispatch(SET_CALCULATE_STATS(false));
    };

    useEffect(() => {
        getSlotMachineDimensions();
    }, [window.innerWidth]);

    useEffect(() => {
        if (readyToSpinRedux) {
            startSlotGame();
        }
        if (spinDone) {
            generateSlotScreen();
        }
    }, [readyToSpinRedux, spinDone]);

    useEffect(() => {
        dispatch(SET_PAYOUT_GUIDE(payoutGuide));
    }, [payoutGuide]);

    useEffect(() => {
        if (readyToSpinRedux) {
            setPayoutGuide(payoutGuideReset);
            dispatch(SET_WINNERS(false));
        }
    }, [readyToSpinRedux]);

    useEffect(() => {
        if (calculateStatsRedux) {
            if (winnersRedux.length === 0) {
                updateMoneyStats(false);
            } else {
                updateMoneyStats(true);
            }
        }
    }, [calculateStatsRedux]);

    return (
        <div className="h-full w-full xl:w-[80%] ml-auto mr-auto bg-dark p-[8px] flex justify-center items-center overflow-y-hidden">
            <div id="slotMachine" className="h-full w-full shadow3 flex">
                <div
                    id="reel1"
                    className="w-1/3 h-[400vh] overflow-y-hidden flex flex-col animateReel"
                >
                    {slotImagesMapper.map((slotImg, i) => {
                        return (
                            <img
                                key={slotImg.id}
                                src={slotImg.src}
                                className={`w-full greenUnderline object-cover xl:object-contain ${(row1.length > 0 && row1[0] === i) ||
                                    row2[0] === i ||
                                    row3[0] === i
                                    ? ' brightness-200'
                                    : ''
                                    }`}
                                style={
                                    !spinReel1
                                        ? { height: reelHeight }
                                        : {
                                            height: reelHeight,
                                            transform: `translateY(-${reel1SpinPercent}%)`,
                                            transition: '0.1s all',
                                        }
                                }
                            />
                        );
                    })}
                </div>
                <div
                    id="reel2"
                    className="w-1/3 h-[400vh] overflow-y-hidden flex flex-col"
                >
                    {slotImagesMapper.map((slotImg, i) => {
                        return (
                            <img
                                key={slotImg.id}
                                src={slotImg.src}
                                className={`w-full greenUnderline object-cover xl:object-contain ${(row2.length > 0 && row1[1] === i) ||
                                    row2[1] === i ||
                                    row3[1] === i
                                    ? ' brightness-200'
                                    : ''
                                    }`}
                                style={
                                    !spinReel2
                                        ? { height: reelHeight }
                                        : {
                                            height: reelHeight,
                                            transform: `translateY(-${reel2SpinPercent}%)`,
                                            transition: '0.1s all',
                                        }
                                }
                            />
                        );
                    })}
                </div>
                <div
                    id="reel3"
                    className="w-1/3 h-[400vh] overflow-y-hidden flex flex-col"
                >
                    {slotImagesMapper.map((slotImg, i) => {
                        return (
                            <img
                                key={slotImg.id}
                                src={slotImg.src}
                                className={`w-full greenUnderline object-cover xl:object-contain ${(row3.length > 0 && row1[2] === i) ||
                                    row2[2] === i ||
                                    row3[2] === i
                                    ? ' brightness-200'
                                    : ''
                                    }`}
                                style={
                                    !spinReel3
                                        ? { height: reelHeight }
                                        : {
                                            height: reelHeight,
                                            transform: `translateY(-${reel3SpinPercent}%)`,
                                            transition: '0.1s all',
                                        }
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SlotsPlayBox;
