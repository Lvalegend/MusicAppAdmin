import axios from 'axios';
import { getWithToken } from '@utils/index';

export const apiAllUser = async (args: { page: number; token: string }) => {
  const { page, token } = args;
  const url = `${process.env.API_URL}/get-all-user?page=${page}&limit=10`;

  const data = await getWithToken({ url, token });

  return data ?? {};
};
