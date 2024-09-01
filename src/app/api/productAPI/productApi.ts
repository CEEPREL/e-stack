import type { NextApiRequest, NextApiResponse } from "next";
import { loadProducts } from "../../../utils/localStorage";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;
  let products = loadProducts();

  if (category) {
    products = products.filter((product: any) => product.category === category);
  }

  res.status(200).json(products);
}
