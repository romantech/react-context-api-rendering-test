import React, { useState, createContext, useMemo } from 'react';
import { factoryUseContext } from './factoryUseContext';

// useMemo를 사용해서 리렌더링을 방지하는 방법
const FamilyNameContext = createContext(null);
const FirstNameContext = createContext(null);

const useFamilyNameCtx = factoryUseContext(FamilyNameContext);
const useFirstNameCtx = factoryUseContext(FirstNameContext);

const Provider = ({ children }) => {
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');

  const familyNameValue = useMemo(() => [familyName, setFamilyName], [
    familyName
  ]);
  const firstNameValue = useMemo(() => [firstName, setFirstName], [firstName]);

  return (
    <FamilyNameContext.Provider value={familyNameValue}>
      <FirstNameContext.Provider value={firstNameValue}>
        {children}
      </FirstNameContext.Provider>
    </FamilyNameContext.Provider>
  );
};

export { useFamilyNameCtx, useFirstNameCtx, Provider };
