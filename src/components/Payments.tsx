import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Payment.css";
import { useCart } from "../context/CartContext";

class Product {
  id: number;
  name: string;
  value: number;
  description?: string;
  categoryId: number;
  amount?: number;

  constructor(
    id: number,
    name: string,
    value: number,
    categoryId: number,
    description?: string,
    amount?: number
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.description = description;
    this.categoryId = categoryId;
    this.amount = amount;
  }
}

class Order {
  client_name: string;
  client_cpf: string;
  products: Product[];

  constructor(
    client_name: string,
    client_cpf: string,
    products: Product[] = []
  ) {
    this.client_name = client_name;
    this.client_cpf = client_cpf;
    this.products = products;
  }
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientName, clientCPF, cart, total } = location.state || {};
  const { clearCart } = useCart();

  const handleConfirmarPedido = async () => {
    try {
      const products = cart.map(
        (item: any) =>
          new Product(
            item.id || Math.random(),
            item.name,
            item.price,
            item.categoryId || 1,
            item.description || "Sem descrição",
            item.quantity
          )
      );

      const newOrder = new Order(clientName, clientCPF, products);

      const response = await fetch("http://127.0.0.1:5000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([newOrder]),
      });

      if (response.ok) {
        alert("Pedido confirmado com sucesso!");
        clearCart();
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Erro ao confirmar pedido: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert("Erro ao enviar o pedido. Tente novamente.");
    }
  };

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/checkout")}>
        <FaArrowLeft size={50} />
      </button>
      <div className="payment">
        <h1>Pagamento</h1>

        <div className="payment-details">
          <p>
            <strong>Nome:</strong> {clientName}
          </p>
          <p>
            <strong>CPF:</strong> {clientCPF}
          </p>
        </div>

        <div className="payment-summary">
          <h2>Resumo do Pedido</h2>
          <ul>
            {cart?.map((item: any, index: number) => (
              <li key={index}>
                <strong>{item.name}</strong> - Quantidade: {item.quantity} -
                Preço: R${item.price.toFixed(2)} - Total: R$
                {item.total.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: R${total.toFixed(2)}</h3>
        </div>

        <button className="buttonSubmit" onClick={handleConfirmarPedido}>
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default Payment;
