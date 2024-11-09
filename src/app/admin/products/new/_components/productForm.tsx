"use client";
import { addProducts } from "@/app/admin/_actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useState } from "react";

export default function ProductForm() {
  const [priceInNaira, setPriceInNaira] = useState<number>();
  return (
    <form action={addProducts} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInNaira">Price</Label>
        <Input
          type="number"
          id="priceInNaira "
          name="priceInNaira"
          required
          value={priceInNaira}
          onChange={(e) => setPriceInNaira(Number(e.target.value) || undefined)}
        />
        <div>{formatCurrency(priceInNaira || 0)}</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">Upload file</Label>
        <Input type="file" id="file" name="file" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload file</Label>
        <Input type="file" id="image" name="image" />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
