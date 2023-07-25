import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContex } from "./context/AuthContex";

import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./components/layout/AdminLayout";

import HomeP from "./pages/User/HomeP";
import Aboutp from "./pages/User/Aboutp";
import LoginP from "./pages/User/LoginP";
import RegistrP from "./pages/User/RegisterP";
import PostP from "./pages/User/PostP";
import MyPostsP from "./pages/User/MyPostsP";
import AccountP from "./pages/User/AccountP";
import DashboardP from "./pages/Admin/DashboardP";
import UsersP from "./pages/Admin/UsersP";
import CategoryP from "./pages/Admin/CategoryP";
import NotFoundP from "./pages/NotFoundP";
import CategoriyesP from "./pages/User/CategoriyesP";
import AllPost from "./pages/User/AllPost";

function App() {
  let { isAuthenticated } = useContext(AuthContex);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomeP />} />
          <Route path="about" element={<Aboutp />} />
          <Route path="login" element={<LoginP />} />
          <Route path="register" element={<RegistrP />} />
          <Route path="all-posts" element={<AllPost />} />
          <Route path="category" element={<CategoriyesP />} />
          <Route path="post/:id" element={<PostP />} />
          {isAuthenticated && (
            <Fragment>
              <Route path="my-posts" element={<MyPostsP />} />
              <Route path="account" element={<AccountP />} />
            </Fragment>
          )}
        </Route>
        {isAuthenticated && (
          <Fragment>
            <Route path="/" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardP />} />
              <Route path="users" element={<UsersP />} />
              <Route path="categories" element={<CategoryP />} />
            </Route>
          </Fragment>
        )}
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
