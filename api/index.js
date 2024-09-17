import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors'; // Importowanie cors

// Ładowanie zmiennych środowiskowych
dotenv.config();

const app = express(); // Inicjalizacja aplikacji Express

// Middleware do obsługi danych w formacie JSON
app.use(express.json());

// Middleware CORS
app.use(cors()); // Użycie middleware CORS

// Konfiguracja ścieżki do plików statycznych (np. PDF)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint do wysyłania e-maili
app.post('/api/send-email', async (req, res) => {
    const { from, to, note } = req.body;
    
    if (!from || !to || !note) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Konfiguracja transportu nodemailer z użyciem Gmaila
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from,
      to,
      subject: 'Wiadomość z formularza',
      text: note,
      attachments: [
        {
          filename: 'upr.pdf',
          path: path.join(__dirname, 'public', 'pdf', 'upr.pdf'),
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  });

// Uruchomienie serwera na porcie 5000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
