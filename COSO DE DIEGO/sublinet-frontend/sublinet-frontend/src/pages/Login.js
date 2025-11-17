import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logotipo from "../assets/logo.png";
import { BackGround } from "../components/Styles/Body";
import {
  BtnConfirm,
  ButtonContainer,
  Card,
  CheckboxContainer,
  FormGroup,
  Header,
  Logo,
  TxtBox,
} from "../components/Styles/Login_Styles";

// Colores de la paleta
const PRIMARY_DARK_BLUE = "#0074D9";   // Azul principal
const ACCENT_ORANGE = "#7FDBFF";       // Azul claro/acento
const WHITE = "#ffffff";               // Fondo blanco
const SECONDARY_GREY_BLUE = "#457b9d"; // Azul grisáceo

const API_BASE = "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // por si el backend usa cookies
        body: JSON.stringify({
          username: username, // cambiá a "email" o "userName" si tu backend lo espera así
          password: password,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || `Error ${res.status}`);
      }

      // Intentamos parsear JSON si se puede
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text; // por si es solo un string "ok"
      }

      // Buscamos token si existe
      const token =
        (data && data.token) ||
        (data && data.accessToken) ||
        (typeof data === "string" ? null : null);

      if (token) {
        localStorage.setItem("auth_token", token);
      } else {
        console.warn("Login OK pero el backend no envió token, se asume cookie o sesión.");
      }

      if (rememberMe) {
        localStorage.setItem("remember_username", username);
      } else {
        localStorage.removeItem("remember_username");
      }

      // Pase lo que pase, si el login fue OK, mandamos al Home
      navigate("/Home");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackGround
      style={{
        background: `linear-gradient(135deg, ${PRIMARY_DARK_BLUE} 0%, #0c1a2f 100%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          background: WHITE,
          borderRadius: "1.5rem",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Header>
          <Logo src={Logotipo} alt="Catco Logo" />
          <label
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: PRIMARY_DARK_BLUE,
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            Inicio de Sesión
          </label>
        </Header>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TxtBox
              type="text"
              name="username"
              placeholder="Usuario"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <TxtBox
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <CheckboxContainer style={{ color: PRIMARY_DARK_BLUE }}>
            <input
              type="checkbox"
              name="RememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Recordarme
          </CheckboxContainer>

          {errorMsg && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "0.85rem",
                marginTop: "0.25rem",
                textAlign: "center",
              }}
            >
              {errorMsg}
            </p>
          )}

          <ButtonContainer>
            <BtnConfirm
              type="submit"
              style={{
                backgroundColor: ACCENT_ORANGE,
                color: PRIMARY_DARK_BLUE,
                fontWeight: "600",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </BtnConfirm>
          </ButtonContainer>

          <footer
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              fontSize: "0.875rem",
              color: SECONDARY_GREY_BLUE,
            }}
          >
            No tienes una cuenta?
            <Link
              to="/Register"
              style={{ color: ACCENT_ORANGE, marginLeft: "0.25rem" }}
            >
              {" "}
              Regístrate!
            </Link>
          </footer>
        </form>
      </Card>
    </BackGround>
  );
}

export default Login;
