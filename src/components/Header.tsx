import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>Totem de Pedidos</h1>
      <div className="cart-icon-container" onClick={() => navigate("/checkout")}>
        <FaShoppingCart size={50} className="cart-icon" />
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
      </div>
    </header>
  );
}