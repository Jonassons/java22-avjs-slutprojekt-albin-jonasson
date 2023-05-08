import Cart from "./Cart";
import ProductDisplay from "./ProductDisplay";

export default function Display({
  showProductPage,
  showShoppingCart,
  setCartItems,
  cartItems,
  clearCartAndShowProducts,
}) {
  function addToCart(item) {
    setCartItems((prevItems) => [...prevItems, item]);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <>
      {showProductPage && <ProductDisplay addToCart={addToCart} />}
      {showShoppingCart && (
        <Cart
          cartItems={cartItems}
          clearCart={clearCart}
          setCartItems={setCartItems}
          clearCartAndShowProducts={clearCartAndShowProducts}
        />
      )}
    </>
  );
}
