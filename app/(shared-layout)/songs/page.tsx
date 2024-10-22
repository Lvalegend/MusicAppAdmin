'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { SongModel } from '@models/Song';
import { useAppSelector } from '@redux/hooks';

function Index() {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.songState);

  const columns: TableProps<SongModel>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'song_id',
      key: 'song_id',
      align: 'center',
      width: '7%'
    },
    {
      title: 'Ảnh',
      dataIndex: 'song_image',
      key: 'song_image',
      align: 'center',
      render: (value, record) => (
        <Image
          src={
            value
              ? process.env.API_URL + '/image/' + value
              : '/images/df_music_note.png'
          }
          alt={record.song_name}
          width={60}
          height={60}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%'
          }}
        />
      )
    },
    {
      title: 'Tên bài hát',
      dataIndex: 'song_name',
      key: 'song_name',
      align: 'center',
      // width: '35%',
      render: (value) => <div className="text-start">{value}</div>
    },

    {
      title: 'Ngày ra mắt',
      dataIndex: 'release_date',
      key: 'release_date',
      align: 'center',
      width: '13%',
      render: (value) => (
        <div className="text-start">{dayjs(value).format('DD/MM/YYYY')}</div>
      )
    },
    {
      title: 'Tổng lượt nghe',
      dataIndex: 'total_view',
      key: 'total_view',
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
                console.log(record.song_id);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="delete-btn"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => record.song_id}
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
            <Typography.Title level={3}>Quản lý bài nhạc</Typography.Title>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => router.push('songs/create')}
            >
              Tải lên
            </Button>
          </div>
        )}
        rowKey={(value) => value.song_id}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        scroll={{ y: 65 * 10 }}
      />
    </ConfigProvider>
  );
}

export default Index;
