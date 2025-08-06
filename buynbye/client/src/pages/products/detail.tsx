import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from '../../lib/services';
import type { Product } from './product.type';

function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);
  if (!product) return <span>Not Found</span>;
  return (
    <div>
      <h1>ProductDetail</h1>
      <div key={product.id} className="border p-2 rounded-xl">
        <h2 className="font-semibold">{product.name}</h2>
        <p>Price: Rp {product.price.toLocaleString()}</p>
        <p>Category: {product.category}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
