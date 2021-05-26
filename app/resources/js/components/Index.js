import React from 'react';

function Index() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar scroll</a>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Se connecter</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">S'inscrire</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card text-center">
                                <div className="card-header"><h2>VaccineHelp</h2></div>

                                <div className="card-body">Bienvenue sur l'API VaccineHelp !</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Index;
