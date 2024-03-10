import React from 'react';
import { selectPreviousKenoGame } from '../../redux/features/games/kenoSlice';
import { useSelector } from 'react-redux';

const KenoSimHistoryModal = () => {
  const previousKenoGameRedux = useSelector(selectPreviousKenoGame);
  return (
    <div className="h-full w-full flex flex-col mt-[3rem]">
      <div className="h-[15%] w-full bg-dark flex justify-center items-center px-[2px] border-double border-4 border-heroBorder">
        <h2 className="text-dark font-semibold text-[11px] tall:text-[12px]">
          <span className="bg-green-300 p-[2px] rounded-sm">
            {previousKenoGameRedux.spots} Spots
          </span>{' '}
          <span className="bg-green-400 p-[2px] rounded-sm">
            {previousKenoGameRedux.simulations} Simulations
          </span>{' '}
          <span className="bg-green-500 p-[2px] rounded-sm">
            {previousKenoGameRedux.matches} Matches
          </span>{' '}
          <span className="bg-green-600 p-[2px] rounded-sm">
            ${previousKenoGameRedux.payout} Payout
          </span>{' '}
          <span className="bg-green-700 p-[2px] rounded-sm">
            ${previousKenoGameRedux.simulations} Spent
          </span>{' '}
        </h2>
      </div>
      <div className="h-full w-full kenoStatGrid overflow-y-scroll p-[3px]">
        {previousKenoGameRedux.fixedWinningNums &&
          previousKenoGameRedux.recentWinningNums &&
          previousKenoGameRedux.recentWinningNums.map((num, i) => {
            if (Number.isInteger(i / 20)) {
              return (
                <>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-white rounded-sm font-bold">
                    Game
                  </h3>
                  <h3 className="text-[10px] bg-white rounded-sm font-bold">
                    #{i / 20}
                  </h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>
                  <h3 className="text-[10px] bg-heroBorder rounded-sm font-bold"></h3>

                  <div
                    key={`${Date.now()}-${i}`}
                    className={`${
                      previousKenoGameRedux.fixedWinningNums[num]
                        ? 'statGridUserMatch'
                        : ''
                    } bg-dark text-brilliantGreen text-[10px] rounded-md`}
                  >
                    {num}
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div
                    key={`${Date.now()}-${i}`}
                    className={`${
                      previousKenoGameRedux.fixedWinningNums[num]
                        ? 'statGridUserMatch'
                        : ''
                    } bg-dark text-brilliantGreen text-[10px] rounded-md`}
                  >
                    {num}
                  </div>
                </>
              );
            }
          })}
      </div>
    </div>
  );
};

export default KenoSimHistoryModal;
