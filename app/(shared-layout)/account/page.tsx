'use client';

import Image from 'next/image';
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@redux/hooks';
import { useRouter } from 'next/navigation';

function Index() {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.accoutState.listAccount);

  const columns: TableProps<UserModel>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
      width: '7%'
    },
    {
      title: 'Avatar',
      dataIndex: 'user_avatar',
      key: 'user_avatar',
      align: 'center',
      width: '10%',
      render: (value) => (
        <Image
          src={process.env.API_URL + '/image/' + value}
          alt="avatar"
          width={60}
          height={60}
        />
      )
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
      align: 'center',
      width: '17%',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Quyền hạn',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      width: '15%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      align: 'center',
      width: '15%'
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: '15%',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              className="edit-btn"
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                console.log(record.user_id);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="delete-btn"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => record.user_id}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemBg: 'transparent'
          }
        }
      }}
    >
      <Table
        title={() => (
          <div className="flex items-center justify-between">
            <Typography.Title level={3}>Quản lý tài khoản</Typography.Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('account/create')}
            >
              Thêm
            </Button>
          </div>
        )}
        rowKey={(value) => value.user_id}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        scroll={{ y: 65 * 10 }}
      />
    </ConfigProvider>
  );
}

export default Index;
