
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
function Header() {
    return (
        <Router>
            <header className="container">
                <NavLink to="/GitHub" activeClassName="active"><h2>Popular</h2></NavLink>
                <NavLink to="/Battle" activeClassName="active"><h2 className="battle-margin">Battle</h2></NavLink>
            </header>
        </Router>
    )
}

export default Header;

