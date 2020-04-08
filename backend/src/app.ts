import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

require('custom-env').env(true)

import indexRoutes from './routes/index';

// Initializations
const app: Application = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('url', process.env.DIST_FOLDER);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/api', indexRoutes);

// Esta aplicación será usado para almacenar archivos públicos
app.use('/uploads', express.static(path.resolve('uploads')));


// PONGO A SERVIR LA RUTA DE MIS ARCHIVOS
app.use(express.static(path.join(__dirname, app.get('url'))));

// DEVUELVO MI INDEX.HTML CUANDO SE APUNTE A CUALQUIER RUTA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, app.get('url')+'/index.html'));
});


export default app;
