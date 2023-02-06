import React, { useEffect, useState } from 'react';
import { Form, Layout, Row, Space, Typography, Button, Input, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseUrl } from '../constant';
const { Text } = Typography;

export default function Register() {
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
      await axios.post(`${baseUrl}/auth/register-user`, value);
      navigate('/auth/login');
    } catch (_) {
      setErrRes('Something went wrong!');
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
                  Register
                </Button>
                <Link to="/auth/login">or login!</Link>
              </Form.Item>
            </Form>
            {errorRes !== '' && <Text style={{ color: 'red' }}>{errorRes}</Text>}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
