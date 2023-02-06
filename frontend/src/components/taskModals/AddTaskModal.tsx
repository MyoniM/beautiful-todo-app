import React, { useContext } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { ModalContext } from '../../context/modalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl, getMenuFromData, tokenStr } from '../../constant';
import { useParams } from 'react-router-dom';
import { useCollections } from '../collectionsContainer/CollectionsContainer';

export default function AddTaskModal() {
  const [isVisible, setIsVisible] = useContext(ModalContext)!;

  const { data } = useCollections();
  const menuItems = getMenuFromData(data);

  const queryClient = useQueryClient();
  const { collectionId } = useParams();

  const mutation = useMutation({
    mutationFn: (newTask: any) => {
      return axios.post(`${baseUrl}/tasks/createTask`, newTask, {
        headers: { Authorization: tokenStr() },
      });
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', collectionId] });

      const previousTasks = queryClient.getQueryData(['tasks', collectionId]);

      queryClient.setQueryData(['tasks', collectionId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          tasks: [...old.tasks, { ...newTodo.task, subTasks: [] }],
        };
      });

      return { previousTasks };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks', collectionId], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', collectionId] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const onFinish = (value: any) => {
    mutation.mutate({
      collectionId: value.collectionId,
      task: {
        title: value.title,
        date: value.date,
        completed: false,
      },
    });

    handleCancel();
  };

  return (
    <>
      <Modal destroyOnClose={true} open={isVisible} onOk={handleOk} onCancel={handleCancel} closable={false} footer={null}>
        <Form
          onFinish={onFinish}
          initialValues={{
            collectionId,
          }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="title" rules={[{ required: true,}]}>
            <Input size="large" />
          </Form.Item>
          <Space direction="horizontal">
            <Form.Item name="collectionId" rules={[{ required: true,}]}>
              <Select style={{ minWidth: 200 }} size="large">
                {React.Children.toArray(menuItems?.map((i: any) => <Select.Option value={i.id}>{i.name}</Select.Option>))}
              </Select>
            </Form.Item>

            <Form.Item name="date" rules={[{ required: true,}]}>
              <DatePicker size="large" showTime />
            </Form.Item>
          </Space>
          <br />
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form>
      </Modal>
    </>
  );
}
