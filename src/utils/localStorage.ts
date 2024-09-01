import { ProductInterface } from "../../types";
import initialProducts from "../../public/data/products.json";

const isBrowser = typeof window !== "undefined";

export const loadProducts = (): ProductInterface[] => {
  if (isBrowser) {
    let products = localStorage.getItem("products");

    if (!products || products === "[]") {
      console.log("Products not found in localStorage...");
      products = JSON.stringify(initialProducts);
      localStorage.setItem("products", products);
    }

    const parsedProducts = JSON.parse(products) as ProductInterface[];
    console.log("Parsed Products:", parsedProducts);

    return parsedProducts;
  } else {
    return initialProducts;
  }
};

export const saveProducts = (products: ProductInterface[]) => {
  if (isBrowser) {
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    console.error("localStorage is not available on the server side.");
  }
};
