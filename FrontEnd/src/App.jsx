import { Route, Routes } from "react-router-dom";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import { createContext, useState } from "react";
import CategoryPage from "./pages/CategoryPage";
import CategoryRegPage from "./pages/CategoryRegPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import BookDetails from "./components/BookDetails/BookDetails";
import FavoriteBooksPage from "./pages/FavoriteBooksPage";

export const UpdateContext = createContext();
export const EditContext = createContext();

function App() {
  const [update, setUpdate] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  return (
    <>
      <UpdateContext.Provider value={{ update, setUpdate }}>
        <EditContext.Provider
          value={{ edit, setEdit, editCategory, setEditCategory }}
        >
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedAdminRoute>
                  <CategoryPage />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/newcategory"
              element={
                <ProtectedAdminRoute>
                  <CategoryRegPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/bookpage"
              element={
                <ProtectedAdminRoute>
                  <BookPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/bookdetails/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookedit/:id"
              element={
                <ProtectedAdminRoute>
                  <BookPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/categoryedit/:id"
              element={
                <ProtectedAdminRoute>
                  <CategoryRegPage />
                </ProtectedAdminRoute>
              }
            />
             <Route
              path="/favoritebooks"
              element={
                <ProtectedRoute>
                  <FavoriteBooksPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </EditContext.Provider>
      </UpdateContext.Provider>
    </>
  );
}

export default App;
