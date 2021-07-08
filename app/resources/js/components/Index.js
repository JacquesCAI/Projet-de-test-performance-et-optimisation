import React from 'react';
import VaccinsService from '../services/VaccinsService';
import FormVaccin from "./FormVaccin";
import Modal from "./Modal";
import ShowVaccin from "./ShowVaccin";

class Index extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            vaccins: [],
            filteredVaccins: [],
            vaccinToEdit: null,
            keyWord: "",
            editOrCreate: false,
            vaccinToShow: false,
            pagination: 1,
            paginations: [1]
        }
        if (this.state.user != null) {
            this.getVaccins(this.state.pagination);
        }
    }

    getVaccins(pagination) {
        VaccinsService.getVaccins(this.state.user.token,pagination)
            .then(res => {
                if (res) {
                    const vaccins = res.data;
                    let vaccinsWithIndex = vaccins.map((vaccin, index) => {
                        return {...vaccin, index}
                    });
                    const nbPaginations = Math.floor(res.total/res.per_page)+(res.total%res.per_page !== 0 ? 1 : 0);
                    let paginations = [];
                    for (let i=1;i<=nbPaginations;i++) {
                        paginations.push(i);
                    }
                    this.setState( {
                        vaccins: vaccinsWithIndex,
                        filteredVaccins: vaccinsWithIndex,
                        pagination,
                        paginations
                    });
                }
            })
    }

    handlePaginate = (e) => {
        this.getVaccins(e.target.value);
    }

    displayEdit(vaccin) {
        this.setState({editOrCreate: {...vaccin}});
    }

    displayNew(){
        this.setState({editOrCreate: true});
    }

    showVaccin(vaccinId) {
        VaccinsService.getOneVaccin(this.state.user.token,vaccinId)
            .then(vaccin => vaccin && this.setState({vaccinToShow: vaccin}));
    }
    closeVaccinToShow = () => {
        this.setState({vaccinToShow: false});
    }

    closeFormModal = () => {
        this.setState({editOrCreate: false});
    }

    saveVaccin = async (vaccinToSave) => {
        if (this.state.editOrCreate == true) {
            const res = await VaccinsService.postVaccin(vaccinToSave, this.state.user.token);
        } else if (this.state.editOrCreate){
            await VaccinsService.editVaccin(vaccinToSave,this.state.user.token);
        }
        this.state.editOrCreate = false
        this.getVaccins(this.state.pagination);

    }

    deleteVaccin = async (vaccinToDelete) => {
        if (!window.confirm('Etes-vous sûr de vouloir supprimer ce vaccin ?')) {
            return
        }
        if(
            await VaccinsService.deleteVaccin(vaccinToDelete, this.state.user.token)
        ) {
            this.getVaccins((this.state.vaccins.length > 1 || this.state.pagination === 1) ? this.state.pagination : this.state.pagination-1);
        }
    }

    handleChangeModal = (event) => {
        this.state.vaccinToEdit[event.target.name] = event.target.value;
        this.setState({vaccinToEdit: this.state.vaccinToEdit})
    }

    handleChangeKeyword = (event) => {
        const keyWord = event.target.value;
        this.setState({keyWord, filteredVaccins: keyWord !== "" ? this.state.vaccins.filter(vaccin => {
            return this.checkVaccinKeyword(vaccin, keyWord);
        }) : this.state.vaccins});
    }

    checkVaccinKeyword = (vaccin, keyWord) => {
        for (const field in vaccin) {
            if (vaccin[field].toString().toLowerCase() !== vaccin[field].toString().toLowerCase().replace(keyWord.toLowerCase(),"")) {
                return true;
            }
        }
        return false;
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
                                <label>Page :</label>
                                <select value={this.state.pagination} onChange={this.handlePaginate}>
                                    {
                                        this.state.paginations.map(page =>
                                            <option key={page} value={page}>{page}</option>
                                        )
                                    }
                                </select><br/>
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
                                                        {vaccin.created_at}
                                                    </td>
                                                    <td>
                                                        <input type="button" value="Editer" onClick={() => this.displayEdit(vaccin)}/>
                                                        <input type='button' value="Supprimer" onClick={() => this.deleteVaccin(vaccin)}/>
                                                        <input type="button" value="Voir" onClick={() => this.showVaccin(vaccin.id)}/>
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
                {
                    this.state.vaccinToShow &&
                        <Modal closeModal={this.closeVaccinToShow}>
                            <ShowVaccin vaccin={this.state.vaccinToShow}>
                            </ShowVaccin>
                        </Modal>
                }
                {this.state.editOrCreate &&
                    <Modal closeModal={this.closeFormModal}>
                        <FormVaccin defaultValues={this.state.editOrCreate} onSubmit={this.saveVaccin}>
                        </FormVaccin>
                    </Modal>
                }
            </div>
        );
    }

}

export default Index;
