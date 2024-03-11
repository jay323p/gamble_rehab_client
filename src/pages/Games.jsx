import React, { useEffect } from 'react';
import GamesDashboard from '../components/games/GamesDashboard';
import Navbar from '../components/landing/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PAGE, selectGamePlaying, selectIsLoggedIn } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Games = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const gamePlayingRedux = useSelector(selectGamePlaying);
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedInRedux) {
            navigate("/login")
            dispatch(SET_PAGE("Home"))
            toast.error('Please sign-in to play and track your gambling!', {
                toastId: 'err-auth'
            })
        }
    }, [isLoggedInRedux])

    return (
        <div className="h-[100vh] flex flex-col overflow-x-hidden overflow-y-hidden">
            <div
                className={`h-[100vh] flex flex-col ${gamePlayingRedux === 'Slots' ||
                    gamePlayingRedux === 'Scratchers' ||
                    gamePlayingRedux === 'Numbers'
                    ? 'pb-[3rem]'
                    : 'tall:pb-[1rem] lg:pb-[4rem]'
                    }`}
            >
                <Navbar />
                <div className='h-full w-full flex justify-center items-center'>
                    <GamesDashboard />
                </div>
            </div>
        </div>
    );
};

export default Games;
