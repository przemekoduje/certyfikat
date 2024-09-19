import React, { useEffect, useState } from "react";
import "./step5.scss";

export default function Step5({
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
    const savedData = localStorage.getItem('step5FormData');
    return savedData
      ? JSON.parse(savedData)
      : {
          ogrzewanie: '',
          wodaciepla: '',
          grzejniki: '',
          wentylacja: '',
          szyby: '',
        };
  });

  const [powOptions] = useState([
    'Brak informacji', 
    'sieć miejska',
    'grzejniki elektryczne',
    'kocioł na biomase',
    'kocioł na ekogroszek',
    'kocioł węglowy',
    'kocioł olejowy',
    'kocioł gazowy w mieszkaniu',
    'kocioł gazowy w kotłowni',
    'kocioł gazowy w kotłowni zewn.',
    'energia geotermalna',
    'piec kaflowy',
  ]);

  const [wodaOptions] = useState([
    'Brak informacji',
    'sieć miejska',
    'elektryczny podgrzewacz akumulacyjny',
    'elektryczny podgrzewacz przepływowy',
    'kocioł na biomase',
    'kocioł na ekogroszek',
    'kocioł węglowy',
    'kocioł olejowy',
    'kocioł gazowy w mieszkaniu',
    'kocioł gazowy w kotłowni',
    'kocioł gazowy w kotłowni zewn.',
    'energia geotermalna',
    'piec kaflowy',
  ]);

  const [grzejnikOptions] = useState([
    'Brak informacji',
    'płytowe',
    'żeliwne',
    'członowe',
    'podłogowe',
    'ogrzewanie piecowe lub kominkowe',
  ]);

  const [wentylOptions] = useState([
    'Brak informacji',
    'grawitacyjna',
    'mechaniczna wywiewna',
    'mechaniczna wywiewno-nawiewna',
  ]);

  const [skipButtonsDisabled, setSkipButtonsDisabled] = useState({
    ogrzewanie: false,
    wodaciepla: false,
    grzejniki: false,
    wentylacja: false,
    szyby: false,
  });

  // Tymczasowe zarządzanie listą pytań pominiętych (nie wysyłane dopóki nie naciśnięto "Dalej")
  const [tempSkippedQuestions, setTempSkippedQuestions] = useState(skippedQuestions);

  // Funkcja obsługująca zmianę w tempData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });

    // Jeśli użytkownik wybierze "Brak informacji", wywołaj skipQuestion i dezaktywuj przycisk
    if (value === 'Brak informacji') {
      skipQuestion(name, getOptionsForQuestion(name));
    } else {
      // Usuń pytanie z listy pominiętych, jeśli wybrano coś innego
      setTempSkippedQuestions((prev) => prev.filter((item) => item.question !== name));
      setSkipButtonsDisabled((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  // Funkcja zwracająca opcje dla danego pytania
  const getOptionsForQuestion = (question) => {
    switch (question) {
      case 'ogrzewanie':
        return powOptions;
      case 'wodaciepla':
        return wodaOptions;
      case 'grzejniki':
        return grzejnikOptions;
      case 'wentylacja':
        return wentylOptions;
      default:
        return [];
    }
  };

  // Funkcja obsługująca pomijanie pytań
  const skipQuestion = (question, options) => {
    setTempSkippedQuestions((prev) => [
      ...prev,
      { step: 5, question, options },
    ]);

    // Zablokuj odpowiedni przycisk "Pomiń"
    setSkipButtonsDisabled((prev) => ({
      ...prev,
      [question]: true,
    }));
  };

  // Funkcja obsługująca przejście do następnego kroku
  const handleNextStep = () => {
    // Zatwierdź dane i zaktualizuj formData
    setData((prevData) => ({
      ...prevData,
      ...tempData,
    }));

    // Zaktualizuj listę pominiętych pytań na podstawie tempSkippedQuestions
    setSkippedQuestions(tempSkippedQuestions);

    // Zapisz dane do localStorage
    localStorage.setItem('step5FormData', JSON.stringify(tempData));

    nextStep();
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(tempData).every((value) => value.trim() !== '' && value !== 'Brak informacji');
    const allQuestionsSkipped = tempSkippedQuestions.some((skipped) => skipped.step === 5);
    return allFieldsFilled || allQuestionsSkipped;
  };

  return (
    <div className="step5">
      <h2 className="merriweather-light">Szczegółowe dane nieruchomości</h2>

      <div className="inputs">
        {/* Ogrzewanie */}
        <div className="input-wrapper">
          <label className={`lato-light ${tempData.ogrzewanie ? 'active' : ''}`}>
            Wybierz rodzaj ogrzewania
          </label>
          <select
            className="lato-light"
            name="ogrzewanie"
            value={tempData.ogrzewanie}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Wybierz rodzaj ogrzewania</option> {/* Tytuł komórki */}
            {powOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => skipQuestion('ogrzewanie', powOptions)}
            disabled={skipButtonsDisabled.ogrzewanie}
          >
            Pomiń
          </button>
        </div>

        {/* Źródło ciepłej wody */}
        <div className="input-wrapper">
          <label className={`lato-light ${tempData.wodaciepla ? 'active' : ''}`}>
            Wybierz źródło ciepłej wody
          </label>
          <select
            className="lato-light"
            name="wodaciepla"
            value={tempData.wodaciepla}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Wybierz źródło ciepłej wody</option> {/* Tytuł komórki */}
            {wodaOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => skipQuestion('wodaciepla', wodaOptions)}
            disabled={skipButtonsDisabled.wodaciepla}
          >
            Pomiń
          </button>
        </div>

        {/* Grzejniki */}
        <div className="input-wrapper">
          <label className={`lato-light ${tempData.grzejniki ? 'active' : ''}`}>
            Wybierz rodzaj grzejników
          </label>
          <select
            className="lato-light"
            name="grzejniki"
            value={tempData.grzejniki}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Wybierz rodzaj grzejników</option> {/* Tytuł komórki */}
            {grzejnikOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => skipQuestion('grzejniki', grzejnikOptions)}
            disabled={skipButtonsDisabled.grzejniki}
          >
            Pomiń
          </button>
        </div>

        {/* Wentylacja */}
        <div className="input-wrapper">
          <label className={`lato-light ${tempData.wentylacja ? 'active' : ''}`}>
            Wybierz rodzaj wentylacji
          </label>
          <select
            className="lato-light"
            name="wentylacja"
            value={tempData.wentylacja}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Wybierz rodzaj wentylacji</option> {/* Tytuł komórki */}
            {wentylOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => skipQuestion('wentylacja', wentylOptions)}
            disabled={skipButtonsDisabled.wentylacja}
          >
            Pomiń
          </button>
        </div>

        {/* Liczba szyb */}
        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="szyby"
            value={tempData.szyby}
            onChange={handleChange}
            required
          />
          <label className={`lato-light ${tempData.szyby ? 'active' : ''}`}>
            Liczba szyb w oknach [szt]
          </label>
          <button
            onClick={() => skipQuestion('szyby')}
            disabled={skipButtonsDisabled.szyby}
          >
            Pomiń
          </button>
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
