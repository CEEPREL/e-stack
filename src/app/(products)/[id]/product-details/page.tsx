import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ViewProduct({ product }: { product: Product | null }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {product?.filePath && (
        <Image
          alt={product.name}
          src={`/${product.imagePath.replace(/^public\//, "")}`}
          width={500}
          height={500}
        />
      )}
      <h3>{product?.name}</h3>
      <p>{product?.description}</p>
      <Button>
        <Link href="/">Back</Link>
      </Button>
    </div>
  );
}

export default async function ViewProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  return (
    <div>
      <ViewProduct product={product} />
    </div>
  );
}
