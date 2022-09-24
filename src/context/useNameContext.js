import { NameContext1, NameContext2, NameContext3, NameContext4 } from './';
import { Dummy, FamilyName, FirstName } from '../components';
import { useCallback } from 'react';

const contextMap = {
  context1: {
    Context: NameContext1,
    label: 'NameContext1 (re-render onChange)'
  },
  context2: {
    Context: NameContext2,
    label: 'NameContext2 (separate context)'
  },
  context3: {
    Context: NameContext3,
    label: 'NameContext3 (use memo)'
  },
  context4: {
    Context: NameContext4,
    label: 'NameContext4 (use reducer)'
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
      <Context.NameContextProvider>
        <FamilyName useContext={Context.useFamilyNameContext} />
        <FirstName useContext={Context.useFirstNameContext} />
        <Dummy />
      </Context.NameContextProvider>
    ),
    [Context]
  );
};
