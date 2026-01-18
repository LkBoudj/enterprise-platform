import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MainLayout from '@/components/layouts/MainLayout';
import { UserManagementPage } from '@/features/users/pages/UserManagementPage';
import UserViewPage from '@/features/users/pages/UserViewPage';
import { ProductPage } from '@/features/products/pages/ProductPage'; // Import ProductPage

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/users',
        element: <UserManagementPage />,
      },
      {
        path: '/users/:code', // Changed from /users/:id to /users/:code
        element: <UserViewPage />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      }
    ],
  },
]);
