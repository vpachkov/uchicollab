import logo from './logo.svg';
import './App.css';
import './css/Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PHome from "./pages/PHome";
import { Container } from "react-bootstrap";
import { CookiesProvider } from 'react-cookie';

function App() {
    return ( <
        Container >
        <
        CookiesProvider >
        <
        PHome / >
        <
        /CookiesProvider> <
        /Container>
    );
}

export default App;