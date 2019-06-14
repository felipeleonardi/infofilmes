import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { urlImageThumb } from '../../enviroments';
import MovieDescriptionComponent from './MovieDescriptionComponent';
import CastComponent from '../common/CastComponent';
import InfoBoxComponent from '../common/InfoBoxComponent';
import TitleComponent from '../common/TitleComponent';
import TaglineComponent from '../common/TaglineComponent';
import PosterImageComponent from '../common/PosterImageComponent';

export default class MovieDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            backgroundOpacity: 1,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.mountMovieInfo = this.mountMovieInfo.bind(this);
    }

    handleOpenModal(e) { 
        this.setState({
            modalOpen: true,
            backgroundOpacity: 0.5
        })
    }

    handleCloseModal(e) {
        this.setState({
            modalOpen: false,
            backgroundOpacity: 1
        })
    }

    mountMovieInfo(info, title) {
        if (info !== '') {
            return (
                <InfoBoxComponent
                    title={ title }
                    info={ info }
                />
            )
        }
        return null;
    }

    render() {
        let movieView = <div></div>;
        if (this.props.movie) {
            if (this.props.movie.valid === 'true') {
                const { poster_path, title, tagline, overview, runtime, revenue, release_date, credits, description } = this.props.movie;
                let releaseDateInfo = this.mountMovieInfo(release_date, 'Lançamento');
                let revenueInfo = this.mountMovieInfo(revenue, 'Orçamento');
                let runtimeInfo = this.mountMovieInfo(runtime, 'Duração');
                let imageUrl = `${urlImageThumb}${poster_path}`;
                movieView = (
                    <Grid 
                        centered 
                        columns={1}
                        className="mt35">
                        <Grid.Column 
                            style={ styles.movieDetails }
                            width={'9'}>
                            <Grid 
                                textAlign={'left'} 
                                className="text-white"
                                style={{opacity: this.state.backgroundOpacity}}>
                                <PosterImageComponent
                                    width={6}
                                    url={ imageUrl }
                                />
                                <Grid.Column 
                                    width={10}
                                    className="pad25">
                                    <TitleComponent
                                        size={'h1'}
                                        textAlign={'left'}
                                        title={ title }
                                    />
                                    <TaglineComponent
                                        size={'h3'}
                                        textAlign={'left'}
                                        tagline={ tagline }
                                    />
                                    <MovieDescriptionComponent 
                                        handleOpenModal={ this.handleOpenModal }
                                        handleCloseModal={ this.handleCloseModal }
                                        modalOpen={ this.state.modalOpen }
                                        overview={ overview }
                                        description={ description }
                                    />
                                    <Grid columns={2}>
                                        <Grid.Column width={7}>
                                            { releaseDateInfo }
                                            { revenueInfo }
                                            { runtimeInfo }
                                        </Grid.Column>
                                        <Grid.Column width={9}>
                                            <CastComponent 
                                                cast={ credits.cast }
                                                hideTitle={ false }
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    
                )
            } 
            else if (this.props.movie.valid === 'false') {
                movieView = <h3 style={ styles.errorMsg }>Por enquanto não há dados suficiente sobre este filme.</h3>;
            }
            else if (this.props.movie.valid === 'invalido') {
                movieView = <h3 style={ styles.errorMsg }>O filme que você está procurando não foi encontrado, ou a URL é inválida.</h3>;
            }
        } 
        return movieView;
    }
}

const styles = {
    movieDetails: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    movieTagline: {
        color: '#00FC87',
        fontSize: '21px',
        fontFamily: 'Oswald, serif',
        fontWeight: '300'
    },
    movieDescription: {
        fontFamily: 'serif',
        fontSize: '17px',
    },
    errorMsg: {
        color: 'white'
    }
}