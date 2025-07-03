# AI Code Teacher 🤖

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![OpenAI](https://img.shields.io/badge/OpenAI-gpt--4o--mini-green.svg)

An intelligent coding education platform powered by OpenAI that provides personalized, real-time programming assistance and adaptive learning experiences.

[Features](#features) • [Quick Start](#quick-start) • [Demo](#demo) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

## ✨ Features

- 🤖 **AI-Powered Teaching Assistant**
  - Real-time code explanations with Claude AI
  - Intelligent debugging assistance
  - Context-aware hint generation
  - Personalized code reviews

- 💻 **Interactive Code Editor**
  - Monaco Editor with syntax highlighting
  - Multi-language support (JavaScript, Python, HTML/CSS, and more)
  - Real-time error detection
  - Integrated AI assistance buttons

- 📚 **Adaptive Learning System**
  - Personalized learning paths based on progress
  - AI-adjusted difficulty levels
  - Dynamic exercise generation
  - Progress tracking and analytics

- 🎯 **Smart Features**
  - Conversational AI chat interface
  - Project-based learning approach
  - Instant feedback on code submissions
  - Code execution in sandboxed environment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Claude API key from [Anthropic](https://console.anthropic.com/)
- PostgreSQL (optional, for full features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Grieveren/ai-code-teacher.git
   cd ai-code-teacher
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   
   Edit `server/.env` and add your Claude API key:
   ```env
   ANTHROPIC_API_KEY=your-claude-api-key-here
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```
   
   Or use the convenient script:
   ```bash
   ./RUN_APP.sh
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🎮 Demo

### Code Editor with AI Assistance
Experience real-time AI-powered code explanations and debugging help:

- Select any code and press `Ctrl+E` (or `Cmd+E` on Mac) for instant explanations
- Use "Debug with AI" when encountering errors
- Get personalized hints for coding exercises

### Interactive Learning
Navigate to the Practice page to:
- Work on coding exercises with AI guidance
- Get real-time feedback on your solutions
- Track your progress through different difficulty levels

## 📁 Project Structure

```
ai-code-teacher/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API integration
│   │   └── hooks/         # Custom React hooks
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── api/           # REST API endpoints
│   │   ├── services/      # Business logic
│   │   │   └── claude/    # AI integration
│   │   └── middleware/    # Express middleware
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Monaco Editor** - Code editor
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching

</td>
<td valign="top" width="50%">

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Claude AI API** - AI integration
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Winston** - Logging

</td>
</tr>
</table>

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
# Server
PORT=3001
NODE_ENV=development

# Database (optional)
DATABASE_URL=postgresql://user:password@localhost:5432/teacher_app

# Authentication
JWT_SECRET=your-secret-key

# Claude AI
ANTHROPIC_API_KEY=your-claude-api-key

# Rate Limiting
AI_RATE_LIMIT_MAX_REQUESTS=10
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=AI Code Teacher
```

## 📚 Documentation

- [Setup Guide](SETUP.md) - Detailed installation instructions
- [API Documentation](#) - Coming soon
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for AI capabilities
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- All contributors and supporters of this project

---

<div align="center">
Made with ❤️ by the AI Code Teacher community
</div>