import axios from 'axios';

export const apiGetListCategory = async () => {
  const url = `${process.env.API_URL}/get/category-data`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });

  return data ?? {};
};
