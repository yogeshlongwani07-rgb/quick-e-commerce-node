export type Category =
  | "Fruits"
  | "Vegetables"
  | "Dairy"
  | "Bakery"
  | "Snacks"
  | "Beverages"
  | "Personal Care"
  | "Household";

export type Unit = "kg" | "g" | "L" | "ml" | "pcs" | "pack";
export interface CreateProduct {
  name: string;
  description?: string;
  price: number;
  brand?: string;
  category: Category;
  unit: Unit;
  stock: number;
  isAvailable: boolean;
}

export interface IProduct extends CreateProduct {
  _id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
