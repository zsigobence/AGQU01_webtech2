import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './mainpage.css';

const Mainpage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    equipment: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/equipments');
      setProducts(response.data.data);
      console.log(response); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const validateProduct = () => {
    const errors = {};

    if (!newProduct.name.trim()) {
      errors.name = 'Név kötelező';
    }

    if (!newProduct.equipment.trim()) {
      errors.equipment = 'Felszerelés kötelező';
    }

    if (!newProduct.quantity.trim() || isNaN(newProduct.quantity)) {
      errors.quantity = 'Érvényes mennyiséget adjon meg';
    }

    return errors;
  };

  const addProduct = async () => {
    const validationErrors = validateProduct();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:3001/equipments', newProduct);

        setNewProduct({
          name: '',
          equipment: '',
          quantity: ''
        });
        fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm(`Biztosan törölni szeretnéd?`)) {
      await axios.post('http://localhost:3001/delete', {userid: id});   
    }  
      fetchProducts();
    
  };

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
  };


  return (
    <div className="mainpage-container">
    <div className="products-container">
      <h2>Haszálatban lévő felszerelések</h2>
      <ul>
        {Array.isArray(products) && products.map(product => (
          <li key={product._id}>
            {product.name} : {product.equipment}  ({product.quantity} db)
            <button onClick={() => handleDelete(product._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
      <div className="add-product-container">
        <h3>Hozzáadás</h3>
        <div>
          <label>Név:</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Felszerelés:</label>
          <input type="text" name="equipment" value={newProduct.equipment} onChange={handleInputChange} />
          {errors.equipment && <span>{errors.equipment}</span>}
        </div>
        <div>
          <label>Mennyiség:</label>
          <input type="text" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
          {errors.quantity && <span>{errors.quantity}</span>}
        </div>
        <button class="add-button" onClick={addProduct}>Hozzáadás</button>
      </div>
      <div class="profile">
      <span class="loginas">Bejelenkezve mint: {localStorage.getItem('user')}</span><br/>
        <Link to="/">
        <button class="logout-button" onClick={handleLogout}>Kijelentkezés</button>
        </Link>
      </div>
    </div>
  );
};

export default Mainpage;

