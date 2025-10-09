export interface TeamMember {
  name: string;
  position: string;
  image: string;
  slug: string;
  additionalInfo?: string;
  email?: string;
  office?: string;
  linkedin?: string;
  googleScholar?: string;
  website?: string;
  about?: string;
  researchInterests?: string[];
}