import React from 'react';
import VaccinsService from '../services/VaccinsService';
import ModalVaccin from "./ModalVaccin";

import '../../css/modal.css';

class Index extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            vaccins: [],
            filteredVaccins: [],
            vaccinToEdit: null,
            keyWord: "",
            modal: false
        }
        if (this.state.user != null) {
            VaccinsService.getVaccins(this.state.user.token)
                .then(vaccins => {
                    if (vaccins) {
                        let vaccinsWithIndex = vaccins.map((vaccin, index) => {
                            return {...vaccin, index}
                        });
                        this.setState( {
                            vaccins: vaccinsWithIndex, filteredVaccins: vaccinsWithIndex
                        });
                    }
                })
        }
    }

    displayEdit(vaccin) {
        this.setState({modal: {...vaccin}});
    }

    displayNew(){
        this.setState({modal: true});
    }

    closeModal = () => {
        this.setState({modal: false});
    }

    saveVaccin = async (vaccinToSave) => {
        if (this.state.modal == true) {
            await VaccinsService.postVaccin(vaccinToSave, this.state.user.token);

            this.setState({

            })
        } else if (this.state.modal){
            await VaccinsService.editVaccin(vaccinToSave,this.state.user.token);

            this.setState({
                    vaccins: this.state.vaccins.map(vaccin => 
                        vaccin.id == vaccinToSave.id ?
                        vaccinToSave : vaccin
                        ),
                    filteredVaccins: this.state.filteredVaccins.map(vaccin => 
                        vaccin.id == vaccinToSave.id ?
                        vaccinToSave : vaccin
                        ),
                    modal: false
                });
        }
        
    }

    deleteVaccin = async (vaccinToDelete) => {
        if (!window.confirm('Etes-vous sûr de vouloir supprimer ce vaccin ?')) {
            return 
        }
        if(
            await VaccinsService.deleteVaccin(vaccinToDelete, this.state.user.token)
        ) {
            this.setState({vaccins: this.state.vaccins.filter((vaccin) => 
                vaccin.id != vaccinToDelete.id
            ),filteredVaccins: this.state.filteredVaccins.filter((vaccin) => 
                vaccin.id != vaccinToDelete.id
        ) })
        }
    }

    handleChangeModal = (event) => {
        this.state.vaccinToEdit[event.target.name] = event.target.value;
        this.setState({vaccinToEdit: this.state.vaccinToEdit})
    }

    handleChangeKeyword = (event) => {
        const keyWord = event.target.value;
        const fields = ["id","code_region","nom_reg","type_de_vaccin","nb_ucd","nb_doses","date"];
        this.setState({keyWord, filteredVaccins: keyWord !== "" ? this.state.vaccins.filter(vaccin => {
            for (const field of fields) {
                if (vaccin[field].toString().toLowerCase() !== vaccin[field].toString().toLowerCase().replace(keyWord.toLowerCase(),"")) {
                    return true;
                }
            }
            return false;
        }) : this.state.vaccins});
    }


    render ()
    {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        { this.state.user == null ?
                        <div className="card text-center">
                            <div className="card-header"><h2>VaccineHelp</h2></div>
                            <div className="card-body">Bienvenue sur l'API VaccineHelp !</div>
                        </div>
                        :
                        <div className="card text-center">
                            <div className="card-header"> Liste des vaccins </div>
                            <div className="card-body">
                                <button onClick={() => this.displayNew()}>Ajouter un vaccin</button>
                                <div>
                                    Mot clé : <input type="text" value={this.state.keyWord} onChange={this.handleChangeKeyword}/>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                id
                                            </th>
                                            <th>
                                                code_region
                                            </th>
                                            <th>
                                                nom_reg
                                            </th>
                                            <th>
                                                type_de_vaccin
                                            </th>
                                            <th>
                                                nb_ucd
                                            </th>
                                            <th>
                                                nb_doses
                                            </th>
                                            <th>
                                                date
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.filteredVaccins.map(vaccin =>
                                                <tr key={vaccin.id}>
                                                    <td>
                                                        {vaccin.id}
                                                    </td>
                                                    <td>
                                                        {vaccin.code_region}
                                                    </td>
                                                    <td>
                                                        {vaccin.nom_reg}
                                                    </td>
                                                    <td>
                                                        {vaccin.type_de_vaccin}
                                                    </td>
                                                    <td>
                                                        {vaccin.nb_ucd}
                                                    </td>
                                                    <td>
                                                        {vaccin.nb_doses}
                                                    </td>
                                                    <td>
                                                        {vaccin.date}
                                                    </td>
                                                    <td>
                                                        <input type="button" value="Editer" onClick={() => this.displayEdit(vaccin)}/>
                                                        <input type='button' value="Supprimer" onClick={() => this.deleteVaccin(vaccin)}/>
                                                    </td>
                                                </tr>
                                            ) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                {this.state.modal && <ModalVaccin modal={this.state.modal} onSubmit={this.saveVaccin} closeModal={this.closeModal}></ModalVaccin>}
            </div>
        );
    }

}

export default Index;
