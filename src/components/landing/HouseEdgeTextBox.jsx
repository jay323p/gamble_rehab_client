import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { text1, text2, text3 } from '../../data/houseEdgeText';
import { writeInTextBox } from '../../data/houseEdgeText';
import { motion } from 'framer-motion';

const HouseEdgeTextBox = () => {
    const [ref, inView] = useInView();
    const [viewedText, setViewedText] = useState(false);
    const [active, setActive] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    const typeHeading = () => {
        const heading = document.getElementById('heading-typed');
        let heading1 = 'To Go Any Further, Please Learn About House-Edge';
        let heading2 =
            ' Learning About House-Edge Will Be The Basis For Understanding The Massive Cons Behind Gambling';
        let initHeading2Length = heading2.length;

        let index = 0;

        let interval = setInterval(() => {
            if (!viewedText) {
                if (index < heading1.length) {
                    setViewedText(true);

                    heading.innerHTML += heading1.charAt(index);

                    heading1 = heading1.substring(1, heading1.length);
                } else if (
                    heading1.length === 0 &&
                    heading2.length === initHeading2Length
                ) {
                    heading.innerHTML = '';
                    heading2 = heading2.substring(1, heading2.length);
                } else if (heading1.length === 0 && heading2.length > 0) {
                    if (index < heading2.length) {
                        heading.innerHTML += heading2.charAt(index);

                        heading2 = heading2.substring(1, heading2.length);
                    }
                } else {
                    clearInterval(interval);
                }
            }
        }, 100);
    };

    const clearTextBox = () => {
        const textBox = document.getElementById('house-edge-text');
        textBox.innerHTML = '';
    };

    const setActiveText = (e) => {
        const textBox = document.getElementById('house-edge-text');
        let btnTextToNum = parseFloat(e.target.innerHTML);
        setViewedText(true);

        if (btnTextToNum === 1) {
            setActive(1);
            setDisplayedText(text1);
            clearTextBox();
            textBox.innerHTML = text1;
        } else if (btnTextToNum === 2) {
            setActive(2);
            setDisplayedText(text2);
            clearTextBox();

            textBox.innerHTML = text2;
        } else {
            setActive(3);
            setDisplayedText(text3);

            clearTextBox();
            textBox.innerHTML = text3;
        }

        // if (e.target.innerHTML)
    };

    useEffect(() => {
        if (inView && !viewedText) {
            clearTextBox();
            typeHeading();
            writeInTextBox(
                viewedText,
                setViewedText,
                clearTextBox,
                setActive,
                text1,
                text2,
                text3
            );
        }
        if (inView && viewedText) {
            const textBox = document.getElementById('house-edge-text');
            //   textBox.innerHTML = '';
            clearTextBox();
            textBox.innerHTML = displayedText;
        }
    }, [inView]);

    return (
        <>
            <div ref={ref} className="flex flex-col items-center h-full relative">
                {/* keep space */}
                <div className="w-full text-center">
                    <h1
                        id="heading-typed"
                        className="text-[25px] md:text-[24px] lg:text-[26px] text-brilliantGreen font-semibold "
                    ></h1>
                </div>

                <div className="w-full h-[180px] md:h-[130px] flex flex-col pt-[-12px]">
                    <div className="bg-slate-500 opacity-25 w-[90%] mt-[-1.8rem] ml-auto mr-auto  text-slate-500 house-edge-shadow relative top-[30px]">
                        <p className="h-[180px] md:h-[130px]">h</p>
                    </div>
                    <div className="w-[90%] ml-auto mr-auto px-[4px] relative top-[-198px] mt-[3rem] md:top-[-148px]">
                        <p
                            id="house-edge-text"
                            className="text-heroBorder brightness-[2] h-[100px] z-[100] text-[13px] md:text-[16px] lg:text-[18px] text-left"
                        ></p>
                    </div>
                </div>

                <div className="flex justify-center z-[100] text-white  ml-auto mr-auto w-[90%] ">
                    <motion.div
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        className={` ${active === 1 ? 'text-brilliantGreen brightness-200' : 'bg-inherit'
                            } flex-1 border-r-solid `}
                    >
                        <button
                            className="h-[30px] w-full cursor-pointer"
                            onClick={(e) => setActiveText(e)}
                        >
                            1
                        </button>
                    </motion.div>
                    <motion.div
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        className={` ${active === 2 ? 'text-brilliantGreen brightness-200' : 'bg-inherit'
                            } flex-1 `}
                    >
                        <button
                            className="h-[30px] w-full cursor-pointer"
                            onClick={(e) => setActiveText(e)}
                        >
                            2
                        </button>
                    </motion.div>
                    <motion.div
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        className={` ${active === 3 ? 'text-brilliantGreen brightness-200' : 'bg-inherit'
                            } flex-1 cursor-pointer`}
                    >
                        <button
                            className="h-[30px] w-full cursor-pointer"
                            onClick={(e) => setActiveText(e)}
                        >
                            3
                        </button>
                    </motion.div>
                </div>

                {/* keep space */}
            </div>
        </>
    );
};

export default HouseEdgeTextBox;
