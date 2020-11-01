export interface User {
  userId: string;
  email: string;
  password: string;
  categories: Category[];
  lists: List[];
  items: Item[];
}

export interface Category {
  categoryId: string;
  name: string;
}

export interface List {
  listId: string;
  name: string;
  isCurrent: boolean;
  createdAt: Date
}