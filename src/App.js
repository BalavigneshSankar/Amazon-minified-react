import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CartContextProvider from "./store/cartContext";
import ItemsContextProvider from "./store/itemsContext";

const router = createBrowserRouter([
  { path: "/", element: <ProductsPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/cart", element: <CartPage /> },
]);

function App() {
  return (
    <ItemsContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </ItemsContextProvider>
  );
}

export default App;
