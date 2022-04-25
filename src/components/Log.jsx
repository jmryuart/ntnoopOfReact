import React, { useRef } from "react";
import "../css/log.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fbase";

const Log = ({ setFlagNull, nickName }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then(() => {
        setFlagNull();
        alert("환영합니다~");
      });
    } catch (error) {
      alert("E-mail 또는 비밀번호가 잘못되었습니다.");
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };
  return (
    <div className="page logPage">
      <form onSubmit={onSubmit}>
        <div className="input">
          <h4>E-mail</h4>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="input">
          <h4>Password</h4>
          <input type="password" ref={passwordRef} required />
        </div>
        <button type="submit">로그인</button>
        <div className="btnCLose" onClick={setFlagNull}>
          <span className="icon-cancel-circle"></span>
        </div>
      </form>
    </div>
  );
};

export default Log;
