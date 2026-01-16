import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateBlog from "@/pages/CreateBlog";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createBlog" element={<CreateBlog />} />
    
    </Routes>
  );
}