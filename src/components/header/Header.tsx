"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductInterface } from "../../../types";
import SearchDropdown from "../searchDropdown/searchDropdown";
import { Button } from "../ui/button";
import UserDropdown from "@/app/(products)/containers/userProfile-dropdown";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import { useRouter } from "next/navigation";

interface HeaderProps {
  handleclick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({ handleclick }: HeaderProps) => {
  const router = useRouter();
  const [results, setResults] = useState<ProductInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const { currentUser, userDataObj, setIsSignInOpen, setIsSignedUp } =
    useAuth();

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
    router.push("/");
  };

  return (
    <header className=" mb-28 fixed z-10 w-full bg-gray-100 items-center justify-center shadow-md p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center justify-center">
          <h1 className="flex pr-2 items-center text-[4px] md:text-3xl lg:text-4xl text-gray-800">
            AGRO-PRICIOUS
          </h1>
        </Link>

        <div className="relative items-center pb-5 justify-center flex-grow max-w-lg">
          <SearchDropdown products={products} />
        </div>
        {/* <Button onClick={handleSignInOpen}>Sign in</Button> */}
        <UserDropdown handleLogin={handleSignInOpen} />

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
