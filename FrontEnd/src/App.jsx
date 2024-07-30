import { Route, Routes } from "react-router-dom";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import Book from "./components/Book/Book";
import { createContext, useState } from "react";
import CategoryPage from "./pages/CategoryPage";
import CategoryRegPage from "./pages/CategoryRegPage";

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
              path="/book/:id"
              element={
                <ProtectedRoute>
                  <Book />
                </ProtectedRoute>
              }
            />
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
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/newcategory"
              element={
                <ProtectedRoute>
                  <CategoryRegPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookpage"
              element={
                <ProtectedRoute>
                  <BookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookedit/:id"
              element={
                <ProtectedRoute>
                  <BookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categoryedit/:id"
              element={
                <ProtectedRoute>
                  <CategoryRegPage />
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
