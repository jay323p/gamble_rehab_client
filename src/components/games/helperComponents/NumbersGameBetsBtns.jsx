import React from 'react'

const NumbersGameBetsBtns = ({ readyToPlayNumbersRedux, userChoices, updateBetsState }) => {
    return (
        <>{readyToPlayNumbersRedux && userChoices.length === 1 ? (
            <button
                id="1-Exact"
                className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                onClick={(e) => updateBetsState(e)}
            >
                1 Exact
            </button>
        ) : readyToPlayNumbersRedux && userChoices.length === 2 ? (
            <>
                <button
                    id="1-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    1 Exact
                </button>
                <button
                    id="2-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    2 Exact
                </button>
            </>
        ) : readyToPlayNumbersRedux && userChoices.length === 3 ? (
            <>
                <button
                    id="1-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    1 Exact
                </button>
                <button
                    id="2-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    2 Exact
                </button>
                <button
                    id="3-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    3 Exact
                </button>
                <button
                    id="3-Any"
                    className="shadow3 text-lightGreen  h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    3 Any
                </button>
            </>
        ) : readyToPlayNumbersRedux && userChoices.length === 4 ? (
            <>
                <button
                    id="1-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    1 Exact
                </button>
                <button
                    id="2-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    2 Exact
                </button>
                <button
                    id="3-Exact"
                    className="shadow3 text-lightGreen  h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    3 Exact
                </button>
                <button
                    id="4-Exact"
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    4 Exact
                </button>
                <button
                    id="3-Any"
                    className="shadow3 text-lightGreen  h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    3 Any
                </button>
                <button
                    id="4-Any"
                    className="shadow3 text-lightGreen  h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState(e)}
                >
                    4 Any
                </button>
                <button
                    className="shadow3 text-lightGreen h-[60%] lg:w-full lg:text-[18px] text-[14px] px-[4px] font-semibold"
                    onClick={(e) => updateBetsState('all bets')}
                >
                    All Bets
                </button>
            </>
        ) : (
            ''
        )}</>
    )
}

export default NumbersGameBetsBtns