import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientCPF, setClientCPF] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clientName || !clientCPF) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    navigate("/payment", {
      state: {
        clientName,
        clientCPF,
        cart: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        total,
      },
    });
  };

  return (
    <div className="checkout">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft size={50} />
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-items">
        {cart.map((item, index) => (
          <div key={index} className="checkout-item">
            <img src={item.src} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Quantidade: {item.quantity}</p>
              <p>Preço: R${item.price.toFixed(2)}</p>
              <p>Total: R${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-total">
        <h2>Total: R${total.toFixed(2)}</h2>
      </div>

      <div>
        <form onSubmit={handleProceedToPayment} className="checkout-form">
          <div>
            <label htmlFor="clientName">Nome:</label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="clientCPF">CPF:</label>
            <input
              type="text"
              id="clientCPF"
              value={clientCPF}
              onChange={(e) => setClientCPF(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Ir para Pagamento
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
