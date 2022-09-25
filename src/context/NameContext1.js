import React, { useState, createContext } from 'react';
import { factoryUseContext } from './factoryUseContext';

// 일반적인 컨텍스트 사용. firstName, familyName 컨텍스트를 분리했지만
// familyName 혹은 firstName 상태를 변경하는 dispatch 함수가 실행될 때마다
// 각 상태를 구독하고 있는 <FamilyName />, <FirstName /> 컴포넌트는 모두 리렌더링 된다
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
