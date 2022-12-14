import moment from "moment";
import "moment/locale/ko";
import { useState } from "react";
import styled from "styled-components";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoWrite from "./components/TodoWrite";
import "./index.css";

const App = () => {
  //state
  const [year, month, day, yoil]: string[] = moment() //날짜
    .format("YYYY-MM-DD-dddd")
    .split("-");
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  //function
  const handleChangeOpen = () => {
    setIsOpenAdd((prev) => !prev);
  };

  return (
    <Wrap>
      <div className="device">
        <TodoHeader year={year} month={month} day={day} yoil={yoil} />
        <TodoList />
        <PlusButton isOpen={isOpenAdd} onClick={handleChangeOpen}>
          +
        </PlusButton>
        {isOpenAdd && <TodoWrite />}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;

  .device {
    width: 450px;
    height: 700px;
    border-radius: 10px;
    box-shadow: 1px 1px 15px 0px #e3e3e3;
    position: relative;
  }
`;

const PlusButton = styled.button<{ isOpen: Boolean }>`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: ${(props) => (props.isOpen ? "#c4302b" : "#0067a3")};
  border: none;
  color: white;
  font-size: 40px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  z-index: 100;
  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

export default App;
