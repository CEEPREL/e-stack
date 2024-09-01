// import { ProductInterface } from "../../../../types";
// import fs from "fs";

// const loadProducts = (): ProductInterface[] => {
//   // Implement your function to load products from JSON file or other sources
//   const data = fs.readFileSync("data/products.json", "utf-8");
//   return JSON.parse(data);
// };

// // Function to search products by a keyword
// const searchProducts = (keyword: string): ProductInterface[] => {
//   const products = loadProducts();
//   const lowerKeyword = keyword.toLowerCase();

//   return products.filter(
//     (product: ProductInterface) =>
//       product.name?.toLowerCase().includes(lowerKeyword) ||
//       product.description?.toLowerCase().includes(lowerKeyword) ||
//       product.category?.toLowerCase().includes(lowerKeyword) ||
//       ""
//   );
// };
