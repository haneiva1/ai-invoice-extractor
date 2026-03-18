import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const PROMPT = 'Extract invoice data and return ONLY valid JSON: {"vendor":"","invoice_number":"","date":"YYYY-MM-DD","due_date":"YYYY-MM-DD","currency":"","subtotal":0,"tax":0,"total":0,"line_items":[{"description":"","qty":0,"unit_price":0,"total":0}]}';
export async function extractInvoice(buffer: Buffer, mimetype: string) {
  const base64 = buffer.toString('base64');
  const type = mimetype.includes('pdf') ? 'image/jpeg' : mimetype;
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: [{ type: 'text', text: PROMPT }, { type: 'image_url', image_url: { url: 'data:' + type + ';base64,' + base64 } }] }],
    max_tokens: 1500,
  });
  const raw = (res.choices[0].message.content || '{}').replace(/```json|```|\n/g, '').trim();
  try { return JSON.parse(raw); } catch { return { raw, error: 'parse failed' }; }
}