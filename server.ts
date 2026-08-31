import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { processInquiry } from './lib/process-inquiry';

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Aivolve Techs API',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/inquiries', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Aivolve Inquiries API',
      endpoint: '/api/inquiries',
      acceptedMethods: ['POST', 'GET', 'OPTIONS'],
      message:
        'Aivolve Inquiries API is operational. Submit inquiries by sending a POST request with JSON payload.',
      timestamp: new Date().toISOString(),
    });
  });

  app.post('/api/inquiries', async (req, res) => {
    const result = await processInquiry(req.body);
    return res.status(result.status).json(result.body);
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aivolve Techs dev server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
