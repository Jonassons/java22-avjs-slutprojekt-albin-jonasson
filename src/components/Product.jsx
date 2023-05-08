export default function Product({ image, name, price, stock }) {
  return (
    <>
      <div className="product-card">
        <img src={image}></img>
        <h2>{name}</h2>
        <h4>{price} :-</h4>
        <p>In stock: {stock}</p>
        <button>Add to cart</button>
      </div>
    </>
  );
}
