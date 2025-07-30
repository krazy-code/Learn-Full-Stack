import clsx from 'clsx';
import React, { useState, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import LoadingFull from '../../../components/LoadingFull';
import axiosInstance from '../../../lib/services';
import type { Product } from '../product.type';

interface ProductFormProps {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}

type ProductFormBody = {
  name: string;
  price: number;
  category: string;
};

function ProductForm({ products, setProducts }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [messageRes, setMessageRes] = useState<{
    message: string | null;
    type: 'error' | 'success';
  }>({ message: null, type: 'success' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormBody>({
    values: {
      name: '',
      category: '',
      price: 0,
    },
  });

  const handleResponse = (
    message: string | null,
    type: 'success' | 'error'
  ) => {
    setMessageRes({ message, type });
    setTimeout(() => setMessageRes({ message: null, type: 'success' }), 2000);
  };

  const onSubmit = async (data: ProductFormBody) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/products', {
        ...data,
        price: Number(data.price),
      });
      setProducts([...products, response.data]);
      reset();
      handleResponse('Success Add Product', 'success');
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Failed to add product', err);
      handleResponse(err?.response?.data?.error || '', 'error');
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingFull show={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            })}
          />
          {errors.name && <TextError message={errors.name.message || ''} />}
          <input
            type="number"
            placeholder="Price"
            {...register('price', {
              required: 'Price is required',
              min: { value: 1, message: 'Price must be at least 1' },
              valueAsNumber: true,
            })}
          />
          {errors.price && <TextError message={errors.price.message || ''} />}
          <input
            type="text"
            placeholder="Category"
            {...register('category', {
              required: 'Category is required',
              minLength: {
                value: 2,
                message: 'Category must be at least 2 characters',
              },
            })}
          />
          {errors.category && (
            <TextError message={errors.category.message || ''} />
          )}
          <button type="submit">Add Product</button>
        </div>
      </form>
    </>
  );
}

export default ProductForm;

const TextError = ({ message }: { message: string }) => {
  return <span className="text-red-500 text-xs">{message}</span>;
};
