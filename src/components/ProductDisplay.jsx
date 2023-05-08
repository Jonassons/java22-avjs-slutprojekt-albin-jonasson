import "../css/ProductDisplay.css";
import { useState, useEffect } from "react";

export default function ProductDisplay({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCounts] = useState({});

  async function getProducts() {
    const url =
      "https://adv-js-slutpro-default-rtdb.europe-west1.firebasedatabase.app/products.json";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data) {
      const newProducts = Object.keys(data).map((key) => {
        return {
          id: key,
          name: data[key].name,
          image: data[key].image,
          price: data[key].price,
          stock: data[key].stock,
        };
      });

      setProducts(newProducts);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleAddToCartClick(product) {
    const { id, name, price, stock, image } = product;

    const count = productCount[id] || 0;
    if (count >= stock) {
      console.log("not enough items in stock");
      return alert(
        `There is not enough ${name} in stock for that big of a purchase!`
      );
    }
    const item = { id, name, price, image };
    addToCart(item);
    setProductCounts({ ...productCount, [id]: count + 1 });
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="productContainer">
          {products.map((product) => (
            <div key={product.id} className="productCard">
              <img src={product.image} />
              <h2>{product.name}</h2>
              <h4>{product.price} :-</h4>
              {product.stock > 0 ? (
                <div>
                  <p>In stock: {product.stock}</p>
                  <button
                    className="addToCart"
                    onClick={() => handleAddToCartClick(product)}
                  >
                    Add to cart
                  </button>
                </div>
              ) : (
                <p className="outOfStock">Out of stock!!</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>Hold....</div>
      )}
    </>
  );
}
