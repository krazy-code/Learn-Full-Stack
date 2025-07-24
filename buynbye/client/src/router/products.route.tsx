import { type RouteObject } from 'react-router-dom';
import ProductsPage from '../pages/products';
import ProductDetail from '../pages/products/detail';

export const productsRoute: RouteObject[] = [
  {
    path: 'products',
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      { path: ':id', element: <ProductDetail /> },
    ],
  },
];
