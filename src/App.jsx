import "./styles/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CardMaker from "./pages/CardMaker";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";

function App() {
  document
    .getElementsByTagName("body")[0]
    .setAttribute(
      "data-bs-theme",
      sessionStorage.getItem("theme") || sessionStorage.setItem("theme", "dark")
    );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/maker" element={<CardMaker />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      <Header />
    </>
  );
}

export default App;
