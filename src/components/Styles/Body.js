import React, { useState } from "react";
import styled from "styled-components";

// --- Paleta de Colores ---
// Sidebar: azul marino muy oscuro (#0B1221)
// Home/Body: fondo claro con acentos en azul intenso
const PRIMARY_DARK_BLUE = "#0074D9";   // Azul intenso para títulos y bordes
const HOVER_DARK_BLUE = "#457b9d";     // Azul grisáceo para hover y detalles
const ACCENT_COLOR = "#7FDBFF";        // Azul claro para botones y acentos
const WHITE = "#ffffff";               // Fondo limpio
const BACKGROUND_LIGHT = "#f5f7fa";    // Fondo claro para diferenciar del sidebar

// =====================
// COMPONENTES ESTILIZADOS
// =====================

export const BackGround = styled.div`
  background: ${BACKGROUND_LIGHT}; /* Fondo claro para contraste */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  background: #0074D9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid ${PRIMARY_DARK_BLUE};
  z-index: 10;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: ${BACKGROUND_LIGHT};

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

// === COMPONENTES CARD Y BUTTON ===
export const Card = styled.div`
  background-color: ${WHITE};
  color: ${PRIMARY_DARK_BLUE};
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid ${PRIMARY_DARK_BLUE};
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const Button = styled.button`
  background-color: ${PRIMARY_DARK_BLUE};
  color: ${WHITE};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${HOVER_DARK_BLUE};
  }
`;

// === BARRA DE BÚSQUEDA ===
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.65rem 1rem 0.65rem 2.5rem;
  width: 22rem;
  border: 1px solid ${PRIMARY_DARK_BLUE};
  border-radius: 0.75rem;
  outline: none;
  background-color: ${WHITE};
  color: ${PRIMARY_DARK_BLUE};
  font-size: 0.95rem;

  &::placeholder {
    color: ${HOVER_DARK_BLUE};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${HOVER_DARK_BLUE};
`;

// =====================
// COMPONENTE PRINCIPAL
// =====================
const Body = ({ children, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BodyContainer>
      <Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
            padding: "0 1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Botón menú */}
            <button
              onClick={toggleSidebar}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                color: PRIMARY_DARK_BLUE,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {/* Icono hamburguesa */}
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                style={{ color: WHITE }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Barra de búsqueda */}
            <SearchWrapper>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                placeholder="Buscar productos, categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchWrapper>
          </div>

          {/* Usuario */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: ACCENT_COLOR,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: WHITE, fontSize: "0.875rem", fontWeight: "500" }}>
                U
              </span>
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: "500", color: WHITE }}>
              Usuario
            </span>
          </div>
        </div>
      </Header>

      <Main>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>{children}</div>
      </Main>
    </BodyContainer>
  );
};

export default Body;
