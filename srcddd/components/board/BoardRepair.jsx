import React from "react";
import { dbService } from "../../fbase";
import { doc, updateDoc } from "firebase/firestore";

const BoardRepair = ({
  nickName,
  setBoardFlag,
  setBoardId,
  setTitle,
  setText,
  title,
  text,
  boardId,
}) => {
  const repairRef = doc(dbService, "board", boardId);
  const onSubmit = async (event) => {
    event.preventDefault();
    const ok = window.confirm("수정하시겠습니까?");
    if(ok){
      if (title !== "" && text !== "") {
        await updateDoc(repairRef, {
          title: title,
          text: text,
        }).then(() => {
          setTitle("");
          setText("");
          setBoardId("");
          setBoardFlag("board");
        });
      } else {
        alert("제목 또는 내용이 비어있습니다.");
      }
    }
  };
  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  const onChangeText = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };
  const goList = () => {
    setTitle("");
    setText("");
    setBoardId("");
    setBoardFlag("board");
  };
  return (<div className="boardWrite">
    <div className="writeHeader">
      <div className="title">
        <i>Title : </i>
        <input onChange={onChangeTitle} type="text" value={title} />
      </div>
      <div className="writer">
        <i>작성자 : </i>
        <span>{nickName}</span>
      </div>
    </div>
    <div className="writeSection">
      <textarea onChange={onChangeText} value={text}></textarea>
    </div>
    <div className="writeFooter">
      <div className="goList">
        <span onClick={goList}>리스트로</span>
      </div>
      <div className="goWrite">
        <span onClick={onSubmit}>수정하기</span>
      </div>
    </div>
  </div>
  );
};

export default BoardRepair;
