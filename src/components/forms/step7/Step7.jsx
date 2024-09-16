import React, { useEffect, useState } from "react";
import "./step7.scss";

export default function Step7({ prevStep, nextStep }) {
  // Inicjalizowanie stanu z localStorage, jeśli dane istnieją
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem('step7SelectedOptions');
    return savedOptions ? JSON.parse(savedOptions) : {
      klimatyzacja: false,
      fotowoltaika: false,
      balkon: false,
      parter: false,
      ostatniePietro: false,
    };
  });

  const [komentarz, setKomentarz] = useState(() => {
    const savedKomentarz = localStorage.getItem('step7Komentarz');
    return savedKomentarz ? savedKomentarz : "";
  });

  // Funkcja obsługująca zmianę zaznaczonej opcji
  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  // Funkcja obsługująca zmianę tekstu w textarea
  const handleKomentarzChange = (e) => {
    setKomentarz(e.target.value);
  };

  useEffect(() => {
    // Zapisywanie stanu do localStorage po każdej zmianie
    localStorage.setItem('step7SelectedOptions', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  useEffect(() => {
    // Zapisywanie tekstu komentarza do localStorage po każdej zmianie
    localStorage.setItem('step7Komentarz', komentarz);
  }, [komentarz]);

  return (
    <div className="step7">
      <h2 className="merriweather-light">Informacje pozostałe</h2>
      <div className="dates lato-light">
        <label>
          <input
            type="checkbox"
            name="klimatyzacja"
            checked={selectedOptions.klimatyzacja}
            onChange={handleOptionChange}
          />{" "}
          Zaznacz, jeśli budynek posiada klimatyzację
        </label>
        <label>
          <input
            type="checkbox"
            name="fotowoltaika"
            checked={selectedOptions.fotowoltaika}
            onChange={handleOptionChange}
          />{" "}
          Zaznacz, jeśli budynek posiada fotowoltaikę
        </label>
        <label>
          <input
            type="checkbox"
            name="balkon"
            checked={selectedOptions.balkon}
            onChange={handleOptionChange}
          />{" "}
          Zaznacz, jeśli jest balkon/taras
        </label>
        <label>
          <input
            type="checkbox"
            name="parter"
            checked={selectedOptions.parter}
            onChange={handleOptionChange}
          />{" "}
          Zaznacz, jeśli mieszkanie jest na parterze
        </label>
        <label>
          <input
            type="checkbox"
            name="ostatniePietro"
            checked={selectedOptions.ostatniePietro}
            onChange={handleOptionChange}
          />{" "}
          Zaznacz, jeśli mieszkanie jest na ostatnim piętrze
        </label>
      </div>

      {/* Textarea dla dodatkowego komentarza */}
      <div className="textarea-wrapper">
        <textarea
          className="textArea"
          id="komentarz"
          name="komentarz"
          value={komentarz}
          onChange={handleKomentarzChange}
          rows="6"
          cols="40"
          placeholder="Wpisz inne istotne informacje."
        ></textarea>
      </div>

      {/* Przycisk "Dalej" */}
      <button className="back" onClick={prevStep}>
        &#x2190;
      </button>
      <button className="lato-light" onClick={nextStep}>
        Dalej
      </button>
    </div>
  );
}
