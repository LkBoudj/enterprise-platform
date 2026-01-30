import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MainLayout from '@/components/layouts/MainLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import { UserManagementPage } from '@/features/users/pages/UserManagementPage';
import UserViewPage from '@/features/users/pages/UserViewPage';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginPage from '@/features/auth/pages/LoginPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

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
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{
      path: "/login",
      element: <LoginPage />
    }, {
      path: "/forgot-password",
      element: <ForgotPasswordPage />
    }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }

]);
