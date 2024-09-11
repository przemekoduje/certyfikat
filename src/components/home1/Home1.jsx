import React from "react";
import "./home1.scss";

export default function Home1() {
  return (
    <div className="home1-container">
        <div className="background">
          <img className="homeImage" src="/images/design6_3_2.png" alt="" />
        </div>
        <div className="textButton">
          <div className="textContainer">
            <h1>Świadectwo na klik</h1>
            <span>
              Pobierz świadectwo na klik i wspólnie zadbajmy o środowisko!
              <br />
              Od każdego wystawionego dokumentu przekazujemy <span className="highlight">10 zł na sadzenie drzew</span>, łącząc energooszczędność z realnym wsparciem dla natury.
            </span>
          </div>
          <button>Zróbmy to</button>
        </div>

    </div>


  );
}