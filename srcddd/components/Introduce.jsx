import React from "react";
import "../css/introduce.css";
import Ability from "./introduce/Ability";
import Academy from "./introduce/Academy";
import Career from "./introduce/Career";
import Military from "./introduce/Military";
import PersonIntro from "./introduce/PersonIntro";
import SelfIntro from "./introduce/SelfIntro";

const Introduce = () => {
  return (
    <div className="page introduce">
      <PersonIntro />
      <Academy />
      <Career />
      <Military />
      <Ability />
      <SelfIntro />
    </div>
  );
};

export default Introduce;
