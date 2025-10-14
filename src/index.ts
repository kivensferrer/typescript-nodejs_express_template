import express from 'express';
import dotenv from 'dotenv';
import helloRoutes from './routes/hello.routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies for POST/PUT/PATCH
app.use(express.json());

// Mount our new pattern-based route
app.use('/api/hello', helloRoutes);

// Keep your simple root health check
app.get('/', (_req, res) => res.send('OK'));

// Optional: central 404 + error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
