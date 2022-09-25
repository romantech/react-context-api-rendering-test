import { useContext } from 'react';

// 컨텍스트 Provider 내부에서 사용하지 않으면 에러를 발생시키는 factory 함수
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
