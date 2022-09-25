import React, { useState, createContext } from 'react';
import { factoryUseContext } from './factoryUseContext';

// 일반적인 컨텍스트 사용. familyName 혹은 firstName 상태가 변경되면
// Provider 내부에서 familyName, firstName 컨텍스트 값을 구독하는
// <FamilyName />, <FirstName /> 컴포넌트가 모두 리렌더링됨
const FamilyNameContext = createContext(null);
const FirstNameContext = createContext(null);

const useFamilyNameCtx = factoryUseContext(FamilyNameContext);
const useFirstNameCtx = factoryUseContext(FirstNameContext);

const Provider = ({ children }) => {
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <FamilyNameContext.Provider value={[familyName, setFamilyName]}>
      <FirstNameContext.Provider value={[firstName, setFirstName]}>
        {children}
      </FirstNameContext.Provider>
    </FamilyNameContext.Provider>
  );
};

export { useFamilyNameCtx, useFirstNameCtx, Provider };
