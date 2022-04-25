import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dbService } from "../fbase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import "../css/mainPage.css";

import About from "./About";
import Board from "./Board";
import Cheat from "./Cheat";
import Header from "./Header";
import Home from "./Home";
import Introduce from "./Introduce";
import Lotto from "./Lotto";
import Join from "./Join";
import Log from "./Log";
import { useHistory } from "react-router-dom";

const MainPage = () => {
  const firstCheck = useRef("");
  const [firstCheckFlag, setFirstCheckFlag] = useState(true);
  const history = useHistory();
  if (firstCheckFlag) {
    setTimeout(() => {
      firstCheck.current.style.display = "block";
      setTimeout(() => {
        firstCheck.current.style.display = "none";
        setTimeout(() => {
          firstCheck.current.style.display = "block";
          setTimeout(() => {
            firstCheck.current.style.display = "none";
            setTimeout(() => {
              firstCheck.current.style.display = "block";
              setTimeout(() => {
                firstCheck.current.style.display = "none";
                setFirstCheckFlag(false);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 3000);
    }, 0);
  }

  const [nickName, setNickName] = useState(null);
  const [loggingFlag, setLoggingFlag] = useState(false);
  const [setFlag, setSetFlag] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggingFlag(true);
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
        setLoggingFlag(false);
      }
    });
  }, []);
  const logOut = () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      auth.signOut();
      setNickName(null);
      history.push("/");
    }
  };
  const setFlagNull = () => {
    setSetFlag("");
  };
  return (
    <div className="mainPage">
      <Header
        loggingFlag={loggingFlag}
        logOut={logOut}
        nickName={nickName}
        setSetFlag={setSetFlag}
        setFlagNull={setFlagNull}
      />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/board" exact>
        <Board nickName={nickName} />
      </Route>
      <Route path="/cheat" exact>
        <Cheat nickName={nickName} />
      </Route>
      <Route path="/introduce" exact>
        <Introduce />
      </Route>
      <Route path="/lotto" exact>
        <Lotto />
      </Route>
      {setFlag === "join" && <Join setFlagNull={setFlagNull} />}
      {setFlag === "log" && <Log setFlagNull={setFlagNull} />}
      <div className="firstCheck" ref={firstCheck}>
        <div className="h1area"></div>
        <p>이 부위를 누르면 좌측 메뉴창이 열고 닫힙니다.</p>
      </div>
    </div>
  );
};

export default MainPage;
