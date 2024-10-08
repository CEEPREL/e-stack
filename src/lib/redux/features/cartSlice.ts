import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: string;
  quantity: number;
}

interface CartState {
  cartProducts: Product[];
}

const initialState: CartState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { id, quantity } = action.payload;
      const existingProductIndex = state.cartProducts.findIndex(
        (product) => product.id === id
      );
      if (existingProductIndex !== -1) {
        state.cartProducts[existingProductIndex].quantity += quantity;
      } else {
        state.cartProducts.push({ id, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    removeUnit: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      const existingProductIndex = state.cartProducts.findIndex(
        (product) => product.id === id
      );

      state.cartProducts[existingProductIndex].quantity -= quantity;

      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    removeProduct: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== id
      );

      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    localStorageCart: (state, action: PayloadAction<[]>) => {
      state.cartProducts = action.payload;
    },
    clearCart: (state) => {
      state.cartProducts = [];
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
  },
});

export const {
  addProduct,
  removeUnit,
  removeProduct,
  localStorageCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
