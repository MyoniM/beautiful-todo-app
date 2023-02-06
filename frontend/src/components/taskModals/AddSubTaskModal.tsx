import React, { useContext } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SelectedTaskContext } from '../../context/selectedTaskContext';
import { baseUrl, tokenStr } from '../../constant';
import { deepCloneCollectionForCreate } from '../../utils';

interface IProps {
  taskModalState: string | null;
  setTaskModalState: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AddSubTaskModal({ setTaskModalState, taskModalState }: IProps) {
  const queryClient = useQueryClient();
  const { collectionId } = useParams();
  const [selectedTask] = useContext(SelectedTaskContext)!;

  const mutation = useMutation({
    mutationFn: (newTask: any) => {
      return axios.post(`${baseUrl}/tasks/createSubTask`, newTask, { headers: { Authorization: tokenStr() } });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', collectionId] });

      const previousTasks = queryClient.getQueryData(['tasks', collectionId]);

      queryClient.setQueryData(['tasks', collectionId], (old: any) => {
        if (!old) return old;
        return { ...old, tasks: deepCloneCollectionForCreate(old.tasks, newTask.parentTaskId, { ...newTask.task, subTask: [] }) };
      });

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['tasks', collectionId], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', collectionId] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  const handleOk = () => {
    handleCancel();
  };

  const handleCancel = () => {
    setTaskModalState(null);
  };

  const onFinish = (value: any) => {
    mutation.mutate({
      parentTaskId: selectedTask!.id,
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
      <Modal destroyOnClose={true} open={taskModalState === '1'} onOk={handleOk} onCancel={handleCancel} closable={false} footer={null}>
        <Form onFinish={onFinish} wrapperCol={{ span: 24 }} layout="horizontal" style={{ maxWidth: 600 }}>
          <Form.Item name="title" rules={[{ required: true,}]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item name="date" rules={[{ required: true,}]}>
            <DatePicker size="large" showTime />
          </Form.Item>
          <br />
          <Button type="primary" htmlType="submit">
            Add Sub task
          </Button>
        </Form>
      </Modal>
    </>
  );
}
