
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Document = {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  category: Category;
  tags: Tag[];
  views: number;
  likes: number;
  filePath?: string;
  fileType?: string;
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  documentId: string;
};

export type SearchResult = {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  author: User;
  createdAt: string;
  views: number;
};

export type AnalyticData = {
  mostViewedDocs: { title: string; views: number }[];
  categoryDistribution: { name: string; count: number }[];
  activityOverTime: { date: string; documents: number; comments: number }[];
  topContributors: { name: string; contributions: number }[];
};
