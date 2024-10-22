import axios from 'axios';

export const apiGetListSinger = async () => {
  const url = `${process.env.API_URL}/get/singer-data`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });

  return data ?? {};
};

export const apiAddSinger = async (args: {
  name: string;
  dob: string;
  description: string;
  liked?: string;
  image?: File;
}) => {
  const { name, dob, description, liked, image } = args;
  const url = `${process.env.API_URL}/singer/upload`;

  const fmBody = new FormData();
  fmBody.append('singer_name', name);
  fmBody.append('date_of_birth', dob);
  fmBody.append('description', description);
  fmBody.append('total_favourite', liked ? liked : '0');
  image && fmBody.append('image', image);

  const { data } = await axios.post(url, fmBody, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};
