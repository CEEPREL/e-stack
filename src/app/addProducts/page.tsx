"use client";
import { useState } from "react";
import { saveProducts, loadProducts } from "@/utils/localStorage";
import { ProductInterface } from "../../../types";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Spinner } from "../components/spinner/spinner";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!price || !description || !name || !stock || !imageUrl) {
      alert("All fields, including the image, are required.");
      return;
    }

    const id = generateUniqueId();

    try {
      if (typeof window !== "undefined") {
        const newProduct: ProductInterface = {
          id,
          name,
          description,
          price,
          stock,
          image: imageUrl,
        };

        const products = loadProducts();
        products.push(newProduct);
        saveProducts(products);

        alert("Product added successfully!");

        setName("");
        setDescription("");
        setPrice(0);
        setStock(0);
        setImageUrl(null);

        router.push("/");
      } else {
        console.error("localStorage is not available on the server side.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-xl font-semibold mb-4">Add Product</h1>

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
      <div className="relative">
        <div onClick={() => setIsUploading(true)}>
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
          />
        </div>
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
