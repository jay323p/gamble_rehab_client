import React, { useEffect, useState } from 'react'
import casino from '../assets/casino.png'
import poker from '../assets/poker.png'
import { BiShow } from 'react-icons/bi'
import { AiFillLock } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/authService'
import { SET_LOGIN, SET_PAGE, SET_USER } from '../redux/features/auth/authSlice'
import { useCookies } from 'react-cookie'

const initialAuthData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(["token"])

    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showPassword, setShowPassword] = useState('password')
    const [authType, setAuthType] = useState('Register')
    const [authData, setAuthData] = useState(initialAuthData)
    const { name, email, password, confirmPassword } = authData

    const handleShowPassChange = () => {
        if (showPassword === 'password') {
            setShowPassword('text')
        }
        if (showPassword === 'text') {
            setShowPassword('password')
        }
    }
    const handleAuthTypeChange = () => {
        if (authType === 'Login') {
            setAuthType('Register')
        } else {
            setAuthType('Login')
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAuthData({ ...authData, [name]: value })
    }
    const handleFormSubmit = () => {
        if (authType === 'Login') {
            tryUserLogin()
        }
        if (authType === 'Register') {
            tryUserRegistration()
        }
        if (authType === 'Forgot') {
            console.log('forgot')
        }
    }

    const tryUserLogin = async () => {
        if (email === '' || password === '') {
            return toast.error('Please provide all fields!')
        }
        const formData = {
            email, password
        }
        setIsLoading(true)
        try {
            const res = await loginUser(formData)

            if (res) {
                setCookies('token', res.token, { path: "/" })
                localStorage.setItem('name', res.name);
                dispatch(SET_USER(res));
                dispatch(SET_LOGIN(true));
                navigate('/games');
                dispatch(SET_PAGE('Games'))
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false);
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    }

    const tryUserRegistration = async () => {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            return toast.error('Please provide all fields!')
        }

        if (password !== confirmPassword) {
            return toast.error('Password do not match')
        }

        const formData = {
            name, email, password, confirmPassword
        }
        setIsLoading(true)
        try {
            const res = await registerUser(formData)

            if (res) {
                toast.success('Registration Successful!');
                localStorage.setItem('name', res.name);
                dispatch(SET_USER(res));
                dispatch(SET_LOGIN(true));
                navigate('/games')
                dispatch(SET_PAGE('Games'))
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false);
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    }


    const startBackgroundAnimation = () => {
        const pokerChips = document.getElementById('pokerChips')
        pokerChips.classList.add('moving')

        setInterval(() => {
            if (pokerChips.classList.contains('moving')) {
                pokerChips.classList.remove('moving')
                pokerChips.classList.add('moving2')
            } else {
                pokerChips.classList.remove('moving2')
                pokerChips.classList.add('moving')
            }
        }, 8000)
    }
    useEffect(() => {
        startBackgroundAnimation()
    }, [])
    return (
        <div className='h-screen w-screen relative flex justify-center items-center bg-dark rubikFont'>
            <div className='h-[5vh] w-[30%] md:hidden bg-dark bg-opacity-25 rounded-md absolute top-2 flex justify-center items-center z-50'>
                <button className='h-[70%] w-[90%] bg-dark bg-opacity-60 rounded-md text-lightGreen cursor-pointer hover:bg-opacity-90' onClick={() => setShowForm((prev) => !prev)}>{showForm ? 'Hide Form' : 'Show Form'}</button>
            </div>
            <img id='pokerChips' src={poker} alt="" className='absolute' />
            <div className='h-[80%] w-[90%] flex bg-lightGreen rounded-[2rem] z-10'>
                <div className={`${!showForm ? 'w-full md:flex md:w-1/2' : 'w-0 hidden md:flex md:w-1/2'} h-full relative flex items-center justify-center bg-heroBorder rounded-[2rem] z-30 outsetShadow`}>
                    <img src={casino} alt="" />
                    <div className='h-[70%] w-[80%] absolute top-[14%] flex flex-col gap-[7%] rounded-[1rem] blurBg1 px-[10px] py-[10px]'>
                        <div className='h-[12%] w-[30%] flex flex-col blurBg2 text-lightGreen font-semibold'><h2 className='text-center text-[16px]'>GAMBLE</h2><h2 className='text-center text-[16px]'>REHAB</h2></div>

                        <div className='h-[1px] w-[15%] blurBg2 bg-lightGreen'></div>

                        <div className='h-[40%] w-full flex flex-col'>
                            <h3 className='text-[16px] text-white'>We Are</h3>
                            <h3 className='text-[22px] text-lightGreen font-bold'>Passionate About Helping Others</h3>
                            <p className='text-[12px] text-slate-300'>$50,000,000,000+ in yearly gambling losses of the average worker</p>
                            <p className='text-[12px] text-slate-300'>{authType === 'Login' ? 'We believe gambling addiction ends with knowledge, it\'s time to learn!' : 'We invite you to convince you of a better financial future'}</p>
                        </div>
                        <div className='h-[44%] w-full flex flex-col justify-end'>
                            <h3 className='text-[15px] text-white'>{authType === 'Login' ? 'No Account Yet ?' : 'Already Have Account ?'}</h3>
                            <h3 className='text-[14px] text-brilliantGreen cursor-pointer' onClick={() => handleAuthTypeChange()}>{authType === 'Login' ? 'Register' : 'Login'}</h3>
                        </div>
                    </div>
                </div>
                <div className={`${showForm ? 'w-full md:flex md:w-1/2' : 'hidden w-0 md:flex md:w-1/2'} h-full relative flex flex-col bg-lightGreen rounded-[2rem] p-[1rem] md:p-[7%]`}>
                    <h3 className='absolute top-2 right-6 cursor-pointer' onClick={() => navigate('/')}>Go Home</h3>
                    <div className='h-[10%] w-full flex items-center'>
                        <h2 className='h-[70%] text-[30px] text-dark font-semibold'>{authType === 'Login' ? 'Login' : authType === 'Register' ? 'Register' : 'Forgot Password'}</h2>
                    </div>
                    <div className='h-[90%] w-full flex flex-col justify-center'>
                        {authType === 'Register' &&
                            <div className='h-[15%] w-full flex flex-col'>
                                <label htmlFor="" className='montFont font-semibold'>Name</label>
                                <input type="text" name='name' value={name} onChange={(e) => handleInputChange(e)} className='h-[4vh] rounded-lg outline-none border-heroBorder border-[2px] px-[4px] outsetShadowThin' />
                            </div>
                        }
                        <div className='h-[15%] w-full flex flex-col'>
                            <label htmlFor="" className='montFont font-semibold'>Email address</label>
                            <input type="text" name='email' value={email} onChange={(e) => handleInputChange(e)} className='h-[4vh] rounded-lg outline-none border-heroBorder border-[2px] px-[4px] outsetShadowThin' />
                        </div>
                        {authType !== 'Forget' &&
                            <div className='h-[15%] w-full flex flex-col'>
                                <label htmlFor="" className='montFont font-semibold'>Password</label>
                                <div className='h-[4vh] w-full relative flex'>
                                    <input type={showPassword} name='password' value={password} onChange={(e) => handleInputChange(e)} className='h-[4vh] w-full rounded-lg outline-none border-heroBorder border-[2px] px-[4px] outsetShadowThin' />
                                    <span className='absolute right-2 bottom-1'>
                                        <button className='h-[3vh] w-[3vw] bg-[#000] hover:bg-lightGreen rounded-md flex justify-center items-center' onClick={() => handleShowPassChange()}>{showPassword === 'password' ? <BiShow className='text-white' /> : <AiFillLock className='text-white' />}</button>
                                    </span>
                                </div>
                                {authType === 'Login' && <div className='h-[2vh] w-full flex text-[12px] cursor-pointer' onClick={() => setAuthType('Forget')}>Forgot Password ?</div>}
                            </div>
                        }
                        {authType === 'Register' &&
                            <div className='h-[15%] w-full flex flex-col'>
                                <label htmlFor="" className='montFont font-semibold'>Confirm Password</label>
                                <div className='h-[4vh] w-full relative flex'>
                                    <input type={showPassword} name='confirmPassword' value={confirmPassword} onChange={(e) => handleInputChange(e)} className='h-[4vh] w-full rounded-lg outline-none border-heroBorder border-[2px] px-[4px] outsetShadowThin' />
                                </div>
                            </div>
                        }
                        <div className='h-[15%] w-full flex justify-center items-center xl:translate-y-5'>
                            <button class="btn h-[5vh] w-full" onClick={() => handleFormSubmit()}><i className="animation"></i>{authType === 'Login' ? 'Login' : authType === 'Register' ? 'Register' : 'Send Password Reset'}<i className="animation"></i>
                            </button>
                        </div>
                        <div className='h-[25%] w-full flex flex-col items-center justify-center'>
                            <div className='h-[40%] w-full flex items-center justify-center'>
                                <div className='h-[1px] w-[25%] bg-dark'></div>
                                <h5 className='w-[7%] text-center leading-4'>or</h5>
                                <div className='h-[1px] w-[25%] bg-dark'></div>
                            </div>
                            <div className='h-[50%] w-full flex justify-center items-center'>
                                <button class="googleBtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                    </svg>
                                    Continue with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="h-1/4 w-1/6 green_gradient absolute right-0 z-[1] "></span>
            <span className="h-1/3 w-1/5 darkGreen_gradient absolute right-0 z-[1]  "></span>
            <span className="h-1/2 w-1/4 white_gradient absolute right-0 z-[1]  "></span>
            <span className="h-1/6 w-1/4 darkerGreen_gradient absolute bottom-0 left-[-15%] z-[1]  "></span>
            <span className="h-1/6 w-1/3 white_gradient absolute bottom-0 left-[-15%] z-[1]  "></span>
            <span className="h-1/6 w-1/4 darkerGreen_gradient absolute bottom-[40%] left-[-10%] z-[1]  "></span>
        </div>
    )
}

export default Login