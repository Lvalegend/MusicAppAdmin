'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import SideMenu from '@components/SideMenu';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getUsers } from '@redux/features/accountSlice';
import { getDataFromLocalStorage, KEY_STORAGE } from '../local-storage/config';
import { setDataUser } from '@redux/features/authSlice';
import { getListSong } from '@redux/features/songSlice';
import { getListSinger } from '@redux/features/singerSlice';
import { getListTypeSongs } from '@redux/features/categorySlice';

function SharedLayout(props: PropsWithChildren) {
  const { children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const data = getDataFromLocalStorage(KEY_STORAGE.USER);
      if (data) {
        dispatch(setDataUser(data));
        dispatch(getUsers({ token: data?.token }));
        dispatch(getListSong());
        dispatch(getListSinger());
        dispatch(getListTypeSongs());
      }
    })();
  }, []);

  return (
    <Layout className="h-screen">
      <SideMenu />
      <Content className="p-9">{children}</Content>
    </Layout>
  );
}

export default SharedLayout;
