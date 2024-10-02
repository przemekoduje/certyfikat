import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url'; // Importujemy z `url`, aby utworzyć `__dirname`
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';

// Ładowanie zmiennych środowiskowych
dotenv.config();

const app = express();

// Definiowanie `__dirname` w module ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware do obsługi danych w formacie JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Serwowanie plików statycznych
app.use(express.static(path.join(__dirname, 'public')));

// Upewnij się, że folder do zapisu PDF istnieje
const pdfDirectory = path.join(__dirname, 'public', 'pdf');
if (!fs.existsSync(pdfDirectory)) {
  fs.mkdirSync(pdfDirectory, { recursive: true });
}

// Ustawienia Multer - miejsce, gdzie będą zapisywane pliki
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfDirectory); // Ścieżka, gdzie mają być zapisywane pliki
  },
  filename: (req, file, cb) => {
    // Stała nazwa pliku: 'pytaniaChat.pdf'
    cb(null, 'pytaniaChat.pdf');
  },
});

const upload = multer({ storage });

// Nowy endpoint do odbierania danych z formularza i plików
app.post('/api/send-form-data', upload.fields([
  { name: 'exteriorPhoto', maxCount: 1 },
  { name: 'propertyLayout', maxCount: 1 },
  { name: 'additionalPhoto', maxCount: 1 }
]), (req, res) => {
  const { userAnswers } = req.body; // Dane formularza
  const uploadedFiles = req.files; // Pliki załączone przez użytkownika

  if (!userAnswers || Object.keys(userAnswers).length === 0) {
    return res.status(400).json({ message: 'No form data provided' });
  }

  console.log("Otrzymano dane użytkownika:", userAnswers);
  console.log("Otrzymano pliki:", uploadedFiles);

  // Przykładowa logika - np. zapis danych do pliku lub bazy danych

  res.status(200).json({
    message: 'Dane i pliki zostały pomyślnie przesłane!',
    files: uploadedFiles
  });
});





// Endpoint do przesyłania pliku PDF
app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    filePath: '/public/pdf/pytaniaChat.pdf',
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
        filename: 'pytaniaChat.pdf', // Plik będzie miał nazwę 'pytaniaChat.pdf'
        path: path.join(__dirname, 'public', 'pdf', 'pytaniaChat.pdf'),
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
