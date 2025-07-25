import React, { useState, type SetStateAction } from 'react';
import axiosInstance from '../../../lib/services';
import type { Product } from '../product.type';

interface ProductFormProps {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}

function ProductForm({ products, setProducts }: ProductFormProps) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newEntry = {
  //     id: products.length + 1, // manual ID
  //     ...newProduct,
  //     price: parseInt(newProduct.price),
  //   };
  //   setProducts([...products, newEntry]); // products = state dari list
  //   setNewProduct({ name: '', price: '', category: '' });
  // };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/products', {
        ...newProduct,
        price: Number(newProduct.price),
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', category: '' });
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-lg">New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <button type="submit">Add Product</button>
      </div>
    </form>
  );
}

export default ProductForm;
