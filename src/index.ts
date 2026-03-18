import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import { extractRouter } from './routes/extract';
const app = Fastify({ logger: true });
app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } });
app.register(extractRouter, { prefix: '/extract' });
app.get('/health', async () => ({ status: 'ok' }));
app.listen({ port: parseInt(process.env.PORT || '3000'), host: '0.0.0.0' });