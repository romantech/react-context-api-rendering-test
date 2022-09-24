import { useContext } from 'react';

// 컨텍스트 내부에서만 사용하도록 강제
export const factoryUseContext = (context, name = '') => () => {
  const ctx = useContext(context);

  switch (ctx) {
    case undefined:
    case null:
      const ctxName = name === '' ? '' : `${name} `;
      const msg = `${ctxName}Context must be used withing a ${ctxName}ContextProvider`;
      throw new Error(msg);
    default:
      return ctx;
  }
};
