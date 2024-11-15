// pages/api/products.ts
// import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/db";

export default async function handler() {
  return db.product.findMany();
}
