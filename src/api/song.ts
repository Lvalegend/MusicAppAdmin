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

export const apiUploadSong = async (args: {
  name: string;
  releaseDate: string;
  image: File;
  audio: File;
  totalView?: string;
}) => {
  const { name, releaseDate, image, audio, totalView } = args;
  const fmBody = new FormData();
  fmBody.append('song_name', name);
  fmBody.append('release_date', releaseDate);
  fmBody.append('image', image);
  fmBody.append('audio', audio);
  fmBody.append('total_view', totalView ? totalView : '0');

  const url = `${process.env.API_URL}/song/upload`;

  const { data } = await axios.post(url, fmBody, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });

  return data ?? {};
};
