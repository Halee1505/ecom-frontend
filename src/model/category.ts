export interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  child: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}
