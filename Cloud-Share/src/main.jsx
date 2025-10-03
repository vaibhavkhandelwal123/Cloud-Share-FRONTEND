import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import File from "./components/File.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster className="z-50 font-bold" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/getit/:id" element={<File />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
