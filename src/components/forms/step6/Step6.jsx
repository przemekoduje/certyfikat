import React, { useEffect, useState } from "react";
import "./step6.scss";

export default function Step6({ nextStep, prevStep }) {
  // Inicjalizowanie stanu z localStorage, jeśli dane istnieją
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('step6FormData');
    return savedData ? JSON.parse(savedData) : {
      sciana: "",
      scianagrubosc: "",
      izolacja: "",
      izolacjagrubosc: "",
      rok: "",
      termo: "",
    };
  });

  const [scianaOptions] = useState([
    "beton komórkowy",
    "Ytong",
    "cegła",
    "silka",
    "porotherm",
    "zelbet",
    "drewno",
    "pustak zuzlowy",
  ]);

  const [izolacjaOptions] = useState([
    "styropian biały",
    "styropian grafitowy",
    "wełna mineralna",
    "pianka poliuretanowa",
    "brak izolacji",
  ]);

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
    localStorage.setItem('step6FormData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="step6">
      <h2 className="merriweather-light">Szczegółowe dane nieruchomości</h2>

      <div className="inputs">
        <div className="input-wrapper">
          <select
            className="lato-light"
            name="sciana"
            value={formData.sciana}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Materiał ścian zewnętrznych
            </option>
            {scianaOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="scianagrubosc"
            value={formData.scianagrubosc}
            onChange={handleChange}
            required
          />
          <label
            className={`lato-light ${formData.scianagrubosc ? "active" : ""}`}
          >
            Grubość ściany zewnętrznej [cm]
          </label>
        </div>

        <div className="input-wrapper">
          <select
            className="lato-light"
            name="izolacja"
            value={formData.izolacja}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Materiał izolacji ściany zewnętrznej
            </option>
            {izolacjaOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="izolacjagrubosc"
            value={formData.izolacjagrubosc}
            onChange={handleChange}
            required
          />
          <label
            className={`lato-light ${formData.izolacjagrubosc ? "active" : ""}`}
          >
            Grubość materiału izolacyjnego [cm]
          </label>
        </div>

        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="rok"
            value={formData.rok}
            onChange={handleChange}
            min="1900" // Zakres lat
            max={new Date().getFullYear()} // Maksymalny rok to bieżący rok
            step="1"
            required
          />
          <label className={`lato-light ${formData.rok ? "active" : ""}`}>
            Rok oddania budynku do uzytkowania
          </label>
        </div>

        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="termo"
            value={formData.termo}
            onChange={handleChange}
            min="1900" // Zakres lat
            max={new Date().getFullYear()} // Maksymalny rok to bieżący rok
            step="1"
            required
          />
          <label className={`lato-light ${formData.termo ? "active" : ""}`}>
            Rok ostatniej termomodernizacji
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
