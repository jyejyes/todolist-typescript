import styled from "styled-components";
import { ReactComponent as Trash } from "../assets/ic-trash.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { todoSlice } from "../store/store";

const TodoList = () => {
  //react
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleClickDone = (id: number) => {
    dispatch(todoSlice.actions.toggle(id));
  };

  const handleClickTrash = (id: number) => {
    dispatch(todoSlice.actions.delete(id));
  };

  return (
    <Wrap>
      {todos?.map((item) => (
        <Todo key={item.id} isDone={item.isDone}>
          <div>
            <div className="done" onClick={() => handleClickDone(item.id)}>
              {item.isDone && <div className="inner" />}
            </div>
            <p className="text">{item.content}</p>
          </div>
          <Trash onClick={() => handleClickTrash(item.id)} />
        </Todo>
      ))}
    </Wrap>
  );
};

export default TodoList;

const Wrap = styled.div`
  height: 62%;
  padding: 20px 25px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const Todo = styled.div<{ isDone: Boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;

  & > div {
    display: flex;
    align-items: center;
  }

  .done {
    transform: translateY(-2px);
    border: ${(props) =>
      props.isDone ? "1px solid #0067a3" : "1px solid gray"};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    position: relative;

    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15px;
      height: 15px;
      background: #0067a3;
      border-radius: 50%;
    }
  }

  &:hover svg {
    visibility: visible;
  }

  .text {
    text-decoration: ${(props) => (props.isDone ? "line-through" : "")};
    font-size: 18px;
    color: ${(props) => (props.isDone ? "#888888" : "#3c3c3c")};
    line-height: 25px;
  }
  & > svg {
    visibility: hidden;
    cursor: pointer;
    fill: lightgray;
    & :hover {
      fill: #c4302b;
    }
  }
`;
