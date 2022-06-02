import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { SignInData, UserData, UserDataFetch } from "../sharedTypes/sharedAuth";
import { firestore } from "../firebaseConfig";
import { UserCart } from "../sharedTypes/sharedAuth";
type InitialState = {
  user: boolean;
  error: boolean;
  cart: UserCart;
  userData: UserData;
};
type DeleteOption = "deleteAll" | "emptyCart";
type DeleteItemFromCartArgument = {
  itemId: number;
  deleteOption?: DeleteOption;
};
function getLocalStorageObject(key: string) {
  const storageValue = localStorage.getItem(key);

  return storageValue ? JSON.parse(storageValue) : {};
}
type AuthState = { auth: InitialState };
const initialState: InitialState = {
  user: localStorage.getItem("token") ? true : false,
  error: false,
  cart: getLocalStorageObject("cart"),
  userData: getLocalStorageObject("userData"),
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData: SignInData, { rejectWithValue }) => {
    const { email, password } = userData;
    console.log(email, password, "EMAIL PASSWORD");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser!.uid, "ID");
      const userRef = await doc(firestore, "users", auth.currentUser!.uid);
      const { cart, ...userData } = (
        await getDoc(userRef)
      ).data() as UserDataFetch;
      console.log(cart, userData);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("token", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      return { cart, userData };
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await signOut(auth);
  } catch (e) {}
});
export const register = createAsyncThunk(
  "auth/register",
  async (userData: SignInData, { rejectWithValue }) => {
    const { email, password } = userData;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
          ...userData,
          cart: {},
        });
      }
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);
export const addToCart = createAsyncThunk(
  "auth/addToCart",
  async (itemId: number, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { cart },
      } = getState() as AuthState;
      const docRef = await doc(firestore, "users", auth.currentUser!.uid);
      const updatedDoc = await updateDoc(docRef, {
        cart: {
          ...cart,
          [itemId]: cart[itemId] ? cart[itemId] + 1 : 1,
        },
      });

      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...cart,
          [itemId]: cart[itemId] ? cart[itemId] + 1 : 1,
        })
      );
      return itemId;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);
//-1 item
export const deleteCartItem = createAsyncThunk(
  "auth/deleteCartItem",
  async (
    { itemId, deleteOption }: DeleteItemFromCartArgument,
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        auth: { cart },
      } = getState() as AuthState;
      const docRef = await doc(firestore, "users", auth.currentUser!.uid);
      if (deleteOption === "emptyCart") {
        const updatedDoc = await updateDoc(docRef, {
          cart: {},
        });
        localStorage.setItem("cart", JSON.stringify({}));
        return {}; //return empty cart
      }
      if (cart[itemId] === 1 || deleteOption === "deleteAll") {
        const { [itemId]: deletedItem, ...newCart } = cart;
        const updatedDoc = await updateDoc(docRef, {
          cart: {
            ...newCart,
          },
        });
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...cart,
          })
        );
        return newCart;
      }
      await updateDoc(docRef, {
        cart: {
          ...cart,
          [itemId]: cart[itemId] - 1,
        },
      });

      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...cart,
          [itemId]: cart[itemId] - 1,
        })
      );
      return {
        ...cart,
        [itemId]: cart[itemId] - 1,
      };
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    closeError: (state, action) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    /**AUTH REDUCERS**/
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = true;
        const { cart, userData } = action.payload;
        state.cart = cart;
        state.userData = userData;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        alert("error");
        state.error = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        localStorage.removeItem("userData");
        state.user = false;
        state.error = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = true;
        localStorage.setItem("token", "logged");
        state.error = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = true;
      }) /***CART REDUCERS ***/
      .addCase(addToCart.fulfilled, (state, action) => {
        if (!(action.payload in state.cart)) {
          state.cart[action.payload] = 1;
          return;
        }
        state.cart[action.payload] += 1;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart = action.payload; //sets cart to new  cart after deletion
      });
  },
});

export const authReducer = authSlice.reducer;
export const { closeError } = authSlice.actions;
