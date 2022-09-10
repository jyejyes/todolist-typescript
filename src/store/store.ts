import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodoType {
  id: number;
  content: string;
  isDone: boolean;
}

type TodosType = ITodoType[];

const initialState: TodosType = [
  { id: 1, content: "타입스크립트 배우기", isDone: false },
  {
    id: 2,
    content: "타입스크립트와 리덕스 툴킷 함께 사용해보기",
    isDone: false,
  },
  { id: 3, content: "투두리스트 만들기", isDone: false },
];

let nextId = initialState.length + 1;

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push({ id: ++nextId, content: action.payload, isDone: false });
    },
    delete: (state, action: PayloadAction<number>) => {
      return state.filter((state) => state.id !== action.payload);
    },
    toggle: (state, action: PayloadAction<number>) => {
      return state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isDone: !todo.isDone }
          : todo;
      });
    },
  },
});
