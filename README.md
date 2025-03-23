
# ZETTR_NET - Personal Knowledge Network

![ZETTR_NET Interface](https://i.imgur.com/xXXxXXX.png) <!-- Replace with actual screenshot when available -->

## Project Description

ZETTR_NET is a retro-futuristic personal knowledge management system inspired by Zettelkasten note-taking methodology combined with social media paradigms. It provides an immersive terminal-like interface where users can create, connect, and explore their thoughts in a networked environment. The aesthetic draws from retro computing, cyberpunk, and techno culture, creating a unique environment for organizing personal knowledge.

## Installation Instructions

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zettr-net.git
   cd zettr-net
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Usage Instructions

### Creating New Thoughts
1. Type your thoughts in the terminal input at the top of the main stream
2. Add #tags by typing the # symbol followed by the tag name
3. Click "EXECUTE" to publish your thought to your knowledge network

### Creating Different Types of Connections
- **New Thread**: Create a series of connected thoughts by clicking the "New Thread" button
- **Quote Thought**: Reference an existing thought and add your perspective by clicking "Quote Thought"
- **Cross-Link**: Connect two thoughts together by clicking "Cross-Link"

### Navigating Your Knowledge Network
- Use the sidebar navigation to access different views of your knowledge network
- The Connection Map visualizes how your thoughts are connected
- Tags can be used to filter and organize your thoughts

## Features

- 🖥️ Immersive retro terminal interface with CRT screen effects
- 📝 Create, organize, and connect thoughts with a Zettelkasten-inspired approach
- 🏷️ Tag-based organization system
- 🔗 Different connection types: threads, quotes, and cross-links
- 📊 Visual connection map showing thought relationships
- 📱 Fully responsive design for both desktop and mobile
- 💾 Persistent storage using localStorage
- 🔍 Future AI analysis capabilities (planned)

## Technologies Used

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: React Hooks and Context API
- **Data Persistence**: localStorage
- **Others**: 
  - Sonner for toast notifications
  - React Query for future API integration

## Project Structure

```
src/
├── components/
│   ├── connections/    # Connection visualization components
│   ├── layout/         # Layout components
│   ├── posts/          # Post/thought components
│   ├── terminal/       # Terminal UI components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── App.tsx             # Main application component
```

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Coding Standards
- Follow existing code style and formatting
- Use TypeScript for type safety
- Write component-specific CSS using Tailwind classes
- Add comments for complex logic

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Original Prompt

The original concept for ZETTR_NET came from the following prompt:

> I'm thinking of the user flow as a Twitter-like Personal Diary type thing where people can just post and log things through the day. Kind of like Twitter as well as a live stream of your brain. The background AI analyzes your posts in chronological order, identifying patterns and then provides responses or quote tweets with ideas, patterns, or help create connections. The idea is the person just types and writes however they normally do, and in the background it analyzes the stream of content to surface insights.

## Troubleshooting

### Common Issues

**Issue**: Posts not appearing after creation
**Solution**: Ensure localStorage is enabled in your browser and that you're not in private/incognito mode

**Issue**: UI display problems
**Solution**: Try refreshing the page or clearing your browser cache

**Issue**: Mobile navigation issues
**Solution**: Use the floating menu button in the bottom right corner to access navigation on mobile devices

## Future Improvements

- 🧠 AI analysis of thought patterns to suggest connections and insights
- 🔄 Twitter API integration to import tweets as thoughts
- 🔍 Advanced search and filtering capabilities
- 🗂️ Custom organizational systems beyond tags
- 👥 Optional collaborative features for shared knowledge spaces
- 📊 Advanced visualization options for the knowledge graph
- 📱 Progressive Web App (PWA) support for offline usage
- 🔐 End-to-end encryption for sensitive thoughts
- 🗃️ Data export and import functionality

---

Created with [Lovable](https://lovable.dev)
