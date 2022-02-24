import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Battle from './Battle';
import GitHub from './Github';


function Header() {
    return (
        <Router>
            <header className="container">

                <Link to="/" activeClassName="active" exact><h2>Popular</h2></Link>
                <Link to="/Battle" activeClassName="active"><h2 className="battle-margin">Battle</h2></Link>

            </header>
                <Switch>
                    <Route path="/" exact>
                        <GitHub />
                    </Route>
                    <Route path="/Battle">
                        <Battle />
                    </Route>
                </Switch>    
        </Router>
    )
}

export default Header;

