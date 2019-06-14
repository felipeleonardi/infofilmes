import React, { Component } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

export default class ModalComponent extends Component {

    constructor(props) {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.props.handleOpenModal();
    }

    handleCloseModal() {
        this.props.handleCloseModal();
    }

    render() {
        return(
            <Modal 
                trigger={
                    <span 
                    onClick={this.handleOpenModal}
                    style={ styles.btnShowMore }>continuar lendo</span>
                } 
                open={this.props.modalOpen}
                basic 
                size='small'
                onClose={this.handleCloseModal}>
                <Header icon='newspaper' content='Sinopse' />
                <Modal.Content>
                    <h3 className="text-justify">{ this.props.overview }</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        inverted
                        color='green'
                        onClick={this.handleCloseModal}>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const styles = {
    btnShowMore: {
        color: '#00FC87',
        cursor: 'pointer',
    }
}