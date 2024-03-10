import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectPayoutGuide,
    selectWinners,
} from '../../../../redux/features/games/slotSlice';

const SlotsStartBox = () => {

    const payoutGuideRedux = useSelector(selectPayoutGuide);
    const slotWinnersRedux = useSelector(selectWinners);

    return (
        <div className="h-full w-full p-[8px] flex flex-col text-white overflow-y-scroll">
            {slotWinnersRedux && slotWinnersRedux.length > 0 ? (
                <div className="h-full w-full flex justify-evenly items-center">
                    {slotWinnersRedux.map((item, i) => {
                        return (
                            <div
                                key={`${item.id}-${i}`}
                                className={`h-full w-1/3 flex flex-col shadow2 rounded-md px-[8px]`}
                            >
                                <div className="h-[20%] text-center text-lightGreen font-semibold text-[20px]">
                                    ${item.payout}
                                </div>
                                <div
                                    className={`h-full w-full flex justify-evenly items-center`}
                                >
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="h-[70%] w-[33%] object-cover"
                                    />
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="h-[70%] w-[33%] object-cover"
                                    />
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="h-[70%] w-[33%] object-cover"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <>
                    <div className="h-full w-full flex justify-center items-center">
                        {payoutGuideRedux &&
                            payoutGuideRedux.map((payout, i) => {
                                if (i < 3) {
                                    return (
                                        <div
                                            key={payout.id}
                                            className={`h-full w-1/3 flex flex-col`}
                                        >
                                            <div className="h-[10%] text-center text-lightGreen font-semibold">
                                                ${payout.payout}
                                            </div>
                                            <div
                                                className={`h-full w-full flex justify-evenly items-center px-[8px] ${payout.won ? 'activeSlotPayoutGuide shadow3' : ''
                                                    } activeSlotPayoutGuide`}
                                            >
                                                <img
                                                    src={payout.img}
                                                    alt=""
                                                    className="h-[70%] w-[33%] object-cover"
                                                />
                                                <img
                                                    src={payout.img}
                                                    alt=""
                                                    className="h-[70%] w-[33%] object-cover"
                                                />
                                                <img
                                                    src={payout.img}
                                                    alt=""
                                                    className="h-[70%] w-[33%] object-cover"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                    <div className="h-full w-full flex justify-center items-center">
                        {payoutGuideRedux &&
                            payoutGuideRedux.map((payout, i) => {
                                if (i > 2) {
                                    return (
                                        <div
                                            key={payout.id}
                                            className={`h-full w-1/3 flex flex-col`}
                                        >
                                            <div className="h-[10%] text-center text-lightGreen font-semibold">
                                                ${payout.payout}
                                            </div>
                                            <div
                                                className={`h-full w-full flex justify-evenly items-center px-[8px] ${payout.won ? 'activeSlotPayoutGuide shadow3' : ''
                                                    }`}
                                            >
                                                <img
                                                    src={payout.img}
                                                    alt=""
                                                    className="h-[70%] w-[33%] object-cover"
                                                />
                                                <img
                                                    src={payout.img}
                                                    alt=""
                                                    className="h-[70%] w-[33%] object-cover"
                                                />
                                                <img
                                                    src={payout.img}
                                                    alt=""
                                                    className="h-[70%] w-[33%] object-cover"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </>
            )}
        </div>
    );
};

export default SlotsStartBox;
