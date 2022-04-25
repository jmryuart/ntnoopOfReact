import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dbService } from "../fbase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "../css/mainPage.css";
import BackGround from "./BackGround";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Join from "./Join";
import Log from "./Log";

const MainPage = () => {
  const [logFlag, setLogFlag] = useState(false);
  const [nickName, setNickName] = useState(null);
  const [setFlag, setSetFlag] = useState("");
  const pageNum = useRef(1);
  const elRef = useRef();
  let downPoint;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogFlag(true);
        const q = query(
          collection(dbService, "nicknameTable"),
          where("userid", "==", user.uid)
        );
        onSnapshot(q, (snapshot) => {
          const getNickname = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNickName(getNickname[0].nickname);
        });
      } else {
        setLogFlag(false);
      }
    });
  }, []);

  setTimeout(() => {
    const lists = document.querySelector("menu").querySelectorAll("li");
    lists.forEach((list, index) =>
      list.addEventListener("click", () => {
        pageNum.current = index + 1;
        elRef.current.style.top = index * -100 + "%";
        lists.forEach((list) => (list.style.backgroundColor = "#aaa"));
        list.style.backgroundColor = "#f90";
      })
    );
  }, 0);

  const mouseDown = (e) => {
    downPoint = e.clientY;
  };
  const mouseUp = (e) => {
    const lists = document.querySelector("menu").querySelectorAll("li");
    lists.forEach((list) => (list.style.backgroundColor = "#aaa"));
    if (downPoint - e.clientY < -80 && pageNum.current > 1) {
      elRef.current.style.top = -100 * (pageNum.current - 2) + "%";
      pageNum.current--;
    } else if (downPoint - e.clientY > 80 && pageNum.current < 6) {
      elRef.current.style.top = -100 * pageNum.current + "%";
      pageNum.current++;
    }
    lists[pageNum.current - 1].style.backgroundColor = "#f90";
  };
  const logOut = () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      auth.signOut();
      setNickName(null);
    }
  };
  const setFlagNull = () => {
    setSetFlag("");
  };
  const setFlagJoin = () => {
    setSetFlag("join");
  };
  const setFlagLog = () => {
    setSetFlag("log");
  };
  return (
    <div className="wrap">
      <menu>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
      </menu>
      <BackGround />
      <div className="hdrWrap">
        <header>
          <h1 className="icon-nt3">
            <span>진모포트폴리오페이지</span>
          </h1>
          <ul>
            {logFlag ? (
              <li onClick={logOut}>LogOut</li>
            ) : (
              <>
                <li onClick={setFlagLog}>LogIn</li>
                <li onClick={setFlagJoin}>Join</li>
              </>
            )}
          </ul>
        </header>
      </div>
      {setFlag === "log" && <Log setFlagNull={setFlagNull} />}
      {setFlag === "join" && <Join setFlagNull={setFlagNull} />}

      <div
        className="pageWrap"
        ref={elRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <Page1 />
        <Page2 />
        <Page3 nickName={nickName} />
        <Page4 />
        <Page5 />
        <Page6 />
      </div>
    </div>
  );
};

export default MainPage;
