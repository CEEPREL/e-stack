import mg from "@/app/api/productAPI/products";
export async function getProductsApi() {
  const response = await fetch("api/productAPI/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
