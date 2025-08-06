import clsx from 'clsx';
import React, { useEffect, useState, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../components/Dialog';
import LoadingFull from '../../../components/LoadingFull';
import axiosInstance from '../../../lib/services';
import type { Product } from '../product.type';

interface ProductFormProps {
  opened: boolean;
  onClose(): void;
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
  selectedProduct: {
    value: null | Product;
    type: 'add' | 'edit' | 'delete' | '';
  };
}

type ProductFormBody = {
  name: string;
  price: number;
  category: string;
};

function ProductForm({
  setProducts,
  selectedProduct,
  onClose,
  opened,
}: ProductFormProps) {
  const isEdit = selectedProduct?.type === 'edit';
  const productId = selectedProduct?.value?.id;
  const [isLoading, setIsLoading] = useState(false);

  const [messageRes, setMessageRes] = useState<{
    message: string | null;
    type: 'error' | 'success';
  }>({ message: null, type: 'success' });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormBody>({
    values: {
      name: '',
      category: '',
      price: 0,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleResponse = (
    message: string | null,
    type: 'success' | 'error'
  ) => {
    setMessageRes({ message, type });
    setTimeout(() => setMessageRes({ message: null, type: 'success' }), 2000);
    setIsLoading(false);
    if (type === 'success') handleClose();
  };

  const handleAdd = async (data: ProductFormBody) => {
    try {
      const response = await axiosInstance.post('/products', {
        ...data,
        price: Number(data.price),
      });
      setProducts((products) => [...products, response.data.data]);
      handleResponse('Success Add Product', 'success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleResponse(err?.response?.data?.error || '', 'error');
    }
  };

  const handleEdit = async (data: ProductFormBody) => {
    try {
      const response = await axiosInstance.put(`/products/${productId}`, {
        ...data,
        price: Number(data.price),
      });
      setProducts((products) => [...products, response.data.data]);
      handleResponse('Success Edit Product', 'success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleResponse(err?.response?.data?.error || '', 'error');
    }
  };

  const onSubmit = (data: ProductFormBody) => {
    setIsLoading(true);
    if (isEdit) handleEdit(data);
    else handleAdd(data);
  };

  useEffect(() => {
    if (isEdit && opened) {
      setValue('name', selectedProduct.value?.name || '');
      setValue('price', selectedProduct.value?.price || 0);
      setValue('category', selectedProduct.value?.category || '');
    }
  }, [
    isEdit,
    opened,
    selectedProduct.value?.name,
    selectedProduct.value?.category,
    selectedProduct.value?.price,
    setValue,
  ]);

  return (
    <>
      <LoadingFull show={isLoading} />

      <Dialog
        title={`${isEdit ? 'Edit' : 'Add'} Product`}
        onClose={handleClose}
        opened={opened}
        footer={
          <>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-2 ">
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
        </div>
      </Dialog>
    </>
  );
}

export default ProductForm;

const TextError = ({ message }: { message: string }) => {
  return <span className="text-red-500 text-xs">{message}</span>;
};
