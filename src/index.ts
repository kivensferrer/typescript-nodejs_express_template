import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import helloRoutes from './v1/hello/hello.routes';
import { loadOpenApiDoc } from './docs/loader';
import { errorHandler, notFound } from './middlewares/error.middleware';
import { Logger } from './utils/logging';
import { ConsoleTransport } from './utils/logging/transports/console.transport';

dotenv.config();
Logger.register(new ConsoleTransport());

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/** Routes */
app.use('/api/hello', helloRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/** Swagger UI */
(async () => {
  try {
    const doc = await loadOpenApiDoc();

    app.get('/openapi.json', (_req, res) => res.json(doc));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));
    app.use(notFound);
    app.use(errorHandler);

    // start server
    app.listen(PORT, () => {
      Logger.info(`Server running on http://localhost:${PORT}`);
      Logger.info(`Swagger UI        → http://localhost:${PORT}/docs`);
      Logger.info(`OpenAPI (JSON)    → http://localhost:${PORT}/openapi.json`);
    });
  } catch (e) {
    console.error('Failed to load OpenAPI doc:', e);
    process.exit(1);
  }
})();
