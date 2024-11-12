"use client";

import { useEffect, useState } from "react";
import { loadProducts, saveProducts } from "@/utils/localStorage";
import Image from "next/image";
import { SectionContainer } from "@/components/section-container/section-container";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/button/button";
import { type ProductInterface } from "../../../../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

interface ParamsInterface {
  params: {
    id: string;
  };
}

export default function ProductDetails({ params }: ParamsInterface) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductInterface | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const getProduct = () => {
      const products = loadProducts();
      const foundProduct = products.find(
        (prod: ProductInterface) => prod.id === id
      );
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const handleDelete = () => {
    if (product) {
      const confirmed = confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmed) {
        try {
          const products = loadProducts();
          const updatedProducts = products.filter(
            (prod) => prod.id !== product.id
          );
          saveProducts(updatedProducts);
          alert("Product removed successfully!");
          router.push("/");
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete product.");
        }
      }
    }
  };

  return (
    <>
      {product && (
        <Head>
          <title>{product.name} - Product Details</title>
          <meta name="description" content={product.description} />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description} />
          <meta
            property="og:image"
            content={product.image || "/fallback.jpg"}
          />
          <meta
            property="og:url"
            content={`https://yourdomain.com/products/${id}`}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      )}
      <SectionContainer>
        {loading ? (
          <Spinner loadingScreen={true} />
        ) : product ? (
          <article className="w-full max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <Button
                type="button"
                text="Back"
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                handleClick={() => router.back()}
                disabled={false}
              />
              <h1 className="text-2xl font-semibold dark:text-white">
                {product.name}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex justify-center items-center mb-6 md:mb-0">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={`${product.name} image`}
                    width={288}
                    height={288}
                    className="rounded-md border border-gray-300 dark:border-gray-600"
                  />
                ) : (
                  <div className="rounded-md border border-gray-300 dark:border-gray-600 p-4 text-gray-400 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="flex-1 md:text-right">
                <p className="text-lg font-medium mb-2 dark:text-gray-200">
                  {product.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Stock: {product.stock ?? 0}
                </p>
                <p className="text-2xl font-bold mb-4 dark:text-white">
                  ₦ {product.price}
                </p>
                <div className="flex justify-end gap-3">
                  <Link
                    className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    href={`/editPage/${id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    type="button"
                    text="Delete"
                    className="bg-red-500 dark:bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition"
                    handleClick={handleDelete}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </article>
        ) : (
          <p className="dark:text-white">Product not found.</p>
        )}
      </SectionContainer>
    </>
  );
}
