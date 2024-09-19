import React, { useState } from 'react';

import './emailForm.scss'
import api from '../../utils/axios';

const EmailForm = ({ onClose }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [note, setNote] = useState('');
  const [senderName, setSenderName] = useState(''); // Imię i nazwisko nadawcy
  const [propertyAddress, setPropertyAddress] = useState(''); // Adres nieruchomości
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Redagowanie wiadomości e-mail z dynamicznymi danymi
    const message = `
      Dzień dobry,
      W imieniu Pani/Pana ${senderName}, zwracamy się z prośbą o pomoc w uzupełnieniu informacji dotyczących nieruchomości położonej przy ul. ${propertyAddress}, 
      Państwa wiedza i doświadczenie jako zarządcy przedmiotowej nieruchomości będą  nieocenione w procesie przygotowania Świadectwa charakterystyki energetycznej tej nieruchomości.

      W załączonym pliku PDF znajdą Państwo pytania, na które odpowiedzi pozwolą nam sporządzić certyfikat. Będziemy wdzięczni za wypełnienie dokumentu i odesłanie go na adres e-mail (${from}) lub na adres firmy Certyfikaty: kontakt@certyfikaty.pl.

      Dziękujemy za poświęcony czas i wsparcie. Państwa wiedza techniczna jest kluczowa dla sprawnego zakończenia tego procesu.

      Z wyrazami szacunku,
      Przemysław Rakotny 
      W imieniu Certyfikaty.pl
    `;

    try {
      await api.post('/send-email', { 
        from, 
        to, 
        note: message // Przesyłamy dynamicznie utworzoną wiadomość
      });
      alert('Email wysłany pomyślnie!');
      onClose(); // Zamknięcie formularza po udanym wysłaniu
    } catch (err) {
      setError('Wystąpił błąd podczas wysyłania e-maila.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-form-popup">
      <h2>Wyślij wiadomość e-mail</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Imię i nazwisko nadawcy:
          <input 
            type="text" 
            value={senderName} 
            onChange={(e) => setSenderName(e.target.value)} 
            required 
          />
        </label>
        <label>
          Adres nieruchomości:
          <input 
            type="text" 
            value={propertyAddress} 
            onChange={(e) => setPropertyAddress(e.target.value)} 
            required 
          />
        </label>
        <label>
          Od:
          <input 
            type="email" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)} 
            required 
          />
        </label>
        <label>
          Do:
          <input 
            type="email" 
            value={to} 
            onChange={(e) => setTo(e.target.value)} 
            required 
          />
        </label>
        <button type="submit" disabled={loading}>Wyślij</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={onClose}>Anuluj</button>
    </div>
  );
};

export default EmailForm;
