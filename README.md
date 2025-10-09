# Dormant Neurons


## 🚀 Tech Stack
- **Frontend**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide
- **Deployment**: Vercel

## 📋 Prerequisites
- Node.js
- npm or yarn

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/{username}/{repo-name}.git
   cd {repo-name}
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📁 Project Structure

```
dormant-neurons/
├── src/
│   ├── components/    # Reusable UI components
│   ├── data/          # Data files (publications, news, etc.)
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## 🎨 Styling

The project uses Tailwind CSS for styling. Key variables are defined in `tailwind.config.js`

## 🚀 To handle client-side routing in deployment

The project is configured for deployment on Vercel. The `vercel.json` file handles client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.