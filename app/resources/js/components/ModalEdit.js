import React from 'react';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.vaccinToEdit != null &&
        <div className="modal display-block">
            <section className="modal-main">
                <button className="button-close" type="button" onClick={this.props.closeModal}>
                    Fermer
                </button>
                <h1>Editer le vaccin N° { this.props.vaccinToEdit.id}</h1>
                <form>
                    <label>
                        Code de la région :
                        <input type="text" name="code_region" value={this.props.vaccinToEdit.code_region} onChange={this.props.handleChangeModal}/>
                    </label>
                    <br/>
                    <label>
                        Nom de la region :
                        <input type="text" name="nom_reg" value={this.props.vaccinToEdit.nom_reg} onChange={this.props.handleChangeModal}/>
                    </label>
                    <br/>
                    <label>
                        Type de vaccin :
                        <input type="text" name="type_de_vaccin" value={this.props.vaccinToEdit.type_de_vaccin} onChange={this.props.handleChangeModal}/>
                    </label>
                    <br/>
                    <label>
                        Nombre d'UCD :
                        <input type="text" name="nb_ucd" value={this.props.vaccinToEdit.nb_ucd} onChange={this.props.handleChangeModal}/>
                    </label>
                    <br/>
                    <label>
                        Nombre de doses :
                        <input type="text" name="nb_doses" value={this.props.vaccinToEdit.nb_doses} onChange={this.props.handleChangeModal}/>
                    </label>
                    <br/>
                    <input type="button" value="Sauvegarder" onClick={this.props.saveVaccin}/>
                </form>
            </section>
        </div>);
    }
}

export default ModalEdit;
