import React, { useRef, useState } from "react";
import "../css/backGround.css";

const BackGround = () => {
  const [functionFlag, setFunctionFlag] = useState(true);

  const bgRef = useRef("");
  let eachball = 150;
  let ball = [];
  let dkdld = document.getElementsByClassName("ball");
  setTimeout(() => {
    for (let i = 0; i < eachball; i++) {
      dkdld[i].style.width = ball[i] + "px";
      dkdld[i].style.height = ball[i] + "px";
      dkdld[i].style.borderColor = "#" + Math.ceil(Math.random() * 999999);
      dkdld[i].style.top = Math.ceil(Math.random() * window.innerHeight) + "px";
      dkdld[i].style.left = Math.ceil(Math.random() * window.innerWidth) + "px";
    }
  }, 0);
  const makesize = () => {
    for (let i = 0; i < eachball; i++) {
      ball[i] = Math.ceil(Math.random() * 25) + 5;
    }
  };
  makesize();
  const nonStopRoof = () => {
    if (functionFlag) {
      setFunctionFlag(false);
      setTimeout(() => {
        setTimeout(() => {
          ball = [];
          makesize();
          for (let i = 0; i < eachball; i++) {
            dkdld[i].style.width = ball[i] + "px";
            dkdld[i].style.height = ball[i] + "px";
            dkdld[i].style.borderColor =
              "#" +
              parseInt(Math.ceil(Math.random() * 16), 16) +
              parseInt(Math.ceil(Math.random() * 16), 16) +
              parseInt(Math.ceil(Math.random() * 16), 16) +
              parseInt(Math.ceil(Math.random() * 16), 16) +
              parseInt(Math.ceil(Math.random() * 16), 16) +
              parseInt(Math.ceil(Math.random() * 16), 16);
            dkdld[i].style.top =
              Math.ceil(Math.random() * window.innerHeight) + "px";
            dkdld[i].style.left =
              Math.ceil(Math.random() * window.innerWidth) + "px";
          }
          setFunctionFlag(true);
          nonStopRoof();
        }, 12000);
      }, 0);
    }
  };
  nonStopRoof();
  return (
    <div className="backGround" ref={bgRef}>
      {ball.map((list, index) => (
        <div className="ball" key={index}></div>
      ))}
    </div>
  );
};

export default BackGround;
