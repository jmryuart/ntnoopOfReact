import React from "react";
import { dbService } from "../../fbase";
import { doc, deleteDoc } from "firebase/firestore";

const BoardDetail = ({
  boardSet,
  setBoardFlag,
  nickName,
  setTitle,
  setText,
  setBoardId,
}) => {
  const deleteRef = doc(dbService, "board", `${boardSet.id}`);
  const returnBoard = () => {
    setBoardFlag("board");
  };
  const removeBoard = async () => {
    const ok = window.confirm("지우시겠습니까?");
    if (ok) {
      await deleteDoc(deleteRef).then(() => {
        setBoardFlag("board");
      });
    }
  };
  const write = () => {
    if (nickName !== null) setBoardFlag("write");
    else alert("글을 작셩하려면 로그인을 해주세요. ");
  };
  const repairBoard = () => {
    setBoardId(boardSet.id);
    setTitle(boardSet.title);
    setText(boardSet.text);
    setBoardFlag("repair");
  };
  return (
    <div className="boardDetail">
      <div className="boarderHeader">
        <div className="title">
          <i>Title.</i>
          <span>{boardSet.title}</span>
        </div>
        <div className="writer">
          <span>{boardSet.creatorId}</span>
        </div>
      </div>
      <div className="boarderSection">
        <p>{boardSet.title}</p>
        <p>{boardSet.text}</p>
      </div>
      <div className="boarderFooter">
        <div className="btns">
          <span onClick={returnBoard}>리스트로</span>
          <span onClick={write}>글쓰기</span>
          {nickName === boardSet.creatorId && (
            <>
              <span onClick={removeBoard}>지우기</span>
              <span onClick={repairBoard}>수정하기</span>
            </>
          )}
        </div>
        <div className="date">
          <i>게시일 : </i>
          <span>{boardSet.date}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
