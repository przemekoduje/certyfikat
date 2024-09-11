import React from "react";
import "./homePage.scss";
import Home1 from "../../components/home1/Home1";
import Home2 from "../../components/home2/Home2";

export default function HomePage() {
  return (
    <div className="homepage">
      <Home1/>
      <Home2/>
    </div>
  );
}
