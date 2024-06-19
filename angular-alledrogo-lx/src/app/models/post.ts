interface Image {
  id: string;
  url: string;
  isMain: boolean;
}

export interface Post {
  id: string;
  title: string;
  description?: string;
  image?: string;
  images?: Image[];
  tags?: string[];
  status?: number;
  authorId: string;
  authorDetails?: {
    email: string;
    phoneNumber: string;
  };
}
