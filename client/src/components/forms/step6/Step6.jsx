import React, { useEffect, useState } from "react";
import "./step6.scss";

export default function Step6({
  nextStep,
  prevStep,
  skippedQuestions,
  setSkippedQuestions,
  data,
  setData,
  resetCurrentStep,
  addSkippedQuestion,
  removeSkippedQuestion,
}) {
  const [tempData, setTempData] = useState(() => {
    const savedData = localStorage.getItem("step6FormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          sciana: "",
          scianagrubosc: "",
          izolacja: "",
          izolacjagrubosc: "",
          rok: "",
          termo: "",
        };
  });

  const [scianaOptions] = useState([
    "--Brak informacji",
    "beton komórkowy",
    "Ytong",
    "cegła",
    "silka",
    "porotherm",
    "żelbet",
    "drewno",
    "pustak żużlowy",
  ]);

  const [izolacjaOptions] = useState([
    "--Brak informacji",
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

  const [tempSkippedQuestions, setTempSkippedQuestions] = useState(
    skippedQuestions
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });

    if (name === "scianagrubosc" && value === "0") {
      // Jeśli grubość ściany to 0, traktujemy to jako brak danych
      skipQuestion(name);
    } else if (name === "izolacjagrubosc" && value === "0") {
      // Jeśli grubość izolacji to 0, traktujemy to jako brak danych
      skipQuestion(name);
    } else if (value === "--Brak informacji") {
      skipQuestion(name, getOptionsForQuestion(name));
    } else {
      // Jeśli użytkownik wypełnia pole, usuwamy je z pytań pominiętych
      setTempSkippedQuestions((prev) =>
        prev.filter((item) => item.question !== name)
      );
    }
  };

  const getOptionsForQuestion = (question) => {
    switch (question) {
      case "sciana":
        return scianaOptions;
      case "izolacja":
        return izolacjaOptions;
      default:
        return [];
    }
  };

  const skipQuestion = (question) => {
    if (!tempSkippedQuestions.some((item) => item.question === question)) {
      setTempSkippedQuestions((prev) => [
        ...prev,
        { step: 6, question, options: getOptionsForQuestion(question) },
      ]);
    }
  };

  const handleNextStep = () => {
    setData((prevData) => ({
      ...prevData,
      ...tempData,
    }));

    setSkippedQuestions(tempSkippedQuestions);

    localStorage.setItem("step6FormData", JSON.stringify(tempData));

    nextStep();
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(tempData).every(
      (value) => value.trim() !== ""
    );
    const allQuestionsSkipped = tempSkippedQuestions.some(
      (skipped) => skipped.step === 6
    );

    return allFieldsFilled || allQuestionsSkipped;
  };

  return (
    <div className="step6">
      <h2 className="merriweather-light">Szczegółowe dane nieruchomości</h2>

      <div className="inputs">
        {/* Materiał ścian zewnętrznych */}
        <div className="input-wrapper">
          <label className={`lato-light ${tempData.sciana ? "active" : ""}`}>
            Materiał ścian zewnętrznych
          </label>
          <select
            className="lato-light"
            name="sciana"
            value={tempData.sciana}
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

        {/* Grubość ściany zewnętrznej */}
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="scianagrubosc"
            value={tempData.scianagrubosc}
            onChange={handleChange}
            required
          />
          <label
            className={`lato-light ${tempData.scianagrubosc ? "active" : ""}`}
          >
            Grubość ściany zewnętrznej [cm] (wpisz 0 jeśli brak danych)
          </label>
        </div>

        {/* Materiał izolacji ściany zewnętrznej */}
        <div className="input-wrapper">
          <label className={`lato-light ${tempData.izolacja ? "active" : ""}`}>
            Materiał izolacji ściany zewnętrznej
          </label>
          <select
            className="lato-light"
            name="izolacja"
            value={tempData.izolacja}
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

        {/* Grubość materiału izolacyjnego */}
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="izolacjagrubosc"
            value={tempData.izolacjagrubosc}
            onChange={handleChange}
            required
          />
          <label
            className={`lato-light ${
              tempData.izolacjagrubosc ? "active" : ""
            }`}
          >
            Grubość materiału izolacyjnego [cm] (wpisz 0 jeśli brak danych)
          </label>
        </div>

        {/* Rok oddania budynku do użytku */}
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="rok"
            value={tempData.rok}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          <label className={`lato-light ${tempData.rok ? "active" : ""}`}>
            Rok oddania budynku do użytku
          </label>
        </div>

        {/* Rok ostatniej termomodernizacji */}
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="termo"
            value={tempData.termo}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          <label className={`lato-light ${tempData.termo ? "active" : ""}`}>
            Rok ostatniej termomodernizacji
          </label>
        </div>
      </div>

      <button className="back" onClick={prevStep}>
        &#x2190;
      </button>
      <button onClick={handleNextStep} disabled={!isFormValid()}>
        Dalej
      </button>
    </div>
  );
}