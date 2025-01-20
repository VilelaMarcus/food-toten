import './Menu.css';  // Para estilização
import { FaShoppingCart } from 'react-icons/fa';  // Ícone de carrinho

interface MenuProps {
  onCategorySelect: (category: string) => void;
}

export default function Menu({ onCategorySelect }: MenuProps) {
  return (
    <div className="menu-container">
      <header className="menu-header">
        <h1>Totem de Pedidos</h1>
        <div className="cart-icon">
          <FaShoppingCart size={30} />
        </div>
      </header>

      <div className="menu-categories">
        <button onClick={() => onCategorySelect('comida')}>Comida</button>
        <button onClick={() => onCategorySelect('bebida')}>Bebida</button>
        <button onClick={() => onCategorySelect('doces')}>Doces</button>
      </div>
    </div>
  );
}
