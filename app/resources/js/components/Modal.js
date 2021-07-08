import React from 'react';
import '../../css/modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal display-block">
                <section className="modal-main">
                    <button className="button-close" type="button" onClick={this.props.closeModal}>
                        Fermer
                    </button>
                    {this.props.children}
                </section>
            </div>
        )
    }
}

export default Modal;
