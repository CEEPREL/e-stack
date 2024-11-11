import React from "react";
import PageHeader from "./_components/pageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageHeader>Product</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}

async function ProductTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      description: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) return <p>No product available</p>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only">Available for Purchase </span>
            </TableHead>
            <TableHead>Names</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <>
                    <span className="sr-only">Available</span>
                    <CheckCircle2 />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Unavailable</span>
                    <XCircle className="stroke-destructive" />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
