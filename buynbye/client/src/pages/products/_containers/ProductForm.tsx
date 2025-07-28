import clsx from 'clsx';
import React, { useState, type SetStateAction } from 'react';
import axiosInstance from '../../../lib/services';
import type { Product } from '../product.type';

interface ProductFormProps {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}

function ProductForm({ products, setProducts }: ProductFormProps) {
  const [messageRes, setMessageRes] = useState<{
    message: string | null;
    type: 'error' | 'success';
  }>({ message: null, type: 'success' });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
  });

  const handleResponse = (
    message: string | null,
    type: 'success' | 'error'
  ) => {
    setMessageRes({ message, type });
    setTimeout(() => setMessageRes({ message: null, type: 'success' }), 2000);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/products', {
        ...newProduct,
        price: Number(newProduct.price),
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', category: '' });
      handleResponse('Success Add Product', 'success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Failed to add product', err);
      console.log(err);
      handleResponse(err?.response?.data?.error || '', 'error');
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <div className="flex flex-col gap-4">
        {!!messageRes?.message && (
          <div
            className={clsx('p-4 rounded-xl text-white font-bold', {
              'bg-red-400': messageRes.type === 'error',
              'bg-green-400': messageRes.type === 'success',
            })}
          >
            <span>{messageRes.message}</span>
          </div>
        )}
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
