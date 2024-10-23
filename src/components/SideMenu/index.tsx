'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Button, Menu, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  BarChartOutlined,
  CommentOutlined,
  CreditCardOutlined,
  CrownOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  TeamOutlined,
  TikTokOutlined,
  UserOutlined
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

import { useAppDispatch } from '@redux/hooks';
import { logout } from '@redux/features/authSlice';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/home', icon: <HomeOutlined />, label: 'Trang chủ' },
  {
    key: '/songs',
    icon: <TikTokOutlined />,
    label: 'Quản lý bài hát'
  },
  // {
  //   key: '/rank',
  //   icon: <CrownOutlined />,
  //   label: 'Bảng xếp hạng'
  // },
  {
    key: '/singer',
    icon: <UserOutlined />,
    label: 'Quản lý ca sỹ'
  },
  // {
  //   key: '/account',
  //   icon: <TeamOutlined />,
  //   label: 'Quản lý người dùng'
  // },
  // {
  //   key: '/report',
  //   icon: <BarChartOutlined />,
  //   label: 'Báo cáo'
  // },
  {
    key: '/comment',
    icon: <CommentOutlined />,
    label: 'Quản lý bình luận'
  },
  {
    key: '/account',
    icon: <TeamOutlined />,
    label: 'Quản lý tài khoản'
  },
  {
    key: '/payment',
    icon: <CreditCardOutlined />,
    label: 'Quản lý thanh toán'
  }
];

const SideMenu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <Sider
      width={250}
      trigger={null}
      collapsed={collapsed}
      style={{ backgroundColor: 'white' }}
    >
      {/* collapse menu btn */}
      <Button
        type="text"
        onClick={toggleCollapsed}
        style={{
          width: '100%',
          color: 'black',
          paddingLeft: collapsed ? 30 : 25,
          marginBottom: 16,
          justifyContent: 'start',
          backgroundColor: 'white'
        }}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />

      {/* menu */}
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        // inlineCollapsed={collapsed}
        onClick={onClick}
        items={items}
      />

      {/* logout btn */}
      <Tooltip placement="right" title="Logout">
        <div className="absolute bottom-5 w-full">
          <Button
            type="primary"
            size="large"
            icon={<PoweroffOutlined />}
            style={{ backgroundColor: 'darkred', width: '100%' }}
            onClick={() => {
              dispatch(logout());
              router.push('/');
            }}
          >
            {collapsed ? '' : 'Logout'}
          </Button>
        </div>
      </Tooltip>
    </Sider>
  );
};

export default SideMenu;
