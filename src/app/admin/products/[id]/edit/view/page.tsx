import db from "@/db/db";
import React from "react";
import ViewProduct from "./viewProduct";

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
