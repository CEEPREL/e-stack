"use client";
import React from "react";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import { useEffect } from "react";
import Link from "next/link";
import db from "@/db/db";
import { notFound } from "next/navigation";

export default async function page({
  param: { id },
}: {
  param: { id: string };
}) {
  const { currentUser, setIsSignInOpen } = useAuth();
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) {
    return notFound;
  }

  return <div>You can make a purchase here</div>;
}
