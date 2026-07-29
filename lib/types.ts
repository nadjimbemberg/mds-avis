export interface Review {
  id: number;
  author: string;
  rating: number;
  description: string;
  authorized: boolean;
  userId: number | null;
  createdAt: string;
  user?: { id: number; username: string } | null;
}

export interface ReviewsResponse {
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface Me {
  id: number;
  email: string;
  username: string;
  createdAt: string;
}
