import React from 'react'

class ShowVaccin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [
                ['Code région : ', this.props.vaccin.code_region],
                ['Nom région : ', this.props.vaccin.nom_reg],
                ['Type de vaccin : ', this.props.vaccin.type_de_vaccin],
                ['Nombre d\'ucd : ', this.props.vaccin.nb_ucd],
                ['Nombre de doses : ', this.props.vaccin.nb_doses],
                ['Date : ', this.props.vaccin.created_at]
            ]
        }
    }

    render() {
        return (
            <>
                <h1>Vaccin N°{this.props.vaccin.id}</h1>
                <table>
                    <tbody>
                        {this.state.datas.map((data, index) =>
                            <tr key={index}>
                                <td>{data[0]}</td>
                                <td>{data[1]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        )
    }

}

export default ShowVaccin;
