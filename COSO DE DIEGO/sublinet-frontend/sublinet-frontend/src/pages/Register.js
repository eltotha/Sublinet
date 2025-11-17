import { Link, useNavigate } from "react-router-dom";
import Logotipo from "../assets/logo.png";
import { BackGround } from "../components/Styles/Body";
import { BtnConfirm, ButtonContainer, Card, FormGroup, Header, Logo, TxtBox } from "../components/Styles/Login_Styles";

// Colores de la paleta
const PRIMARY_DARK_BLUE = "#0074D9";   // Azul principal
const ACCENT_ORANGE = "#7FDBFF";       // Azul claro/acento
const WHITE = "#ffffff";               // Fondo blanco
const SECONDARY_GREY_BLUE = "#457b9d"; // Azul grisáceo

function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de registro
        navigate("/");
    };

    return (
        <BackGround style={{ 
            /* 1. FONDO CON DEGRADADO AZUL/GRIS OSCURO */
            background: `linear-gradient(135deg, ${PRIMARY_DARK_BLUE} 0%, #0c1a2f 100%)`, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}> 
            {/* Se asume que Card se importa de Login_Styles, si no existe ahí, se debe definir aquí */}
            <Card style={{
                /* 2. LO ÚNICO BLANCO: La tarjeta */
                background: WHITE,
                borderRadius: '1.5rem', /* Borde más redondeado */
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)' /* Sombra más fuerte para resaltar */
            }}>
                <Header>
                    <Logo src={Logotipo} alt="Catco Logo" />
                    <label style={{ fontSize: "1.5rem", fontWeight: "bold", color: PRIMARY_DARK_BLUE, display: "block", marginTop: "0.5rem" }}>
                        Registro de Cuenta
                    </label>
                </Header>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <TxtBox
                            type="text"
                            name="Username"
                            placeholder="Usuario"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <TxtBox
                            type="password"
                            name="Password"
                            placeholder="Contraseña"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <TxtBox
                            type="password"
                            name="ConfirmPassword"
                            placeholder="Confirmar Contraseña"
                            required
                        />
                    </FormGroup>

                    <ButtonContainer>
                        <BtnConfirm type="submit" style={{ backgroundColor: ACCENT_ORANGE, color: PRIMARY_DARK_BLUE, fontWeight: '600' }}>Registrarse</BtnConfirm>
                    </ButtonContainer>

                    <footer style={{ display: "flex", justifyContent: "center", marginTop: "30px", fontSize: "0.875rem", color: SECONDARY_GREY_BLUE }}>
                        Ya tienes cuenta?
                        <Link to="/" style={{ color: ACCENT_ORANGE, marginLeft: "0.25rem" }}> Inicia Sesión!</Link>
                    </footer>
                </form>
            </Card>
        </BackGround>
    );
}

export default Register;