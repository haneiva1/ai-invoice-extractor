import { FastifyInstance } from 'fastify';
import { extractInvoice } from '../services/extractor';
import * as XLSX from 'xlsx';
export async function extractRouter(app: FastifyInstance) {
  app.post('/', async (req: any, reply) => {
    const file = await req.file();
    const buf = await file.toBuffer();
    return reply.send(await extractInvoice(buf, file.mimetype));
  });
  app.post('/excel', async (req: any, reply) => {
    const file = await req.file();
    const buf = await file.toBuffer();
    const data = await extractInvoice(buf, file.mimetype);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([data]), 'Invoice');
    if (data.line_items) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.line_items), 'Line Items');
    const out = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename=invoice.xlsx');
    return reply.send(out);
  });
}