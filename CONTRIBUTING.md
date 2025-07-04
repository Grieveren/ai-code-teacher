# Contributing to AI Code Teacher

First off, thank you for considering contributing to AI Code Teacher! It's people like you that make AI Code Teacher such a great tool for learning to code.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem
* **Describe the exact steps which reproduce the problem** in as many details as possible
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs** if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior** and **explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these beginner and help-wanted issues:

* [Beginner issues](https://github.com/Grieveren/ai-code-teacher/labels/beginner) - issues which should only require a few lines of code
* [Help wanted issues](https://github.com/Grieveren/ai-code-teacher/labels/help%20wanted) - issues which should be a bit more involved

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows the existing code style
6. Issue that pull request!

## Development Process

1. **Set up your development environment**
   ```bash
   git clone https://github.com/Grieveren/ai-code-teacher.git
   cd ai-code-teacher
   npm install
   npm run install:all
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Add comments where necessary
   - Follow the existing code style
   - Write/update tests as needed

4. **Test your changes**
   ```bash
   npm run test        # Run tests
   npm run typecheck   # Check TypeScript
   npm run lint        # Check code style
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

6. **Push to your fork and submit a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Style Guidelines

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript/TypeScript Style Guide

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Use TypeScript types wherever possible
* Prefer const over let
* Use meaningful variable names

### React/Component Guidelines

* Use functional components with hooks
* Keep components small and focused
* Use TypeScript interfaces for props
* Place styles in separate files or use Tailwind classes
* Write tests for new components

## Project Structure

```
ai-code-teacher/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── hooks/       # Custom hooks
│   │   └── types/       # TypeScript types
├── server/              # Express backend
│   ├── src/
│   │   ├── api/         # API routes
│   │   ├── services/    # Business logic
│   │   └── middleware/  # Express middleware
```

## Adding New Features

1. **AI Features**: New AI features should be added to `server/src/services/openai/`
2. **API Endpoints**: Add new routes to `server/src/api/`
3. **UI Components**: Add new components to `client/src/components/`
4. **Pages**: Add new pages to `client/src/pages/`

## Testing

* Write unit tests for new functions
* Write integration tests for new API endpoints
* Test AI features with various inputs
* Ensure UI components render correctly

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉