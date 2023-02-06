import { useQuery } from '@tanstack/react-query';
import { Spin, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import { baseUrl, tokenStr } from '../../constant';
import AddButton from '../addButton/AddButton';
import CollectionCard from '../collectionCard/CollectionCard';
import Spinner from '../spin/Spinner';
import classes from './collectionsContainer.module.css';

const { Text } = Typography;

export interface ICollection {
  id: string;
  favorite: boolean;
  icon: string;
  name: string;
  tasks: number;
  completedTasks: number;
}

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/collections`, { headers: { Authorization: tokenStr() } });
      return data;
    },
  });
}

export default function CollectionsContainer({ selectedOption }: { selectedOption: string }) {
  const { status, data } = useCollections();

  return (
    <div className={classes.wrapper}>
      {status === 'loading' ? (
        <Spinner />
      ) : status === 'error' ? (
        <Text>Error: Something went wrong</Text>
      ) : (
        <>
          {React.Children.toArray(
            data?.map((c: ICollection) =>
              selectedOption === '1' ? <CollectionCard collection={c} /> : c.favorite && <CollectionCard collection={c} />
            )
          )}
          <AddButton />
        </>
      )}
    </div>
  );
}
