# 🗒 타입스크립트 + 리덕스 툴킷 공부용 todo-list

![image](https://velog.velcdn.com/images/jh100m1/post/886d070f-37d1-4cd7-a936-93d2ea804af4/image.gif)

### 주요 기능

- 남은 할 일 개수 조회
- 요일 조회
- 할 일 목록 조회
- 할 일 삭제
- 할 일 추가

# redux-toolkit
### 설치 방법

```tsx
//기존 프로그램에 추가할 때
npm i @reduxjs/toolkit
npm i react-redux

//cra 와 같이 시작할 때+typescript
npx create-react-app my-app --template redux-typescript
```

### 리덕스 툴킷이란?

리덕스 스토어를 구성하는 방법을 간소화 하고 보일러 플레이트 코드를 줄이기 위해 만들어졌다.  
[이 문서](https://redux-toolkit.js.org/introduction/getting-started)를 보고 공부했다.

### 사용법

### [configureStore()](https://redux-toolkit.js.org/api/configureStore)

- 슬라이스 리듀서들을 자동으로 결합하는 역할을 한다. 기본적으로 thunk 와 Redux DevTools Extension 이 포함되어있다. 기존 리덕스에서 createStore 의 역할.  
- configureStore 를 생성해주고 Provider 를 통해 store 를 할당해준다.

```tsx
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

//★★★★★★ 밑에서 자세히 볼 거
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
```

### [createSlice()](https://redux-toolkit.js.org/api/createSlice)

- createAction() 과 createReducer() 을 결합하여 더욱 간단하게 사용할 수 있는 API이다. 초기값, 리듀서 함수의 오브젝트, 이름을 받아 자동적으로 액션과 리듀서를 자동적으로 생성해줌.
- reducers 안에는 각각의 액션이 들어가야 한다.

```tsx
const initialState: TodosType = [초기값];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push({ id: ++nextId, content: action.payload, isDone: false });
    },
  },
});
```

### useSelector와 useDispatch 사용하기

#### `useSelector`

타입스크립트에서 리덕스 툴킷을 사용해주기 위해서는 useSelector 를 불러올 때도 타입지정을 해야 한다.

```tsx
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

```tsx
const todos = useSelector((state: RootState) => state.todos);
//state 에 RootState 를 넣어준다.
```

#### `useDispatch`

slice 는 액션 함수를 자동적으로 생성해준다. 함수 안에 들어간 파라미터는 payload 로 인식된다.

```tsx
dispatch(todoSlice.actions.toggle(id));
```

#### typed Hooks 만들기

RootState, AddDispatch 의 구성요소를 가져오는 방법을 사용해도 되지만 애플리케이션에서 사용할 useDispatch 및 useSelector 의 지정된(typed) version 을 만드는 것이 좋다.

- 왜?
    - `**useSelector**` 을 사용할 때 state:RootState 를 매번 작성해줄 필요가 없다.
    - `**useDispatch**` 에서 thunk 를 사용하려면 thunk 미들웨어 type 을 포함하는 커스텀된 AppDispatch 를 useDispatch 와 같이 사용해야한다. 미리 useDispatch Hooks 를 만들어주고 필요한 곳에서 Import 해서 써라? 이런 뉘앙스로 추정

```tsx
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

이렇게 만들어놓고 useDispatch, useSelector 대신 써라. 

- 변경한 내 코드
    
    ```tsx
    export type RootState = ReturnType<typeof store.getState>;
    export default store;
    export type AppDispath = typeof store.dispatch;
    ```
    ```tsx
    import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
    import { AppDispath, RootState } from "..";
    
    export const useAppDispatch: () => AppDispath = useDispatch;
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    ```
    위의 파일 추가
    ```tsx
    [useAppDispatch]
    
    import { useAppDispatch } from "../store/hooks";
    const dispatch = useAppDispatch();
    
    const handleClickDone = (id: number): void => {
      dispatch(todoSlice.actions.toggle(id));
    };//여긴 원래대로 사용해주면 됨
    
    [useAppSelector]
    //바뀐 코드
    const todos = useAppSelector((state) => state.todos);
    ```
    
    # typescript
    타입스크립트는 기본적으로 이벤트 핸들러 함수, useState에 제네릭으로 타입지정하기, 객체 interface 타입 지정하기 등 기본적인 문법은 알고 있었기에 리액트를 하며 필요한 부분들만 노션 정리하였다.  
    [타입스크립트 : 투두리스트 공부 노션 바로가기](https://www.notion.so/typescript-8e7cda7317024aec994eb5fec2537f20)
