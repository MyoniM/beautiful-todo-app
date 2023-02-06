import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

const styles = {
  borderRadius: '10px',
  backgroundColor: '#E75480',
  height: '30px',
  width: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: `1px 1px 1px rgba(210,210,210,0.6)`
};

export default function AddIcon() {
  return (
    <div style={styles}>
      <PlusOutlined />
    </div>
  );
}
