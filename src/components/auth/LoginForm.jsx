import React from 'react';
import { motion } from 'framer-motion';

const LoginForm = ({
    handleFormSubmit,
    handleInputChange,
    email,
    password,
}) => {
    return (
        <form
            className="text-dark w-full px-[2rem] pt-[1rem]"
            onSubmit={(e) => handleFormSubmit(e)}
        >
            <input
                className="bg-slate-200 w-full pl-[10px]"
                type="text"
                name="email"
                value={email}
                placeholder="&#x2709; Email"
                onChange={handleInputChange}
            />
            <input
                className="bg-slate-200 w-full pl-[10px] mt-[1rem]"
                type="password"
                name="password"
                value={password}
                placeholder="&#9919; Password"
                onChange={handleInputChange}
            />
            <motion.button
                whileHover={{ backgroundColor: '#0D9B5C' }}
                type="submit"
                className="w-full z-[100] bg-lightGreen mt-[1rem] h-[30px]"
            >
                Log In
            </motion.button>
        </form>
    );
};

export default LoginForm;
