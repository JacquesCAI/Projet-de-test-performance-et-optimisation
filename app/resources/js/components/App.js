import React from 'react';
import { BrowserRouter, Route, Link} from "react-router-dom";
import Index from "./Index";
import Login from "./Login";
import Register from "./Register";
import AuthService from "../services/AuthService";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("user")
        }
    }

    logout() {
        AuthService.logout();
    }

    render() {
        return (
            <BrowserRouter>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Navbar scroll</a>
                            <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex">

                                    {
                                        this.state.user == null ?
                                            (<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                                <li className="nav-item">
                                                    <Link className="nav-link active" aria-current="page" to="/login">Se connecter</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link active" aria-current="page" to="/register">S'inscrire</Link>
                                                </li>
                                            </ul>) :
                                            (<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                                <li className="nav-item">
                                                    <a className="nav-link active" aria-current="page" href="#" onClick={this.logout}>Se déconnecter</a>
                                                </li>
                                            </ul>)
                                    }
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <Route exact path="/" component={Index}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </main>

            </BrowserRouter>
        );
    }
}

export default App;
