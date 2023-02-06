import React, { useContext } from 'react';
import { Modal } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl, tokenStr } from '../../constant';
import { useParams } from 'react-router-dom';
import { SelectedTaskContext } from '../../context/selectedTaskContext';
import { deepCloneCollectionForDelete } from '../../utils';

interface IProps {
  taskModalState: string | null;
  setTaskModalState: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function DeleteTaskModal({ setTaskModalState, taskModalState }: IProps) {
  const queryClient = useQueryClient();
  const { collectionId } = useParams();
  const [selectedTask] = useContext(SelectedTaskContext)!;

  const mutation = useMutation({
    mutationFn: (task: any) => {
      return axios.delete(`${baseUrl}/tasks/deleteTask`, {
        data: {
          id: task.id,
        },
        headers: {
          Authorization: tokenStr(),
        },
      });
    },
    onMutate: async (deletedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', collectionId] });

      const previousTasks = queryClient.getQueryData(['tasks', collectionId]);

      queryClient.setQueryData(['tasks', collectionId], (old: any) => {
        if (!old) return old;
        console.log(deletedTask.id, deletedTask);
        return { ...old, tasks: deepCloneCollectionForDelete(old.tasks, deletedTask.id) };
      });

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['tasks', collectionId], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', collectionId] });
    },
  });

  const handleOk = () => {
    mutation.mutate(selectedTask);

    handleCancel();
  };

  const handleCancel = () => {
    setTaskModalState(null);
  };

  return (
    <>
      <Modal
        title="Do you want to delete this task?"
        destroyOnClose={true}
        open={taskModalState === '3'}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      ></Modal>
    </>
  );
}
