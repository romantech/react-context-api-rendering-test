import React, { createContext, useReducer, useCallback } from 'react';
import { factoryUseContext } from './factoryUseContext';

// useReducer를 사용한 컨텍스트
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
      return state;
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
