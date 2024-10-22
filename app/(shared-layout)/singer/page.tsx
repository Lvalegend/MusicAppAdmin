'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography,
  Upload,
  message
} from 'antd';
import type { GetProp, UploadProps } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { SingerModel } from '@models/Singer';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { addSinger, getListSinger } from '@redux/features/singerSlice';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: listSinger, isCreated } = useAppSelector(
    (state) => state.singerState
  );
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [messageAntd, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!isCreated) return;
    else {
      setOpenModal(false);
      dispatch(getListSinger());
    }
  }, [isCreated]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleSubmit = async (values: any) => {
    dispatch(
      addSinger({
        name: values.name,
        dob: dayjs(values.dob).format('DD/MM/YYYY'),
        description: values.description,
        image: values.avatar?.file.originFileObj,
        liked: '0'
      })
    );
  };

  const columns: TableProps<SingerModel>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'singer_id',
      key: 'singer_id',
      align: 'center',
      width: '7%'
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'singer_avatar',
      key: 'singer_avatar',
      align: 'center',
      render: (value) => (
        <Image
          src={
            value
              ? process.env.API_URL + '/image/' + value
              : '/images/df_avatar.png'
          }
          alt="avatar"
          width={60}
          height={60}
          style={{ backgroundColor: 'white' }}
        />
      )
    },
    {
      title: 'Họ và tên',
      dataIndex: 'singer_name',
      key: 'singer_name',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      align: 'center',
      width: '12%',
      render: (value) => (
        <div className="text-start">{dayjs(value).format('DD/MM/YYYY')}</div>
      )
    },
    {
      title: 'Số lượt thích',
      dataIndex: 'total_favourite',
      key: 'total_favourite',
      align: 'center'
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
                console.log(record.singer_id);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="delete-btn"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => record.singer_id}
            />
          </Tooltip>
        </Space>
      )
    }
  ];
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      messageAntd.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageAntd.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageUrl(url);
      });
    }
  };
  return (
    <>
      {contextHolder}
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
              <Typography.Title level={3}>Danh sách ca sỹ</Typography.Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpenModal(true);
                  // router.push('account/create')
                }}
              >
                Thêm
              </Button>
            </div>
          )}
          rowKey={(value) => value.singer_id}
          columns={columns}
          dataSource={listSinger}
          pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
          scroll={{ y: 65 * 10 }}
        />

        {/* Modal add singer */}
        <Modal
          title="Thêm ca sỹ"
          open={openModal}
          onCancel={handleCancel}
          onOk={handleOk}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item name="name" label="Họ và tên" required>
              <Input placeholder="Họ và tên" required />
            </Form.Item>
            <Form.Item name="dob" label="Ngày sinh" required>
              <DatePicker
                placeholder="Ngày sinh"
                format={{ format: 'DD/MM/YYYY', type: 'mask' }}
              />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <Input placeholder="Mô tả" />
            </Form.Item>
            <Form.Item name="avatar" label="Ảnh đại diện">
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="avatar"
                    width={60}
                    height={60}
                    style={{ width: '100%' }}
                  />
                ) : (
                  <Button icon={<UploadOutlined />} type="text" />
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
}

export default Index;
