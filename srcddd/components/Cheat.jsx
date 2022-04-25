import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "../css/cheat.css";
import Message from "./cheat/Message";
import SendMessage from "./cheat/SendMessage";

const Cheat = ({ nickName }) => {
  const [myMessage, setMyMessage] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "talkWith"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const talking = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyMessage(talking);
    });
  }, []);
  return (
    <div className="page cheat">
      <div className="cheatWrap">
        {nickName && (
          <SendMessage nickName={nickName} firstMessage={myMessage[0]} />
        )}
        <ul>
          {myMessage.length !== 0 ? (
            myMessage.map((list, index, array) => (
              <li key={list.id}>
                <>
                  {nickName === list.creatorId ? (
                    <div className="mymessage">
                      <Message
                        nickName={nickName}
                        list={list}
                        index={index}
                        array={array}
                      />
                    </div>
                  ) : (
                    <div className="othermessage">
                      <Message
                        nickName={nickName}
                        list={list}
                        index={index}
                        array={array}
                      />
                    </div>
                  )}
                </>
              </li>
            ))
          ) : (
            <li className="lodingMessage">메세지 목록 로딩중.....</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cheat;
