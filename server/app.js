const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const session = require('express-session')
const productRouter = require('./routers/productRouter.js');
const sesionRouter = require('./routers/sesionRouter.js');
const CartRouter = require('./routers/CartRouter.js')
dotenv.config();
const mongoose = require('./config/dbconfig/dbconfig');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes desde este origen 
  credentials: true, // Permite que las solicitudes incluyan cookies
}));
app.use(cookieParser())//convierte las cookeis en objetos json

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
const session_params ={
  secret: 'keySecret',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}
app.use(session(session_params))

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img');  // Directorio donde se almacenarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

// Rutas
app.use('/api/products', upload.single('img'), productRouter);
app.use(sesionRouter);
app.use(CartRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}/`);
});
