import { create } from "zustand";

// Define the cart item type
interface CartItem {
  id: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
  toppings: [];
  note: string;
  restaurantId: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: () => number; // 🔥 Make totalAmount a function
}

// Create the Zustand store for cart
export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  // Add to cart - Replace old food if from a different restaurant
  addToCart: (newItem) =>
    set((state) => {
      // Check if the new item is from a different restaurant
      const isSameRestaurant = state.cart.every(
        (item) => item.restaurantId === newItem.restaurantId
      );

      if (!isSameRestaurant) {
        // If the item is from a different restaurant, clear the cart
        return {
          cart: [newItem],
        };
      }

      // If from the same restaurant, update cart or add new item
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, newItem],
      };
    }),

  // Remove from cart
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Update quantity of a cart item
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  // Clear the cart
  clearCart: () => set({ cart: [] }),

  totalAmount: () =>
    get()
      .cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
