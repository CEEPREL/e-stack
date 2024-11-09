"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import React, { useState } from "react";

export default function ProductForm() {
  const [priceInNaira, setPriceInNaira] = useState<number>();
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInNaira">Price</Label>
        <Input
          type="number"
          id="priceInNaira "
          name="name"
          required
          value={priceInNaira}
          onChange={(e) => setPriceInNaira(Number(e.target.value) || undefined)}
        />
        <div>{formatCurrency(priceInNaira || 0)}</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" name="name" />
      </div>
    </form>
  );
}
