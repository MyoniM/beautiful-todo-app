import React, { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import classes from './addButton.module.css';
import { ModalContext } from '../../context/modalContext';
export default function AddButton() {
  const [, setIsVisible] = useContext(ModalContext)!;

  return (
    <div className={classes.btnWrapper} onClick={() => setIsVisible(true)}>
      <PlusOutlined className={classes.plusIcon} style={{ color: 'grey' }} />
    </div>
  );
}
