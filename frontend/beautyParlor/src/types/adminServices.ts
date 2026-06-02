export interface AdminService {
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
  createdAt: string;
  updatedAt: string;
}

export interface AdminServiceForm {
  slug: string;
  number: string;
  label: string;
  title: string;
  image: string;
  description: string;
  paragraphs: string;
  includes: string;
  isActive: boolean;
}