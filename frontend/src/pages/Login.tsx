import React, { useEffect, useState } from 'react';
import { Form, Layout, Row, Space, Typography, Button, Input, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { baseUrl } from '../constant';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorRes, setErrRes] = useState('');

  useEffect(() => {
    if (Cookies.get('login-info')) {
      navigate('/');
    }
  }, []);

  const onFinish = async (value: any) => {
    setIsLoading(true);
    setErrRes('');
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login-user`, value);
      Cookies.set('login-info', JSON.stringify(data));
      navigate('/');
    } catch (_) {
      setErrRes('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', backgroundColor: '#000000' }}>
      <Row align={'middle'} justify="center">
        <Col xs={{ span: 20, offset: 0 }} lg={{ span: 5, offset: 0 }} style={{ backgroundColor: '#141414', padding: '20px', width: 'minContent' }}>
          <Row justify={'center'} style={{ marginBottom: '10px' }}>
            <Space direction="vertical" align="center" size={'small'}>
              <img src="/logo.png" style={{ width: '50px' }} alt="logo"></img>
              <Text strong style={{ fontSize: '1.4em', color: 'white' }}>
                TODO
              </Text>
            </Space>
          </Row>
          <Row>
            <Form onFinish={onFinish} style={{ width: '100%' }}>
              <Form.Item name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit" block>
                  Log in
                </Button>
                <Link to="/auth/register">or register now!</Link>
              </Form.Item>
            </Form>
            {errorRes !== '' && <Text style={{ color: 'red' }}>{errorRes}</Text>}
          </Row>
        </Col>
      </Row>
      <Row />
    </Layout>
  );
}
