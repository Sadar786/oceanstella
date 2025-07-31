import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/Home";
 import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicePage from "./pages/ServicePage";

export default function App() {
  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          
          <Route path="/" element={<Home />} />
           <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:slug" element={<ServicePage />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
}

