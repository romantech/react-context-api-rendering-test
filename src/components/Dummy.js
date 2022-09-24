import React, { useRef } from 'react';

export default function Dummy() {
  // Provider 안에 있지만 컨텍스트 값을 구독하지 않아서 리렌더링되지 않음
  const count = useRef(0);
  count.current += 1;

  return (
    <div className="span-label">
      <span>Dummy Rendered</span>
      <strong className="counter">{`${count.current}`}</strong>
    </div>
  );
}
