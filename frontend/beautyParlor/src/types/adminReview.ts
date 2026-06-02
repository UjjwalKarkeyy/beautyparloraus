export interface AdminReview {
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

export interface AdminReviewForm {
  clientName: string;
  serviceName: string;
  location: string;
  rating: string;
  reviewText: string;
  avatarLetter: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: string;
}