import { ProductInterface } from "../../types";
import initialProducts from "../data/products.json";

// utils/localStorage.ts
export const loadProducts = (): ProductInterface[] => {
  if (typeof window !== "undefined") {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  }
  return [];
};

export const saveProducts = (products: ProductInterface[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products));
  }
};
