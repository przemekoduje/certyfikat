import React, { useState } from 'react';

import './emailForm.scss'
import api from '../../utils/axios';

const EmailForm = ({ onClose }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post('/send-email', { from, to, note });
      alert('Email wysłany pomyślnie!');
      onClose(); // Zamknij formularz po udanym wysłaniu
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
          Od:
          <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} required />
        </label>
        <label>
          Do:
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required />
        </label>
        <label>
          Treść:
          <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>Wyślij</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={onClose}>Anuluj</button>
    </div>
  );
};

export default EmailForm;
