import React from 'react';
import { Progress, theme, Typography } from 'antd';

import { Link } from 'react-router-dom';

import classes from './collectionCard.module.css';
import { ICollection } from '../collectionsContainer/CollectionsContainer';

const { Title, Text } = Typography;

interface IProps {
  collection: ICollection;
}
export default function CollectionCard({ collection }: IProps) {
  const {
    token: { colorWhite },
  } = theme.useToken();

  const { id, favorite, icon, name, tasks, completedTasks } = collection;

  return (
    <Link to={`collections/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div className={classes.cardWrapper} style={{ backgroundColor: colorWhite }}>
        <img src={`${icon}.png`} height="80px" alt="Your SVG" />
        <div className={classes.bodyWrapper}>
          <div className={classes.dataWrapper}>
            <Title level={3}>{name}</Title>
            <Text>
              {completedTasks}/{tasks} done
            </Text>
          </div>
          <Progress type="circle" strokeWidth={12} percent={(completedTasks / tasks) * 100} format={() => ''} width={30} />
        </div>
      </div>
    </Link>
  );
}
