import { Typography } from 'antd';
import React, { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import AddIcon from '../addIcon/AddIcon';

import classes from './addButton.module.css';

const { Text } = Typography;

export default function TaskViewAddButton() {
  const [, setIsVisible] = useContext(ModalContext)!;

  return (
    <div className={classes.taskViewBtnWrapper} onClick={() => setIsVisible(true)}>
      <AddIcon />
      <Text>Add a task</Text>
    </div>
  );
}
