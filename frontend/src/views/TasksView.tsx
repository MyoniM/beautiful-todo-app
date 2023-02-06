import React from 'react';

import { HeartFilled, HeartOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Spin, Typography } from 'antd';

import classes from './taskView.module.css';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl, tokenStr } from '../constant';
import Center from '../components/center/Center';
import TasksContainer from '../components/tasksContainer/TasksContainer';
import TaskViewAddButton from '../components/tasksContainer/TaskViewAddButton';
import Spinner from '../components/spin/Spinner';
const { Title, Text } = Typography;

function useTasks(collectionId: string) {
  return useQuery({
    queryKey: ['tasks', collectionId],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/collections/${collectionId}`, { headers: { Authorization: tokenStr() } });
      return data;
    },
  });
}

export default function TasksView() {
  const { collectionId } = useParams();
  const { status, data } = useTasks(collectionId!);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (favCollection: any) => {
      return axios.post(`${baseUrl}/collections/favorite`, favCollection, { headers: { Authorization: tokenStr() } });
    },

    onMutate: async (favCollection) => {
      await queryClient.cancelQueries({ queryKey: ['collections'] });

      const previousCollections = queryClient.getQueryData(['collections']);
      const previousTasks = queryClient.getQueryData(['tasks', collectionId]);

      queryClient.setQueryData(['collections'], (old: any) => {
        if (!old) return old;
        old.forEach((c: any) => {
          if (c.id === favCollection.collectionId) {
            c.favorite = !c.favorite;
          }
        });

        return old;
      });

      queryClient.setQueryData(['tasks', collectionId], (old: any) => {
        if (!old) return old;
        return { ...old, favorite: !old.favorite };
      });

      return { previousCollections, previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['collections'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', collectionId] });
    },
  });

  return (
    <Center>
      <div>
        <br />
        {status === 'loading' ? (
          <Spinner />
        ) : status === 'error' ? (
          <Text>Error: Something went wrong</Text>
        ) : (
          <>
            <div className={classes.headerWrapper}>
              <Link to="/">
                <Button type="primary" icon={<LeftOutlined />} />
              </Link>
              <Title style={{ margin: 0, display: 'flex' }} level={3}>
                {data.name}
                <Button
                  style={{ marginLeft: '10px', color: 'pink', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  type="text"
                  icon={data.favorite ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => mutation.mutate({ collectionId, favorite: !data.favorite })}
                />
              </Title>
            </div>
            <br />
            <TaskViewAddButton />
            <TasksContainer tasks={data.tasks} />
          </>
        )}
        <br />
      </div>
    </Center>
  );
}
