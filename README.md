# React Context API 렌더링 최적화 과정 기록

![2022-09-25 22 11 32](https://user-images.githubusercontent.com/8604840/192145269-5fda479d-41bf-43e0-9156-96cca7e22307.gif)


### TL;DR

리액트에서 제공하는 ContextAPI를 사용하면 원하는 상태(값)를 전역적으로 사용할 수 있다. 컴포넌트끼리 특정 상태를 공유할 때도 유용하다. 하지만 `Context.Provider` 하위에서 컨텍스트를 구독하는 모든 컴포넌트는 값을 변경할 때마다 리렌더링 된다. `Context.Provider` 값이 업데이트되면 `useContext` 훅이 최신 컨텍스트 값을 사용해 컴포넌트 리렌더를 트리거하기 때문이다. 

이처럼 ContextAPI는 렌더링 최적화에 일일이 신경써야하는 단점이 있다. [여러 최적화 방법](https://github.com/facebook/react/issues/15156#issuecomment-474590693)중에서 상태/디스패치 단위로 컨텍스트를 쪼개는 방식이 가장 간단하다. 대신 Provider가 너무 많아지는 단점(Wrapper Hell)이 있다.

- context 상태가 변경될 때마다 해당 Context.Provider 안쪽에서 상태를 구독(소비)하는 모든 컴포넌트가 리렌더링 된다
- 상태(state)와 디스패치(dispatch) 함수를 동일한 Context에 넣으면, 디스패치 함수만 필요한 컴포넌트도 상태 업데이트시 리렌더링 된다 ⚡️
- 상태/디스패치 함수 전용 Context를 각각 만들면 불필요한 리렌더링을 방지할 수 있다
- 상태/디스패치 함수를 같은 Context에 넣어야 한다면 `useMemo`를 사용해서 리렌더링을 방지할 수 있다 ⚡️
- 이외에도 `React.memo`를 사용해서 컨텍스트 값을 prop으로 받는 컴포넌트를 만들거나, [use-context-selector](https://github.com/dai-shi/use-context-selector) 같은 라이브러리 등을 사용해서 불필요한 리렌더링을 방지할 수 있다

### 관련 링크
- [노션에서 전체 글 보기](https://www.notion.so/colorfilter/TIL-React-Context-API-ee62683c29fb40699efe424f13a6028e)
- [CodeSandbox](https://codesandbox.io/s/react-context-api-rendering-test-xhg6fp)
