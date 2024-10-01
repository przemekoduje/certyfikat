import React, { useState, useEffect } from "react";
import "./formPage.scss";
import Step1 from "../../components/forms/step1/Step1";
import Step2 from "../../components/forms/step2/Step2";
import Step3 from "../../components/forms/step3/Step3";
import Step4 from "../../components/forms/step4/Step4";
import Step5 from "../../components/forms/step5/Step5";
import Step6 from "../../components/forms/step6/Step6";
import Step7 from "../../components/forms/step7/Step7";
import Step8 from "../../components/forms/step8/Step8";
import EmailForm from "../../components/emailForm/EmailForm";
import jsPDF from "jspdf";

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);

  const handleShowEmailForm = () => {
    setShowEmailForm(true);
  };

  const handleCloseEmailForm = () => {
    setShowEmailForm(false);
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          step1Data: {},
          step2Data: {},
          step3Data: {},
          step4Data: {},
          step5Data: {},
          step6Data: {},
          step7Data: {},
          step8Data: {},
        };
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", currentStep);
  }, [formData, currentStep]);

  const resetForm = () => {
    localStorage.removeItem("step1SelectedOption");
    localStorage.removeItem("step7SelectedOptions");
    localStorage.removeItem("formData");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("step2FormData");
    localStorage.removeItem("step3FormData");
    localStorage.removeItem("step4FormData");
    localStorage.removeItem("step5FormData");
    localStorage.removeItem("step6FormData");
    localStorage.removeItem("step7Komentarz");
    localStorage.removeItem("step7SelectedOpti");

    setFormData({
      step1Data: {},
      step2Data: {},
      step3Data: {},
      step4Data: {},
      step5Data: {},
      step6Data: {},
      step7Data: {
        komentarz: "",
        selectedOptions: {},
      },
      step8Data: {},
    });

    setCurrentStep(1);
    setSkippedQuestions([]); // Zresetowanie pominiętych pytań
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      const next = prevStep + 1;
      localStorage.setItem("currentStep", next);
      return next;
    });
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => {
        const prev = prevStep - 1;
        localStorage.setItem("currentStep", prev);
        return prev;
      });
    }
  };

  const resetCurrentStep = () => {
    setFormData((prevData) => {
      const newData = { ...prevData, [`step${currentStep}Data`]: {} };
      localStorage.setItem("formData", JSON.stringify(newData));
      return newData;
    });
  };

  const updateFormData = (step, data) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [`step${step}Data`]: data };
      localStorage.setItem("formData", JSON.stringify(newData));
      return newData;
    });
  };

  // Funkcja dodająca pytanie do pominiętych, z opcjami
  const addSkippedQuestion = (step, question, options = []) => {
    setSkippedQuestions((prevQuestions) => [
      ...prevQuestions,
      { step, question, options },
    ]);
  };

  const handleResetClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelReset = () => {
    setShowConfirmation(false);
  };

  const handleConfirmReset = () => {
    resetForm();
    setShowConfirmation(false);
  };

  // Funkcja do renderowania listy pominiętych pytań wraz z opcjami
  const renderSkippedQuestions = () => (
    <div>
      <h2>Pominięte pytania:</h2>
      {skippedQuestions.length > 0 ? (
        skippedQuestions.map((item, index) => (
          <div key={index}>
            <p>
              <strong>Krok {item.step}:</strong> {item.question}
            </p>
            {item.options.length > 0 && (
              <ul>
                {item.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>Brak pominiętych pytań</p>
      )}
    </div>
  );

  const generateAndSendPDF = () => {
    const doc = new jsPDF();
    doc.text("Pominięte pytania:", 10, 10);
  
    skippedQuestions.forEach((item, index) => {
      doc.text(`Krok ${item.step}: ${item.question}`, 10, 20 + index * 10);
      if (item.options.length > 0) {
        item.options.forEach((option, optIndex) => {
          doc.text(`- ${option}`, 10, 30 + index * 10 + optIndex * 10);
        });
      }
    });
  
    // Utwórz blob PDF, ale nie zapisuj go lokalnie
    const pdfBlob = doc.output('blob');
  
    // Utwórz obiekt FormData, aby wysłać plik do backendu
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'pytania.pdf'); // Dodajemy nazwę pliku 'pytania.pdf'
  
    // Wyślij PDF na backend
    fetch('http://localhost:3001/api/upload-pdf', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sukces:', data);
      })
      .catch((error) => {
        console.error('Błąd:', error);
      });
  };
  
  

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            data={formData.step1Data}
            setData={(data) => updateFormData(1, data)}
            nextStep={nextStep}
            prevStep={prevStep}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 2:
        return (
          <Step2
            data={formData.step2Data}
            setData={(data) => updateFormData(2, data)}
            nextStep={nextStep}
            prevStep={prevStep}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 3:
        return (
          <Step3
            data={formData.step3Data}
            setData={(data) => updateFormData(3, data)}
            nextStep={nextStep}
            prevStep={prevStep}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 4:
        return (
          <Step4
            data={formData.step4Data}
            setData={(data) => updateFormData(4, data)}
            nextStep={nextStep}
            prevStep={prevStep}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 5:
        return (
          <Step5
            nextStep={nextStep}
            prevStep={prevStep}
            skippedQuestions={skippedQuestions}
            setSkippedQuestions={setSkippedQuestions}
            data={formData.step5Data}
            setData={(data) => updateFormData(5, data)}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 6:
        return (
          <Step6
            nextStep={nextStep}
            prevStep={prevStep}
            skippedQuestions={skippedQuestions}
            setSkippedQuestions={setSkippedQuestions}
            data={formData.step6Data}
            setData={(data) => updateFormData(6, data)}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 7:
        return (
          <Step7
            data={formData.step7Data}
            setData={(data) => updateFormData(7, data)}
            nextStep={nextStep}
            prevStep={prevStep}
            resetCurrentStep={resetCurrentStep}
            addSkippedQuestion={addSkippedQuestion}
          />
        );
      case 8:
        return (
          <div>
            <Step8
              data={formData.step8Data}
              setData={(data) => updateFormData(8, data)}
              nextStep={nextStep}
              prevStep={prevStep}
              resetCurrentStep={resetCurrentStep}
              addSkippedQuestion={addSkippedQuestion}
            />
            {renderSkippedQuestions()} {/* Wyświetlenie pominiętych pytań */}
            <button onClick={generateAndSendPDF}>
              Generuj PDF z pominiętymi pytaniami
            </button>
          </div>
        );
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <div className="form-page">
      <div className={`content ${showConfirmation ? "blur-background" : ""}`}>
        <div className="headPhoto">
          <img src="/images/profil.jpg" alt="Profile" />
        </div>
        <hr className="full-width-line" />

        <div className="left-section">
          <img
            src="/images/back05 2.png"
            alt="Background"
            className="reacting-image"
          />
        </div>

        <div className="right-section">
          <button onClick={handleShowEmailForm}>Wyślij e-mail</button>
          {showEmailForm && <EmailForm onClose={handleCloseEmailForm} />}
          {renderStep()}
          <button className="reset-button" onClick={handleResetClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#5f6368"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l4 3.99L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" />
            </svg>
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-popup lato-light">
          <h3>Rozpoczynamy od nowa?</h3>
          <p>To spowoduje wyczyszczenie pól formularza i powrót do początku</p>
          <div className="confirmation-buttons">
            <button onClick={handleConfirmReset}>Tak</button>
            <button onClick={handleCancelReset}>Nie</button>
          </div>
        </div>
      )}
    </div>
  );
}