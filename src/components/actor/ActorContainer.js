import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { Grid } from 'semantic-ui-react';

import ActorDetailsComponent from './ActorDetailsComponent';
import LoaderComponent from '../common/LoaderComponent';
import CardComponent from '../common/CardComponent';

import * as actorActions from '../../actions/actor/actions';
import * as actions from '../../actions/common/actions';

class ActorContainer extends Component {

    constructor(props) {
        super(props);
        this.checkForActorDetails();
    }

    componentDidMount() {
        this.props.onChangeOption('actor');
        this.props.setBackdropPath();
        
        this.props.getPopularActors();
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkForActorDetails();
        if (this.props.actor.id !== prevProps.actor.id) {
            this.props.setBackdropPath(this.props.actor.backdrop_path)
        }
    }

    checkForActorDetails() {
        if (`${this.props.actor.id}` !== this.props.params.id && this.props.params.id !== undefined && this.props.status !== 'invalid') {
            const { id, title } = this.props.params; 
            this.showDetailsActors(id, title);
        }
    }

    showDetailsActors(id, title) {
        this.props.getActor(id, title);
    }

    render() {
        let cardComponent = null;
        if (this.props.popularActors) {
            if (this.props.popularActors.length > 2) {
                cardComponent = (
                    <div className="mt10">
                        <CardComponent
                            title="Atores Populares"
                            media={ this.props.popularActors }
                            cardsLimit={ 16 }
                        />
                    </div>
                )
                if (this.props.params.id === undefined) {
                    $('#back-container').css('display', 'none');
                    return cardComponent;
                }
            }
        }
        if (this.props.hideMedia) {
            return cardComponent;
        }
        else if (this.props.status === 'loaded') { 
            return <ActorDetailsComponent actor={ this.props.actor } />;
        } 
        else if (this.props.status === 'loading') {
            return (
                <LoaderComponent 
                    columns={1}
                    _class='mt35'
                    inline='centered' 
                    size='massive'
                    active={true}
                    inverted={true}
                />
            );
        }
        else if (this.props.status === 'invalid') {
            return (
                <Grid 
                    centered 
                    columns={3}
                    className="pt40">
                    <Grid.Column>
                        <h3 style={ styles.errorMsg }>O ator ou atriz que você está procurando não foi encontrado(a), ou a URL é inválida.</h3>
                    </Grid.Column>
                    <CardComponent 
                        media={ this.props.media } 
                    />   
                </Grid>
            )
        }
        return cardComponent;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        actor: state.actor,
        status: state.statusActor,
        hideMedia: state.hideMedia,
        popularActors: state.popularActors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getActor: (id, title) => dispatch(actorActions.getActor(id, title)),
        setBackdropPath: (value) => dispatch(actions.setBackdropPath(value)),
        onChangeOption: (label) => dispatch(actions.onChangeOption(label)),
        getPopularActors: () => dispatch(actorActions.getPopularActors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorContainer)

const styles = {
    errorMsg: {
        color: 'white'
    }
}