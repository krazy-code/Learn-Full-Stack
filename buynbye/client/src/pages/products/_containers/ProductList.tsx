import {} from '@headlessui/react';
import { useEffect, useState } from 'react';
import Dialog from '../../../components/Dialog';
import LoadingFull from '../../../components/LoadingFull';
import useDebouncedState from '../../../lib/hooks/useDebouncedState';
import axiosInstance from '../../../lib/services';
import ProductItemCard from '../_components/ProductItemCard';
import type { Product } from '../product.type';
import ProductForm from './ProductForm';

export const ProductList = () => {
  const dsp = {
    value: null,
    type: '' as 'add' | 'edit' | 'delete' | '',
  };
  const [categoryDebounced, setCategoryDebounced] = useDebouncedState('', 1000);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    value: null | Product;
    type: 'add' | 'edit' | 'delete' | '';
  }>(dsp);

  const handleDelete = () => {
    setIsLoading(true);
    axiosInstance
      .delete(`/products/${selectedProduct.value?.id}`, {
        params: {
          category: categoryDebounced,
        },
      })
      .then(() => {
        setIsLoading(false);
        setProducts((products) =>
          products.filter((item) => item.id !== selectedProduct.value?.id)
        );
        setSelectedProduct(dsp);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get('/products', {
        params: {
          category: categoryDebounced,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [categoryDebounced]);

  return (
    <>
      <LoadingFull show={isLoading} />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          <button
            onClick={() => setSelectedProduct({ value: null, type: 'add' })}
            className="bg-white"
          >
            <span className="text-black text-2xl">+</span>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label>Category</label>
          <input
            className="bg-white text-black"
            onChange={(e) => setCategoryDebounced(e.target.value as string)}
            placeholder="Find Category"
          />
        </div>

        <ul className="space-y-2">
          {products?.map((p) => (
            <ProductItemCard
              key={p.id}
              p={p}
              onEdit={() => setSelectedProduct({ value: p, type: 'edit' })}
              onDelete={() => setSelectedProduct({ value: p, type: 'delete' })}
            />
          ))}
          {!products?.length && <span>Data not found</span>}
        </ul>
      </div>
      <ProductForm
        opened={!!selectedProduct.type && selectedProduct.type !== 'delete'}
        onClose={() => {
          setSelectedProduct({ value: null, type: '' });
        }}
        setProducts={setProducts}
        selectedProduct={selectedProduct}
      />
      <Dialog
        title="Confirmation Delete Product!"
        opened={selectedProduct.type === 'delete'}
        onClose={() => setSelectedProduct(dsp)}
        footer={
          <>
            <button type="submit" onClick={handleDelete}>
              Yes
            </button>
            <button type="button" onClick={() => setSelectedProduct(dsp)}>
              No
            </button>
          </>
        }
      >
        <p>Are you sure want to delete this product?</p>
      </Dialog>
    </>
  );
};
