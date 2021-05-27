import React from 'react';
import AuthService from "../services/AuthService";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {
                email: [],
                password: []
            },
            error: ""
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    login = async (e) => {
        e.preventDefault()
        const res = await AuthService.login(this.state.email,this.state.password);
        if (res) {
            const toUpdate = {errors: {}, error: ""};

            for (const field in this.state.errors) {
                toUpdate.errors[field] = res[field] ?? [];
            }
            if (res.error) toUpdate.error = res.error;
            this.setState(toUpdate);
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card text-center">
                            <div className="card-header"><h2>Connexion</h2></div>
                            <form onSubmit={this.login}>
                                <input name="email" placeholder="Adresse mail" type="text" onChange={this.handleChange} value={this.state.email}/><br/>
                                {
                                    this.state.errors.email.length > 0 &&
                                        <ul>
                                            {
                                                this.state.errors.email.map(error =>
                                                   <li key={error} style={{color: "red"}}>{error}</li>
                                                )
                                            }
                                        </ul>
                                }
                                <input name="password" placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.password}/><br/>
                                {
                                    this.state.errors.password.length > 0 &&
                                    <ul>
                                        {
                                            this.state.errors.password.map(error =>
                                                <li key={error} style={{color: "red"}}>{error}</li>
                                            )
                                        }
                                    </ul>
                                }
                                <input type="submit" value="Connexion"/>
                            </form>
                            { this.state.error !== "" &&
                                <div style={{color: "red"}}>{this.state.error}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
