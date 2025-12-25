import { Routes, Route } from "react-router-dom";
import Categories from "../pages/admin/Categories";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/categories" element={<Categories />} />
    </Routes>
  );
}