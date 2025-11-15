import React, { useState } from 'react';
import SideBars from '../components/SideBars';
import Body from '../components/Styles/Body';
import styled from 'styled-components';

// --- Paleta de Colores --- //
const PRIMARY_DARK_BLUE = "#0074D9";   // Azul intenso
const HOVER_DARK_BLUE = "#457b9d";     // Azul grisáceo
const ACCENT_COLOR = "#7FDBFF";        // Azul claro/acento
const WHITE = "#ffffff";               // Fondo limpio
const BACKGROUND_LIGHT = "#f5f7fa";    // Fondo claro para contraste
const TEXT_SECONDARY = "#333333";      // Texto gris oscuro
const DANGER_RED = '#dc2626';        // Rojo para eliminar
const SUCCESS_GREEN = '#059669';     // Verde para el texto "disponible" del presupuesto

// Componentes styled para el Home
const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  /* Fondo claro con degradado sutil */
  background: linear-gradient(135deg, ${BACKGROUND_LIGHT} 0%, ${HOVER_DARK_BLUE} 100%);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// --- ▼▼▼ NUEVO CONTENEDOR AÑADIDO (SOLO PARA VENTAS) ▼▼▼ ---
const ProductGridContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  /*
    Esto crea una cuadrícula responsiva:
    - auto-fit: Llena la fila con tantas columnas como quepan.
    - minmax(280px, 1fr): Cada columna tendrá un mínimo de 280px
      y crecerá para ocupar el espacio disponible (1fr).
  */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
// --- ▲▲▲ FIN DEL NUEVO CONTENEDOR ▲▲▲ ---

const BillingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    /* En pantallas grandes, 2/3 para el pago, 1/3 para métodos */
    grid-template-columns: 2fr 1fr;
  }
`;

const Card = styled.div`
  background: ${WHITE};
  color: ${PRIMARY_DARK_BLUE};
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: none;
`;

const StatNumber = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0.5rem 0 0 0;
  color: ${props => props.color || PRIMARY_DARK_BLUE}; 
`;

const StatTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: inherit; 
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: ${PRIMARY_DARK_BLUE};
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 0.5rem;
  height: 0.75rem;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div`
  background-color: ${props => props.fillColor || ACCENT_COLOR}; 
  height: 100%;
  border-radius: 0.5rem;
  width: ${props => props.percentage}%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: width 0.4s ease-in-out;
`;

const BudgetText = styled.span`
  font-size: 0.875rem;
  color: ${props => props.color || TEXT_SECONDARY}; 
  font-weight: ${props => props.bold ? '600' : 'normal'};
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${ACCENT_COLOR}; 
  color: ${PRIMARY_DARK_BLUE};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${HOVER_DARK_BLUE}; 
    color: ${WHITE};
  }
`;

const PaymentButton = styled(Button)`
  background-color: ${SUCCESS_GREEN};
  color: ${WHITE};
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1.125rem; /* Más grande para que resalte */

  &:hover {
    background-color: #047857; /* Verde más oscuro */
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${WHITE};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05); 
  border: none;
`;

const TableHeader = styled.thead`
  background-color: ${WHITE};
  color: inherit;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e5e5;
  &:hover {
    background-color: #f7f7f7; 
  }
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 700; 
  color: ${PRIMARY_DARK_BLUE}; 
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: ${props => props.color || 'inherit'}; 
  vertical-align: middle; 
`;

const ActionButton = styled.button`
  color: ${props => props.color || PRIMARY_DARK_BLUE};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  margin: 0 0.5rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
    opacity: 0.9;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${PRIMARY_DARK_BLUE};
  text-align: center;
  margin-bottom: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const QuantityButton = styled.button`
  background-color: ${ACCENT_COLOR};
  color: ${PRIMARY_DARK_BLUE};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${HOVER_DARK_BLUE};
    color: ${WHITE};
  }
`;

const QuantityText = styled.span`
  color: ${PRIMARY_DARK_BLUE};
  font-size: 1.125rem;
  min-width: 20px;
  text-align: center;
  font-weight: 500;
`;

const Home = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const inventoryData = [
    {id: 1, name: 'Camisa Azul', category: 'Ropa', quantity: 25, price: 20 },
    { id: 2, name: 'Camisa Blanca', category: 'Ropa', quantity: 40, price: 18 },
    { id: 3, name: 'Camisa Negra', category: 'Ropa', quantity: 30, price: 22 },
    { id: 4, name: 'Camisa Roja', category: 'Ropa', quantity: 15, price: 19 },
  ];

  const budgetData = {
    total: 50000,
    used: 28500,
    remaining: 21500
  };

  // --- ▼▼▼ CÓDIGO RESTAURADO ▼▼▼ ---
  const DashboardContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SectionTitle>Dashboard</SectionTitle> 
      <GridContainer>
        <Card>
          <StatTitle>Productos en Inventario</StatTitle>
          <StatNumber>{inventoryData.reduce((acc, item) => acc + item.quantity, 0)}</StatNumber>
        </Card>
        <Card>
          <StatTitle>Categorías</StatTitle>
          <StatNumber>8</StatNumber>
        </Card>
        <Card>
          <StatTitle>Stock Bajo</StatTitle>
          <StatNumber color={ACCENT_COLOR}>12</StatNumber>
        </Card>
      </GridContainer>

      <Card>
        <StatTitle>Resumen de Presupuesto</StatTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <FlexBetween>
              <BudgetText color={HOVER_DARK_BLUE}>Presupuesto Utilizado</BudgetText>
              <BudgetText color={HOVER_DARK_BLUE}>
                ${budgetData.used.toLocaleString()} / ${budgetData.total.toLocaleString()}
              </BudgetText>
            </FlexBetween>
            <ProgressBar>
              <ProgressFill percentage={(budgetData.used / budgetData.total) * 100} />
            </ProgressBar>
          </div>
          <BudgetText bold style={{ color: SUCCESS_GREEN, fontWeight: '500' }}>
            ${budgetData.remaining.toLocaleString()} disponibles
          </BudgetText>
        </div>
      </Card>
    </div>
  );

  const InventoryContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FlexBetween>
        <SectionTitle>Gestión de Inventario</SectionTitle>
        <Button>Agregar Producto</Button>
      </FlexBetween>
      
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Producto</TableHeaderCell>
            <TableHeaderCell>Categoría</TableHeaderCell>
            <TableHeaderCell>Cantidad</TableHeaderCell>
            <TableHeaderCell>Precio</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {inventoryData.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ fontWeight: '500', color: HOVER_DARK_BLUE }}>{item.name}</TableCell>
              <TableCell color={TEXT_SECONDARY}>{item.category}</TableCell>
              <TableCell color={TEXT_SECONDARY}>{item.quantity}</TableCell>
              <TableCell color={TEXT_SECONDARY}>${item.price}</TableCell>
              <TableCell>
                <ActionButton color={ACCENT_COLOR}>Editar</ActionButton>
                <ActionButton color={DANGER_RED}>Eliminar</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const BudgetContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SectionTitle>Gestión de Presupuesto</SectionTitle>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        <Card>
          <StatTitle style={{ marginBottom: '1rem' }}>Resumen Presupuestario</StatTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FlexBetween>
              <BudgetText color={HOVER_DARK_BLUE}>Presupuesto Total:</BudgetText>
              <BudgetText bold style={{ color: PRIMARY_DARK_BLUE, fontSize: '1.125rem' }}>
                ${budgetData.total.toLocaleString()}
              </BudgetText>
            </FlexBetween>
            <FlexBetween>
              <BudgetText color={HOVER_DARK_BLUE}>Utilizado:</BudgetText>
              <BudgetText bold style={{ color: ACCENT_COLOR, fontSize: '1.125rem' }}>
                ${budgetData.used.toLocaleString()}
              </BudgetText>
            </FlexBetween>
            <FlexBetween>
              <BudgetText color={HOVER_DARK_BLUE}>Disponible:</BudgetText>
              <BudgetText bold style={{ color: SUCCESS_GREEN, fontSize: '1.tran' }}>
                ${budgetData.remaining.toLocaleString()}
              </BudgetText>
            </FlexBetween>
          </div>
        </Card>
        
        <Card>
          <StatTitle style={{ marginBottom: '1rem' }}>Distribución por Colores</StatTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Camisa Azul</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>30%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                <ProgressFill percentage={30} fillColor={ACCENT_COLOR} /> 
              </ProgressBar>
            </div>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Camisa Blanca</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>25%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                <ProgressFill percentage={25} fillColor={PRIMARY_DARK_BLUE} /> 
              </ProgressBar>
            </div>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Camisa Negra</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>25%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                <ProgressFill percentage={25} fillColor={TEXT_SECONDARY} /> 
              </ProgressBar>
            </div>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Camisa Roja</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>20%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                <ProgressFill percentage={20} fillColor={SUCCESS_GREEN} /> 
              </ProgressBar>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
  // --- ▲▲▲ FIN DEL CÓDIGO RESTAURADO ▲▲▲ ---


  // --- ▼▼▼ "SalesContent" MODIFICADO ▼▼▼ ---
  const SalesContent = () => {
    const [sales, setSales] = useState([
    { 
      id: 1, 
      name: 'Camisa Azul', 
      image: 'https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-isolated-blue-t-shirt-png-image_11479977.png', 
      sold: 0 
    },
    { 
      id: 2, 
      name: 'Camisa Blanca', 
      image: 'https://png.pngtree.com/png-vector/20240815/ourmid/pngtree-classic-white-t-shirt-perfect-for-custom-printing-with-a-blank-png-image_13485404.png', 
      sold: 0 
    },
    { 
      id: 3, 
      name: 'Camisa Negra', 
      image: 'https://png.pngtree.com/png-vector/20240401/ourmid/pngtree-black-t-shirt-mockup-transparent-background-png-image_12256281.png', 
      sold: 0 
    },
    { 
      id: 4, 
      name: 'Camisa Roja', 
      image: 'https://static.vecteezy.com/system/resources/thumbnails/037/752/398/small/ai-generated-photo-of-clean-red-t-shirt-without-background-template-for-mockup-png.png', 
      sold: 0 
    },
  ]);


    const handleIncrease = (id) => {
      setSales(prev =>
        prev.map(item =>
          item.id === id ? { ...item, sold: item.sold + 1 } : item
        )
      );
    };

    const handleDecrease = (id) => {
      setSales(prev =>
        prev.map(item =>
          item.id === id && item.sold > 0 ? { ...item, sold: item.sold - 1 } : item
        )
      );
    };

    const handleRegisterSale = (id) => {
      const product = sales.find(p => p.id === id);
      alert(`Venta registrada: ${product.sold} unidades de ${product.name}`);
    };

    return(
      <div>
        <SectionTitle>Registrar Ventas</SectionTitle>
        
        {/* --- Se usa el nuevo "ProductGridContainer" --- */}
        <ProductGridContainer>
          {sales.map(product => (
            <Card key={product.id}>
              <ProductImage src={product.image} alt={product.name}/>
              <ProductName>{product.name}</ProductName>
              <QuantityControl>
                <QuantityButton onClick={() => handleDecrease(product.id)}>-</QuantityButton>
                <QuantityText>{product.sold}</QuantityText>
                <QuantityButton onClick={() => handleIncrease(product.id)}>+</QuantityButton>
              </QuantityControl>
              <Button onClick={() => handleRegisterSale(product.id)}>
                Registrar Venta
              </Button>
            </Card>
          ))}
        </ProductGridContainer>
      </div>
    );
  };
  // --- ▲▲▲ FIN DE "SalesContent" MODIFICADO ▲▲▲ ---


  const BillingContent = () => {
    
    // Datos de ejemplo para la factura pendiente
    const pendingInvoice = {
      id: "#1025",
      client: "Cliente Ejemplo 2",
      date: "15/11/2025",
      amount: 85.50,
      status: "Pendiente"
    };

    const handlePayment = () => {
      // En un futuro, aquí se abriría Stripe, PayPal, etc.
      alert(`Iniciando proceso de pago para la factura ${pendingInvoice.id} por $${pendingInvoice.amount}`);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SectionTitle>Gestión de Facturación</SectionTitle>
        
        <GridContainer>
          <Card>
            <StatTitle>Facturas Emitidas</StatTitle>
            <StatNumber>120</StatNumber>
          </Card>
          <Card>
            <StatTitle>Facturas Pendientes</StatTitle>
            <StatNumber color={DANGER_RED}>5</StatNumber>
          </Card>
          <Card>
            <StatTitle>Ingresos (Este Mes)</StatTitle>
            <StatNumber color={SUCCESS_GREEN}>$4,500</StatNumber>
          </Card>
        </GridContainer>

        <BillingGrid>
          
          <Card style={{ background: `linear-gradient(135deg, ${PRIMARY_DARK_BLUE}, ${HOVER_DARK_BLUE})`, color: WHITE }}>
            <StatTitle style={{ color: WHITE, borderBottom: `1px solid ${ACCENT_COLOR}`, paddingBottom: '0.5rem' }}>Pagar Factura Pendiente</StatTitle>
            <div style={{ marginTop: '1.5rem' }}>
              <FlexBetween style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '1rem', color: ACCENT_COLOR }}>Factura ID:</span>
                <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>{pendingInvoice.id}</span>
              </FlexBetween>
              <FlexBetween style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1rem', color: ACCENT_COLOR }}>Cliente:</span>
                <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>{pendingInvoice.client}</span>
              </FlexBetween>
              
              <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <span style={{ fontSize: '1.125rem', color: ACCENT_COLOR }}>MONTO A PAGAR</span>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: WHITE }}>
                  ${pendingInvoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <span style={{ fontSize: '0.875rem', color: '#fecaca' /* Rojo claro */ }}>Vence: {pendingInvoice.date}</span>
              </div>

              <PaymentButton onClick={handlePayment}>
                Pagar Ahora
              </PaymentButton>
            </div>
          </Card>

          <Card>
            <StatTitle style={{ borderBottom: `1px solid ${HOVER_DARK_BLUE}`, paddingBottom: '0.5rem' }}>Métodos de Pago</StatTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: TEXT_SECONDARY, margin: 0 }}>
                Aceptamos las principales tarjetas de crédito y débito.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2.5rem', color: PRIMARY_DARK_BLUE }}>
                <span>💳</span>
                <span>💳</span>
                <span>💳</span>
              </div>
              <Button style={{ width: '100%', background: HOVER_DARK_BLUE, color: WHITE }}>
                Administrar Métodos
              </Button>
            </div>
          </Card>
        </BillingGrid>


        <div style={{marginTop: '1.5rem'}}>
          <StatTitle style={{color: PRIMARY_DARK_BLUE, fontSize: '1.25rem'}}>Historial de Facturas</StatTitle>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>ID Factura</TableHeaderCell>
                <TableHeaderCell>Cliente</TableHeaderCell>
                <TableHeaderCell>Fecha</TableHeaderCell>
                <TableHeaderCell>Monto</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              <TableRow>
                <TableCell style={{ fontWeight: '500', color: HOVER_DARK_BLUE }}>#1024</TableCell>
                <TableCell color={TEXT_SECONDARY}>Cliente Ejemplo 1</TableCell>
                <TableCell color={TEXT_SECONDARY}>14/11/2025</TableCell>
                <TableCell color={TEXT_SECONDARY}>$150.00</TableCell>
                <TableCell>
                  <span style={{ color: SUCCESS_GREEN, background: '#D1FAE5', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
                    Pagada
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: '500', color: HOVER_DARK_BLUE }}>{pendingInvoice.id}</TableCell>
                <TableCell color={TEXT_SECONDARY}>{pendingInvoice.client}</TableCell>
                <TableCell color={TEXT_SECONDARY}>{pendingInvoice.date}</TableCell>
                <TableCell color={TEXT_SECONDARY}>${pendingInvoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>
                  <span style={{ color: DANGER_RED, background: '#FEE2E2', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {pendingInvoice.status}
                  </span>
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </div>
      </div>
    );
  };


  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'inventory':
        return <InventoryContent />;
      case 'budget':
        return <BudgetContent />;
      case 'sales':
        return <SalesContent />;
      case 'billing':
        return <BillingContent />;
      default:
        return <DashboardContent />;
    }
  };


  return (
    <HomeContainer>
      <SideBars 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={onLogout}
        // Se asume que SideBars también toma en cuenta estos colores en sus estilos
      />
      <Body toggleSidebar={toggleSidebar}>
        {renderContent()}
      </Body>
    </HomeContainer>
  );
};

export default Home;