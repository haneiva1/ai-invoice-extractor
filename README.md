# ai-invoice-extractor

Extract structured data from any invoice or PDF using AI. Upload a file, get back clean JSON — or push directly to Excel or Google Sheets.

## Demo

```
Input:  invoice.pdf (any format, any language)
Output: {
  "vendor": "Acme Corp",
  "invoice_number": "INV-2024-0892",
  "date": "2024-03-15",
  "total": 1250.00,
  "currency": "USD",
  "line_items": [{ "description": "Web Dev", "qty": 10, "unit_price": 125, "total": 1250 }]
}
```

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| AI | OpenAI GPT-4o Vision |
| API | Fastify |
| Output | JSON / Excel (xlsx) / Google Sheets |

## Features

- Any invoice format: PDF, PNG, JPG
- Multi-language (Spanish, English, Portuguese, etc.)
- Extracts vendor, invoice #, dates, line items, totals, tax
- Confidence score per field
- Batch processing support
- Excel export + Google Sheets push
- Webhook on completion

## Setup

```bash
git clone https://github.com/haneiva1/ai-invoice-extractor
cd ai-invoice-extractor && npm install
cp .env.example .env && npm run dev
```

## API

```bash
# Single invoice
curl -X POST http://localhost:3000/extract -F "file=@invoice.pdf"

# Export to Excel
curl -X POST http://localhost:3000/extract/excel -F "file=@invoice.pdf" --output result.xlsx

# Push to Google Sheets
curl -X POST http://localhost:3000/extract/sheets -F "file=@invoice.pdf"
```

---
Built by **Hans Aneiva** — AI automation developer, La Paz, Bolivia.