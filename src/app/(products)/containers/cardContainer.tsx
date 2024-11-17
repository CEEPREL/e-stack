"use client";

import { useEffect, useState } from "react";
import { ProductCards } from "./card";
import { Spinner } from "@/components/spinner/spinner";
import { getProductsApi } from "@/app/api/productAPI/productApi";

interface Product {
  id: string;
  name: string;
  priceInCents: number;
  filePath: string;
  imagePath: string;
  description: string;
  isAvailableForPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductsDisplay = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  if (loading) return <Spinner loadingScreen={true} />;

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {products.map((doc) => (
        <ProductCards
          key={doc.id}
          id={doc.id}
          description={doc.description}
          imagePath={doc.imagePath}
          name={doc.name}
          priceInCents={doc.priceInCents}
        />
      ))}
    </div>
  );
};

export const CardsContainer = () => {
  return <ProductsDisplay />;
};
