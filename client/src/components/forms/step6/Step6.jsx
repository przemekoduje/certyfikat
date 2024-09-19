import React, { useEffect, useState } from "react";
import "./step6.scss";

export default function Step6({ nextStep, prevStep, skippedQuestions, setSkippedQuestions, data, setData, resetCurrentStep, addSkippedQuestion }) {
  
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

  const [skipButtonsDisabled, setSkipButtonsDisabled] = useState({
    sciana: false,
    scianagrubosc: false,
    izolacja: false,
    izolacjagrubosc: false,
    rok: false,
    termo: false,
  });

  // Funkcja obsługująca zmianę w inputach
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Zablokuj przycisk "Pomiń", jeśli wybrano opcję z listy
    setSkipButtonsDisabled((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Funkcja obsługująca pomijanie pytań
  const skipQuestion = (question, options) => {
    addSkippedQuestion(6, question, options);

    // Zablokuj odpowiedni przycisk "Pomiń"
    setSkipButtonsDisabled((prev) => ({
      ...prev,
      [question.toLowerCase()]: true,
    }));
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
    const allQuestionsSkipped = skippedQuestions.some((skipped) => skipped.step === 6);
    return allFieldsFilled || allQuestionsSkipped;
  };

  useEffect(() => {
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
          <button
            onClick={() => skipQuestion('sciana', scianaOptions)}
            disabled={skipButtonsDisabled.sciana}
          >
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
          <button
            onClick={() => skipQuestion('scianagrubosc')}
            disabled={skipButtonsDisabled.scianagrubosc}
          >
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
          <button
            onClick={() => skipQuestion('izolacja', izolacjaOptions)}
            disabled={skipButtonsDisabled.izolacja}
          >
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
          <button
            onClick={() => skipQuestion('izolacjagrubosc')}
            disabled={skipButtonsDisabled.izolacjagrubosc}
          >
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
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          <label className={`lato-light ${formData.rok ? "active" : ""}`}>
            Rok oddania budynku do uzytkowania
          </label>
          <button
            onClick={() => skipQuestion('rok')}
            disabled={skipButtonsDisabled.rok}
          >
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
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          <label className={`lato-light ${formData.termo ? "active" : ""}`}>
            Rok ostatniej termomodernizacji
          </label>
          <button
            onClick={() => skipQuestion('termo')}
            disabled={skipButtonsDisabled.termo}
          >
            Pomiń
          </button>
        </div>
      </div>

      <button className="back" onClick={prevStep}>
        &#x2190;
      </button>
      <button onClick={nextStep} disabled={!isFormValid()}>
        Dalej
      </button>
    </div>
  );
}
