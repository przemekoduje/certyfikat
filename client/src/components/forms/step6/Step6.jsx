import React, { useEffect, useState } from "react";
import "./step6.scss";

export default function Step6({ nextStep, prevStep, skippedQuestions, setSkippedQuestions, data, setData, resetCurrentStep, addSkippedQuestion }) {
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

  // Funkcja obsługująca pomijanie pytań
  const skipQuestion = (question, options) => {
    addSkippedQuestion(6, question, options); // Dodaje pytanie do pominiętych pytań
  };

  

  // Sprawdza, czy wszystkie pola są wypełnione lub czy wszystkie pytania zostały pominięte
  const isFormValid = () => {
    // Ustaw domyślną wartość dla skippedQuestions, jeśli jest undefined
    const skipped = skippedQuestions || [];
  
    // Sprawdza, czy wszystkie pola są wypełnione
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
  
    // Sprawdza, czy wszystkie pytania zostały pominięte
    const allQuestionsSkipped = skipped.some((skipped) => skipped.step === 6);
  
    // Formularz jest ważny, jeśli wszystkie pola są wypełnione lub wszystkie pytania są pominięte
    return allFieldsFilled || allQuestionsSkipped;
  };

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
          <button onClick={() => skipQuestion('Materiał ścian zewnętrznych', scianaOptions)}>
            Pomiń
          </button>
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
          <button onClick={() => skipQuestion('Grubość ściany zewnętrznej [cm]')}>
            Pomiń
          </button>
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
          <button onClick={() => skipQuestion('Materiał izolacji ściany zewnętrznej', izolacjaOptions)}>
            Pomiń
          </button>
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
          <button onClick={() => skipQuestion('Grubość materiału izolacyjnego [cm]')}>
            Pomiń
          </button>
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
          <button onClick={() => skipQuestion('Rok oddania budynku do uzytkowania')}>
            Pomiń
          </button>
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
          <button onClick={() => skipQuestion('Rok ostatniej termomodernizacji')}>
            Pomiń
          </button>
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
