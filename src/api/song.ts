import axios from 'axios';

export const apiGetListSong = async () => {
  const url = `${process.env.API_URL}/get/song-data/`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });

  return data ?? {};
};
