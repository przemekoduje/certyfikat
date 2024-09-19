import React, { useEffect, useState } from 'react';
import './step5.scss';

export default function Step5({ nextStep, prevStep, skippedQuestions, setSkippedQuestions, data, setData, resetCurrentStep, addSkippedQuestion }) {
  
  // Inicjalizowanie stanu z localStorage, jeśli dane istnieją
  const [formData, setFormData] = useState(() => {
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
    'płytowe',
    'żeliwne',
    'członowe',
    'podłogowe',
    'ogrzewanie piecowe lub kominkowe',
  ]);

  const [wentylOptions] = useState([
    'grawitacyjna',
    'mechaniczna wywiewna',
    'mechaniczna wywiewno-nawiewna',
  ]);

  // Funkcja obsługująca zmianę w inputach
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funkcja obsługująca pomijanie pytań
  const skipQuestion = (question, options) => {
    addSkippedQuestion(5, question, options); // Przekazywanie opcji
  };

  // Sprawdza, czy wszystkie pola są wypełnione lub czy wszystkie pytania zostały pominięte
  const isFormValid = () => {
    // Ustaw domyślną wartość dla skippedQuestions, jeśli jest undefined
    const skipped = skippedQuestions || [];
  
    // Sprawdza, czy wszystkie pola są wypełnione
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
  
    // Sprawdza, czy wszystkie pytania zostały pominięte
    const allQuestionsSkipped = skipped.some((skipped) => skipped.step === 5);
  
    // Formularz jest ważny, jeśli wszystkie pola są wypełnione lub wszystkie pytania są pominięte
    return allFieldsFilled || allQuestionsSkipped;
  };
  

  useEffect(() => {
    // Zapisywanie stanu do localStorage po każdej zmianie
    localStorage.setItem('step5FormData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="step5">
      <h2 className="merriweather-light">Szczegółowe dane nieruchomości</h2>

      <div className="inputs">
        <div className="input-wrapper">
          <select
            className="lato-light"
            name="ogrzewanie"
            value={formData.ogrzewanie}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Wybierz rodzaj ogrzewania
            </option>
            {powOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={() => skipQuestion('Rodzaj ogrzewania', powOptions)}>
            Pomiń
          </button>
        </div>

        <div className="input-wrapper">
          <select
            className="lato-light"
            name="wodaciepla"
            value={formData.wodaciepla}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Źródło ciepłej wody
            </option>
            {wodaOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={() => skipQuestion('Źródło ciepłej wody', wodaOptions)}>
            Pomiń
          </button>
        </div>

        <div className="input-wrapper">
          <select
            className="lato-light"
            name="grzejniki"
            value={formData.grzejniki}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Rodzaj zainstalowanych grzejników
            </option>
            {grzejnikOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={() => skipQuestion('Rodzaj zainstalowanych grzejników', grzejnikOptions)}>
            Pomiń
          </button>
        </div>

        <div className="input-wrapper">
          <select
            className="lato-light"
            name="wentylacja"
            value={formData.wentylacja}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Rodzaj wentylacji
            </option>
            {wentylOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={() => skipQuestion('Rodzaj wentylacji', wentylOptions)}>
            Pomiń
          </button>
        </div>

        <div className="input-wrapper">
          <input
            className="lato-light"
            type="number"
            name="szyby"
            value={formData.szyby}
            onChange={handleChange}
            required
          />
          <label className={`lato-light ${formData.szyby ? 'active' : ''}`}>
            Liczba szyb w oknach [szt]
          </label>
          <button onClick={() => skipQuestion('Liczba szyb w oknach')}>
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
