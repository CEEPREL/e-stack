import { Suspense } from "react";
import { ProductCards, Skeletal } from "./card";
import { Product } from "@prisma/client";
import db from "@/db/db";

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

async function getNewProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

export function ProductDisplay({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <>
      <div>{title}</div>
      <div className="flex items-center justify-center ">
        <div className="grid items-center justify-between grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Suspense
            fallback={
              <>
                <Skeletal />
                <Skeletal />
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
  const products = await productsFetcher();
  return (
    <>
      {products.map((product) => (
        <ProductCards key={product.id} {...product} />
      ))}
    </>
  );
}

export function MainProductDispay() {
  return (
    <ProductDisplay title="New Products" productsFetcher={getNewProducts} />
  );
}
