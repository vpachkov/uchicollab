import './App.css';
import './css/Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PHome from "./pages/PHome";
import PCreate from "./pages/PCreate";
import PHelp from "./pages/PHelp";
import PQuestion from "./pages/PQuestion";
import { Router, Route, Switch } from "react-router-dom";
import { useHistory, withRouter } from "react-router-dom";

import history from './history'
import PProfile from './pages/PProfile';
import PLogin from './pages/PLogin';
import PRegister from './pages/PRegister';
import PRaiting from './pages/PRaiting';

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" render={(props) => <PHome/>}>
                </Route>
                <Route exact path="/create" render={(props) => <PCreate/>}>
                </Route>
                <Route exact path="/help" render={(props) => <PHelp/>}>
                </Route>
                <Route exact path="/login" render={(props) => <PLogin/>}>
                </Route>
                <Route exact path="/register" render={(props) => <PRegister/>}>
                </Route>
                <Route exact path="/raitings" render={(props) => <PRaiting/>}>
                </Route>
                <Route
                    exact path="/question/:id"
                    render={(props) => <PQuestion  {...props}/>}>
                </Route>
                <Route
                    exact path="/user/:login"
                    render={(props) => <PProfile  {...props}/>}>
                </Route>
            </Switch>
        </Router>
    );
}

export default withRouter(App);