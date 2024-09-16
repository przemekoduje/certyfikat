import React, { useState, useEffect } from 'react';
import './step1.scss';

export default function Step1({ nextStep }) {
  // Inicjalizowanie stanu z localStorage, jeśli dane istnieją
  const [selectedOption, setSelectedOption] = useState(() => {
    const savedOption = localStorage.getItem('step1SelectedOption');
    return savedOption ? JSON.parse(savedOption) : '';
  });

  // Funkcja obsługująca zmianę zaznaczonej opcji
  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    // Zapisywanie wybranej opcji do localStorage
    localStorage.setItem('step1SelectedOption', JSON.stringify(value));
  };

  useEffect(() => {
    // Zapisywanie stanu do localStorage po każdej zmianie
    localStorage.setItem('step1SelectedOption', JSON.stringify(selectedOption));
  }, [selectedOption]);

  return (
    <div className="step1">
      <h2 className="merriweather-light">
        Jestem Przemek. <br /> Masz już u nas konto?
      </h2>
      <div className="dates lato-light">
        <label>
          <input
            type="radio"
            name="account"
            value="Tak"
            checked={selectedOption === 'Tak'}
            onChange={handleOptionChange}
          />{" "}
          Tak
        </label>
        <label>
          <input
            type="radio"
            name="account"
            value="Nie"
            checked={selectedOption === 'Nie'}
            onChange={handleOptionChange}
          />{" "}
          Nie
        </label>
      </div>
      {/* Przycisk "Dalej" jest aktywny tylko, gdy wybrano jedną z opcji */}
      <button
        className="lato-light"
        onClick={nextStep}
        disabled={!selectedOption} // Przycisk nieaktywny, jeśli nic nie zaznaczono
      >
        Dalej
      </button>
    </div>
  );
}
