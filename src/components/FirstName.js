import React, { useRef } from 'react';

const FirstName = ({ useContext }) => {
  const [state, setState] = useContext();
  const count = useRef(0);

  count.current += 1;

  return (
    <div className="mb-10">
      <span className="span-label">
        <span>FirstName Rendered</span>
        <strong className="counter">{`${count.current}`}</strong>
      </span>
      <input
        type="text"
        value={state}
        onChange={({ target }) => setState(target.value)}
        placeholder="check number of rendering times"
      />
    </div>
  );
};

export default FirstName;
