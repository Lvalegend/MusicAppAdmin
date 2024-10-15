'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, ConfigProvider, Form, Input, message, Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { authLogin } from '@redux/features/authSlice';

interface FormFields {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, loginCode, error } = useAppSelector(
    (state) => state.authState
  );

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (formValues: FormFields) => {
    dispatch(authLogin(formValues));
  };

  useEffect(() => {
    if (loading) return;
    else {
      if (loginCode === 2) {
        messageApi.success('Login successful!');
        router.push('/home');
      } else if (loginCode === 1) {
        messageApi.error("You don't have permission to access.");
      } else if (loginCode === 0) {
        messageApi.error('Your username or password is incorrect!');
      }
    }
  }, [loading, loginCode]);

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          {contextHolder}
          <Image
            src="/images/logo.png"
            alt="logo"
            width={256}
            height={256}
            style={{ marginBottom: 24 }}
          />
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 32
                }
              }
            }}
          >
            <Form
              form={form}
              layout="vertical"
              style={{ width: 500 }}
              // autoComplete="off" // off - không gọi ý lịch sữ nhập
              onFinish={(values) => handleLogin(values)}
            >
              <Form.Item
                name="email"
                label="Email"
                required
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Email is required'
                  },
                  {
                    type: 'email',
                    message: 'Invalid email'
                  }
                ]}
              >
                <Input type="email" size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                required
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
              <div className="">
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: '100%' }}
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      )}
    </>
  );
}

export default LoginPage;
