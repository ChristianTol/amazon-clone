import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// Slice - This is the Global store slice for the basket items (state)
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // Find the index of the item in the basket
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      // Copy the basket
      let newBasket = [...state.items];

      // If the item exists in the basket, remove it
      if (index >= 0) {
        // The item exists in the basket... remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in the basket.`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
