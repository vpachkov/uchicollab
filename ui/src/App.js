import logo from './logo.svg';
import './App.css';
import './css/Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PHome } from "./pages/PHome";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <PHome></PHome>  
    </Container>
  );
}

export default App;