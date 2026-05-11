export interface Review {
  id: number;
  clientName: string;
  serviceName: string | null;
  location: string | null;
  rating: number;
  reviewText: string;
  avatarLetter: string | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}