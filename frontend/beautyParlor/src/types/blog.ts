export interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  author: string | null;
  readTime: string | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogForm {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  readTime: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: string;
}