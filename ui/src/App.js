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
                <Route
                    exact path="/question/:id"
                    render={(props) => <PQuestion  {...props}/>}>
                </Route>
            </Switch>
        </Router>
    );
}

export default withRouter(App);