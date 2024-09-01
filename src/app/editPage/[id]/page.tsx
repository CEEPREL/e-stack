"use client";

import { useState, useEffect } from "react";
import { saveProducts, loadProducts } from "@/utils/localStorage";
import { ProductInterface } from "../../../../types";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Spinner } from "@/app/components/spinner/spinner";

export default function EditProductForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const products = loadProducts();
      const productToEdit = products.find((product) => product.id === id);

      if (productToEdit) {
        setName(productToEdit.name || "");
        setDescription(productToEdit.description || "");
        setPrice(productToEdit.price || 0);
        setStock(productToEdit.stock || 0);
        setImageUrl(productToEdit.image);
      } else {
        console.error("Product not found");
        alert("Product not found");
        router.push("/");
      }
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!price || !description || !name || !stock || !imageUrl) {
      alert("All fields, including the image, are required.");
      return;
    }

    try {
      if (typeof window !== "undefined") {
        const products = loadProducts();
        const updatedProducts = products.map((product) =>
          product.id === id
            ? { ...product, name, description, price, stock, image: imageUrl }
            : product
        );

        saveProducts(updatedProducts);

        alert("Product updated successfully!");
        router.push("/");
      } else {
        console.error("localStorage is not available on the server side.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>

      <label className="font-semibold">Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 hover:border-gray-400 transition"
      />

      <label className="font-semibold">Product Description</label>
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 hover:border-gray-400 transition"
      />

      <label className="font-semibold">Price</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 hover:border-gray-400 transition"
      />

      <label className="font-semibold">Stock</label>
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 hover:border-gray-400 transition"
      />

      <label className="font-semibold">Product Image</label>
      <div className="relative" onClick={() => setIsUploading(true)}>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              const uploadedImage = res[0];
              setImageUrl(uploadedImage.url);
            }
            alert("Upload Completed");
            setIsUploading(false);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
            setIsUploading(false);
          }}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 hover:border-gray-400 transition"
        />{" "}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <Spinner loadingScreen={true} />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className={`${
          isUploading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
        } text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition`}
      >
        Submit
      </button>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition mt-4"
      >
        Back
      </button>
    </form>
  );
}
