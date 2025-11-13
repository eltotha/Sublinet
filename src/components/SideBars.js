import React from 'react';
import styled from 'styled-components';
import Icon from '../assets/icon.png';

// --- Paleta de Colores ---
const PRIMARY_DARK_BLUE = '#0B1221';   // Azul intenso
const WHITE = '#ffffff';               // Texto y fondo
const HOVER_DARK_BLUE = '#457b9d';     // Azul grisáceo para hover
const ACTIVE_DARK_TEXT = WHITE;

const SidebarContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  width: 16rem;
  background: ${PRIMARY_DARK_BLUE}; /* Fondo Azul Oscuro más profundo */
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  border-right: 1px solid ${HOVER_DARK_BLUE};
  color: ${WHITE};

  @media (min-width: 768px) {
    position: static;
    transform: translateX(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  opacity: 0.5;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem; /* Borde más redondeado */
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${props => props.active ? HOVER_DARK_BLUE : 'transparent'};
  color: ${props => props.active ? ACTIVE_DARK_TEXT : WHITE};
  border: none;

  &:hover {
    background: ${props => props.active ? HOVER_DARK_BLUE : HOVER_DARK_BLUE};
    color: ${props => props.active ? ACTIVE_DARK_TEXT : WHITE};
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${WHITE};
  background: ${HOVER_DARK_BLUE};
  border: none;
  border-radius: 0.75rem; /* Borde más redondeado */
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #dc2626; /* Rojo para el hover de 'Cerrar Sesión' */
  }
`;

const StyledLogo = styled.img`
  height: 32px; 
  width: auto;
  border-radius: 0.25rem;
`;

const SideBars = ({ isOpen, toggleSidebar, activeView, setActiveView, onLogout }) => {
  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: '📊' },
    { name: 'Inventario', id: 'inventory', icon: '📦' },
    { name: 'Presupuesto', id: 'budget', icon: '💰' },
    { name: 'Ventas', id: 'sales', icon: '🛒' },
  ];

  return (
    <>
      {isOpen && <Overlay onClick={toggleSidebar} />}
      
      <SidebarContainer isOpen={isOpen}>
        {/* Sección del Logo y Botón de Cierre */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem', padding: '0 1rem', borderBottom: `1px solid ${HOVER_DARK_BLUE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            
            <StyledLogo src={Icon} alt="Catco Logo" /> 
            
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: WHITE }}>Sublinet</span>
          </div>
          <button 
            onClick={toggleSidebar}
            style={{ color: WHITE, padding: '0.25rem', borderRadius: '0.375rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {/* Ícono de cerrar en blanco */}
            <svg width="24" height="24" fill="none" stroke="currentColor" style={{ color: WHITE }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav style={{ marginTop: '2rem', padding: '0 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navigation.map((item) => (
              <li key={item.id}>
                <NavButton
                  active={activeView === item.id}
                  onClick={() => setActiveView(item.id)}
                >
                  <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                  <span style={{ fontWeight: '500' }}>{item.name}</span>
                </NavButton>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', borderTop: `1px solid ${HOVER_DARK_BLUE}` }}>
          <LogoutButton onClick={onLogout}>
            {/* Ícono de cerrar sesión en blanco */}
            <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: WHITE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </LogoutButton>
        </div>
      </SidebarContainer>
    </>
  );
};

export default SideBars;