import React from 'react';
import FormService from "../services/FormService";
import AuthService from "../services/AuthService";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: {
                name: [],
                email: [],
                password: [],
                password_confirmation: []
            },
            error: ""
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    register = async (e) => {
        e.preventDefault();
        const res = await AuthService.register(
            this.state.name,
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        );
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
                            <div className="card-header"><h2>Inscription</h2></div>
                            <form onSubmit={this.register}>
                                <input name="name" placeholder="Nom" type="text" onChange={this.handleChange} value={this.state.name}/><br/>
                                {
                                    FormService.displayErrors(this.state.errors.name)
                                }
                                <input name="email" placeholder="Adresse mail" type="text" onChange={this.handleChange} value={this.state.email}/><br/>
                                {
                                    FormService.displayErrors(this.state.errors.email)
                                }
                                <input name="password" placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.password}/><br/>
                                {
                                    FormService.displayErrors(this.state.errors.password)
                                }
                                <input name="password_confirmation" placeholder="Confirmation du mot de passe" type="password" onChange={this.handleChange} value={this.state.password_confirmation}/><br/>
                                {
                                    FormService.displayErrors(this.state.errors.password_confirmation)
                                }
                                <input type="submit" value="S'inscrire"/>
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

export default Register;
