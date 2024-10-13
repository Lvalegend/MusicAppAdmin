import axios from 'axios';
import listUser from '../data/user.json'; // Import dữ liệu giả từ file JSON

export const apiLogin = async (args: { email: string; password: string }) => {
  const url = `${process.env.API_URL}/login`;

  const { data } = await axios.post(url, args);

  return data ?? {};
};

export const apiLoginFake = async (args: {
  email: string;
  password: string;
}) => {
  // Kiểm tra thông tin đăng nhập dựa trên dữ liệu giả lập trong `data.json`
  let userData;
  const { email, password } = args;
  for (let index = 0; index < listUser.length; index++) {
    const element = listUser[index];

    if (email === element.email && password === element.password) {
      userData = element;
      break;
    } else {
      userData = null;
    }
  }

  if (userData) {
    return {
      status: true,
      data: userData,
      message: 'Success'
    };
  } else {
    return {
      status: false,
      data: null,
      message: 'Failed!'
    };
  }
};
