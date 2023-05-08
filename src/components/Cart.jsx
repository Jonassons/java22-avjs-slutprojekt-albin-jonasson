import "../css/Cart.css";
import { useState } from "react";

export default function Cart({
  cartItems,
  clearCart,
  clearCartAndShowProducts,
}) {
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  function getTotal() {
    let sum = 0;
    console.log(cartItems);
    for (let i = 0; i < cartItems.length; i++) {
      sum += cartItems[i].price;
    }
    return sum;
  }

  async function updateInventory(cartItems) {
    const itemGroup = {};
    for (const item of cartItems) {
      const productId = item.id;
      if (!itemGroup[productId]) {
        itemGroup[productId] = [];
      }
      itemGroup[productId].push(item);
    }

    for (const productId in itemGroup) {
      const productURL = `https://adv-js-slutpro-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`;

      const response = await fetch(productURL);
      const data = await response.json();
      console.log(data);
      const currentInventory = data.stock;

      const numItems = itemGroup[productId].length;
      const inventoryDecrease = Math.min(currentInventory, numItems);

      const updatedInventory = currentInventory - inventoryDecrease;
      const options = {
        method: "PATCH",
        body: JSON.stringify({ stock: updatedInventory }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response2 = await fetch(productURL, options);
      await response2.json();
    }
  }

  async function handlePurchase() {
    await updateInventory(cartItems);
    clearCart();
    setPurchaseComplete(true);
  }

  function removeAllItems() {
    clearCart();
    setPurchaseComplete(false);

    clearCartAndShowProducts();
  }

  return (
    <div className="cart">
      {purchaseComplete ? (
        <h1>Thanks for the purchase!</h1>
      ) : (
        <>
          <h2>You are purchasing: {cartItems.length} products</h2>
          {cartItems.length > 0 ? (
            <div className="cartItems">
              {cartItems.map((item, index) => (
                <div key={index}>
                  <p>{item.name}</p>
                  <p>{item.price} :-</p>
                  <img src={item.image} alt="" />
                </div>
              ))}
              <h4>Total: {getTotal()} :-</h4>
            </div>
          ) : (
            <p>The cart is empty</p>
          )}
          <div className="cartButton">
            <button onClick={removeAllItems}>Empty cart</button>
            <button disabled={cartItems.length === 0} onClick={handlePurchase}>
              {" "}
              Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}
