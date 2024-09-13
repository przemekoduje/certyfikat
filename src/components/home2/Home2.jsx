import React, { useState } from "react";
import { motion } from "framer-motion"; // Importujemy motion z framer-motion
import "./home2.scss";

// Karty z obrazami
const cards = [
  { id: 1, imageUrl: "/images/Tło usunięte (scene1).png" },
  { id: 2, imageUrl: "/images/Tło usunięte (scene2).png" },
  { id: 3, imageUrl: "/images/Tło usunięte (scene3).png" },
  { id: 4, imageUrl: "/images/Tło usunięte (scene4).png" },
];

export default function Home2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zIndexes, setZIndexes] = useState(
    cards.map((_, index) => cards.length - index)
  );

  const handleSwipe = (direction) => {
    const newZIndexes = [...zIndexes];

    if (direction === "right") {
      cards.forEach((_, index) => {
        if (index === currentIndex) {
          newZIndexes[index] -= 1; // active card z-index -1
        } else if (index < currentIndex) {
          newZIndexes[index] -= 1; // left z-index -1
        } else {
          newZIndexes[index] += 1; // stack z-index +1
        }
      });
      setCurrentIndex((prevIndex) =>
        prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (direction === "left") {
      cards.forEach((_, index) => {
        if (index === currentIndex) {
          newZIndexes[index] -= 1; // active card z-index -1
        } else if (index < currentIndex) {
          newZIndexes[index] += 1; // left z-index +1
        } else {
          newZIndexes[index] -= 1; // stack z-index -1
        }
      });
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }

    setZIndexes(newZIndexes);
  };

  const getCardStyle = (index) => {
    const distance = Math.abs(index - currentIndex);
    const offset = distance * 50; // Stała wartość dla przesunięcia
    const scale = 1 - distance * 0.07; // Stała wartość dla zmniejszania skali

    if (index === currentIndex) {
      return {
        zIndex: zIndexes[index],
      };
    } else if (index < currentIndex) {
      return {
        zIndex: zIndexes[index],
      };
    } else {
      return {
        zIndex: zIndexes[index],
      };
    }
  };

  return (
    <div className="home2-container">
      <div className="card-swipe-container">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`card ${
              index === currentIndex
                ? "active"
                : index < currentIndex
                ? "left"
                : "card-stack"
            }`}
            style={getCardStyle(index)}
            
            // Dodajemy animacje
            animate={{
              x: index === currentIndex 
                ? 0 
                : index < currentIndex 
                ? -35 - (Math.abs(currentIndex - index) * 50) // Przesuwanie na lewo
                : 35 + (Math.abs(currentIndex - index) * 50), // Przesuwanie na prawo
              scale: index === currentIndex 
                ? 1 
                : 1 - (Math.abs(currentIndex - index) * 0.07), // Skala
            }}

            // Definiujemy animację przejścia
            transition={{
              type: "spring", // Zastosowanie sprężyny
              stiffness: 300, // Im wyższa wartość, tym szybciej karta wróci na miejsce
              damping: 30, // Kontroluje "drgania" przy animacji
            }}
          >
            <img src={card.imageUrl} alt={`Card ${card.id}`} className="card-img" />
          </motion.div>
        ))}
      </div>

      <div className="controls">
      <button
          onClick={() => handleSwipe("left")}
          style={{
            visibility: currentIndex === 0 ? "hidden" : "visible", // Ukrywamy, ale zachowujemy miejsce
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => handleSwipe("right")}
          style={{
            visibility: currentIndex === cards.length - 1 ? "hidden" : "visible", // Ukrywamy, ale zachowujemy miejsce
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
