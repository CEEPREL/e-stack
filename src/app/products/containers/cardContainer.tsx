"use client";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../../types";
import { Card } from "./card";
import { Spinner } from "@/app/components/spinner/spinner";
import { loadProducts } from "@/utils/localStorage";
import Link from "next/link";

interface ParamsInterface {
  params: {
    category: string;
  };
}

export const CardsContainer = ({ params }: ParamsInterface) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let products = loadProducts();
        if (params.category) {
          products = products.filter(
            (product: any) => product.category === params.category
          );
        }
        setList(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [params]);

  if (loading) {
    return <Spinner loadingScreen={true} />;
  } else {
    return (
      <div className="grid justify-evenly grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {list.map((doc) => (
          <Card
            key={doc.id}
            id={doc.id}
            category={doc.category}
            description={doc.description}
            image={doc.image}
            name={doc.name}
            price={doc.price}
            stock={doc.stock}
          />
        ))}
        <Link
          className="border border-slate-300 text-[150px] text-center flex flex-col justify-center items-center rounded-sm w-64 h-96"
          href={"/addProducts"}
        >
          +<p className="text-sm">Add new product</p>
        </Link>
      </div>
    );
  }
};
