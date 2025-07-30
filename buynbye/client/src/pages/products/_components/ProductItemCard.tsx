import { Link } from 'react-router';
import type { Product } from '../product.type';

interface ProductItemCardProps {
  p: Product;
  onEdit(): void;
  onDelete(): void;
}

function ProductItemCard({ p, onEdit, onDelete }: ProductItemCardProps) {
  return (
    <li key={p.id} className="border p-2 rounded-xl">
      <h2 className="font-semibold">{p.name}</h2>
      <p>Price: Rp {p.price.toLocaleString()}</p>
      <p>Category: {p.category}</p>

      <div className="flex gap-2 justify-end">
        <Link to={`/${p.id}`}>
          <button className="text-white bg-black">Detail</button>
        </Link>
        <button className="bg-blue-900" onClick={onEdit}>
          Edit
        </button>
        <button className="bg-red-900" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ProductItemCard;
