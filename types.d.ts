export interface ProductInterface {
  id: string;
  category?: string;
  description?: string;
  imagePath: string;
  name?: string;
  priceInCents?: number;
  stock?: number;
}
