import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ModalComponent from '../common/ModalComponent';

export default class ActorDescriptionComponent extends Component {

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
        const { description, overview } = this.props;
        if (overview !== '') {
            return(
                <Grid.Column>
                    <span 
                        className="text-justify display-block"
                        style={ styles.actorDescription }
                    >
                        { description } 
                        <ModalComponent 
                            handleOpenModal={ this.handleOpenModal }
                            handleCloseModal={ this.handleCloseModal }
                            modalOpen={ this.props.modalOpen }
                            overview={ overview }
                        />
                    </span>
                </Grid.Column>
            )
        }
        return null;
    }
}

const styles = {
    actorDescription: {
        fontFamily: 'serif',
        fontSize: '16px',
        color: '#bdbdbd'
    },
}