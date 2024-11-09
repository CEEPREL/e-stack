import React from "react";
import PageHeader from "./_components/pageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

function ProductTable() {
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
      </Table>
    </div>
  );
}
