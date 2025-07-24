import { createBrowserRouter } from 'react-router';
import ProductsPage from '../pages/products';
import ProductDetail from '../pages/products/detail';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      { path: ':id', element: <ProductDetail /> },
    ],
  },
]);
