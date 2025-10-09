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