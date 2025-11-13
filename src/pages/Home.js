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
    { id: 1, name: 'Laptop Dell XPS', category: 'Electrónicos', quantity: 15, price: 1200 },
    { id: 2, name: 'Mouse Inalámbrico', category: 'Accesorios', quantity: 45, price: 25 },
    { id: 3, name: 'Monitor 24"', category: 'Electrónicos', quantity: 20, price: 300 },
    { id: 4, name: 'Teclado Mecánico', category: 'Accesorios', quantity: 30, price: 80 },
  ];

  const budgetData = {
    total: 50000,
    used: 28500,
    remaining: 21500
  };

  // ... (DashboardContent, InventoryContent, BudgetContent y renderContent sin cambios en la lógica)
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
              <BudgetText bold style={{ color: SUCCESS_GREEN, fontSize: '1.125rem' }}>
                ${budgetData.remaining.toLocaleString()}
              </BudgetText>
            </FlexBetween>
          </div>
        </Card>
        
        <Card>
          <StatTitle style={{ marginBottom: '1rem' }}>Distribución por Categorías</StatTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Electrónicos</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>65%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                <ProgressFill percentage={65} fillColor={ACCENT_COLOR} /> 
              </ProgressBar>
            </div>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Accesorios</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>25%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                {/* Se mantiene el PRIMARY_DARK_BLUE */}
                <ProgressFill percentage={25} fillColor={PRIMARY_DARK_BLUE} /> 
              </ProgressBar>
            </div>
            <div>
              <FlexBetween>
                <BudgetText color={HOVER_DARK_BLUE}>Otros</BudgetText>
                <BudgetText color={HOVER_DARK_BLUE}>10%</BudgetText>
              </FlexBetween>
              <ProgressBar>
                {/* Se mantiene el TEXT_SECONDARY */}
                <ProgressFill percentage={10} fillColor={TEXT_SECONDARY} /> 
              </ProgressBar>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const SalesContent = () => {
    const [sales, setSales] = useState([
      { id: 1, name: 'Laptop Dell XPS', image: 'https://i5.walmartimages.com/asr/df471863-0fd7-49ab-8585-2585245b1b24.fe6dc231ec9cd6b9862bd54d5933e13f.jpeg', sold: 0 },
      { id: 2, name: 'Mouse Inalámbrico', image: 'https://sicsa.com.ni/wp-content/uploads/2025/04/1783_728.jpg', sold: 0 },
      { id: 3, name: 'Monitor 24"', image: 'https://www.almacenestropigas.com/media/catalog/product/4/5/459351800010_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', sold: 0 },
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
        <GridContainer>
          {sales.map(product => (
            <Card key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
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
        </GridContainer>
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