import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { Grid } from 'semantic-ui-react';

import MovieDetailsComponent from './MovieDetailsComponent';
import LoaderComponent from '../common/LoaderComponent';
import CardComponent from '../common/CardComponent';

import * as movieActions from '../../actions/movie/actions';
import * as actions from '../../actions/common/actions';

class MovieContainer extends Component {

    constructor(props) {
        super(props);
        this.checkForMovieDetails();
    }

    componentDidMount() {
        this.props.onChangeOption('movie');
        this.props.setBackdropPath();

        this.props.getMoviesByGenres();
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkForMovieDetails();
        if (this.props.movie.id !== prevProps.movie.id) {
            this.props.setBackdropPath(this.props.movie.backdrop_path)
        }
    }

    checkForMovieDetails() {
        if (`${this.props.movie.id}` !== this.props.params.id && this.props.params.id !== undefined && this.props.status !== 'invalid') {
            const { id, title } = this.props.params; 
            this.showDetailsMovies(id, title);
        }
    }

    showDetailsMovies(id, title) {
        this.props.getMovie(id, title);
    }

    render() {
        let cardComponent = null;
        if (this.props.moviesByGenre) {
            if (this.props.moviesByGenre.length > 2) {
                cardComponent = (
                    <div className="mt10">
                        <CardComponent
                            title={ this.props.moviesByGenre[0].genre }
                            media={ this.props.moviesByGenre[0].list }
                            cardsLimit={ 8 }
                        />
                        <CardComponent
                            title={ this.props.moviesByGenre[1].genre }
                            media={ this.props.moviesByGenre[1].list }
                            cardsLimit={ 8 }
                        />
                        <CardComponent
                            title={ this.props.moviesByGenre[2].genre }
                            media={ this.props.moviesByGenre[2].list }
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
            return <MovieDetailsComponent movie={ this.props.movie } />;
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
                        <h3 style={ styles.errorMsg }>O filme que você está procurando não foi encontrado, ou a URL é inválida.</h3>
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
        movie: state.movie,
        status: state.statusMovie,
        hideMedia: state.hideMedia,
        moviesByGenre: state.moviesByGenre
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovie: (id, title) => dispatch(movieActions.getMovie(id, title)),
        setBackdropPath: (value) => dispatch(actions.setBackdropPath(value)),
        onChangeOption: (label) => dispatch(actions.onChangeOption(label)),
        getMoviesByGenres: () => dispatch(movieActions.getMoviesByGenres())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)

const styles = {
    errorMsg: {
        color: 'white'
    }
}