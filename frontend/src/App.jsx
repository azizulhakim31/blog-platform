import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;