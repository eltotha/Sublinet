import styled from "styled-components";

// --- Paleta de Colores ---
const PRIMARY_DARK_BLUE = '#0074D9';   // Azul principal
const ACCENT_ORANGE = '#7FDBFF';       // Azul claro/acento
const WHITE = '#ffffff';               // Fondo blanco
const SECONDARY_GREY_BLUE = '#457b9d'; // Azul grisáceo

export const Card = styled.div`
  background: ${WHITE};
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); 
  max-width: 400px;
  width: 100%;
  
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Logo = styled.img`
  width: 250px;
  height: auto;
  margin-bottom: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const TxtBox = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${SECONDARY_GREY_BLUE};
  border-radius: 0.75rem;
  font-size: 1rem;
  box-sizing: border-box;
  color: ${PRIMARY_DARK_BLUE};
  background: ${WHITE};
  
  &:focus {
    outline: none;
    border-color: ${ACCENT_ORANGE};
    box-shadow: 0 0 0 3px rgba(127, 219, 255, 0.3);
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${PRIMARY_DARK_BLUE}; /* Texto oscuro */
  margin-bottom: 1rem;
  
  input {
    margin-right: 0.5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;


export const BtnConfirm = styled.button`
  background-color: ${ACCENT_ORANGE};
  color: ${PRIMARY_DARK_BLUE};
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #5ec9e6; /* tono más oscuro del azul claro */
  }
`;