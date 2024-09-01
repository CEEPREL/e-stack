import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../../../../types";
import { loadProducts } from "@/utils/localStorage";

interface ProductState {
  products: ProductInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: loadProducts(),
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductInterface[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<ProductInterface>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<ProductInterface>) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
