import React, { useState } from 'react';
import CollectionsContainer from '../components/collectionsContainer/CollectionsContainer';
import { Typography, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import Center from '../components/center/Center';

const { Title } = Typography;
const options = [
  { label: 'All collections', value: '1' },
  { label: 'Favorite', value: '2' },
];

export default function Collections() {
  const [value, setValue] = useState('1');

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };

  return (
    <Center>
      <div>
        <Title level={2}>Collections</Title>
        <br />
        <Radio.Group options={options} onChange={onChange} value={value} optionType="button" />
        <br />
        <br />
        <br />
        <CollectionsContainer selectedOption={value}/>
      </div>
    </Center>
  );
}
