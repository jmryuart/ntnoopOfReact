import React from "react";
import Board from "./board/Board";
import "../css/page3.css";

const Page3 = ({ nickName }) => {
  const lookBoard = () => {
    document.getElementById("board").style.left = "0";
    document.getElementById("board").style.right = "0";
  };
  return (
    <div className="page page3">
      <div className="boardView">
        <div className="btn">
          <span onClick={lookBoard}>게시판 보러가기</span>
        </div>
        <div className="boardImage"></div>
        <p>ㅇㅇㅇㅇㅇ</p>
        <p>ㅇㅇㅇㅇㅇ</p>
        <p>ㅇㅇㅇㅇㅇ</p>
        <p>ㅇㅇㅇㅇㅇ</p>
        <Board nickName={nickName} />
      </div>
    </div>
  );
};

export default Page3;
