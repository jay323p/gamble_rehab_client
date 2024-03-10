import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SET_SCRATCHED_ALREADY,
    SET_SCRATCHERS_MONEY_STATS,
    SET_SCRATCHER_HISTORY,
    selectGameTicket,
    selectScratchersMoneyStats,
} from '../../../../redux/features/games/scratchersSlice';

let stripeMapper = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const ScratchersPlayBox = () => {
    const dispatch = useDispatch();
    const gameTicketRedux = useSelector(selectGameTicket);
    const moneyStatsRedux = useSelector(selectScratchersMoneyStats);

    const [windowX, setWindowX] = useState(0);
    const [windowY, setWindowY] = useState(0);
    const [gameTicketID, setGameTicketID] = useState();

    useEffect(() => {
        if (Object.keys(gameTicketRedux).length > 0) {
            setGameTicketID(gameTicketRedux.id);

            let canvas = document.getElementById('scratch');
            let base = document.querySelector('.base');
            let baseDimensions = base.getBoundingClientRect();
            setWindowX(baseDimensions.width);
            setWindowY(baseDimensions.height);
            let context = canvas.getContext('2d');
            context.reset();

            const init = () => {
                let gradientColor = context.createLinearGradient(
                    0,
                    0,
                    windowX * 0.75,
                    windowY * 0.75
                );
                gradientColor.addColorStop(0, '#5FB495');
                gradientColor.addColorStop(1, '#0D9B5C');
                context.fillStyle = gradientColor;
                context.fillRect(0, 0, windowX, windowY);
            };

            //initially mouse X and mouse Y positions are 0
            let mouseX = 0;
            let mouseY = 0;
            let isDragged = false;

            //Events for touch and mouse
            let events = {
                mouse: {
                    down: 'mousedown',
                    move: 'mousemove',
                    up: 'mouseup',
                },
                touch: {
                    down: 'touchstart',
                    move: 'touchmove',
                    up: 'touchend',
                },
            };

            let deviceType = '';

            //Detech touch device
            const isTouchDevice = () => {
                try {
                    //We try to create TouchEvent. It would fail for desktops and throw error.
                    document.createEvent('TouchEvent');
                    deviceType = 'touch';
                    return true;
                } catch (e) {
                    deviceType = 'mouse';
                    return false;
                }
            };

            //Get left and top of canvas
            let rectLeft = canvas.getBoundingClientRect().left;
            let rectTop = canvas.getBoundingClientRect().top;

            //Exact x and y position of mouse/touch
            const getXY = (e) => {
                mouseX = !isTouchDevice() ? e.offsetX : e.touches[0].screenX;
                mouseY = !isTouchDevice() ? e.offsetY : e.touches[0].screenY;
            };

            isTouchDevice();
            //Start Scratch
            canvas.addEventListener(events[deviceType].down, (event) => {
                isDragged = true;
                //Get x and y position
                getXY(event);
                scratch(mouseX, mouseY);
            });

            //mousemove/touchmove
            canvas.addEventListener(events[deviceType].move, (event) => {
                if (!isTouchDevice()) {
                    event.preventDefault();
                }
                if (isDragged) {
                    getXY(event);
                    scratch(mouseX, mouseY);
                }
            });

            //stop drawing
            canvas.addEventListener(events[deviceType].up, () => {
                isDragged = false;
            });

            //If mouse leaves the square
            canvas.addEventListener('mouseleave', () => {
                isDragged = false;
            });

            const scratch = (x, y) => {
                //destination-out draws new shapes behind the existing canvas content
                dispatch(SET_SCRATCHED_ALREADY(true));

                context.globalCompositeOperation = 'destination-out';
                context.beginPath();
                //arc makes circle - x,y,radius,start angle,end angle
                let radius = windowX * 0.15;
                context.arc(x, y, radius, 0, 2 * Math.PI);
                context.fill();
            };

            if (gameTicketID !== gameTicketRedux.id) {
                if (gameTicketRedux) {
                    dispatch(SET_SCRATCHER_HISTORY(gameTicketRedux));
                }
                let wagered = moneyStatsRedux.wagered;
                let won = moneyStatsRedux.won;
                let profit = moneyStatsRedux.profit;

                wagered += 10;
                won += gameTicketRedux.payout;
                profit = won - wagered;

                dispatch(
                    SET_SCRATCHERS_MONEY_STATS({
                        wagered,
                        won,
                        profit,
                    })
                );
                init();
            }
        }
    }, [windowX, gameTicketRedux.id]);

    return (
        <div className="h-full w-full bg-darkGreen">
            {Object.keys(gameTicketRedux).length > 0 && (
                <div className="container z-[10]">
                    <div className="base flex flex-col justify-center items-center">
                        <div className="h-1/4 w-full flex justify-center items-center gap-[2%]">
                            {gameTicketRedux &&
                                gameTicketRedux.winningNums &&
                                gameTicketRedux.winningNums.map((num, i) => {
                                    return (
                                        <div
                                            key={`${num}-scratcher-winner`}
                                            className="w-1/5 bg-dark text-brilliantGreen font-extrabold rounded-sm"
                                        >
                                            {num}
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="h-3/4 w-full scratcherGrid items-center justify-center">
                            {gameTicketRedux &&
                                gameTicketRedux.winningNums &&
                                gameTicketRedux.scratchOffArea.map((area, i) => {
                                    return (
                                        <div
                                            key={`${area.number}-scratcher-matcher`}
                                            className={`${gameTicketRedux.winningNums.includes(area.number)
                                                ? 'text-brilliantGreen'
                                                : 'text-red-300'
                                                } bg-dark flex flex-col justify-center items-center rounded-md text-[12px] md:text-[14px] lg:text-[16px]`}
                                        >
                                            <div>{area.number}</div>
                                            <div>${area.prize.toFixed(2)}</div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <canvas id="scratch" width={windowX} height={windowY}></canvas>
                </div>
            )}
            <div className="h-full w-full overflow-y-hidden opacity-30 z-[-10]">
                {stripeMapper.map((stripe, i) => {
                    return (
                        <div
                            key={`${stripe}-${i}`}
                            className={`${i % 2 === 0
                                ? 'w-full bg-lightGreen text-lightGreen z-[-10]'
                                : 'w-full bg-brilliantGreen text-brilliantGreen z-[-10]'
                                }`}
                        >
                            {stripe}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScratchersPlayBox;
