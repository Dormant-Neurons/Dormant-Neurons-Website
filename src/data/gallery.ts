export interface GalleryPhoto {
  path: string;
  description: string;
  date: Date;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    path: "gallery/company_run_2025.jpg",
    description: "Dormant Neurons team at Saarbrücken Company Run 2025",
    date: new Date("2025-06-18"),
  },
  {
    path: "gallery/aisec-2024.jpeg",
    description: "Keynote speaker at AISec 2024 in Salt Lake City on 'Challenges and Threats in Generative AI: Misuse and Exploits'",
    date: new Date("2024-10-18"),
  },
  {
    path: "gallery/icml-poster.jpeg",
    description: "ICML poster presentation",
    date: new Date("2024-06-08"),
  },
  {
    path: "gallery/retreat.jpeg",
    description: "Team retreat",
    date: new Date("2024-06-05"),
  },
]; 