import {
  NameContext1,
  NameContext2,
  NameContext3,
  NameContext4,
  NameContext5
} from './';
import { Dummy, NameInput } from '../components';
import { useCallback } from 'react';

const contextMap = {
  context1: {
    Context: NameContext1,
    label: 'CONTEXT_1 (only state ctx)'
  },
  context2: {
    Context: NameContext2,
    label: 'CONTEXT_2 (state/dispatch ctx)'
  },
  context3: {
    Context: NameContext3,
    label: 'CONTEXT_3 (only state ctx with memo)'
  },
  context4: {
    Context: NameContext4,
    label: 'CONTEXT_4 (state/dispatch ctx with reducer)'
  },
  context5: {
    Context: NameContext5,
    label: 'CONTEXT_5 (only state ctx with reducer/memo)'
  }
};

export const options = Object.entries(contextMap).map(([k, v]) => ({
  value: k,
  label: v.label
}));

export const useNameContext = (selected) => {
  const { Context } = contextMap[selected];
  return useCallback(
    () => (
      <Context.Provider>
        <NameInput useContext={Context.useFamilyNameCtx} name="FamilyName" />
        <NameInput useContext={Context.useFirstNameCtx} name="FirstName" />
        <Dummy />
      </Context.Provider>
    ),
    [Context]
  );
};
