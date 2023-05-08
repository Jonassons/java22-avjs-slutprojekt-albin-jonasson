import "../css/Navbar.css";

export default function Navbar({ showProducts, showCart, cartItemCount }) {
  return (
    <>
      <nav className="navbar">
        <p className="navbar-el" onClick={showProducts}>
          Products
        </p>
        <p className="navbar-el" onClick={showCart}>
          Cart ({cartItemCount})
        </p>
      </nav>
    </>
  );
}
