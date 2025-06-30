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

## 📝 Data Management

All content data is stored in TypeScript files within the `src/data` directory. Here's how to modify each data type:

### Publications (`publications.ts`)
```typescript
export interface Publication {
  slug: string;
  title: string;
  authors: string;
  shortAuthors: string;
  date: Date;
  venue: string;
  paperLink: string;
  codeLink?: string;
  demoLink?: string;
  bibtex: string;
  abstract: string;
}
```

### News (`news.ts`)
```typescript
export interface News {
    title: string;
    description: string;
    date: Date;
    link?: string;
}
```

### Team Members (`teamMembers.ts`)
```typescript
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  googleScholar?: string;
}
```

### Research Areas (`researchAreas.ts`)
```typescript
export interface ResearchArea {
    title: string;
    description: string;
    details: string[];
    image: string;
}
```

### Gallery Photos (`gallery.ts`)
```typescript
export interface GalleryPhoto {
  path: string;
  description: string;
  date: Date;
}
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