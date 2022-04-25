import React, { useRef } from "react";

export default function PageNum({ list, setBoardpage, boardpage }) {
  const thing = document.getElementsByClassName("pageNum");
  const bordRef = useRef("");
  const onClick = () => {
    setBoardpage(list);
  };
  setTimeout(() => {
    for (let i = 0; i < thing.length; i++) {
      thing[i].style.fontWeight = "300";
    }
    thing[boardpage].style.fontWeight = "700";
  }, 1);
  return (
    <>
      <i className="pageNum" ref={bordRef} onClick={onClick}>
        {list}
      </i>
    </>
  );
}
