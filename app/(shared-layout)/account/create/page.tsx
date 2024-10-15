'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

type FormFields = {
  email: string;
  user_name: string;
  password: string;
};

function Index() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const cancel = () => {
    setLoading(false);
    form.resetFields();
  };

  const handleSubmit = async (values: FormFields) => {
    setLoading(true);
    console.log(values);
  };

  return (
    <div>
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
        <Typography.Title level={3}>Tạo tài khoản</Typography.Title>

        <Form.Item
          name="user_name"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: 'Tên đăng nhập không được để trống' }
          ]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email không được để trống' },
            { type: 'email', message: 'Email không đúng định dạng' }
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button type="primary" htmlType="submit" loading={loading}>
              Tạo mới
            </Button>
            <Button onClick={cancel}>Làm lại</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;
