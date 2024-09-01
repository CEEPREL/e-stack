export interface ProductInterface {
  id: string;
  category?: string;
  description?: string;
  image: string | null;
  name?: string;
  price?: number;
  stock?: number;
}
