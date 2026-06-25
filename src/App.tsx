import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tutorials from "./pages/Tutorials";
import AITools from "./pages/AITools";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Anchor scroll — when navigating from another route the target section
      // hasn't rendered yet, so poll a few frames until it exists, then scroll.
      const id = location.hash.slice(1);
      let frames = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (frames++ < 20) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}
