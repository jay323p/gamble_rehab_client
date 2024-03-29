import axios from 'axios';
import { toast } from 'react-toastify';

// SAVE GAME --------------------------------------------------------------------
export const saveGame = async (gameData) => {
  console.log(
    'gameData ------------------------- service ------------------------------ axios'
  );
  console.log(gameData);
  try {
    const response = await axios.post(
      'https://gamble-rehab-server-f3e149347d25.herokuapp.com/api/games/saveGame',
      gameData,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin':
            'https://resonant-cranachan-6ad07d.netlify.app',
        },
      }
    );

    if (response.statusText === 'OK') {
      console.log(response.data);
      toast.success('Game Session Saved Successfully!');
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

// GET GAME DATA ---------------------------------------------------------------
export const getGameData = async (userEmail) => {
  console.log(
    'gameData ------------------------- service ------------------------------ axios'
  );
  console.log(userEmail);
  const response = await axios.post(
    'https://gamble-rehab-server-f3e149347d25.herokuapp.com/api/games/getGameData',
    userEmail,
    {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin':
          'https://resonant-cranachan-6ad07d.netlify.app',
      },
    }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};
