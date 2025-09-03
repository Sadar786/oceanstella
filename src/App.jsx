import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicePage from "./pages/ServicePage";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import ModelDetails from "./components/productComps/ModelDetails";
import CaseStudies from "./pages/CaseStudies";
import Dashboard from "./admin/Dashboard";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";
 
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:slug" element={<ServicePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/models/:slug" element={<ModelDetails />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
}
