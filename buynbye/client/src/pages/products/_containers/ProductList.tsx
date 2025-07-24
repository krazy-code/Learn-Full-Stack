import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useDebouncedState from '../../../hooks/useDebouncedState';
import type { Product } from '../product.type';
import ProductForm from './ProductForm';

export const ProductList = () => {
  const [categoryDebounced, setCategoryDebounced] = useDebouncedState('', 1000);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

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
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <button onClick={() => setIsOpenForm(!isOpenForm)}>
          <span
            className={clsx(
              'text-black text-2xl ',
              isOpenForm ? 'rotate-x-45' : ''
            )}
          >
            +
          </span>
        </button>
      </div>
      {!isOpenForm ? (
        <div className="flex flex-col gap-2">
          <label>Category</label>
          <input
            className="bg-white text-black"
            onChange={(e) => setCategoryDebounced(e.target.value as string)}
            placeholder="Find Category"
          />
        </div>
      ) : (
        <ProductForm products={products} setProducts={setProducts} />
      )}
      <ul className="space-y-2">
        {products?.map((p) => (
          <li key={p.id} className="border p-2 rounded-xl">
            <h2 className="font-semibold">{p.name}</h2>
            <p>Price: Rp {p.price.toLocaleString()}</p>
            <p>Category: {p.category}</p>
            <Link to={`/${p.id}`}>
              <button>Detail</button>
            </Link>
          </li>
        ))}
        {!products?.length && <span>Data not found</span>}
      </ul>
    </div>
  );
};
