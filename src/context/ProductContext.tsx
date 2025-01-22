import React, { createContext, useContext, useReducer } from "react";

interface Product {
  id: number;
  name: string;
  value: number;
  description?: string;
  categoryId: number;
  quantity: number;
  src: string;
}

type ProductAction =
  | { type: "ADD_SHIPMENT"; payload: Product[] }
  | { type: "SELL_PRODUCT"; payload: { id: number; quantity: number } }
  | { type: "RESET_PRODUCTS" };

const initialState: Product[] = [];

const productReducer = (state: Product[], action: ProductAction): Product[] => {
  switch (action.type) {
    case "ADD_SHIPMENT":
      return action.payload.map((newProduct) => {
        const existingProduct = state.find((p) => p.id === newProduct.id);
        if (existingProduct) {
          return {
            ...existingProduct,
            quantity: existingProduct.quantity + newProduct.quantity,
          };
        }
        return newProduct;
      });

    case "SELL_PRODUCT":
      return state.map((product) =>
        product.id === action.payload.id
          ? {
              ...product,
              quantity: Math.max(0, product.quantity - action.payload.quantity),
            }
          : product
      );

    case "RESET_PRODUCTS":
      return initialState;

    default:
      return state;
  }
};

const ProductContext = createContext<{
  products: Product[];
  addShipment: (newProducts: Product[]) => void;
  sellProduct: (id: number, quantity: number) => void;
  resetProducts: () => void;
}>({
  products: initialState,
  addShipment: () => {},
  sellProduct: () => {},
  resetProducts: () => {},
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const addShipment = (newProducts: Product[]) => {
    dispatch({ type: "ADD_SHIPMENT", payload: newProducts });
  };

  const sellProduct = (id: number, quantity: number) => {
    dispatch({ type: "SELL_PRODUCT", payload: { id, quantity } });
  };

  const resetProducts = () => {
    dispatch({ type: "RESET_PRODUCTS" });
  };

  return (
    <ProductContext.Provider
      value={{ products: state, addShipment, sellProduct, resetProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
