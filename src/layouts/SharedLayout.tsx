import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import SideMenu from '@components/SideMenu';

function SharedLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <Layout className="h-screen">
      <SideMenu />
      <Content>{children}</Content>
    </Layout>
  );
}

export default SharedLayout;
