import axios from 'axios';
import { useEffect, useState } from 'react';
import useDebouncedState from '../../../hooks/useDebouncedState';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export const ProductList = () => {
  const [categoryDebounced, setCategoryDebounced] = useDebouncedState('', 1000);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/products', {
        params: {
          category: categoryDebounced,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [categoryDebounced]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ul className="space-y-2">
        <li className="flex flex-col">
          <label>Category</label>
          <input
            className="bg-white text-black"
            onChange={(e) => setCategoryDebounced(e.target.value as string)}
            placeholder="Find Category"
          />
        </li>
        {products?.map((p) => (
          <li key={p.id} className="border p-2 rounded-xl">
            <h2 className="font-semibold">{p.name}</h2>
            <p>Price: Rp {p.price.toLocaleString()}</p>
            <p>Category: {p.category}</p>
          </li>
        ))}
        {!products?.length && <span>Data not found</span>}
      </ul>
    </div>
  );
};
