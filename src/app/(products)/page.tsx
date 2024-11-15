import db from "@/db/db";
import { Product } from "@prisma/client";
import React from "react";
import { Card } from "./containers/card";

function getNewProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export default function HomePage() {
  return (
    <main>
      <ProductDisplay productsFetcher={getNewProducts} title="New" />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};
async function ProductDisplay({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <>
      <div>{title}</div>
      <div className="flex absolute items-center justify-center h-screen">
        <div className="grid items-center justify-between grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {(await productsFetcher()).map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}
