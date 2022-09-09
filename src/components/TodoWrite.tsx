import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { todoSlice } from "../store/store";

const TodoWrite = () => {
  //react
  const dispatch = useDispatch();

  //state
  const [content, setContent] = useState<string>("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value);
  };
  const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ): void => {
    if (e.key === "Enter") {
      setContent("");
      if (!e.currentTarget.value) return;
      dispatch(todoSlice.actions.add(e.currentTarget.value));
    }
  };
  return (
    <Wrap>
      <input
        type="text"
        placeholder="할 일을 입력하고 엔터를 눌러주세요"
        value={content}
        onChange={handleInputValue}
        onKeyUp={handleEnterKey}
      />
    </Wrap>
  );
};

export default TodoWrite;

const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90px;
  background: #f4f4f4;
  border-radius: 10px 10px 0 0;
  padding: 28px;
  box-sizing: border-box;

  & > input {
    padding: 10px 15px;
    width: 300px;
    font-size: 15px;
    border-radius: 10px;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;
