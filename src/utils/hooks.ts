import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@redux/hooks';
import { setDataUser } from '@redux/features/authSlice';
import { getDataFromLocalStorage, KEY_STORAGE } from '../local-storage/config';

export const usePageAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = getDataFromLocalStorage(KEY_STORAGE.USER);
    if (data?.role === 'admin') {
      dispatch(setDataUser(data));
      router.push('/home');
    } else {
      router.push('/');
    }
  }, [router]);
};
