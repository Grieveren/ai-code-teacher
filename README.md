# AI-Powered Coding Education Platform

An intelligent coding education app that uses AI to provide personalized, conversational learning experiences with real-time code assistance and adaptive teaching.

## Features

- **AI Teaching Assistant**: Natural language explanations and real-time code help
- **Interactive Code Editor**: In-browser coding with syntax highlighting and AI feedback
- **Adaptive Learning**: Personalized learning paths based on progress and performance
- **Conversational Learning**: Chat with AI to ask questions and get explanations
- **Dynamic Content**: AI-generated exercises tailored to student needs

## Tech Stack

- **Frontend**: React, TypeScript, Monaco Editor
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: Claude API (Anthropic)
- **Database**: PostgreSQL
- **Code Execution**: Docker containers
- **Styling**: Tailwind CSS

## Project Structure

```
teacher-app/
├── client/                 # React frontend application
├── server/                 # Node.js backend API
├── database/              # Database migrations and schemas
├── docker/                # Docker configurations
├── prompts/               # AI prompt templates
├── config/                # Configuration files
└── content/               # Lesson content and exercises
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker
- PostgreSQL
- Claude API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. Set up environment variables (see `.env.example` files)

4. Start development servers:
   ```bash
   # Start backend
   cd server && npm run dev
   
   # Start frontend (in another terminal)
   cd client && npm start
   ```

## Development

- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:3000`

## License

MIT