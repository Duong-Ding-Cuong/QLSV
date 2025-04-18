import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import Homepage from './page/Homepage.jsx';
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';
import ForumPage from './page/ForumPage.jsx';
import StudentPage from './page/StudentPage.jsx';
import PostPage from './page/PostPage.jsx';
import ForumPageID from './page/ForumPageID.jsx';
import ForgotPsWord from './page/ForgotPsWord.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import StudentPageID from './page/StudentPageID.jsx';
import AdminPage from './page/AdminPage.jsx';


const router = createBrowserRouter([
  {
    path:"/login",
    element :<Login/>,
  },
  {
    path:"/register",
    element :<Register/>,
  },
  
  {
    path: "/",
    element:(<App />),
    children:[
      {
        path: "/",
        element:<Homepage/>
      },
      {
        path: "/forum",
        element:<ForumPage/>,
      },
      {
        path: "/forum/:title",
        element: <ForumPageID />,
      },
      {
        path: "/student/:id_student",
        element:<StudentPageID/>
      },
      {
        path: "/student",
        element:<StudentPage/>
      },
      {
        path: "/post/:id_post",
        element: <PostPage />,
      },
      {
        path: "/forgot",
        element: <ForgotPsWord/>,
      }
      ,
      {
        path: "/admin",
        element: <AdminPage/>,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
