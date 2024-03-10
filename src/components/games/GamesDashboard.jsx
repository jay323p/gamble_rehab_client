import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import KenoPlayBox from './dashboardBoxes/playBoxes/KenoPlayBox';
import KenoStartBox from './dashboardBoxes/startBoxes/KenoStartBox';
import KenoStatBox from './dashboardBoxes/statBoxes/KenoStatBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_KENO_SIM_HISTORY_MODAL,
  selectShowKenoRegHistoryModal,
  selectShowKenoSimHistoryModal,
} from '../../redux/features/games/kenoSlice';
import NumbersPlayBox from './dashboardBoxes/playBoxes/NumbersPlayBox';
import NumbersStartBox from './dashboardBoxes/startBoxes/NumbersStartBox';
import NumbersStatBox from './dashboardBoxes/statBoxes/NumbersStatBox';
import PowerballPlayBox from './dashboardBoxes/playBoxes/PowerballPlayBox';
import PowerballStartBox from './dashboardBoxes/startBoxes/PowerballStartBox';
import PowerballStatBox from './dashboardBoxes/statBoxes/PowerballStatBox';
import { selectViewPowerballHistory } from '../../redux/features/games/powerballSlice';
import PowerballHistoryModal from '../modals/PowerballHistoryModal';
import ScratchersPlayBox from './dashboardBoxes/playBoxes/ScratchersPlayBox';
import ScratchersStartBox from './dashboardBoxes/startBoxes/ScratchersStartBox';
import ScratchersStatBox from './dashboardBoxes/statBoxes/ScratchersStatBox';
import SlotStatBox from './dashboardBoxes/statBoxes/SlotsStatBox';
import SlotsPlayBox from './dashboardBoxes/playBoxes/SlotsPlayBox';
import SlotsStartBox from './dashboardBoxes/startBoxes/SlotsStartBox';
import {
  SET_GAME_PLAYING,
  selectGamePlaying,
} from '../../redux/features/auth/authSlice';

const GamesDashboard = () => {
  const dispatch = useDispatch();

  const viewPowerballHistoryRedux = useSelector(selectViewPowerballHistory);
  const gamePlayingRedux = useSelector(selectGamePlaying);
  const [game, setGame] = useState(
    gamePlayingRedux !== '' ? gamePlayingRedux : 'Keno'
  );

  const showKenoSimHistoryModalRedux = useSelector(
    selectShowKenoSimHistoryModal
  );
  const showKenoRegHistoryModalRedux = useSelector(
    selectShowKenoRegHistoryModal
  );
  const changeGame = (e) => {
    setGame(e.target.innerText);
    dispatch(SET_GAME_PLAYING(e.target.innerText));
  };

  useEffect(() => {
    if (showKenoSimHistoryModalRedux) {
      dispatch(SET_KENO_SIM_HISTORY_MODAL(false));
    }
  }, []);

  return (
    <div className="h-full w-full tall:p-[4px] z-50">
      <div className="h-full w-full bg-dark flex flex-col md:flex-row">
        <div className="flex md:flex-col md:w-[90px] md:h-full h-[10%] w-full ml-auto mr-auto gap-[1rem] md:gap-[2px] px-[10px] md:px-[2px] md:py-[2px]  items-center md:items-start justify-around borderBottom1">
          <motion.h3
            whileHover={{ backgroundColor: '#0D9B5C' }}
            className={`${
              game === 'Keno' ? 'active1' : ''
            } w-[70px] shadow3 h-[40px] md:h-full leading-[40px] md:leading-[162px] text-[12px] text-center text-lightGreen cursor-pointer`}
            onClick={(e) => changeGame(e)}
          >
            Keno
          </motion.h3>
          <motion.h3
            whileHover={{ backgroundColor: '#0D9B5C' }}
            className={`${
              game === 'Numbers' ? 'active1' : ''
            } w-[70px] shadow3 h-[40px] md:h-full leading-[40px] md:leading-[162px] text-[12px] px-[4px] text-center text-lightGreen cursor-pointer`}
            onClick={(e) => changeGame(e)}
          >
            Numbers
          </motion.h3>
          <motion.h3
            whileHover={{ backgroundColor: '#0D9B5C' }}
            className={`${
              game === 'Powerball' ? 'active1' : ''
            } w-[70px] shadow3 h-[40px] md:h-full leading-[40px] md:leading-[162px] text-[12px] px-[4px] text-center text-lightGreen cursor-pointer`}
            onClick={(e) => changeGame(e)}
          >
            Powerball
          </motion.h3>
          <motion.h3
            whileHover={{ backgroundColor: '#0D9B5C' }}
            className={`${
              game === 'Scratchers' ? 'active1' : ''
            } w-[70px] shadow3 h-[40px] md:h-full leading-[40px] md:leading-[162px] text-[12px] px-[4px] text-center text-lightGreen cursor-pointer`}
            onClick={(e) => changeGame(e)}
          >
            Scratchers
          </motion.h3>
          <motion.h3
            whileHover={{ backgroundColor: '#0D9B5C' }}
            className={`${
              game === 'Slots' ? 'active1' : ''
            } w-[70px] shadow3 h-[40px] md:h-full leading-[40px] md:leading-[162px] text-[12px] text-center text-lightGreen cursor-pointer`}
            onClick={(e) => changeGame(e)}
          >
            Slots
          </motion.h3>
        </div>
        <div className="h-full w-full flex flex-col md:py-[10px] md:pr-[10px] overflow-y-scroll">
          {/* START BOXES */}
          {!showKenoSimHistoryModalRedux && (
            <div className="bg-dark w-full h-1/5">
              {game === 'Keno' ? (
                <KenoStartBox />
              ) : game === 'Numbers' ? (
                <NumbersStartBox />
              ) : game === 'Powerball' ? (
                <PowerballStartBox />
              ) : game === 'Scratchers' ? (
                <ScratchersStartBox />
              ) : game === 'Slots' ? (
                <SlotsStartBox />
              ) : (
                <KenoStartBox />
              )}
            </div>
          )}
          {/* PLAY BOXES */}
          <div
            className={`bg-darkGreen w-full ${
              showKenoRegHistoryModalRedux ? 'h-[55%]' : 'h-3/5'
            }
            `}
          >
            {game === 'Keno' ? (
              <KenoPlayBox />
            ) : game === 'Numbers' ? (
              <NumbersPlayBox />
            ) : game === 'Powerball' && !viewPowerballHistoryRedux ? (
              <PowerballPlayBox />
            ) : game === 'Powerball' && viewPowerballHistoryRedux ? (
              <PowerballHistoryModal />
            ) : game === 'Scratchers' ? (
              <ScratchersPlayBox />
            ) : game === 'Slots' ? (
              <SlotsPlayBox />
            ) : (
              <KenoPlayBox />
            )}
          </div>
          {/* STAT BOXES */}
          <div
            className={`bg-dark w-full ${
              showKenoRegHistoryModalRedux ? 'h-[20%]' : 'h-1/5 flex-1'
            }`}
          >
            {game === 'Keno' ? (
              <KenoStatBox />
            ) : game === 'Numbers' ? (
              <NumbersStatBox />
            ) : game === 'Powerball' ? (
              <PowerballStatBox />
            ) : game === 'Scratchers' ? (
              <ScratchersStatBox />
            ) : game === 'Slots' ? (
              <SlotStatBox />
            ) : (
              <KenoStatBox />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesDashboard;
