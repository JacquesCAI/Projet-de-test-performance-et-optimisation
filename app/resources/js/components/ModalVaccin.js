import React from 'react';

class ModalVaccin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccin: this.props.modal == true ?
                {
                    code_region: '',
                    nom_reg: '',
                    type_de_vaccin: '',
                    nb_ucd: '',
                    nb_doses: ''
                } : this.props.modal
        }
        console.log(this.state)
    }

    handleChange = e =>{
        this.setState({vaccin: 
            {...this.state.vaccin, [e.target.name]: e.target.value}})
    }

    submit = e =>{
        e.preventDefault();
        this.props.onSubmit(this.state.vaccin);
    }

    render() {
        return (
            
        <div className="modal display-block">
            <section className="modal-main">
                <button className="button-close" type="button" onClick={this.props.closeModal}>
                    Fermer
                </button>
                {this.props.modal == true ? <h1>Créer le vaccin</h1>
                : <h1>Editer le vaccin N° { this.state.vaccin.id}</h1>}
                <form onSubmit={this.submit}>
                    <label>
                        Code de la région :
                        <input type="text" name="code_region" value={this.state.vaccin.code_region} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Nom de la region :
                        <input type="text" name="nom_reg" value={this.state.vaccin.nom_reg} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Type de vaccin :
                        <input type="text" name="type_de_vaccin" value={this.state.vaccin.type_de_vaccin} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Nombre d'UCD :
                        <input type="text" name="nb_ucd" value={this.state.vaccin.nb_ucd} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Nombre de doses :
                        <input type="text" name="nb_doses" value={this.state.vaccin.nb_doses} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Sauvegarder"/>
                </form>
            </section>
        </div>); 
    }
}

export default ModalVaccin;
