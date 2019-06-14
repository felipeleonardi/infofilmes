import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { Grid } from 'semantic-ui-react';

import SerieDetailsComponent from './SerieDetailsComponent';
import LoaderComponent from '../common/LoaderComponent';
import CardComponent from '../common/CardComponent';

import * as serieActions from '../../actions/serie/actions';
import * as actions from '../../actions/common/actions';

class SerieContainer extends Component {

    constructor(props) {
        super(props);
        this.checkForSerieDetails();
    }

    componentDidMount() {
        this.props.onChangeOption('serie');
        this.props.setBackdropPath();
        
        this.props.getSeriesByGenres();
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkForSerieDetails();
        if (this.props.serie.id !== prevProps.serie.id) {
            this.props.setBackdropPath(this.props.serie.backdrop_path)
        }
    }

    checkForSerieDetails() {
        if (`${this.props.serie.id}` !== this.props.params.id && this.props.params.id !== undefined && this.props.status !== 'invalid') {
            const { id, title } = this.props.params; 
            this.showDetailsSerie(id, title);
        }
    }

    showDetailsSerie(id, title) {
        this.props.getSerie(id, title);
    }

    render() {
        let cardComponent = null;
        if (this.props.seriesByGenre) {
            if (this.props.seriesByGenre.length > 2) {
                cardComponent = (
                    <div className="mt10">
                        <CardComponent
                            title={ this.props.seriesByGenre[0].genre }
                            media={ this.props.seriesByGenre[0].list }
                            cardsLimit={ 8 }
                        />
                        <CardComponent
                            title={ this.props.seriesByGenre[1].genre }
                            media={ this.props.seriesByGenre[1].list }
                            cardsLimit={ 8 }
                        />
                        <CardComponent
                            title={ this.props.seriesByGenre[2].genre }
                            media={ this.props.seriesByGenre[2].list }
                            cardsLimit={ 8 }
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
            return <SerieDetailsComponent serie={ this.props.serie } />;
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
                        <h3 style={ styles.errorMsg }>A série que você está procurando não foi encontrada, ou a URL é inválida.</h3>
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
        serie: state.serie,
        status: state.statusSerie,
        hideMedia: state.hideMedia,
        seriesByGenre: state.seriesByGenre
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSerie: (id, title) => dispatch(serieActions.getSerie(id, title)),
        setBackdropPath: (value) => dispatch(actions.setBackdropPath(value)),
        onChangeOption: (label) => dispatch(actions.onChangeOption(label)),
        getSeriesByGenres: () => dispatch(serieActions.getSeriesByGenres())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieContainer)

const styles = {
    errorMsg: {
        color: 'white'
    }
}