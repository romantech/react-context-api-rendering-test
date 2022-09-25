import React, { createContext, useReducer, useMemo } from 'react';
import { factoryUseContext } from './factoryUseContext';

// useReducer 사용, state 컨텍스트만 만들고 useMemo로 리렌더링 방지
const FamilyNameContext = createContext(null);
const FirstNameContext = createContext(null);

const useFamilyNameCtx = factoryUseContext(FamilyNameContext);
const useFirstNameCtx = factoryUseContext(FirstNameContext);

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

const initialState = { familyName: '', firstName: '' };

const Provider = ({ children }) => {
  const [{ familyName, firstName }, dispatch] = useReducer(
    nameContextReducer,
    initialState
  );

  const familyNameValue = useMemo(
    () => [familyName, (v) => dispatch(familyNameAction(v))],
    [familyName]
  );
  const firstNameValue = useMemo(
    () => [firstName, (v) => dispatch(firstNameAction(v))],
    [firstName]
  );

  return (
    <FamilyNameContext.Provider value={familyNameValue}>
      <FirstNameContext.Provider value={firstNameValue}>
        {children}
      </FirstNameContext.Provider>
    </FamilyNameContext.Provider>
  );
};

export { useFamilyNameCtx, useFirstNameCtx, Provider };
