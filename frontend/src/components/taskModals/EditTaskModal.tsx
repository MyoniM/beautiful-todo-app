import React, { useContext } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { SelectedTaskContext } from '../../context/selectedTaskContext';

interface IProps {
  taskModalState: string | null;
  setTaskModalState: React.Dispatch<React.SetStateAction<string | null>>;
  handleFinish: (value: any) => void;
}

export default function EditTaskModal({ handleFinish, setTaskModalState, taskModalState }: IProps) {
  const [selectedTask] = useContext(SelectedTaskContext)!;

  const handleOk = () => {
    handleCancel();
  };

  const handleCancel = () => {
    setTaskModalState(null);
  };

  const onFinish = (value: any) => {
    handleFinish({
      id: selectedTask!.id,
      date: selectedTask!.date,
      completed: selectedTask!.completed,
      title: value.title,
    });

    handleCancel();
  };

  return (
    <>
      <Modal destroyOnClose={true} open={taskModalState === '2'} onOk={handleOk} onCancel={handleCancel} closable={false} footer={null}>
        <Form
          initialValues={{
            title: selectedTask?.title,
          }}
          onFinish={onFinish}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="title" rules={[{ required: true,}]}>
            <Input size="large" />
          </Form.Item>

          <br />
          <Button type="primary" htmlType="submit">
            Edit task
          </Button>
        </Form>
      </Modal>
    </>
  );
}
