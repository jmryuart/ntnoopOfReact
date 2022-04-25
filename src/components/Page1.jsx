import React, { useEffect } from "react";
import "../css/page1.css";

const Page1 = () => {
  useEffect(() => {
    setInterval(() => {
      const scrolling = document.getElementById("scrolling");
      const eachscrolling = scrolling.querySelectorAll("h6");
      scrolling.style.transition = "none";
      scrolling.insertBefore(eachscrolling[0], scrolling.lastChild);
      scrolling.style.left = "0px";
      setTimeout(() => {
        scrolling.style.left = "-800px";
        scrolling.style.transition = "linear all 5s";
      }, 50);
    }, 8000);
  }, []);

  return (
    <div className="page page1">
      <div className="aboutMe">
        <h2>About me</h2>
        <h4>Ryu jin mo</h4>
        <h5>
          <span>Since</span>1988
        </h5>
      </div>
      <div className="texts">
        <h3>Front-end Developer's</h3>
        <h4>
          안녕하십니까 <span>Front-end 개발자</span>를 꿈꾸는 유진모 입니다.
        </h4>
        <p>
          무엇을 해야할지 모르는 상황
          <br />
          희망이 보이는 해야할 것을 찾은 상황
          <br />
          하려는 것이 원활하게 되어 행복한 상황
          <br />
          하루 하루 코딩을 하며 하루에도 여러번 이 세가지 상황을 마주하고
          있습니다.
          <br />
          <span>
            "시간을 들여 노력한다고 모두가 최고가 되는것은 아니지만 그 노력으로 어제의
            나보다 더 발전된 나를 만들어 갈 수 있다."
          </span>
          <br />
          하루 하루 발전하는 개발자로 살아가겠습니다.
        </p>
        <div id="scrolling">
          <h6>
            <b>HTML</b> <b>CSS / SCSS</b> <b>Javascript</b> <b>jQuery</b>
            <b>React.js</b>
          </h6>
          <h6>
            <b>HTML</b> <b>CSS / SCSS</b> <b>Javascript</b> <b>jQuery</b>
            <b>React.js</b>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Page1;
