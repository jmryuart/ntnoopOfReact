import React from "react";
import PageNum from "./PageNum";

const BoardList = ({
  boardRead,
  dividePageNum,
  boardpage,
  readBoard,
  pageNum,
  setBoardpage,
  writeNew,
}) => {
  // let pageNum = [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]

  const firstPage = () => {
    setBoardpage(1);
  };
  const lastPage = () => {
    setBoardpage(pageNum[pageNum.length - 1]);
  };
  const pageNumMinus = () => {
    if (boardpage > 1) {
      setBoardpage(boardpage - 1);
    }
  };
  const pageNumPlus = () => {
    if (boardpage < pageNum[pageNum.length - 1]) {
      setBoardpage(boardpage + 1);
    }
  };
  return (
    <div className="boardList">
      <div className="boardName">게시판</div>
      <div className="boardArea">
        <div className="divideBoard">
          <div className="boardTitle">
            <span>Title</span>
          </div>
          <div className="boardCreator">
            <span>Writer</span>
          </div>
          <div className="boardCreatedAt">
            <span>Date</span>
          </div>
        </div>
        {boardRead.length !== 0 ? (
          boardRead
            .slice(dividePageNum * (boardpage - 1), dividePageNum * boardpage)
            .map((list, index) => (
              <div key={index} className="divideBoard">
                <div
                  className="boardTitle"
                  onClick={() => {
                    readBoard(list);
                  }}
                >
                  {list.title}
                </div>
                <div className="boardCreator">{list.creatorId}</div>
                <div className="boardCreatedAt">{list.date}</div>
              </div>
            ))
        ) : (
          <>
            <div className="divideBoard">
              <h4>게시판 로딩중..</h4>
            </div>
            <div className="divideBoard">
              <h4>게시판 로딩중....</h4>
            </div>
            <div className="divideBoard">
              <h4>게시판 로딩중......</h4>
            </div>
            <div className="divideBoard">
              <h4>게시판 로딩중........</h4>
            </div>
          </>
        )}
      </div>
      <div className="selectPage">
        <span className="icon-backward" onClick={firstPage}></span>
        <span className="icon-circle-left" onClick={pageNumMinus}></span>
        <div className="pageNum">
          {pageNum
            .reverse()
            // .slice(boardpage - 1, boardpage + 2)
            .map((list, index) => (
              <span key={index}>
                <PageNum
                  list={list}
                  index={index}
                  boardpage={boardpage}
                  setBoardpage={setBoardpage}
                />
              </span>
            ))}
        </div>
        <span className="icon-circle-right" onClick={pageNumPlus}></span>
        <span className="icon-forward2" onClick={lastPage}></span>
      </div>
      <div className="writeNew">
        <i onClick={writeNew}>글쓰기</i>
      </div>
    </div>
  );
};

export default BoardList;
