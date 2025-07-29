# Search Engine Frontend

A modern, responsive React frontend for the search API with autocomplete, instant answers, and pagination.

## Features

- 🔍 **Smart Search Bar** with autocomplete suggestions
- ⚡ **Instant Answers** from DuckDuckGo API
- 📄 **Pagination** for browsing through results
- 🎨 **Modern UI** with Tailwind CSS
- 📱 **Responsive Design** for all devices
- 🔄 **Real-time Search** with debounced autocomplete

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- The Spring Boot search API running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## API Endpoints Used

The frontend communicates with the following API endpoints:

- `GET /api/search` - Main search functionality
- `GET /api/autoComplete` - Autocomplete suggestions
- `GET /api/search/ddg-instant` - Instant answers from DuckDuckGo

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SearchBar.js          # Main search input with autocomplete
│   │   ├── SearchResults.js      # Display search results
│   │   ├── InstantAnswer.js      # Show instant answers
│   │   └── Pagination.js         # Page navigation
│   ├── services/
│   │   └── api.js               # API communication functions
│   ├── App.js                   # Main application component
│   ├── index.js                 # Application entry point
│   └── index.css                # Global styles with Tailwind
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Configuration

The frontend is configured to proxy requests to `http://localhost:8080` (the Spring Boot API). If your API runs on a different port or URL, update the `proxy` field in `package.json` or set the `REACT_APP_API_URL` environment variable.

## Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Create React App** - Build tool

## Development

The frontend is built with modern React practices:

- Functional components with hooks
- Async/await for API calls
- Responsive design with Tailwind CSS
- Error handling and loading states
- Debounced autocomplete for better UX 