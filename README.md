# ๐ ํ์์คํฌ๋ฆฝํธ + ๋ฆฌ๋์ค ํดํท ๊ณต๋ถ์ฉ todo-list

![image](https://velog.velcdn.com/images/jh100m1/post/886d070f-37d1-4cd7-a936-93d2ea804af4/image.gif)

### ์ฃผ์ ๊ธฐ๋ฅ

- ๋จ์ ํ  ์ผ ๊ฐ์ ์กฐํ
- ์์ผ ์กฐํ
- ํ  ์ผ ๋ชฉ๋ก ์กฐํ
- ํ  ์ผ ์ญ์ 
- ํ  ์ผ ์ถ๊ฐ

# redux-toolkit
### ์ค์น ๋ฐฉ๋ฒ

```tsx
//๊ธฐ์กด ํ๋ก๊ทธ๋จ์ ์ถ๊ฐํ  ๋
npm i @reduxjs/toolkit
npm i react-redux

//cra ์ ๊ฐ์ด ์์ํ  ๋+typescript
npx create-react-app my-app --template redux-typescript
```

### ๋ฆฌ๋์ค ํดํท์ด๋?

๋ฆฌ๋์ค ์คํ ์ด๋ฅผ ๊ตฌ์ฑํ๋ ๋ฐฉ๋ฒ์ ๊ฐ์ํ ํ๊ณ  ๋ณด์ผ๋ฌ ํ๋ ์ดํธ ์ฝ๋๋ฅผ ์ค์ด๊ธฐ ์ํด ๋ง๋ค์ด์ก๋ค.  
[์ด ๋ฌธ์](https://redux-toolkit.js.org/introduction/getting-started)๋ฅผ ๋ณด๊ณ  ๊ณต๋ถํ๋ค.

### ์ฌ์ฉ๋ฒ

### [configureStore()](https://redux-toolkit.js.org/api/configureStore)

- ์ฌ๋ผ์ด์ค ๋ฆฌ๋์๋ค์ ์๋์ผ๋ก ๊ฒฐํฉํ๋ ์ญํ ์ ํ๋ค. ๊ธฐ๋ณธ์ ์ผ๋ก thunk ์ Redux DevTools Extension ์ด ํฌํจ๋์ด์๋ค. ๊ธฐ์กด ๋ฆฌ๋์ค์์ createStore ์ ์ญํ .  
- configureStore ๋ฅผ ์์ฑํด์ฃผ๊ณ  Provider ๋ฅผ ํตํด store ๋ฅผ ํ ๋นํด์ค๋ค.

```tsx
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

//โโโโโโ ๋ฐ์์ ์์ธํ ๋ณผ ๊ฑฐ
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

- createAction() ๊ณผ createReducer() ์ ๊ฒฐํฉํ์ฌ ๋์ฑ ๊ฐ๋จํ๊ฒ ์ฌ์ฉํ  ์ ์๋ API์ด๋ค. ์ด๊ธฐ๊ฐ, ๋ฆฌ๋์ ํจ์์ ์ค๋ธ์ ํธ, ์ด๋ฆ์ ๋ฐ์ ์๋์ ์ผ๋ก ์ก์๊ณผ ๋ฆฌ๋์๋ฅผ ์๋์ ์ผ๋ก ์์ฑํด์ค.
- reducers ์์๋ ๊ฐ๊ฐ์ ์ก์์ด ๋ค์ด๊ฐ์ผ ํ๋ค.

```tsx
const initialState: TodosType = [์ด๊ธฐ๊ฐ];

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

### useSelector์ useDispatch ์ฌ์ฉํ๊ธฐ

#### `useSelector`

ํ์์คํฌ๋ฆฝํธ์์ ๋ฆฌ๋์ค ํดํท์ ์ฌ์ฉํด์ฃผ๊ธฐ ์ํด์๋ useSelector ๋ฅผ ๋ถ๋ฌ์ฌ ๋๋ ํ์์ง์ ์ ํด์ผ ํ๋ค.

```tsx
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

```tsx
const todos = useSelector((state: RootState) => state.todos);
//state ์ RootState ๋ฅผ ๋ฃ์ด์ค๋ค.
```

#### `useDispatch`

slice ๋ ์ก์ ํจ์๋ฅผ ์๋์ ์ผ๋ก ์์ฑํด์ค๋ค. ํจ์ ์์ ๋ค์ด๊ฐ ํ๋ผ๋ฏธํฐ๋ payload ๋ก ์ธ์๋๋ค.

```tsx
dispatch(todoSlice.actions.toggle(id));
```

#### typed Hooks ๋ง๋ค๊ธฐ

RootState, AddDispatch ์ ๊ตฌ์ฑ์์๋ฅผ ๊ฐ์ ธ์ค๋ ๋ฐฉ๋ฒ์ ์ฌ์ฉํด๋ ๋์ง๋ง ์ ํ๋ฆฌ์ผ์ด์์์ ์ฌ์ฉํ  useDispatch ๋ฐ useSelector ์ ์ง์ ๋(typed) version ์ ๋ง๋๋ ๊ฒ์ด ์ข๋ค.

- ์?
    - `**useSelector**` ์ ์ฌ์ฉํ  ๋ state:RootState ๋ฅผ ๋งค๋ฒ ์์ฑํด์ค ํ์๊ฐ ์๋ค.
    - `**useDispatch**` ์์ thunk ๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด thunk ๋ฏธ๋ค์จ์ด type ์ ํฌํจํ๋ ์ปค์คํ๋ AppDispatch ๋ฅผ useDispatch ์ ๊ฐ์ด ์ฌ์ฉํด์ผํ๋ค. ๋ฏธ๋ฆฌ useDispatch Hooks ๋ฅผ ๋ง๋ค์ด์ฃผ๊ณ  ํ์ํ ๊ณณ์์ Import ํด์ ์จ๋ผ? ์ด๋ฐ ๋์์ค๋ก ์ถ์ 

```tsx
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

์ด๋ ๊ฒ ๋ง๋ค์ด๋๊ณ  useDispatch, useSelector ๋์  ์จ๋ผ. 

- ๋ณ๊ฒฝํ ๋ด ์ฝ๋
    
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
    ์์ ํ์ผ ์ถ๊ฐ
    ```tsx
    [useAppDispatch]
    
    import { useAppDispatch } from "../store/hooks";
    const dispatch = useAppDispatch();
    
    const handleClickDone = (id: number): void => {
      dispatch(todoSlice.actions.toggle(id));
    };//์ฌ๊ธด ์๋๋๋ก ์ฌ์ฉํด์ฃผ๋ฉด ๋จ
    
    [useAppSelector]
    //๋ฐ๋ ์ฝ๋
    const todos = useAppSelector((state) => state.todos);
    ```
    
    # typescript
    ํ์์คํฌ๋ฆฝํธ๋ ๊ธฐ๋ณธ์ ์ผ๋ก ์ด๋ฒคํธ ํธ๋ค๋ฌ ํจ์, useState์ ์ ๋ค๋ฆญ์ผ๋ก ํ์์ง์ ํ๊ธฐ, ๊ฐ์ฒด interface ํ์ ์ง์ ํ๊ธฐ ๋ฑ ๊ธฐ๋ณธ์ ์ธ ๋ฌธ๋ฒ์ ์๊ณ  ์์๊ธฐ์ ๋ฆฌ์กํธ๋ฅผ ํ๋ฉฐ ํ์ํ ๋ถ๋ถ๋ค๋ง ๋ธ์ ์ ๋ฆฌํ์๋ค.  
    [ํ์์คํฌ๋ฆฝํธ : ํฌ๋๋ฆฌ์คํธ ๊ณต๋ถ ๋ธ์ ๋ฐ๋ก๊ฐ๊ธฐ](https://www.notion.so/typescript-8e7cda7317024aec994eb5fec2537f20)
