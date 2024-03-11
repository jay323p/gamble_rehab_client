import axios from 'axios';
import { toast } from 'react-toastify';
// production === https://resonant-cranachan-6ad07d.netlify.app
// development === http://localhost:5173
// REGISTER USER --------------------------------------------------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      'https://gamble-rehab-server-f3e149347d25.herokuapp.com/api/users/register',
      userData,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Registered Successfully!');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// LOGIN USER -----------------------------------------------------------------------
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      'https://gamble-rehab-server-f3e149347d25.herokuapp.com/api/users/login',
      userData,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// LOGOUT USER ---------------------------------------------------------------------
export const logoutUser = async () => {
  try {
    await axios.get(
      `https://gamble-rehab-server-f3e149347d25.herokuapp.com/api/users/logout`,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      }
    );
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET LOGIN STATUS --------------------------------------------------------------------
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(
      `https://gamble-rehab-server-f3e149347d25.herokuapp.com/api/users/loginstatus`,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
