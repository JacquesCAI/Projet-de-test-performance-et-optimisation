import React from 'react';
import AuthService from "../services/AuthService";
import FormService from "../services/FormService";

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
            this.setState(FormService.getUpdate(this.state,res));
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
                                    FormService.displayErrors(this.state.errors.email)
                                }
                                <input name="password" placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.password}/><br/>
                                {
                                    FormService.displayErrors(this.state.errors.password)
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
