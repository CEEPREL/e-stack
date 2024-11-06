"use client";
import { useState, useEffect } from "react";
import { loadProducts } from "@/utils/localStorage";
import Link from "next/link";
import { ProductInterface } from "../../../../types";
import SearchDropdown from "../searchDropdown/searchDropdown";

export const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<ProductInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const products = loadProducts();
    setProducts(products);
  }, []);

  const handleSearch = () => {
    const products = loadProducts();
    const lowerKeyword = keyword.toLowerCase();
    const filteredResults = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(lowerKeyword) ||
        product.description?.toLowerCase().includes(lowerKeyword) ||
        product.category?.toLowerCase().includes(lowerKeyword) ||
        ""
    );
    setResults(filteredResults);
  };

  return (
    <header className="bg-gray-100 items-center justify-center shadow-md p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center justify-center">
          <h1 className="flex pr-2 items-center text-[10px] md:text-3xl lg:text-4xl text-gray-800">
            E-STACK
          </h1>
        </Link>

        <div className="relative items-center pb-5 justify-center flex-grow max-w-lg">
          <SearchDropdown products={products} />
        </div>

        <div className="hidden md:flex space-x-4">
          {results.map((product) => (
            <div
              key={product.id}
              className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <h2 className="font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-gray-400 text-xs">{product.category}</p>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};
