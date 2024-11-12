"use client";
import React, { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DeactivateToggle({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <div>
      <DropdownMenuItem
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            await toggleProductAvailability(id, !isAvailableForPurchase);
          });
        }}
      >
        {isAvailableForPurchase ? "Deactivate " : "Activate"}
      </DropdownMenuItem>
    </div>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
