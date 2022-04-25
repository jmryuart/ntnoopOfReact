import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/header.css";

const Header = ({ loggingFlag, logOut, nickName, setSetFlag, setFlagNull }) => {
  const [headerFlag, setHeaderFlag] = useState(true);
  const headerRef = useRef("");
  const h1Ref = useRef("");
  const headerOnOff = () => {
    setHeaderFlag(!headerFlag);
    if (headerFlag) {
      headerRef.current.style.width = "0";
    } else {
      headerRef.current.style.width = "160px";
    }
  };
  const joinFunction = () => {
    setSetFlag("join");
  };
  const logFunction = () => {
    setSetFlag("log");
  };

  return (
    <div className="header darkBorder" ref={headerRef}>
      <header>
        <h1 className="icon-nt3 darkBorder" onClick={headerOnOff} ref={h1Ref}>
          <span>nt</span>
        </h1>
        {loggingFlag ? (
          <div className="joinLog">
            <h4>{nickName}</h4>
            <div className="logOut" onClick={logOut}>
              <span>로그아웃</span>
            </div>
          </div>
        ) : (
          <div className="joinLog">
            <div className="join" onClick={joinFunction}>
              <span>회원가입</span>
            </div>
            <div className="log" onClick={logFunction}>
              <span>로그인</span>
            </div>
          </div>
        )}
        <menu>
          <li>
            <NavLink to="/">
              <span onClick={setFlagNull}>home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/board">
              <span onClick={setFlagNull}>board</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cheat">
              <span onClick={setFlagNull}>cheat</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lotto">
              <span onClick={setFlagNull}>lotto</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/introduce">
              <span onClick={setFlagNull}>introduce</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <span onClick={setFlagNull}>about</span>
            </NavLink>
          </li>
        </menu>
      </header>
    </div>
  );
};

export default Header;
