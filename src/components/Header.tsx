import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  return (
    <header className="header">
      <h1>Totem de Pedidos</h1>
      <div className="cart-icon-container" onClick={() => clearCart()}>
        <FaTrash size={50} className="trash-icon" />
      </div>
      <div
        className="cart-icon-container"
        onClick={() => navigate("/checkout")}
      >
        <FaShoppingCart size={50} className="cart-icon" />
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </div>
    </header>
  );
}
