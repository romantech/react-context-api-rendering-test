import React, { useRef } from 'react';

const NameInput = ({ useContext, name }) => {
  const [state, setState] = useContext();
  const count = useRef(0);

  return (
    <div className="mb-10">
      <span className="span-label">
        <span>{`${name} Rendered`}</span>
        <strong className="counter">{`${++count.current}`}</strong>
      </span>
      <input
        name={name}
        type="text"
        value={state}
        onChange={({ target }) => setState(target.value)}
        placeholder="input value then check number of rendering times"
      />
    </div>
  );
};

export default NameInput;
