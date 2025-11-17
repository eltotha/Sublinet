import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Wrapper para inyectar onLogout en Home
function HomeWithLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar token (ajustá si usás otros datos)
    localStorage.removeItem("auth_token");

    // Opcional: limpiar otras cosas
    // localStorage.removeItem("user");
    // sessionStorage.clear();

    // Redirigir al login
    navigate("/");
  };

  return <Home onLogout={handleLogout} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* Aquí ya usamos el wrapper que sí pasa onLogout */}
        <Route path="/Home" element={<HomeWithLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
