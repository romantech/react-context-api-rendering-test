import React, { createContext, useReducer, useCallback } from 'react';
import { factoryUseContext } from './factoryUseContext';

// useReducer를 사용한 컨텍스트
const FamilyNameStateContext = createContext(null);
const FamilyNameDispatchContext = createContext(null);
const FirstNameStateContext = createContext(null);
const FirstNameDispatchContext = createContext(null);

const nameContextReducer = (state, action) => {
  switch (action.type) {
    case 'setFamilyName':
      return { ...state, familyName: action.payload };
    case 'setFirstName':
      return { ...state, firstName: action.payload };
    default:
      return state;
  }
};

const useFamilyNameContext = () => [
  factoryUseContext(FamilyNameStateContext)(),
  factoryUseContext(FamilyNameDispatchContext)()
];

const useFirstNameContext = () => [
  factoryUseContext(FirstNameStateContext)(),
  factoryUseContext(FirstNameDispatchContext)()
];

const initialState = { familyName: '', firstName: '' };

const NameContextProvider = ({ children }) => {
  const [{ familyName, firstName }, dispatch] = useReducer(
    nameContextReducer,
    initialState
  );

  // 1개 reducer를 사용할 때 useCallback으로 dispatch를 감싸줘야 리렌더링을 방지할 수 있다
  const setFamilyName = useCallback(
    (payload) => dispatch({ type: 'setFamilyName', payload }),
    []
  );

  const setFirstName = useCallback(
    (payload) => dispatch({ type: 'setFirstName', payload }),
    []
  );

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
