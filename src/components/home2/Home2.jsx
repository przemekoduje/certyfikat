import React, { useEffect, useRef } from "react";
import "./home2.scss";
import Comix from "../comix/Comix";

export default function Home2() {
  const comixContainerRef1 = useRef(null);
  const comixContainerRef2 = useRef(null);

  useEffect(() => {
    const animateComixItems = (comixItems, delayMultiplier = 0) => {
      // Intersection Observer callback
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          const index = Array.from(comixItems).indexOf(entry.target); // Pobranie indeksu elementu
          const delay = index * 0.2 + delayMultiplier; // Opóźnienie w sekundach z dodatkowym opóźnieniem dla 4-6

          if (entry.isIntersecting) {
            // Element wchodzi do widoku: rozpocznij animację z opóźnieniem
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.opacity = "1";
          } else {
            // Element opuszcza widok: resetuj do pierwotnej pozycji bez opóźnienia
            entry.target.style.transitionDelay = "0s";
            entry.target.style.transform = "translateY(200px)";
            entry.target.style.opacity = "0";
          }
        });
      };

      // Ustawienia Intersection Observer
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5, // Procent widoczności elementu wymagany do aktywacji
      });

      // Obserwowanie każdego elementu comix-item
      Array.from(comixItems).forEach((item) => {
        observer.observe(item);
      });

      // Czyszczenie obserwatora po demontażu komponentu
      return () => {
        Array.from(comixItems).forEach((item) => {
          observer.unobserve(item);
        });
      };
    };

    // Animowanie pierwszego rzędu (comix 1-3)
    const comixItems1 = comixContainerRef1.current.children;
    animateComixItems(comixItems1);

    // Animowanie drugiego rzędu (comix 4-6) z dodatkowym opóźnieniem
    const comixItems2 = comixContainerRef2.current.children;
    const additionalDelay = 0.6; // Dodatkowe opóźnienie dla comix 4-6 po animacji comix 1-3
    animateComixItems(comixItems2, additionalDelay);
  }, []);

  return (
    <div className="home2-container">
      {/* Heading */}
      <div className="display">
        <h1>Na co komu ten cały kłopot?</h1>
      </div>

      {/* Comix 1-3 */}
      <div ref={comixContainerRef1} className="comix-container">
        <div className="comix-item">
            <Comix/>
        </div>
        <div className="comix-item">Comix 2</div>
        <div className="comix-item">Comix 3</div>
      </div>

      {/* Comix 4-6 */}
      <div ref={comixContainerRef2} className="comix-container">
        <div className="comix-item">Comix 4</div>
        <div className="comix-item">Comix 5</div>
        <div className="comix-item">Comix 6</div>
      </div>
    </div>
  );
}
