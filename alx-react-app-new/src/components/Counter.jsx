import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: '2px solid #4caf50', borderRadius: '10px', padding: '20px', margin: '20px', textAlign: 'center', background: '#f9fff9' }}>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ margin: '0 8px', padding: '8px 16px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ margin: '0 8px', padding: '8px 16px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decrement</button>
      <button onClick={() => setCount(0)} style={{ margin: '0 8px', padding: '8px 16px', background: '#2196f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset</button>
    </div>
  );
} 