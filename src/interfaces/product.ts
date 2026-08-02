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

export interface Product {
  _id: string;

  name: string;
  description?: string;
  brand?: string;

  category: Category;

  price: number;
  unit: Unit;

  stock: number;
  quantity: number;

  isAvailable: boolean;

  createdAt: Date;
  updatedAt: Date;
}
