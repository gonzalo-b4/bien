const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API está funcionando :)');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  }
});

const upload = multer({ storage: storage });

app.post('/images/single', upload.single('imageUrlFrente'), (req, res) => {
  console.log('Archivo recibido:', req.file);
  console.log('Cuerpo de la solicitud:', req.body);

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const description = req.body.description;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    message: 'Archivo subido correctamente.',
    imageUrl: imageUrl,
    description: description
  });
});