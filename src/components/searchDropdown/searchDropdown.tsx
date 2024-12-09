import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductInterface } from "../../../types";
import { SearchIcon } from "lucide-react";

interface SearchDropdownProps {
  products: ProductInterface[];
}

export default function SearchDropdown({ products }: SearchDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    const results = products.filter((product) =>
      [product.name, product.description, product.category]
        .map((field) => field?.toLowerCase())
        .some((field) => field?.includes(searchQuery.toLowerCase()))
    );
    setFilteredProducts(results);
  };

  const handleSelectProduct = (product: ProductInterface) => {
    setFilteredProducts([]);
    setSearchQuery(product.name || "");
    router.push(`/products/${product.category}/${product.id}`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-6">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md mx-5 p-2 w-full focus:outline-none focus:border-gray-500 hover:border-gray-400 transition"
        />
        <SearchIcon className="absolute right-6 hover:cursor-pointer hover:text-gray-900 top-1/2 h-[28px] w-[32px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      {filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectProduct(product)}
            >
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-gray-400 text-xs">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
