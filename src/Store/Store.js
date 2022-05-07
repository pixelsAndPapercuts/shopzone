import { createSlice, configureStore } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isFetching: false,
    isError: false,
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
  },
  reducers: {
    signupStart(state) {
      state.isFetching = true;
      state.isError = false;
    },
    signupSuccess(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.isFetching = false;
      state.isError = false;
      if (state.user) {
        window.alert(
          "Sign up successful! You may now continue to the login page."
        );
      } else {
        window.alert(
          "Something went wrong! Check your connection and try again.."
        );
      }
    },
    signupFailure(state) {
      state.isError = true;
      state.isFetching = false;
      state.user = null;
      window.alert(
        "Something went wrong! Check your connection and try again.."
      );
    },
    loginStart(state) {
      state.isFetching = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.isError = false;
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        window.alert(
          "You are not registered. Create an account to start shopping."
        );
        return;
      }
      const { firstname, lastname, password } = user;
      const { name: checkName, password: checkPassword } = action.payload.user;

      if (
        checkName.replace(/\s+/g, "") ===
          firstname.trim().concat(lastname.trim()) &&
        checkPassword === password
      ) {
        localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.user));
        state.isLoggedIn = action.payload.user;
      } else {
        window.alert("Invalid credentials!");
      }
    },
    loginFailure(state) {
      state.isFetching = false;
      state.isError = true;
      state.user = null;
      window.alert(
        "Something went wrong! Check your connection and try again.."
      );
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = null;
      state.isFetching = false;
      state.isError = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    isFetching: false,
    products: [],
    filteredProducts: null,
    isError: false,
  },
  reducers: {
    getAllProductsStart(state) {
      state.isFetching = true;
      state.isError = false;
    },
    getAllProductsSuccess(state, action) {
      state.products = action.payload.products;
      state.isFetching = false;
      state.isError = false;
    },
    getAllProductsFailure(state) {
      state.isFetching = false;
      state.isError = true;
      window.alert(
        "Something went wrong! Check your connection and try again.."
      );
    },
    filterProducts(state, action) {
      if (action.payload.filter === "all") {
        state.filteredProducts = null;
      } else {
        state.filteredProducts = state.products.filter(
          (item) => item.category === action.payload.filter
        );
      }
    },
  },
});

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart(state, action) {
      let existingIdx = state.cart.findIndex(
        (item) => item.id === action.payload.product.id
      );
      let existingItem = state.cart[existingIdx];
      let updatedItem;
      let updatedItems = [...state.cart];
      if (existingItem) {
        updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingIdx] = updatedItem;
      } else {
        updatedItem = { ...action.payload.product, quantity: 1 };
        updatedItems.push(updatedItem);
      }
      state.cart = updatedItems;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      let existingIdx = state.cart.findIndex(
        (item) => item.id === action.payload.product.id
      );
      let existingItem = state.cart[existingIdx];
      let updatedItem;
      let updatedItems = [...state.cart];
      if (!existingItem) {
        return;
      }
      if (existingItem.quantity === 1) {
        updatedItems.splice(existingIdx, 1);
      } else {
        updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        updatedItems[existingIdx] = updatedItem;
      }
      state.cart = updatedItems;
    },
    checkoutCart(state) {
      state.cart = [];
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const ProductsActions = ProductsSlice.actions;
export const CartActions = CartSlice.actions;

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    products: ProductsSlice.reducer,
    cart: CartSlice.reducer,
  },
});

export default store;
