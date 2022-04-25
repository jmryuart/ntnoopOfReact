import React, { useEffect, useRef, useState } from "react";
import "../css/board.css";
import { dbService } from "../fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from "./board/BoardWrite";
import BoardList from "./board/BoardList";
import BoardRepair from "./board/BoardRepair";

const Board = ({ nickName }) => {
  const boardRef = useRef("");
  const dividePageNum = 10;
  const [boardFlag, setBoardFlag] = useState("board");
  const [boardSet, setBoardSet] = useState([]);
  const [boardRead, setBoardRead] = useState([]);
  let pageNum = [];
  const [boardpage, setBoardpage] = useState(1);

  const [boardId, setBoardId] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    const q = query(
      collection(dbService, "board"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const boardArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoardRead(boardArr);
    });
  }, []);

  const writeNew = () => {
    if (nickName !== null) setBoardFlag("write");
    else alert("글을 작셩하려면 로그인을 해주세요. ");
  };
  const readBoard = (list) => {
    setBoardFlag("detail");
    setBoardSet(list);
  };

  for (let i = Math.ceil(boardRead.length / dividePageNum); i > 0; i--) {
    pageNum.push(i);
  }

  setTimeout(() => {
    boardRef.current.style.bottom = "0";
  }, 0);
  return (
    <div className="page board">
      <div className="boardWrap" ref={boardRef}>
        {boardFlag === "board" && (
          <BoardList
            boardRead={boardRead}
            dividePageNum={dividePageNum}
            boardpage={boardpage}
            readBoard={readBoard}
            pageNum={pageNum}
            setBoardpage={setBoardpage}
            writeNew={writeNew}
          />
        )}
        {boardFlag === "write" && (
          <BoardWrite
            setBoardFlag={setBoardFlag}
            nickName={nickName}
            setBoardpage={setBoardpage}
          />
        )}
        {boardFlag === "detail" && (
          <BoardDetail
            boardSet={boardSet}
            nickName={nickName}
            setBoardFlag={setBoardFlag}
            setBoardId={setBoardId}
            setTitle={setTitle}
            setText={setText}
          />
        )}
        {boardFlag === "repair" && (
          <BoardRepair
            nickName={nickName}
            setBoardFlag={setBoardFlag}
            boardId={boardId}
            title={title}
            text={text}
            setBoardId={setBoardId}
            setTitle={setTitle}
            setText={setText}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
