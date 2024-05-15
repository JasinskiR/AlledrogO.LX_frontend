export interface Post {
  id: string;
  title: string;
  description?: string;
  image?: string;
  images?: string[];
  tags?: string[];
  status?: number;
  authorId?: string;
  authorDetails?: {
    email: string;
    phoneNumber: string;
  };
}