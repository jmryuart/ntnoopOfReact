import React, { useEffect, useState } from "react";
import "../../css/board.css";
import { dbService } from "../../fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import BoardDetail from "./BoardDetail";
import BoardWrite from "./BoardWrite";
import BoardList from "./BoardList";
import BoardRepair from "./BoardRepair";

const Board = ({ nickName }) => {
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

  const outBoard = () => {
    document.getElementById("board").style.left = "100%";
    setTimeout(() => {
      document.getElementById("board").style.right = "auto";
    }, 400);
  };
  return (
    <div id="board">
      <div className="boardWrap">
        {boardFlag === "board" && (
          <BoardList
            boardRead={boardRead}
            dividePageNum={dividePageNum}
            boardpage={boardpage}
            readBoard={readBoard}
            pageNum={pageNum}
            setBoardpage={setBoardpage}
            writeNew={writeNew}
            outBoard={outBoard}
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
