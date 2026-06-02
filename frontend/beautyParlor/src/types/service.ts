export interface Service {
  id: number;
  slug: string;
  number: string | null;
  label: string | null;
  title: string;
  image: string | null;
  description: string;
  paragraphs: string[];
  includes: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}