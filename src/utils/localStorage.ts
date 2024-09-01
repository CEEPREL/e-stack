import { ProductInterface } from "../../types";
import initialProducts from "../data/products.json";

export const loadProducts = (): ProductInterface[] => {
  let products = localStorage.getItem("products");

  if (!products || products === "[]") {
    console.log("Products not found in localStorage...");
    products = JSON.stringify(initialProducts);
    localStorage.setItem("products", products);
  } else {
    null;
  }

  const parsedProducts = JSON.parse(products) as ProductInterface[];
  console.log("Parsed Products:", parsedProducts);

  return parsedProducts;
};

export const saveProducts = (products: ProductInterface[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};
