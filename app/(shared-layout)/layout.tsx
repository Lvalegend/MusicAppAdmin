import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import SharedLayout from '@/src/layouts/SharedLayout';

export const metadata: Metadata = {
  title: 'Admin'
};

function Index(props: PropsWithChildren) {
  const { children } = props;
  return <SharedLayout>{children}</SharedLayout>;
}

export default Index;
