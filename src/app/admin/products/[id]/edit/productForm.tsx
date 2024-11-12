"use client";
import { addProducts } from "@/app/admin/_actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ProductForm() {
  const [error, action] = useFormState(addProducts, {});
  const [priceInNaira, setPriceInNaira] = useState<number>();
  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInNaira">Price</Label>
        <Input
          type="number"
          id="priceInNaira "
          name="priceInNaira"
          required
          value={priceInNaira}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 9) setPriceInNaira(Number(value) || undefined);
          }}
        />
        <div>{formatCurrency(priceInNaira || 0)}</div>
        {error.priceInNaira && (
          <div className="text-destructive">{error.priceInNaira}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">Upload file</Label>
        <Input type="file" id="file" name="file" />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload file</Label>
        <Input type="file" id="image" name="image" />
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
