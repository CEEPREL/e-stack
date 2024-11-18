import db from "@/db/db";
import { Product } from "@prisma/client";
import React, { Suspense } from "react";
import { ProductCards, Skeletal } from "./containers/card";
import { Header } from "@/components/header/Header";

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
      <Header />
      <ProductDisplay productsFetcher={getNewProducts} title="New" />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};
function ProductDisplay({ productsFetcher, title }: ProductGridSectionProps) {
  return (
    <>
      <div>{title}</div>
      <div className="flex mt-28 items-center justify-center ">
        <div className="grid  items-center justify-between grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Suspense
            fallback={
              <>
                <Skeletal />
                <Skeletal />
                <Skeletal />
                <Skeletal />
                <Skeletal />
                <Skeletal />
              </>
            }
          >
            <ProductSuspense productsFetcher={productsFetcher} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCards key={product.id} {...product} />
  ));
}
