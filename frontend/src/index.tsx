import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error';
import Collections from './pages/Collections';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/auth',
    children:[
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
    ]
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Collections />,
      },
      {
        path: 'collections/:collectionId',
        element: <Tasks />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
