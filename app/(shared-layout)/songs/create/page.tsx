'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { GetProp, RadioChangeEvent, UploadProps } from 'antd';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Typography,
  Upload
} from 'antd';
import { LeftOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { addSong } from '@redux/features/songSlice';

type FormFields = {
  song_name: string;
  release_date: string;
  singerIds: number[];
  categoryIds: number[];
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function Index() {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isCreated } = useAppSelector((state) => state.songState);
  const { data: listSinger } = useAppSelector((state) => state.singerState);
  const { data: listCategory } = useAppSelector((state) => state.categoryState);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [messageAntd, contextHolder] = message.useMessage();
  const [numSinger, setNumsinger] = useState('one');
  const [typeCategory, setTypeCategory] = useState('group');

  const cancel = () => {
    setLoading(false);
    form.resetFields();
  };

  useEffect(() => {
    if (!isCreated) return;
    else {
      setLoading(false);
      router.back();
    }
  }, [isCreated]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    dispatch(
      addSong({
        name: values.song_name,
        releaseDate: dayjs(values.release_date).format('DD/MM/YYYY'),
        image: values.image?.file.originFileObj,
        audio: values.audio.file.originFileObj
      })
    );
  };

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

  const beforeUploadAudio = (file: FileType) => {
    const isAudio = file.type === 'audio/mpeg' || file.type === 'audio/wav';
    if (!isAudio) {
      messageAntd.error('You can only upload MP3/WAV file!');
    }

    return isAudio;
  };

  const handleChangeImage: UploadProps['onChange'] = (info) => {
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

  const onChangeRadioSinger = (e: RadioChangeEvent) => {
    setNumsinger(e.target.value);
  };

  const onChangeRadioCategory = (e: RadioChangeEvent) => {
    setTypeCategory(e.target.value);
  };

  return (
    <div>
      {contextHolder}
      <Button
        type="link"
        icon={<LeftOutlined />}
        style={{ color: 'black', fontSize: 16, paddingLeft: 0 }}
        onClick={() => router.back()}
      >
        Quay lại
      </Button>

      <Form
        form={form}
        autoComplete="off"
        autoCorrect="off"
        layout="vertical"
        style={{
          padding: 20,
          marginTop: 20,
          borderRadius: 12,
          backgroundColor: 'white'
        }}
        onFinish={(values) => handleSubmit(values)}
      >
        <Typography.Title level={3}>Tải bài hát lên</Typography.Title>

        <Form.Item
          name="song_name"
          label="Tên bài hát"
          rules={[
            { required: true, message: 'Tên bài hát không được để trống' }
          ]}
        >
          <Input placeholder="Tên bài hát" />
        </Form.Item>
        <Form.Item name="release_date" label="Ngày ra mắt">
          <DatePicker
            placeholder="Ngày ra mắt"
            format={{ format: 'DD/MM/YYYY', type: 'mask' }}
          />
        </Form.Item>
        <Form.Item name="image" label="Ảnh bài hát">
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeImage}
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
              <Button icon={<PlusOutlined />} type="text" />
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="audio"
          label="File nhạc"
          rules={[
            { required: true, message: 'Bạn phải chọn file nhạc để tải lên' }
          ]}
        >
          <Upload beforeUpload={beforeUploadAudio}>
            <Button type="default" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Form.Item>

        <div>
          <div className="pb-2">Ca sỹ thể hiện</div>
          <Radio.Group
            style={{ paddingBottom: 8 }}
            value={numSinger}
            onChange={onChangeRadioSinger}
          >
            <Radio value="one">Một người</Radio>
            <Radio value="group">Nhiều người</Radio>
          </Radio.Group>
          <Form.Item name="singerIds">
            <Select
              mode={numSinger === 'group' ? 'multiple' : undefined}
              options={listSinger.map((singer) => {
                return {
                  value: singer.singer_id,
                  label: singer.singer_name
                };
              })}
            />
          </Form.Item>
        </div>

        <div>
          <div className="pb-2">Thể loại</div>
          <Radio.Group
            style={{ paddingBottom: 8 }}
            value={typeCategory}
            onChange={onChangeRadioCategory}
          >
            <Radio value="one">Một</Radio>
            <Radio value="group">Nhiều</Radio>
          </Radio.Group>
          <Form.Item name="categoryIds">
            <Select
              mode={typeCategory === 'group' ? 'multiple' : undefined}
              options={listCategory.map((type) => {
                return {
                  value: type.category_id,
                  label: type.category_name
                };
              })}
            />
          </Form.Item>
        </div>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button type="primary" htmlType="submit" loading={loading}>
              Tải lên
            </Button>
            <Button onClick={cancel}>Làm lại</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;
