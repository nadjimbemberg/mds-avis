import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import route from '../routes/index';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const FRONTEND_URL = process.env.APP_URL || 'http://localhost:3001';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use('/', route);

// Gestionnaire d'erreurs centralisé
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur serveur interne' });
});

const server = app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

const shutdown = () => {
    server.close(() => {
        console.log('Serveur arrêté proprement');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
