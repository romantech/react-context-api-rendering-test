import React, { useState, createContext } from 'react';
import { factoryUseContext } from './factoryUseContext';

// state, dispatch 컨텍스트를 분리해서 리렌더링을 방지하는 방법
const FamilyNameStateContext = createContext(null);
const FamilyNameDispatchContext = createContext(null);
const FirstNameStateContext = createContext(null);
const FirstNameDispatchContext = createContext(null);

const useFamilyNameContext = () => [
  factoryUseContext(FamilyNameStateContext)(),
  factoryUseContext(FamilyNameDispatchContext)()
];

const useFirstNameContext = () => [
  factoryUseContext(FirstNameStateContext)(),
  factoryUseContext(FirstNameDispatchContext)()
];

const NameContextProvider = ({ children }) => {
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <FamilyNameStateContext.Provider value={familyName}>
      <FamilyNameDispatchContext.Provider value={setFamilyName}>
        <FirstNameStateContext.Provider value={firstName}>
          <FirstNameDispatchContext.Provider value={setFirstName}>
            {children}
          </FirstNameDispatchContext.Provider>
        </FirstNameStateContext.Provider>
      </FamilyNameDispatchContext.Provider>
    </FamilyNameStateContext.Provider>
  );
};

export { useFamilyNameContext, useFirstNameContext, NameContextProvider };
