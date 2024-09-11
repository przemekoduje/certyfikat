import React, { useEffect, useRef } from "react";
import "./home2.scss";
import Comix from "../comix/Comix";


const images = [
  "/images/Tło usunięte (scene1).png",
  "/images/Tło usunięte (scene2).png",
  "/images/Tło usunięte (scene3).png",
  "/images/Tło usunięte (scene4).png",
  "/images/Tło usunięte (scene5).png",
  "/images/Tło usunięte (scene6).png",
];

const head = [
  "Czy Twój dom jest energooszczędny? ",
  "Pierwszy krok do oszczędności.",
  "Zoptymalizuj swój dom.",
  "Komfort i oszczędność.",
  "Świadectwo to krok ku lepszemu środowisku.",
  "Świadectwo to inwestycja w naturę.",
];

const opis = [
  "Świadectwo charakterystyki energetycznej pomaga odpowiedzieć na to pytanie.",
  "Z pomocą specjalisty możesz dowiedzieć się, jak poprawić efektywność energetyczną swojego domu.",
  "Świadectwo energetyczne wskazuje, gdzie Twój dom może zaoszczędzić energię – od izolacji po lepsze okna.",
  "Lepsza efektywność energetyczna to niższe rachunki, większy komfort życia i przyjazność dla natury.",
  "Dzięki świadectwom energetycznym zmniejszamy nasz ślad węglowy i dbamy o przyszłość planety.",
  "Z każdym świadectwem sadzimy drzewa, wspólnie tworząc zdrowszą przyszłość dla nas wszystkich.",
];


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
      <div className="display">
        <h1>Na co komu ten cały kłopot?</h1>
      </div>

      <span className="info_h2 lato-regular">Świadectwo charakterystyki energetycznej to nie zbędna formalność, ale klucz do oszczędności i wyższej wartości Twojej nieruchomości. Dzięki niemu wiesz, gdzie Twój dom traci energię i jakie kroki podjąć, by to zmienić – od poprawy izolacji po wymianę okien. Lepsza efektywność energetyczna to nie tylko niższe rachunki, ale i wyższa wartość rynkowa budynku. Inwestycja w świadectwo to pierwszy krok do poprawy komfortu życia, zwiększenia atrakcyjności nieruchomości na rynku oraz wsparcia dla środowiska, bo każdy z nas może działać na rzecz redukcji emisji CO₂.</span>

      <div className="images-cont_h2">
        <div ref={comixContainerRef1} className="comix-container cont1">
          {images.slice(0, 3).map((img, index) => (
            <div className="comix-item" key={index}>
              <Comix
                image={img}
                head={head[index]}
                opis={opis[index]}
              />
            </div>
          ))}
        </div>
        <div ref={comixContainerRef2} className="comix-container cont2">
          {images.slice(3, 6).map((img, index) => (
            <div className="comix-item" key={index + 3}>
              <Comix
                image={img}
                head={head[index + 3]}
                opis={opis[index + 3]}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
