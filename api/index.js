import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';

// Ładowanie zmiennych środowiskowych
dotenv.config();

const app = express();

// Middleware do obsługi danych w formacie JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Konfiguracja ścieżki do plików statycznych (np. PDF)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ustawienia Multer - miejsce, gdzie będą zapisywane pliki
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pdfDirectory = path.join(__dirname, 'public', 'pdf');
    cb(null, pdfDirectory); // Ścieżka, gdzie mają być zapisywane pliki
  },
  filename: (req, file, cb) => {
    // Stała nazwa pliku: 'pytania.pdf'
    cb(null, 'pytania.pdf');
  },
});

const upload = multer({ storage });

// Endpoint do przesyłania pliku PDF
app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    filePath: '/public/pdf/pytania.pdf',
  });
});

// Endpoint do wysyłania e-maili z załączonym plikiem PDF
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
    replyTo: from,
    attachments: [
      {
        filename: 'pytania.pdf', // Plik będzie miał nazwę 'pytania.pdf'
        path: path.join(__dirname, 'public', 'pdf', 'pytania.pdf'),
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
