import React from 'react';
import VaccinsService from '../services/VaccinsService';
import ModalEdit from "./ModalEdit";

import '../../css/modal.css';

class Index extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            vax: [],
            vaccinToEdit: null
        }
        if (this.state.user != null) {
            VaccinsService.getVaccins(this.state.user.token)
                .then(vaccins => {
                    this.setState( {
                        vax: vaccins.map((vaccin, index) => {
                            return {...vaccin, index}
                        })
                    });
                })
        }
    }

    displayModal(vaccin) {
        this.setState({vaccinToEdit: {...vaccin}});
    }

    closeModal = () => {
        this.setState({vaccinToEdit: null});
    }

    saveVaccin = async () => {
        const res = await VaccinsService.editVaccin(this.state.vaccinToEdit,this.state.user.token);
        this.state.vax[this.state.vaccinToEdit.index] = this.state.vaccinToEdit
        this.setState({vax: this.state.vax, vaccinToEdit: null});
    }

    handleChangeModal = (event) => {
        this.state.vaccinToEdit[event.target.name] = event.target.value;
        this.setState({vaccinToEdit: this.state.vaccinToEdit})
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
                                        { this.state.vax.map(vaccin =>
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
                                                        <input type="button" value="Editer" onClick={() => this.displayModal(vaccin)}/>
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
                <ModalEdit saveVaccin={this.saveVaccin} vaccinToEdit={this.state.vaccinToEdit} closeModal={this.closeModal} handleChangeModal={this.handleChangeModal}></ModalEdit>
            </div>
        );
    }

}

export default Index;
