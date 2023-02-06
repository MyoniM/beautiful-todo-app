import React, { useContext } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Switch, theme, Popconfirm, Typography } from 'antd';

import classes from './navbar.module.css';
import AddIcon from '../addIcon/AddIcon';
import { ModalContext } from '../../context/modalContext';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface IProps {
  clicked: boolean;
  handleClick: () => void;
}

export default function Navbar({ clicked, handleClick }: IProps) {
  const {
    token: { colorWhite },
  } = theme.useToken();

  const navigate = useNavigate();

  const [, setIsVisible] = useContext(ModalContext)!;

  const onChange = (checked: boolean) => {
    handleClick();
  };

  const onConfirm = () => {
    Cookies.remove('login-info');
    navigate('/auth/login');
  };

  return (
    <div className={classes.navbarWrapper} style={{ backgroundColor: colorWhite }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className={classes.logo}>
          <img src={`/logo.png`} width="20px" alt="Logo" />{' '}
          <Title style={{ margin: 0 }} level={3}>
            TODO
          </Title>
        </div>
      </Link>
      <div className={classes.menuWrapper}>
        <div style={{ cursor: 'pointer' }} onClick={() => setIsVisible(true)}>
          <AddIcon />
        </div>
        <Popconfirm placement="topLeft" title={'Are you sure you want to logout?'} onConfirm={onConfirm} okText="Yes" cancelText="No">
          <Avatar size={30} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Popconfirm>
        <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={clicked} onChange={onChange} />
      </div>
    </div>
  );
}
