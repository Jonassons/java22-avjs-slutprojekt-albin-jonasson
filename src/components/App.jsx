import "../css/App.css";
import Navbar from "./Navbar";
import Display from "./Display";
import Footer from "./Footer";
import { useState } from "react";

export default function App() {
  const [showProductPage, setShowProductPage] = useState(true);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  function showProducts() {
    setShowProductPage(true);
    setShowShoppingCart(false);
  }

  function showCart() {
    setShowProductPage(false);
    setShowShoppingCart(true);
  }

  function clearCartAndShowProducts() {
    setShowProductPage(true);
    setShowShoppingCart(false);
    setCartItems([]);
  }

  return (
    <>
      <Navbar
        showProducts={showProducts}
        showCart={showCart}
        cartItemCount={cartItems.length}
      />
      <Display
        showProductPage={showProductPage}
        showShoppingCart={showShoppingCart}
        setCartItems={setCartItems}
        cartItems={cartItems}
        clearCartAndShowProducts={clearCartAndShowProducts}
      />
      <Footer></Footer>
    </>
  );
}
