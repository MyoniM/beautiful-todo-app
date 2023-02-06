import { Spin } from 'antd';

export default function Spinner() {
  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );
}
