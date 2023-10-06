import { Category } from "./category";

export interface Product {
  _id?: string;
  name: string;
  image: string;
  slug: string;
  category: Category;
  description: string;
  price: number;
  inventory: number;
  sold: number;
  isActive: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
