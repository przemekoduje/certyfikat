import React, { useEffect, useState } from 'react';
import './step4.scss';

export default function Step4({ nextStep, prevStep }) {
  // Inicjalizowanie stanu z localStorage, jeśli dane istnieją
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('step4FormData');
    return savedData ? JSON.parse(savedData) : {
      powierzchnia: "",
      wysokosc: "",
      liczbascian: "",
    };
  });

  // Funkcja obsługująca zmianę w inputach
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sprawdza, czy wszystkie pola są wypełnione
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  useEffect(() => {
    // Zapisywanie stanu do localStorage po każdej zmianie
    localStorage.setItem('step4FormData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="step4">
      <h2 className="merriweather-light">Podstawowe dane nieruchomości</h2>
      <div className="inputs">
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="powierzchnia"
            value={formData.powierzchnia}
            onChange={handleChange}
            required
          />
          <label className={`lato-light ${formData.powierzchnia ? "active" : ""}`}>
            Powierzchnia użytkowa /np. 64,5/ [m2]
          </label>
        </div>
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="wysokosc"
            value={formData.wysokosc}
            onChange={handleChange}
            required
          />
          <label className={`lato-light ${formData.wysokosc ? "active" : ""}`}>
            Wysokość pomieszczeń [cm]
          </label>
        </div>
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="liczbascian"
            value={formData.liczbascian}
            onChange={handleChange}
            required
          />
          <label className={`lato-light ${formData.liczbascian ? "active" : ""}`}>
            Liczba ścian zewnętrznych
          </label>
        </div>
      </div>

      <button className="back" onClick={prevStep}>
        &#x2190;
      </button>
      <button onClick={nextStep} disabled={!isFormValid}>
        Dalej
      </button>
    </div>
  );
}
