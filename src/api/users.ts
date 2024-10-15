import axios from 'axios';
import { getWithToken } from '@utils/index';

export const apiAllUser = async (args: { token: string }) => {
  const { token } = args;
  const url = `${process.env.API_URL}/get-all-user`;

  const data = await getWithToken({ url, token });

  return data ?? {};
};
