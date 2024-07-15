import React, { useEffect, useState, useMemo } from 'react';
import '../styles/Home.scss';
import { Product } from '../types/index';
import { fetchProducts } from '../services/dataService';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const productList = useMemo(() => (
    products.map((product) => (
      <div key={product.id} className="product-item" role="listitem">
        <h2 className="product-title">{product.description}</h2>
        <p className="product-price">${product.price}</p>
      </div>
    ))
  ), [products]);

  return (
    <div className="home">
      <h1 className='products-heading'>Products</h1>
      <div className="product-list" role="list" aria-label="Product List">
        {productList}
      </div>
    </div>
  );
};

export default React.memo(Home);
