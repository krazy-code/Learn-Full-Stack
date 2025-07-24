import { RouterProvider } from 'react-router';
import { router } from './router';

export default function App() {
  return (
    <div className="max-w-xl mx-auto ">
      <RouterProvider router={router} />
    </div>
  );
}
