import React, { createContext, useReducer, useCallback } from 'react';
import { factoryUseContext } from './factoryUseContext';

// useReducer 사용, state/dispatch 컨텍스트 분리해서 리렌더링 방지
const FamilyNameStateContext = createContext(null);
const FamilyNameDispatchContext = createContext(null);
const FirstNameStateContext = createContext(null);
const FirstNameDispatchContext = createContext(null);

const SET_FAMILY_NAME = 'SET_FAMILY_NAME';
const SET_FIRST_NAME = 'SET_FIRST_NAME';
const familyNameAction = (payload) => ({ type: SET_FAMILY_NAME, payload });
const firstNameAction = (payload) => ({ type: SET_FIRST_NAME, payload });

const nameContextReducer = (state, action) => {
  switch (action.type) {
    case SET_FAMILY_NAME:
      return { ...state, familyName: action.payload };
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const useFamilyNameCtx = () => [
  factoryUseContext(FamilyNameStateContext)(),
  factoryUseContext(FamilyNameDispatchContext)()
];

const useFirstNameCtx = () => [
  factoryUseContext(FirstNameStateContext)(),
  factoryUseContext(FirstNameDispatchContext)()
];

const initialState = { familyName: '', firstName: '' };

const Provider = ({ children }) => {
  const [{ familyName, firstName }, dispatch] = useReducer(
    nameContextReducer,
    initialState
  );

  // 1개 reducer를 사용할 때 useCallback으로 dispatch를 감싸줘야 리렌더링을 방지할 수 있다
  // State, Dispatch 컨텍스트를 분리하지 않으면 불필요한 리렌더링이 발생한다
  const setFamilyName = useCallback((v) => dispatch(familyNameAction(v)), []);
  const setFirstName = useCallback((v) => dispatch(firstNameAction(v)), []);

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

export { useFamilyNameCtx, useFirstNameCtx, Provider };
