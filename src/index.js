import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line
import style from './style.css';
import { SelectBox } from './components';
import { options, useNameContext } from './context';

const [, secondOption] = options;

function App() {
  const [selectedCtx, setSelectedCtx] = useState(secondOption.value);
  const onChange = useCallback((value) => setSelectedCtx(value), []);
  const NameContextProvider = useNameContext(selectedCtx);

  return (
    <>
      <h1 className="title">Context API Rendering Test</h1>
      <div className="mb-7">
        <span className="span-label">Selected Context</span>
        <SelectBox
          options={options}
          onChange={onChange}
          deaultValue={selectedCtx}
        />
      </div>
      
      <NameContextProvider />
    </>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
