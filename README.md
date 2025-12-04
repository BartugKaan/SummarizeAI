# SummarizeAI ✨

A modern, AI-powered text summarization web application built with Next.js 16, React 19, and OpenAI GPT-3.5. Paste any text and get a concise summary in seconds.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql)

## Features

- **AI-Powered Summarization** — Leverages OpenAI GPT-3.5 Turbo for intelligent text summarization
- **Summary History** — Save and browse your previous summaries with PostgreSQL persistence
- **Modern UI** — Beautiful glassmorphism design with smooth animations and responsive layout
- **Real-time Feedback** — Character count, loading states, and error handling
- **Docker Ready** — PostgreSQL database setup with Docker Compose

## Tech Stack

| Category         | Technology                 |
| ---------------- | -------------------------- |
| Framework        | Next.js 16 (App Router)    |
| Frontend         | React 19, TailwindCSS 4    |
| Language         | TypeScript 5               |
| Database         | PostgreSQL 16 + Prisma ORM |
| AI               | OpenAI GPT-3.5 Turbo       |
| Containerization | Docker Compose             |

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for database)
- OpenAI API Key

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/summarize-ai.git
cd summarize-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://summarize_ai_user:summarize_ai_password@localhost:5432/summarize_ai_db"
OPENAI_API_KEY="your-openai-api-key-here"
```

### 4. Start the Database

```bash
docker-compose up -d
```

### 5. Run Database Migrations

```bash
npx prisma migrate dev
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
summarize-ai/
├── app/
│   ├── api/
│   │   ├── summarize/       # AI summarization endpoint
│   │   ├── save-summary/    # Save summary to database
│   │   └── summaries/       # Fetch summary history
│   ├── page.tsx             # Main page
│   └── layout.tsx           # Root layout
├── components/
│   ├── SummaryForm.tsx      # Text input & summarization UI
│   └── HistoryList.tsx      # Summary history display
├── lib/
│   ├── ai.ts                # OpenAI integration
│   ├── prisma.ts            # Prisma client
│   └── env.ts               # Environment utilities
├── prisma/
│   └── schema.prisma        # Database schema
└── docker-compose.yml       # PostgreSQL container config
```

## API Endpoints

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/summarize`    | Summarize text using AI    |
| POST   | `/api/save-summary` | Save a summary to database |
| GET    | `/api/summaries`    | Retrieve summary history   |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Database Schema

```prisma
model Summary {
  id           String   @id @default(uuid())
  originalText String
  summary      String
  createdAt    DateTime @default(now())
}
```

## Environment Variables

| Variable         | Description                  | Required |
| ---------------- | ---------------------------- | -------- |
| `DATABASE_URL`   | PostgreSQL connection string | Yes      |
| `OPENAI_API_KEY` | OpenAI API key for GPT-3.5   | Yes      |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---
