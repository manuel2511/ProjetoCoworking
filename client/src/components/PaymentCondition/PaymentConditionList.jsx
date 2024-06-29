import React, { useEffect, useState } from 'react';
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllPaymentConditions } from '../../services/paymentConditionService';

const PaymentConditionList = () => {
  const [paymentConditions, setPaymentConditions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPaymentConditions();
        setPaymentConditions(response.data);
      } catch (error) {
        alert('Erro ao buscar condições de pagamento');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main">
          <div class="">
            <h1>Formas de Pagamentos</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item">Movimentações</li>
                <li class="breadcrumb-item active">Condição de Pagamento</li>
              </ol>
            </nav>
          </div>
    <div>
      <ul>
        {paymentConditions.map((condition) => (
          <li key={condition.id}>{condition.name} - {condition.description}</li>
        ))}
      </ul>
    </div>
    </main>
        <Footer />
      </body>
    </>
  );
};

export default PaymentConditionList;
