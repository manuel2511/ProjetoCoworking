import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllProducts, deleteProduct } from "../../services/productService";
import editImage from '../../assets/img/edit.png';
import deleteImage from '../../assets/img/delete.png';
import infosImage from '../../assets/img/infos.png';
import './productList.css';  // Importação do css

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [tooltipContent, setTooltipContent] = useState('');
  const navigate = useNavigate();  // Hook para navegação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        alert("Erro ao buscar produtos");
      }
    };

    fetchData();
  }, []);

  // Função para deletar um produto
  const handleDelete = async (productID) => {
    try {
      await deleteProduct(productID);  // Chama a função do productService para enviar a requisição (delete)
      // Atualize a lista de produtos após deletar
      const updatedProducts = products.filter(product => product.id !== productID);  // updatedProducts = novo array com todos os produtos restantes
      setProducts(updatedProducts);
      alert("Produto deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar produto.");
    }
  };

  // Função para editar um produto
  const handleEdit = (productId) => {
    navigate(`/editarProduto/${productId}`);
  };

  // Função para exibir a descrição do produto em um tooltip
  const handleInfos = (product) => {
    setSelectedProductId(product.id);
    setTooltipContent(product.description || "Esse produto não possui descrição");
  };

  // Função para fechar o tooltip
  const closeTooltip = () => {
    setSelectedProductId(null);
    setTooltipContent('');
  };

  return (
    <>
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="">
          <h1>Listar Produtos</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentação</li>
              <li className="breadcrumb-item active">Listar Produtos</li>
            </ol>
          </nav>
        </div>
        <div className='product-table-container'>
          <table className='product-table-content'>
            <thead>
              <tr>
                <th className="col-id">ID</th>
                <th className="col-name">Nome</th>
                <th className="col-location">Localização</th>
                <th className="col-capacity">Capacidade</th>
                <th className="col-rate">Valor por Hora</th>
                <th className="col-edit">Editar</th>
                <th className="col-delete">Deletar</th>
                <th className="col-infos"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="col-id">{product.id}</td>
                  <td className="col-name">{product.name}</td>
                  <td className="col-location">{product.location}</td>
                  <td className="col-capacity">{product.capacity}</td>
                  <td className="col-rate">{product.hourlyRate}</td>
                  <td>
                    <button className="product-edit-button" onClick={() => handleEdit(product.id)}>
                      <img src={editImage} alt="Editar"/>
                    </button>
                  </td>
                  <td>
                    <button className="product-delete-button" onClick={() => handleDelete(product.id)}>
                      <img src={deleteImage} alt="Deletar"/>
                    </button>
                  </td>
                  <td className="tooltip-container">
                    <button 
                      className="product-infos-button" 
                      onMouseEnter={() => handleInfos(product)}
                      onMouseLeave={closeTooltip}
                    >
                      <img src={infosImage} alt="Mais informações"/>
                    </button>
                    {selectedProductId === product.id && (
                      <div className="tooltip">
                        {tooltipContent}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductList;