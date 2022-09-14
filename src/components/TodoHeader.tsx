import styled from "styled-components";
import { useAppSelector } from "../store/hooks";

export interface TodoHeaderProps {
  year: string;
  month: string;
  day: string;
  yoil: string;
}

const TodoHeader = ({ year, month, day, yoil }: TodoHeaderProps) => {
  const todos = useAppSelector((state) => state.todos);
  let rest = todos.length;
  todos.map((item) => {
    if (item.isDone) {
      rest -= 1;
    }
  });
  return (
    <Wrap>
      <h2>
        {year}년 {month}월 {day}일
      </h2>
      <p className="yoil">{yoil}</p>
      <p className="rest">할 일 {rest}개 남음</p>
    </Wrap>
  );
};

export default TodoHeader;

const Wrap = styled.div`
  border-bottom: 1px solid #e4e4e4;
  height: 25%;
  padding: 30px 25px;
  box-sizing: border-box;

  h2 {
    font-size: 34px;
    font-weight: 900;
    color: #393933;
    margin-bottom: 10px;
  }
  .yoil {
    color: #666666;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 35px;
  }
  .rest {
    font-weight: 800;
    color: #0067a3;
  }
`;
